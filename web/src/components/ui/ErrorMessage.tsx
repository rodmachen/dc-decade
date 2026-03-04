export function ErrorMessage({ message = "Something went wrong." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="text-error text-sm text-center">{message}</p>
    </div>
  );
}
