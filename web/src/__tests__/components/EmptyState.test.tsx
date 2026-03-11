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

  it("renders branded variant with logo", () => {
    render(<EmptyState branded message="Search DC Decade" />);
    expect(screen.getByText("Search DC Decade")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders suggestion text in branded variant", () => {
    render(<EmptyState branded message="Search DC Decade" suggestion="Try 'Batman'" />);
    expect(screen.getByText("Try 'Batman'")).toBeInTheDocument();
  });

  it("does not render logo in default variant", () => {
    render(<EmptyState message="No results." />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
