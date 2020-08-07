import React, { useContext, useState, useEffect, useCallback } from "react";
import { Item, ItemType, Total } from "../models";
import { getItems } from "../api";

interface CartState {
  isLoading?: boolean;
  items?: Item[];
  deleteItem?: (id: string) => void;
  updateQuantity?: (id: string, quantity: number) => void;
  total?: Total;
  reset?: () => void;
}

const CartContext = React.createContext<CartState>({});

export const useCartContext = () => useContext(CartContext);

interface Props {
  children: any;
}
export function CartProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  const synchronise = async () => {
    !isLoading && setIsLoading(true);
    setItems(await getItems());
    setIsLoading(false);
  };

  useEffect(() => {
    synchronise();
  }, []);

  useEffect(() => {
    if (!items?.length) return;
    sessionStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const reset = () => {
    sessionStorage.clear();
    synchronise();
  };

  const deleteItem = useCallback((id: string) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)), [
    setItems,
  ]);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const newItems = [...items];
      const selectedItem = newItems.find((item) => item.id === id);
      if (!selectedItem) return;
      selectedItem.quantity = quantity > 0 ? quantity : 0;
      setItems(newItems);
    },
    [items, setItems]
  );

  const getSummary = useCallback(() => {
    const total = {
      items: 0,
      price: 0,
      discount: 0,
      typeDiscount: 0,
    };
    items.forEach((item) => {
      total.items += item.quantity;
      total.price += item.price * item.quantity;
      total.discount += item.discount * item.quantity;
      if (item.type === ItemType.FICTION) total.typeDiscount += item.price * item.quantity * 0.15;
    });
    return total;
  }, [items]);

  return (
    <CartContext.Provider value={{ isLoading, items, deleteItem, updateQuantity, total: getSummary(), reset }}>
      {children}
    </CartContext.Provider>
  );
}
