import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreditsFooter } from "@/components/layout/CreditsFooter";

describe("CreditsFooter", () => {
  it("renders copyright text", () => {
    render(<CreditsFooter />);
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
    expect(screen.getByText(/Rod Machen/)).toBeInTheDocument();
  });

  it("renders GCD link", () => {
    render(<CreditsFooter />);
    const gcdLink = screen.getByText("GCD");
    expect(gcdLink).toHaveAttribute("href", "https://www.comics.org/");
  });

  it("renders Comic Vine link", () => {
    render(<CreditsFooter />);
    const cvLink = screen.getByText("Comic Vine");
    expect(cvLink).toHaveAttribute("href", "https://comicvine.gamespot.com/");
  });
});
