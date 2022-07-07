import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import ItemDetails from "./item-details";

it("renders item details", () => {
  const item = {
    id: 1,
    number: "string",
    summary: "string",
    isPrivate: true,
    service: {
      id: 1,
      name: "string",
    },
    status: {
      id: 1,
      name: "string",
    },
    author: "string",
    createdOn: "string",
    updatedOn: "string",
    type: {
      prefix: "string",
      id: 1,
      name: "string",
    },
  };

  function handleCloseSplitView() {}

  const { getByText, queryByTestId } = render(
    <ItemDetails item={item} setIsSplitView={handleCloseSplitView} />
  );
  expect(getByText("Update Knowledge Item Basic Details")).toBeInTheDocument();
  expect(queryByTestId("KnownErrorTypeId")).toBeTruthy();
  expect(queryByTestId("Status")).toBeTruthy();
  expect(queryByTestId("IsPrivate")).toBeTruthy();
  expect(queryByTestId("Summary")).toBeTruthy();
});
