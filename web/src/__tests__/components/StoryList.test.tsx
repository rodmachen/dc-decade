import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StoryList } from "@/components/issue/StoryList";

describe("StoryList", () => {
  it("renders nothing when stories is empty", () => {
    const { container } = render(<StoryList stories={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders stories heading", () => {
    const stories = [
      { id: 1, title: "Crisis", feature: "", sequenceNumber: 0, type: { name: "story" } },
    ];
    render(<StoryList stories={stories} />);
    expect(screen.getByText("Stories")).toBeInTheDocument();
  });

  it("renders story titles", () => {
    const stories = [
      { id: 1, title: "Beyond the Silent Night", feature: "", sequenceNumber: 0, type: { name: "story" } },
      { id: 2, title: "", feature: "Superman", sequenceNumber: 1, type: { name: "cover" } },
    ];
    render(<StoryList stories={stories} />);
    expect(screen.getByText("Beyond the Silent Night")).toBeInTheDocument();
    expect(screen.getByText("Superman")).toBeInTheDocument();
  });
});
