import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { GetCreatorDocument } from "@/generated/graphql";
import { CreatorHeader } from "@/components/creator/CreatorHeader";
import { NameVariants } from "@/components/creator/NameVariants";

async function fetchCreator(id: number) {
  try {
    const { data } = await getClient().query({
      query: GetCreatorDocument,
      variables: { id },
    });
    return data?.creator ?? null;
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
  const creatorId = parseInt(id, 10);
  if (isNaN(creatorId)) return {};
  const creator = await fetchCreator(creatorId);
  if (!creator) return {};
  return { title: `${creator.gcdOfficialName} — The DC Decade` };
}

export default async function CreatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const creatorId = parseInt(id, 10);
  if (isNaN(creatorId)) notFound();

  const creator = await fetchCreator(creatorId);
  if (!creator) notFound();

  return (
    <div>
      <CreatorHeader name={creator.gcdOfficialName} bio={creator.bio} />
      <nav aria-label="Breadcrumb" className="px-4 py-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-primary hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-text-primary">{creator.gcdOfficialName}</span>
      </nav>
      <NameVariants variants={creator.nameDetails} />
    </div>
  );
}
