import Image from "next/image";
import Link from "next/link";
import { buildCoverUrl } from "@/lib/cloudinary";

interface SeriesCardProps {
  id: number;
  name: string;
  yearBegan: number;
  yearEnded?: number | null;
  coverImageUrl?: string | null;
}

export function SeriesCard({
  id,
  name,
  yearBegan,
  yearEnded,
  coverImageUrl,
}: SeriesCardProps) {
  const coverSrc = buildCoverUrl(coverImageUrl, "card");
  const yearRange = yearEnded ? `${yearBegan}–${yearEnded}` : `${yearBegan}–`;

  return (
    <Link
      href={`/series/${id}`}
      className="flex-shrink-0 w-36 scroll-snap-start"
    >
      <div className="relative w-36 h-52 rounded-lg overflow-hidden bg-bg-card shadow-md">
        <Image
          src={coverSrc}
          alt={`${name} cover`}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>
      <h3 className="mt-2 text-sm font-medium text-text-primary leading-tight line-clamp-2">
        {name}
      </h3>
      <p className="text-xs text-text-muted">{yearRange}</p>
    </Link>
  );
}
