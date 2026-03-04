import Link from "next/link";

interface CreatorResultProps {
  id: number;
  name: string;
}

export function CreatorResult({ id, name }: CreatorResultProps) {
  return (
    <Link
      href={`/creator/${id}`}
      className="flex items-center gap-3 px-4 py-3 min-h-[44px] border-b border-border-light active:bg-border-light"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-text-primary truncate">{name}</h3>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-text-muted flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}
