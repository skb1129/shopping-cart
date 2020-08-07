import React from "react";
import { act, render, cleanup, RenderResult } from "@testing-library/react";

import Summary from "../../../src/components/summary/Summary";
import { CartProvider } from "../../../src/contexts/CartContext";
import { getItems } from "../../../src/api";
import { getTotal } from "../../../src/utils";
import { Total } from "../../../src/models";

jest.mock("../../../src/api");

afterAll(cleanup);

let component: RenderResult;
let total: Total;

test("Summary: renders correctly", async () => {
  await act(async () => {
    component = render(
      <CartProvider>
        <Summary />
      </CartProvider>
    );
  });
  total = getTotal(await getItems());
  expect(component.queryByTestId("summary")).toBeTruthy();
});

test("Summary: displays correct data", () => {
  expect(component.queryByText(`Items(${total.items})`)).toBeTruthy();
  expect(component.getByText(`Items(${total.items})`).nextElementSibling.textContent).toBe(`$${total.price}`);

  expect(component.queryByText("Discount")).toBeTruthy();
  expect(component.getByText("Discount").nextElementSibling.textContent).toBe(`$${total.discount}`);

  expect(component.queryByText("Type discount")).toBeTruthy();
  expect(component.getByText("Type discount").nextElementSibling.textContent).toBe(`$${total.typeDiscount}`);

  expect(component.queryByText("Order total")).toBeTruthy();
  expect(component.getByText("Order total").nextElementSibling.textContent).toBe(
    `$${total.price - total.discount - total.typeDiscount}`
  );
});
