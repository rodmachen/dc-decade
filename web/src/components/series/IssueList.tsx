import { IssueCard } from "./IssueCard";

interface Issue {
  id: number;
  number: string;
  title: string;
  coverImageUrl?: string | null;
}

interface IssueListProps {
  issues: Issue[];
}

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return <p className="text-text-muted text-sm text-center py-8">No issues found.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 px-4 py-4">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          id={issue.id}
          number={issue.number}
          title={issue.title}
          coverImageUrl={issue.coverImageUrl}
        />
      ))}
    </div>
  );
}
