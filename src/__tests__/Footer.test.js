import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  test("renders the footer text", () => {
    render(<Footer />);
    const footerText = screen.getByText(/2023 Cinema Scope/i);
    expect(footerText).toBeInTheDocument();
  });
});
