interface StoryCardProps {
  title: string;
  feature: string;
  typeName: string;
  sequenceNumber: number;
}

export function StoryCard({ title, feature, typeName, sequenceNumber }: StoryCardProps) {
  return (
    <div className="px-4 py-3 border-b border-border-light">
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-text-muted font-mono">{sequenceNumber}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-text-primary">
            {title || feature || "Untitled"}
          </h3>
          <p className="text-xs text-text-muted">{typeName}</p>
        </div>
      </div>
    </div>
  );
}
