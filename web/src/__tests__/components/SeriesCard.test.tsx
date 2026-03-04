import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SeriesCard } from "@/components/homepage/SeriesCard";

describe("SeriesCard", () => {
  const defaultProps = {
    id: 2973,
    name: "Crisis on Infinite Earths",
    yearBegan: 1985,
    yearEnded: 1986,
    coverImageUrl: null,
  };

  it("renders series name", () => {
    render(<SeriesCard {...defaultProps} />);
    expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
  });

  it("renders year range", () => {
    render(<SeriesCard {...defaultProps} />);
    expect(screen.getByText("1985–1986")).toBeInTheDocument();
  });

  it("renders open year range when no end year", () => {
    render(<SeriesCard {...defaultProps} yearEnded={null} />);
    expect(screen.getByText("1985–")).toBeInTheDocument();
  });

  it("links to series detail page", () => {
    render(<SeriesCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/series/2973");
  });

  it("uses placeholder image when no cover URL", () => {
    render(<SeriesCard {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toContain("dc-placeholder");
  });
});
