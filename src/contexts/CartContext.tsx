import React, { useContext, useState, useEffect, useCallback } from "react";
import { Item, Total } from "../models";
import { getItems } from "../api";
import { getTotal } from "../utils";

interface CartState {
  isLoading?: boolean;
  items?: Item[];
  deleteItem?: (id: number) => void;
  updateQuantity?: (id: number, quantity: number) => void;
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

  const deleteItem = useCallback((id: number) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)), [
    setItems,
  ]);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      const newItems = [...items];
      const selectedItem = newItems.find((item) => item.id === id);
      if (!selectedItem) return;
      selectedItem.quantity = quantity > 0 ? quantity : 0;
      setItems(newItems);
    },
    [items, setItems]
  );

  const getSummary = useCallback(() => getTotal(items), [items]);

  return (
    <CartContext.Provider value={{ isLoading, items, deleteItem, updateQuantity, total: getSummary(), reset }}>
      {children}
    </CartContext.Provider>
  );
}
