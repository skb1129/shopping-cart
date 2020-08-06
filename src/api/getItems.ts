import { Item } from "../models";

export async function getItems(): Promise<Item[]> {
  let data: Item[];
  const sessionData = sessionStorage.getItem("cart");
  try {
    if (sessionData) {
      data = JSON.parse(sessionData);
    } else {
      data = await fetch("https://run.mocky.io/v3/5de6f543-f017-4017-9897-9837d7e8f96d").then((res) => res.json());
      sessionStorage.setItem("cart", JSON.stringify(data));
    }
    data.forEach((item) => {
      if (item.quantity) return;
      if (item.quantity === 0) return;
      item.quantity = 0;
    });
  } catch (e) {
    console.log(e);
  }
  return data;
}
