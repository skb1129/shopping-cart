import { Item, Total, ItemType } from "../models";

export function getTotal(items: Item[]): Total {
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
}
