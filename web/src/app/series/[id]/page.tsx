import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GetSeriesDocument } from "@/generated/graphql";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { IssueList } from "@/components/series/IssueList";

async function fetchSeries(id: number) {
  try {
    const { data } = await getClient().query({
      query: GetSeriesDocument,
      variables: { id },
    });
    return data?.series ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seriesId = parseInt(id, 10);
  if (isNaN(seriesId)) return {};
  const series = await fetchSeries(seriesId);
  if (!series) return {};
  return { title: `${series.name} — The DC Decade` };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seriesId = parseInt(id, 10);
  if (isNaN(seriesId)) notFound();

  const series = await fetchSeries(seriesId);
  if (!series) notFound();

  return (
    <div>
      <SeriesHeader
        name={series.name}
        publisherName={series.publisher.name}
        yearBegan={series.yearBegan}
        yearEnded={series.yearEnded}
        format={series.format}
        issueCount={series.issueCount}
      />
      <nav aria-label="Breadcrumb" className="px-4 py-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-text-primary">{series.name}</span>
      </nav>
      <IssueList issues={series.issues} />
    </div>
  );
}
