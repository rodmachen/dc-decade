import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomNav } from "@/components/layout/BottomNav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("BottomNav", () => {
  it("renders Home and Search links", () => {
    render(<BottomNav />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("has aria-label on the nav element", () => {
    render(<BottomNav />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Main navigation");
  });

  it("marks active link with aria-current", () => {
    render(<BottomNav />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("does not mark inactive link with aria-current", () => {
    render(<BottomNav />);
    const searchLink = screen.getByRole("link", { name: "Search" });
    expect(searchLink).not.toHaveAttribute("aria-current");
  });

  it("links have minimum touch target size", () => {
    render(<BottomNav />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link.className).toContain("min-h-[44px]");
    });
  });
});
