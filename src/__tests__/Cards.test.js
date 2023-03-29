import React from "react";
import { render, screen } from "@testing-library/react";
import Cards from "../components/Cards";

describe("Cards component", () => {
  const movies = [
    {
      imdbID: "tt1234567",
      Title: "Test Movie 1",
      Year: "2021",
      Poster: "https://example.com/poster1.jpg",
    },
    {
      imdbID: "tt2345678",
      Title: "Test Movie 2",
      Year: "2022",
      Poster: "https://example.com/poster2.jpg",
    },
  ];

  it("should render movies", () => {
    render(<Cards movies={movies} />);

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("should call setMovieDetails function when a movie is clicked", () => {
    const setMovieDetails = jest.fn();
    render(<Cards movies={movies} setMovieDetails={setMovieDetails} />);

    const movie1 = screen.getByText("Test Movie 1");
    const movie2 = screen.getByText("Test Movie 2");

    // Click on the first movie card
    movie1.click();
    expect(setMovieDetails).toHaveBeenCalledWith("tt1234567");

    // Click on the second movie card
    movie2.click();
    expect(setMovieDetails).toHaveBeenCalledWith("tt2345678");
  });

  it("should render an error message if an error is passed as prop", () => {
    const error = "Something went wrong";
    render(<Cards error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
