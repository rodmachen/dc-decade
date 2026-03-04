import { describe, it, expect } from "vitest";
import { buildCoverUrl } from "@/lib/cloudinary";

describe("buildCoverUrl", () => {
  const sampleUrl =
    "https://res.cloudinary.com/dke4phurv/image/upload/v1234/covers/test.jpg";

  it("returns placeholder when coverImageUrl is null", () => {
    expect(buildCoverUrl(null)).toBe("/dc-placeholder.png");
  });

  it("returns placeholder when coverImageUrl is undefined", () => {
    expect(buildCoverUrl(undefined)).toBe("/dc-placeholder.png");
  });

  it("inserts thumbnail transform by default", () => {
    const result = buildCoverUrl(sampleUrl);
    expect(result).toContain("/upload/w_300,h_450,c_fill/");
    expect(result).toContain("covers/test.jpg");
  });

  it("inserts detail transform", () => {
    const result = buildCoverUrl(sampleUrl, "detail");
    expect(result).toContain("/upload/w_600,h_900,c_fill/");
  });

  it("inserts card transform", () => {
    const result = buildCoverUrl(sampleUrl, "card");
    expect(result).toContain("/upload/w_200,h_300,c_fill/");
  });

  it("inserts hero transform", () => {
    const result = buildCoverUrl(sampleUrl, "hero");
    expect(result).toContain("/upload/w_800,h_400,c_fill/");
  });
});
