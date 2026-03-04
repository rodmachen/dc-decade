interface SeriesHeaderProps {
  name: string;
  publisherName: string;
  yearBegan: number;
  yearEnded?: number | null;
  format: string;
  issueCount: number;
}

export function SeriesHeader({
  name,
  publisherName,
  yearBegan,
  yearEnded,
  format,
  issueCount,
}: SeriesHeaderProps) {
  const yearRange = yearEnded ? `${yearBegan}–${yearEnded}` : `${yearBegan}–`;

  return (
    <div className="bg-primary-dark px-4 py-6">
      <h1 className="text-2xl font-bold text-text-inverse">{name}</h1>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-inverse opacity-80">
        <span>{publisherName}</span>
        <span>{yearRange}</span>
        {format && <span>{format}</span>}
        <span>{issueCount} issues</span>
      </div>
    </div>
  );
}
