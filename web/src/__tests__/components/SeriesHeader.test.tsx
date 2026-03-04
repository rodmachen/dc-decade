import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SeriesHeader } from "@/components/series/SeriesHeader";

describe("SeriesHeader", () => {
  const props = {
    name: "Crisis on Infinite Earths",
    publisherName: "DC Comics",
    yearBegan: 1985,
    yearEnded: 1986,
    format: "Limited Series",
    issueCount: 12,
  };

  it("renders series name", () => {
    render(<SeriesHeader {...props} />);
    expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
  });

  it("renders publisher name", () => {
    render(<SeriesHeader {...props} />);
    expect(screen.getByText("DC Comics")).toBeInTheDocument();
  });

  it("renders year range", () => {
    render(<SeriesHeader {...props} />);
    expect(screen.getByText("1985–1986")).toBeInTheDocument();
  });

  it("renders issue count", () => {
    render(<SeriesHeader {...props} />);
    expect(screen.getByText("12 issues")).toBeInTheDocument();
  });
});
