import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GetIssueDocument } from "@/generated/graphql";
import { CoverImage } from "@/components/issue/CoverImage";
import { IssueHeader } from "@/components/issue/IssueHeader";
import { StoryList } from "@/components/issue/StoryList";

async function fetchIssue(id: number) {
  try {
    const { data } = await getClient().query({
      query: GetIssueDocument,
      variables: { id },
    });
    return data?.issue ?? null;
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
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) return {};
  const issue = await fetchIssue(issueId);
  if (!issue) return {};
  return { title: `${issue.series.name} #${issue.number} — The DC Decade` };
}

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issueId = parseInt(id, 10);
  if (isNaN(issueId)) notFound();

  const issue = await fetchIssue(issueId);
  if (!issue) notFound();

  return (
    <div>
      <CoverImage
        coverImageUrl={issue.coverImageUrl}
        alt={`Cover of ${issue.series.name} #${issue.number}`}
      />
      <div className="px-4 pt-2 pb-1 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link href={`/series/${issue.series.id}`} className="hover:text-primary hover:underline">
          {issue.series.name}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-text-primary">Issue #{issue.number}</span>
      </div>
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
