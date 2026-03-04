import Image from "next/image";
import { buildCoverUrl } from "@/lib/cloudinary";

interface CoverImageProps {
  coverImageUrl?: string | null;
  alt: string;
}

export function CoverImage({ coverImageUrl, alt }: CoverImageProps) {
  const src = buildCoverUrl(coverImageUrl, "detail");

  return (
    <div className="flex justify-center py-4 bg-primary-dark">
      <div className="relative w-48 h-72 md:w-56 md:h-84 rounded-lg overflow-hidden shadow-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 192px, 224px"
          priority
        />
      </div>
    </div>
  );
}
