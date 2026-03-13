import Image from "next/image";
import Link from "next/link";
import { buildCoverUrl } from "@/lib/cloudinary";

interface IssueCardProps {
  id: number;
  number: string;
  title: string;
  seriesName?: string;
  coverImageUrl?: string | null;
}

export function IssueCard({ id, number: issueNumber, title, seriesName, coverImageUrl }: IssueCardProps) {
  const coverSrc = buildCoverUrl(coverImageUrl, "card");
  const altText = seriesName
    ? `Cover of ${seriesName} #${issueNumber}`
    : `Issue #${issueNumber}`;

  return (
    <Link href={`/issue/${id}`} className="block group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-bg-card shadow-md transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-primary">
        <Image
          src={coverSrc}
          alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
          loading="lazy"
          unoptimized
        />
      </div>
      <p className="mt-1 text-xs font-medium text-text-primary text-center">#{issueNumber}</p>
      {title && (
        <p className="text-xs text-text-muted text-center truncate">{title}</p>
      )}
    </Link>
  );
}
