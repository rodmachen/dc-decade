import { tokens } from "../../../shared/design-tokens/tokens";

const { cloud, ...transforms } = tokens.cloudinary;

type TransformKey = keyof typeof transforms;

/**
 * Insert a Cloudinary transform into a coverImageUrl.
 * Cloudinary URLs follow the pattern: .../upload/[transforms]/...
 * This inserts the transform string after "upload/".
 */
export function buildCoverUrl(
  coverImageUrl: string | null | undefined,
  transform: TransformKey = "thumbnail"
): string {
  if (!coverImageUrl) {
    return "/dc-placeholder.png";
  }

  const transformString = transforms[transform];
  return coverImageUrl.replace("/upload/", `/upload/${transformString}/`);
}
