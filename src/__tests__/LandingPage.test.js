import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../components/LandingPage";

describe("LandingPage", () => {
  it("should render welcome message and description", () => {
    render(<LandingPage />);
    const welcomeMessage = screen.getByText("Welcome to Cinema Scope!");
    const description = screen.getByText(
      "Search for your favorite movies and discover new ones."
    );
    expect(welcomeMessage).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
