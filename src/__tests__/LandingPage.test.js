import React from "react";
import {
  render,
  screen
} from "@testing-library/react";
import LandingPage from "../components/LandingPage";

describe("LandingPage", () => {
      it("should render welcome message and description", () => {
          const landingText =
            '<div><h1>Welcome to Cinema Scope!</h1><p>Search for your favorite movies and discover new ones.</p></div>';
          render( < LandingPage landingText = {
              landingText
            }
            />);
            const welcomeMessage = screen.getByText("Welcome to Cinema Scope!");
            const description = screen.getByText(
              "Search for your favorite movies and discover new ones."
            ); expect(welcomeMessage).toBeInTheDocument(); expect(description).toBeInTheDocument();
          });
      });
