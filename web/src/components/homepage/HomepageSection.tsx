import { getClient } from "@/lib/apollo-client";
import { GetSeriesWithCoverDocument, type GetSeriesWithCoverQuery } from "@/generated/graphql";
import { SeriesCard } from "./SeriesCard";
import type { ApolloQueryResult } from "@apollo/client";

interface HomepageSectionProps {
  title: string;
  subtitle: string;
  seriesIds: number[];
}

export async function HomepageSection({
  title,
  subtitle,
  seriesIds,
}: HomepageSectionProps) {
  const client = getClient();

  const results = await Promise.allSettled(
    seriesIds.map((id) =>
      client.query<GetSeriesWithCoverQuery>({
        query: GetSeriesWithCoverDocument,
        variables: { id },
      })
    )
  );

  const seriesList = results
    .filter(
      (r): r is PromiseFulfilledResult<ApolloQueryResult<GetSeriesWithCoverQuery>> =>
        r.status === "fulfilled" && r.value.data?.series != null
    )
    .map((r) => r.value.data.series!);

  if (seriesList.length === 0) return null;

  return (
    <section className="py-4">
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
      <div className="flex gap-3 px-4 overflow-x-auto scroll-snap-x no-scrollbar">
        {seriesList.map((series) => (
          <SeriesCard
            key={series.id}
            id={series.id}
            name={series.name}
            yearBegan={series.yearBegan}
            yearEnded={series.yearEnded}
            coverImageUrl={series.issues?.[0]?.coverImageUrl}
          />
        ))}
      </div>
    </section>
  );
}
