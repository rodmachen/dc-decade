import Image from "next/image";
import { buildCoverUrl } from "@/lib/cloudinary";

interface CoverImageProps {
  coverImageUrl?: string | null;
  alt: string;
}

export function CoverImage({ coverImageUrl, alt }: CoverImageProps) {
  const src = buildCoverUrl(coverImageUrl, "detail");

  return (
    <div className="flex justify-center py-6 bg-gradient-to-b from-primary-dark to-primary">
      <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 256px, 256px"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
