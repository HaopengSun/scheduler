import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

import axios from "__mocks__/axios";

import { getByText, getAllByTestId } from "@testing-library/react"

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  // waitForElement returns a promise
  return waitForElement(() => getByText("Monday"))
  .then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);
  // With await the function will not run to completion until the Promise that we are awaiting has resolved.
  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  console.log(prettyDOM(container));
  // an array of two article DOM nodes
  const appointment = getAllByTestId(container, "appointment");
  console.log(prettyDOM(appointment));
})