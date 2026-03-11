"use client";

import Link from "next/link";

export default function CreatorError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 gap-4 text-center">
      <h1 className="text-xl font-bold text-text-primary">Could not load creator</h1>
      <p className="text-text-muted text-sm">There was a problem loading this creator.</p>
      <div className="flex gap-3">
        <button onClick={reset} className="px-4 py-2 bg-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          Try again
        </button>
        <Link href="/" className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-border-light transition-colors">
          Go home
        </Link>
      </div>
    </div>
  );
}
