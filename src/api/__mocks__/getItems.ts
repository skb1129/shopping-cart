import { Item, ItemType } from "../../models";
import mockData from "./mock-data.json";

export function getItems() {
  const data: Item[] = mockData.map((item) => ({ ...item, type: item.type as ItemType, quantity: 1 }));
  return data;
}
