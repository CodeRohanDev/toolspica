"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function PngToJpg() {
  return (
    <ImageFormatConverter
      accept="image/png"
      targetMime="image/jpeg"
      targetExt="jpg"
      needsBackgroundFill
      showQuality
    />
  );
}
