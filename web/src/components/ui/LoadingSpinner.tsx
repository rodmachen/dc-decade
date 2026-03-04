export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-primary-light border-t-primary rounded-full animate-spin" />
      <p className="mt-3 text-text-muted text-sm">{message}</p>
    </div>
  );
}
