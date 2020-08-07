import React from "react";
import { act, render, cleanup, RenderResult } from "@testing-library/react";

import App from "../src/App";

jest.mock("../src/api");

afterAll(cleanup);

let component: RenderResult;

test("App: renders correctly", async () => {
  await act(async () => {
    component = render(<App />);
  });
  expect(component.queryByTestId("app")).toBeTruthy();
});
