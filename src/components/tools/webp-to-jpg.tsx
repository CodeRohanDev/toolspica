"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function WebpToJpg() {
  return (
    <ImageFormatConverter
      accept="image/webp"
      targetMime="image/jpeg"
      targetExt="jpg"
      needsBackgroundFill
      showQuality
    />
  );
}
