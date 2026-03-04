"use client";

import { useState } from "react";
import { useSearchSeriesQuery, useSearchCreatorsQuery, useSearchIssuesQuery } from "@/generated/graphql";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchTabs, type SearchTab } from "@/components/search/SearchTabs";
import { SeriesResult } from "@/components/search/SeriesResult";
import { CreatorResult } from "@/components/search/CreatorResult";
import { IssueResult } from "@/components/search/IssueResult";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  const [tab, setTab] = useState<SearchTab>("series");

  return (
    <div>
      <div className="bg-primary-dark pt-3 pb-1">
        <h1 className="text-lg font-bold text-text-inverse text-center mb-2">Search</h1>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={tab === "issues" ? "Series name..." : `Search ${tab}...`}
        />
        {tab === "issues" && (
          <SearchBar
            value={issueNumber}
            onChange={setIssueNumber}
            placeholder="Issue number..."
          />
        )}
      </div>
      <SearchTabs active={tab} onChange={setTab} />

      <div className="mt-2">
        {tab === "series" && <SeriesResults query={query} />}
        {tab === "creators" && <CreatorResults query={query} />}
        {tab === "issues" && <IssueResults query={query} issueNumber={issueNumber} />}
      </div>
    </div>
  );
}

function SeriesResults({ query }: { query: string }) {
  const { data, loading, error } = useSearchSeriesQuery({
    variables: { search: query, limit: 20 },
    skip: query.length < 2,
  });

  if (query.length < 2) return <EmptyState message="Type at least 2 characters to search." />;
  if (loading) return <LoadingSpinner message="Searching series..." />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.allSeries.items.length) return <EmptyState message="No series found." />;

  return (
    <div>
      {data.allSeries.items.map((s) => (
        <SeriesResult
          key={s.id}
          id={s.id}
          name={s.name}
          yearBegan={s.yearBegan}
          yearEnded={s.yearEnded}
          issueCount={s.issueCount}
          publisherName={s.publisher.name}
        />
      ))}
    </div>
  );
}

function CreatorResults({ query }: { query: string }) {
  const { data, loading, error } = useSearchCreatorsQuery({
    variables: { search: query, limit: 20 },
    skip: query.length < 2,
  });

  if (query.length < 2) return <EmptyState message="Type at least 2 characters to search." />;
  if (loading) return <LoadingSpinner message="Searching creators..." />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.creators.items.length) return <EmptyState message="No creators found." />;

  return (
    <div>
      {data.creators.items.map((c) => (
        <CreatorResult key={c.id} id={c.id} name={c.gcdOfficialName} />
      ))}
    </div>
  );
}

function IssueResults({ query, issueNumber }: { query: string; issueNumber: string }) {
  const { data, loading, error } = useSearchIssuesQuery({
    variables: { search: query, issueNumber, limit: 20 },
    skip: query.length < 2 || issueNumber.length < 1,
  });

  if (query.length < 2 || issueNumber.length < 1) {
    return <EmptyState message="Enter a series name and issue number to search." />;
  }
  if (loading) return <LoadingSpinner message="Searching issues..." />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.searchIssues.items.length) return <EmptyState message="No issues found." />;

  return (
    <div>
      {data.searchIssues.items.map((i) => (
        <IssueResult
          key={i.id}
          id={i.id}
          number={i.number}
          title={i.title}
          seriesName={i.series.name}
          coverImageUrl={i.coverImageUrl}
        />
      ))}
    </div>
  );
}
