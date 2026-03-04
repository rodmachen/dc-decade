import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GetIssueDocument } from "@/generated/graphql";
import { CoverImage } from "@/components/issue/CoverImage";
import { IssueHeader } from "@/components/issue/IssueHeader";
import { StoryList } from "@/components/issue/StoryList";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) notFound();

  const client = getClient();
  const { data } = await client.query({
    query: GetIssueDocument,
    variables: { id: issueId },
  });

  const issue = data?.issue;
  if (!issue) notFound();

  return (
    <div>
      <CoverImage
        coverImageUrl={issue.coverImageUrl}
        alt={`${issue.series.name} #${issue.number}`}
      />
      <IssueHeader
        seriesId={issue.series.id}
        seriesName={issue.series.name}
        number={issue.number}
        publicationDate={issue.publicationDate}
        price={issue.price}
        pageCount={issue.pageCount}
      />
      <StoryList stories={issue.stories} />
    </div>
  );
}
