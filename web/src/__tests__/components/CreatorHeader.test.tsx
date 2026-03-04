import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreatorHeader } from "@/components/creator/CreatorHeader";

describe("CreatorHeader", () => {
  it("renders creator name", () => {
    render(<CreatorHeader name="George Pérez" bio="" />);
    expect(screen.getByText("George Pérez")).toBeInTheDocument();
  });

  it("renders bio when present", () => {
    render(<CreatorHeader name="George Pérez" bio="A legendary comic artist." />);
    expect(screen.getByText("A legendary comic artist.")).toBeInTheDocument();
  });

  it("does not render bio paragraph when empty", () => {
    const { container } = render(<CreatorHeader name="George Pérez" bio="" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });
});
