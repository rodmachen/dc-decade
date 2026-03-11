import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IssueCard } from "@/components/series/IssueCard";

describe("IssueCard", () => {
  const defaultProps = {
    id: 42,
    number: "1",
    title: "The Summoning",
    seriesName: "Crisis on Infinite Earths",
    coverImageUrl: null,
  };

  it("renders issue number", () => {
    render(<IssueCard {...defaultProps} />);
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("renders issue title", () => {
    render(<IssueCard {...defaultProps} />);
    expect(screen.getByText("The Summoning")).toBeInTheDocument();
  });

  it("links to issue detail page", () => {
    render(<IssueCard {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/issue/42");
  });

  it("uses improved alt text with series name", () => {
    render(<IssueCard {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img.getAttribute("alt")).toBe("Cover of Crisis on Infinite Earths #1");
  });

  it("uses placeholder image when no cover URL", () => {
    render(<IssueCard {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toContain("dc-placeholder");
  });

  it("renders without title gracefully", () => {
    render(<IssueCard {...defaultProps} title="" />);
    expect(screen.getByText("#1")).toBeInTheDocument();
  });
});
