import React from "react";
import { act, render, cleanup, RenderResult } from "@testing-library/react";

import { CartProvider } from "../../src/contexts/CartContext";

jest.mock("../../src/api");

afterAll(cleanup);

function Consumer() {
  return <div data-testid="consumer"></div>;
}

let component: RenderResult;

test("CartContext: renders children correctly", async () => {
  await act(async () => {
    component = render(
      <CartProvider>
        <Consumer />
      </CartProvider>
    );
  });
  expect(component.queryByTestId("consumer")).toBeTruthy();
});
