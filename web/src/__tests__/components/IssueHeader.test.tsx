import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IssueHeader } from "@/components/issue/IssueHeader";

describe("IssueHeader", () => {
  const props = {
    seriesId: 2973,
    seriesName: "Crisis on Infinite Earths",
    number: "7",
    publicationDate: "October 1985",
    price: "1.25 USD",
    pageCount: 36,
  };

  it("renders issue number", () => {
    render(<IssueHeader {...props} />);
    expect(screen.getByText("Issue #7")).toBeInTheDocument();
  });

  it("renders series name as link", () => {
    render(<IssueHeader {...props} />);
    const link = screen.getByText("Crisis on Infinite Earths");
    expect(link.closest("a")).toHaveAttribute("href", "/series/2973");
  });

  it("renders publication date", () => {
    render(<IssueHeader {...props} />);
    expect(screen.getByText("October 1985")).toBeInTheDocument();
  });

  it("renders price", () => {
    render(<IssueHeader {...props} />);
    expect(screen.getByText("1.25 USD")).toBeInTheDocument();
  });

  it("renders page count", () => {
    render(<IssueHeader {...props} />);
    expect(screen.getByText("36 pages")).toBeInTheDocument();
  });
});
