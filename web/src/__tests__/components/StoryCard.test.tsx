import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StoryCard } from "@/components/issue/StoryCard";

describe("StoryCard", () => {
  const defaultProps = {
    title: "The Summoning",
    feature: "",
    typeName: "comic story",
    sequenceNumber: 0,
    credits: [
      {
        id: 1,
        creditType: { name: "Script" },
        creatorNameDetail: { name: "Marv Wolfman" },
      },
      {
        id: 2,
        creditType: { name: "Pencils" },
        creatorNameDetail: { name: "George Pérez" },
      },
    ],
  };

  it("renders story title", () => {
    render(<StoryCard {...defaultProps} />);
    expect(screen.getByText("The Summoning")).toBeInTheDocument();
  });

  it("renders type badge as 'story' for comic story", () => {
    render(<StoryCard {...defaultProps} />);
    expect(screen.getByText("story")).toBeInTheDocument();
  });

  it("renders type badge as 'cover' for cover type", () => {
    render(<StoryCard {...defaultProps} typeName="cover" />);
    expect(screen.getByText("cover")).toBeInTheDocument();
  });

  it("renders credits", () => {
    render(<StoryCard {...defaultProps} />);
    expect(screen.getByText("Marv Wolfman")).toBeInTheDocument();
    expect(screen.getByText("George Pérez")).toBeInTheDocument();
  });

  it("renders credit role labels", () => {
    render(<StoryCard {...defaultProps} />);
    expect(screen.getByText(/Script:/)).toBeInTheDocument();
    expect(screen.getByText(/Pencils:/)).toBeInTheDocument();
  });

  it("uses feature when title is empty", () => {
    render(<StoryCard {...defaultProps} title="" feature="Superman" />);
    expect(screen.getByText("Superman")).toBeInTheDocument();
  });

  it("shows Untitled when both title and feature are empty", () => {
    render(<StoryCard {...defaultProps} title="" feature="" />);
    expect(screen.getByText("Untitled")).toBeInTheDocument();
  });

  it("renders with no credits gracefully", () => {
    render(<StoryCard {...defaultProps} credits={[]} />);
    expect(screen.getByText("The Summoning")).toBeInTheDocument();
  });
});
