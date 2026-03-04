import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo-client";
import { GetCreatorDocument } from "@/generated/graphql";
import { CreatorHeader } from "@/components/creator/CreatorHeader";
import { NameVariants } from "@/components/creator/NameVariants";

export default async function CreatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const creatorId = parseInt(id, 10);
  if (isNaN(creatorId)) notFound();

  const client = getClient();
  const { data } = await client.query({
    query: GetCreatorDocument,
    variables: { id: creatorId },
  });

  const creator = data?.creator;
  if (!creator) notFound();

  return (
    <div>
      <CreatorHeader name={creator.gcdOfficialName} bio={creator.bio} />
      <NameVariants variants={creator.nameDetails} />
    </div>
  );
}
