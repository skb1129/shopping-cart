import React from "react";
import { render, cleanup } from "@testing-library/react";

import Header from "../../../src/components/header/Header";

afterAll(cleanup);

const { queryByTestId } = render(<Header />);

test("Header: renders correctly", () => {
  expect(queryByTestId("header")).toBeTruthy();
});

test("Header: renders back arrow icon", () => {
  expect(queryByTestId("icon-back-arrow")).toBeTruthy();
});

test("Header: renders title", () => {
  expect(queryByTestId("header-title")).toBeTruthy();
});
