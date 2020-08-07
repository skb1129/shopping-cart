import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Item from "../../../src/components/item/Item";

afterAll(cleanup);

const img_url = "https://place-hold.it/40.jpg";
const name = "Item name";
const deleteAction = jest.fn();
const { queryByTestId, getByTestId, queryByAltText, queryByText, getByAltText } = render(
  <Item name={name} img_url={img_url} deleteAction={deleteAction} />
);

test("Item: renders correctly", () => {
  expect(queryByTestId("item")).toBeTruthy();
});

test("Item: renders provided image", () => {
  expect(queryByAltText(name)).toBeTruthy();
  expect(getByAltText(name).getAttribute("src")).toBe(img_url);
});

test("Item: renders item name", () => {
  expect(queryByText(name)).toBeTruthy();
});

test("Item: renders functional button", () => {
  expect(queryByTestId("item-button")).toBeTruthy();
  fireEvent.click(getByTestId("item-button"));
  expect(deleteAction).toBeCalledTimes(1);
});
