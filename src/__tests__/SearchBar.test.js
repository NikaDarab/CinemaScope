import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar component", () => {
  const query = {
    title: "",
    year: "",
  };
  const setQuery = jest.fn();
  const handleSearch = jest.fn();
  const clearResults = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
    );
  });

  test("renders search bar input fields and button", () => {
    expect(
      screen.getByPlaceholderText("Enter movie title")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter year (optional)")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("updates title query when typing in title input field", () => {
    const titleInput = screen.getByPlaceholderText("Enter movie title");
    fireEvent.change(titleInput, { target: { value: "test title" } });
    expect(setQuery).toHaveBeenCalledWith({ ...query, title: "test title" });
  });

  test("updates year query when typing in year input field", () => {
    const yearInput = screen.getByPlaceholderText("Enter year (optional)");
    fireEvent.change(yearInput, { target: { value: "2022" } });
    expect(setQuery).toHaveBeenCalledWith({ ...query, year: "2022" });
  });

  test("calls handleSearch with current query when clicking on search button", () => {
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalledWith(query);
  });

  test("calls clearResults when clicking on clear button", () => {
    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);
    expect(clearResults).toHaveBeenCalled();
  });
});
