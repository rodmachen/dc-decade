import Link from "next/link";

interface IssueHeaderProps {
  seriesId: number;
  seriesName: string;
  number: string;
  publicationDate: string;
  price: string;
  pageCount?: number | null;
}

export function IssueHeader({
  seriesId,
  seriesName,
  number: issueNumber,
  publicationDate,
  price,
  pageCount,
}: IssueHeaderProps) {
  return (
    <div className="px-4 py-4">
      <Link
        href={`/series/${seriesId}`}
        className="text-sm text-primary font-medium hover:underline"
      >
        {seriesName}
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mt-1">
        Issue #{issueNumber}
      </h1>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
        {publicationDate && <span>{publicationDate}</span>}
        {price && <span>{price}</span>}
        {pageCount != null && <span>{pageCount} pages</span>}
      </div>
    </div>
  );
}
