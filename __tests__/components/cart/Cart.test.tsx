import React from "react";
import { act, render, cleanup, RenderResult } from "@testing-library/react";

import Cart from "../../../src/components/cart/Cart";
import { CartProvider } from "../../../src/contexts/CartContext";
import { getItems } from "../../../src/api";
import { getTotal } from "../../../src/utils";
import { Total, Item } from "../../../src/models";

jest.mock("../../../src/api");

afterAll(cleanup);

let component: RenderResult;
let total: Total;
let items: Item[];

test("Cart: renders correctly", async () => {
  await act(async () => {
    component = render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );
  });
  items = await getItems();
  total = getTotal(items);
  expect(component.queryByTestId("cart")).toBeTruthy();
  expect(component.queryByTestId("cart-head")).toBeTruthy();
});

test("Cart: displays correct data", () => {
  expect(component.queryByText(`Items(${total.items})`)).toBeTruthy();
  expect(component.queryAllByTestId("item").length).toBe(items.length);
});
