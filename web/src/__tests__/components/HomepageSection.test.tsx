import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { GetSeriesWithCoverQuery } from "@/generated/graphql";

vi.mock("@/lib/apollo-client", () => ({
  getClient: vi.fn(),
}));

import { getClient } from "@/lib/apollo-client";
import { HomepageSection } from "@/components/homepage/HomepageSection";

function makeSeriesData(
  slug: string,
  id: number,
  name: string
): GetSeriesWithCoverQuery {
  return {
    seriesBySlug: {
      __typename: "Series",
      id,
      name,
      slug,
      yearBegan: 1985,
      yearEnded: 1986,
      issueCount: 12,
      publisher: { __typename: "Publisher", id: 1, name: "DC Comics" },
      issues: [{ __typename: "Issue", id: 100, coverImageUrl: null }],
    },
  };
}

describe("HomepageSection", () => {
  beforeEach(() => {
    const mockClient = {
      query: vi.fn().mockImplementation(({ variables }: { variables: { slug: string; offset?: number } }) => {
        const { slug } = variables;
        if (slug === "crisis-on-infinite-earths-1985") {
          return Promise.resolve({ data: makeSeriesData(slug, 2973, "Crisis on Infinite Earths") });
        }
        if (slug === "watchmen-1986") {
          return Promise.resolve({ data: makeSeriesData(slug, 3172, "Watchmen") });
        }
        return Promise.resolve({ data: { seriesBySlug: null } });
      }),
    };
    vi.mocked(getClient).mockReturnValue(mockClient as ReturnType<typeof getClient>);
  });

  it("renders section title and subtitle", async () => {
    const element = await HomepageSection({
      title: "The Dark Knight Era",
      subtitle: "Grim, gritty, and groundbreaking",
      series: [{ slug: "crisis-on-infinite-earths-1985" }, { slug: "watchmen-1986" }],
    });
    render(element!);
    expect(screen.getByText("The Dark Knight Era")).toBeInTheDocument();
    expect(screen.getByText("Grim, gritty, and groundbreaking")).toBeInTheDocument();
  });

  it("renders a card for each resolved slug", async () => {
    const element = await HomepageSection({
      title: "Test Section",
      subtitle: "Test subtitle",
      series: [{ slug: "crisis-on-infinite-earths-1985" }, { slug: "watchmen-1986" }],
    });
    render(element!);
    expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
    expect(screen.getByText("Watchmen")).toBeInTheDocument();
  });

  it("returns null when all slugs fail to resolve", async () => {
    const element = await HomepageSection({
      title: "Test Section",
      subtitle: "Test subtitle",
      series: [{ slug: "nonexistent-slug" }],
    });
    expect(element).toBeNull();
  });

  it("renders only resolved series when some slugs return null", async () => {
    const element = await HomepageSection({
      title: "Test Section",
      subtitle: "Test subtitle",
      series: [{ slug: "crisis-on-infinite-earths-1985" }, { slug: "nonexistent-slug" }],
    });
    render(element!);
    expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
    expect(screen.queryByText("Watchmen")).not.toBeInTheDocument();
  });

  it("renders only resolved series when a query rejects", async () => {
    vi.mocked(getClient).mockReturnValue({
      query: vi.fn().mockImplementation(({ variables }: { variables: { slug: string; offset?: number } }) => {
        if (variables.slug === "watchmen-1986") return Promise.reject(new Error("Network error"));
        return Promise.resolve({ data: makeSeriesData(variables.slug, 2973, "Crisis on Infinite Earths") });
      }),
    } as ReturnType<typeof getClient>);

    const element = await HomepageSection({
      title: "Test Section",
      subtitle: "Test subtitle",
      series: [{ slug: "crisis-on-infinite-earths-1985" }, { slug: "watchmen-1986" }],
    });
    render(element!);
    expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
    expect(screen.queryByText("Watchmen")).not.toBeInTheDocument();
  });
});
