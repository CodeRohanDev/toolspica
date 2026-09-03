"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function JpgToWebp() {
  return (
    <ImageFormatConverter
      accept="image/jpeg"
      targetMime="image/webp"
      targetExt="webp"
      showQuality
    />
  );
}
