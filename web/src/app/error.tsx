"use client";

import Image from "next/image";
import Link from "next/link";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 gap-6 text-center">
      <div className="relative w-32 h-32">
        <Image src="/app-tile.png" alt="The DC Decade" fill className="object-contain opacity-50" sizes="128px" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-text-primary">Something went wrong</h1>
        <p className="mt-2 text-text-muted text-sm">{error.message || "An unexpected error occurred."}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-border-light transition-colors">
          Go home
        </Link>
      </div>
    </div>
  );
}
