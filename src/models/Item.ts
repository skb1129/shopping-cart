export interface Item {
  id: number;
  name: string;
  price: number;
  discount: number;
  type: ItemType;
  img_url: string;
  quantity?: number;
}

export enum ItemType {
  FICTION = "fiction",
  LITERATURE = "literature",
  THRILLER = "thriller",
}
