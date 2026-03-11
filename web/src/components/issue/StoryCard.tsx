interface Credit {
  id: number;
  creditType: { name: string };
  creatorNameDetail: { name: string };
}

interface StoryCardProps {
  title: string;
  feature: string;
  typeName: string;
  sequenceNumber: number;
  credits?: Credit[];
}

const TYPE_LABELS: Record<string, string> = {
  "comic story": "story",
  "cover": "cover",
  "letters page": "letters",
  "advertisement": "ad",
  "introduction": "intro",
  "pinup": "pin-up",
};

function typeBadge(typeName: string) {
  return TYPE_LABELS[typeName.toLowerCase()] ?? typeName;
}

export function StoryCard({ title, feature, typeName, sequenceNumber, credits = [] }: StoryCardProps) {
  const displayTitle = title || feature || "Untitled";
  const badge = typeBadge(typeName);

  // Group credits by role
  const creditsByRole: Record<string, string[]> = {};
  for (const c of credits) {
    const role = c.creditType.name;
    if (!creditsByRole[role]) creditsByRole[role] = [];
    creditsByRole[role].push(c.creatorNameDetail.name);
  }

  return (
    <article className="px-4 py-3 border-b border-border-light">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-primary text-text-inverse flex-shrink-0">
          {badge}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-text-primary">{displayTitle}</h3>
          {Object.entries(creditsByRole).map(([role, names]) => (
            <p key={role} className="text-xs text-text-muted mt-0.5">
              <span className="font-medium">{role}:</span> {names.join(", ")}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
