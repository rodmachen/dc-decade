import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NameVariants } from "@/components/creator/NameVariants";

describe("NameVariants", () => {
  it("renders nothing when variants is empty", () => {
    const { container } = render(<NameVariants variants={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders variant names", () => {
    const variants = [
      { id: 1, name: "George Pérez", isOfficialName: true },
      { id: 2, name: "George Perez", isOfficialName: false },
    ];
    render(<NameVariants variants={variants} />);
    expect(screen.getByText("George Pérez")).toBeInTheDocument();
    expect(screen.getByText("George Perez")).toBeInTheDocument();
  });

  it("shows Official badge for official names", () => {
    const variants = [{ id: 1, name: "George Pérez", isOfficialName: true }];
    render(<NameVariants variants={variants} />);
    expect(screen.getByText("Official")).toBeInTheDocument();
  });
});
