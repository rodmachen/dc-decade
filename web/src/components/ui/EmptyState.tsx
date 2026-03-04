export function EmptyState({ message = "Nothing to show." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-text-muted text-sm text-center">{message}</p>
    </div>
  );
}
