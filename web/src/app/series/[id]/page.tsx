import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GetSeriesDocument } from "@/generated/graphql";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { IssueList } from "@/components/series/IssueList";

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seriesId = parseInt(id, 10);
  if (isNaN(seriesId)) notFound();

  const client = getClient();
  const { data } = await client.query({
    query: GetSeriesDocument,
    variables: { id: seriesId },
  });

  const series = data?.series;
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
      <IssueList issues={series.issues} />
    </div>
  );
}
