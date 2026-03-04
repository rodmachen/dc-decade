import Image from "next/image";
import Link from "next/link";
import { buildCoverUrl } from "@/lib/cloudinary";

interface IssueCardProps {
  id: number;
  number: string;
  title: string;
  coverImageUrl?: string | null;
}

export function IssueCard({ id, number: issueNumber, title, coverImageUrl }: IssueCardProps) {
  const coverSrc = buildCoverUrl(coverImageUrl, "card");

  return (
    <Link href={`/issue/${id}`} className="block">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-bg-card shadow-md">
        <Image
          src={coverSrc}
          alt={`Issue #${issueNumber}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
        />
      </div>
      <p className="mt-1 text-xs font-medium text-text-primary text-center">#{issueNumber}</p>
      {title && (
        <p className="text-xs text-text-muted text-center truncate">{title}</p>
      )}
    </Link>
  );
}
