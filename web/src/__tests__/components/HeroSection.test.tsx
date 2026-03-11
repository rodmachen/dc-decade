import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/homepage/HeroSection";

describe("HeroSection", () => {
  it("renders the banner logo", () => {
    render(<HeroSection />);
    expect(screen.getByAltText("The DC Decade")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);
    expect(
      screen.getByText("The 1980s — the decade that changed comics forever")
    ).toBeInTheDocument();
  });
});
