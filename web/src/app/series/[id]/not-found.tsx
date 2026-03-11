import Image from "next/image";
import Link from "next/link";

export default function SeriesNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 gap-6 text-center">
      <div className="relative w-40 h-60">
        <Image src="/dc-placeholder.png" alt="The DC Decade" fill className="object-contain" sizes="160px" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-text-primary">Series not found</h1>
        <p className="mt-2 text-text-muted text-sm">This series doesn&apos;t exist in the DC Decade.</p>
      </div>
      <Link href="/search" className="px-4 py-2 bg-primary text-text-inverse rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
        Search series
      </Link>
    </div>
  );
}
