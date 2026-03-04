import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchTabs } from "@/components/search/SearchTabs";

describe("SearchTabs", () => {
  it("renders all three tabs", () => {
    render(<SearchTabs active="series" onChange={() => {}} />);
    expect(screen.getByText("Series")).toBeInTheDocument();
    expect(screen.getByText("Creators")).toBeInTheDocument();
    expect(screen.getByText("Issues")).toBeInTheDocument();
  });

  it("calls onChange when a tab is clicked", () => {
    const onChange = vi.fn();
    render(<SearchTabs active="series" onChange={onChange} />);
    fireEvent.click(screen.getByText("Creators"));
    expect(onChange).toHaveBeenCalledWith("creators");
  });

  it("has minimum touch target size", () => {
    render(<SearchTabs active="series" onChange={() => {}} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn.className).toContain("min-h-[44px]");
    });
  });
});
