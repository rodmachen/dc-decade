import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

describe("ErrorMessage", () => {
  it("renders default message", () => {
    render(<ErrorMessage />);
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<ErrorMessage message="Network error" />);
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });
});
