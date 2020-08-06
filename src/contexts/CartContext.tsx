import React, { useContext, useState, useEffect, useCallback } from "react";
import { Item, ItemType } from "../models";
import { getItems } from "../api/getItems";

interface CartState {
  items?: Item[];
  deleteItem?: any;
  updateQuantity?: any;
  total?: any;
}

const CartContext = React.createContext<CartState>({});

export const useCartContext = () => useContext(CartContext);

interface Props {
  children: any;
}
export function CartProvider({ children }: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const synchronise = async () => setItems(await getItems());
    synchronise();
  }, []);

  useEffect(() => {
    if (!items?.length) return;
    sessionStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const deleteItem = useCallback((id: string) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)), [
    setItems,
  ]);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const newItems = [...items];
      const selectedItem = newItems.find((item) => item.id === id);
      if (!selectedItem) return;
      selectedItem.quantity = quantity;
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
    <CartContext.Provider value={{ items, deleteItem, updateQuantity, total: getSummary() }}>
      {children}
    </CartContext.Provider>
  );
}
