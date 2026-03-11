import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { graphql, HttpResponse } from "msw";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import SearchPage from "@/app/search/page";

const API_URL = "https://comics-n-stuff-gql-production.up.railway.app/graphql";

const handlers = [
  graphql.query("SearchSeries", () => {
    return HttpResponse.json({
      data: {
        allSeries: {
          items: [
            {
              __typename: "Series",
              id: 2973,
              name: "Crisis on Infinite Earths",
              yearBegan: 1985,
              yearEnded: 1986,
              issueCount: 12,
              publisher: { __typename: "Publisher", id: 1, name: "DC Comics" },
            },
          ],
          totalCount: 1,
        },
      },
    });
  }),
  graphql.query("SearchCreators", () => {
    return HttpResponse.json({
      data: {
        creators: {
          items: [
            {
              __typename: "Creator",
              id: 4842,
              gcdOfficialName: "George Pérez",
              sortName: "Pérez, George",
            },
          ],
          totalCount: 1,
        },
      },
    });
  }),
  graphql.query("SearchIssues", () => {
    return HttpResponse.json({
      data: {
        searchIssues: {
          items: [
            {
              __typename: "Issue",
              id: 100,
              number: "1",
              title: "The Summoning",
              coverImageUrl: null,
              series: { __typename: "Series", id: 2973, name: "Crisis on Infinite Earths" },
            },
          ],
          totalCount: 1,
        },
      },
    });
  }),
];

const server = setupServer(...handlers);

function makeTestClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: API_URL }),
  });
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={makeTestClient()}>{children}</ApolloProvider>;
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Search Page Integration", () => {
  it("renders search heading and tabs", () => {
    render(<SearchPage />, { wrapper: Wrapper });
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Series")).toBeInTheDocument();
    expect(screen.getByText("Creators")).toBeInTheDocument();
    expect(screen.getByText("Issues")).toBeInTheDocument();
  });

  it("shows branded empty state before typing", () => {
    render(<SearchPage />, { wrapper: Wrapper });
    expect(screen.getByText("Search DC Decade")).toBeInTheDocument();
  });

  it("searches series and shows results", async () => {
    render(<SearchPage />, { wrapper: Wrapper });
    const input = screen.getByPlaceholderText("Search series...");
    fireEvent.change(input, { target: { value: "Crisis" } });

    await waitFor(() => {
      expect(screen.getByText("Crisis on Infinite Earths")).toBeInTheDocument();
    });
  });

  it("switches to creators tab and searches", async () => {
    render(<SearchPage />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Creators"));

    const input = screen.getByPlaceholderText("Search creators...");
    fireEvent.change(input, { target: { value: "Perez" } });

    await waitFor(() => {
      expect(screen.getByText("George Pérez")).toBeInTheDocument();
    });
  });
});
