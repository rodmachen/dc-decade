import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/ui/EmptyState";

describe("EmptyState", () => {
  it("renders default message", () => {
    render(<EmptyState />);
    expect(screen.getByText("Nothing to show.")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<EmptyState message="No results found." />);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
