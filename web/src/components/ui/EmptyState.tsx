import Image from "next/image";

interface EmptyStateProps {
  message?: string;
  branded?: boolean;
  suggestion?: string;
}

export function EmptyState({
  message = "Nothing to show.",
  branded = false,
  suggestion,
}: EmptyStateProps) {
  if (branded) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 gap-4">
        <div className="relative w-32 h-32">
          <Image
            src="/app-tile.png"
            alt="The DC Decade"
            fill
            className="object-contain opacity-40"
            sizes="128px"
          />
        </div>
        <p className="text-text-secondary text-base text-center font-medium">{message}</p>
        {suggestion && (
          <p className="text-text-muted text-sm text-center">{suggestion}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-text-muted text-sm text-center">{message}</p>
    </div>
  );
}
