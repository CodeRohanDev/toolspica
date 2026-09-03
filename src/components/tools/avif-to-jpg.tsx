"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function AvifToJpg() {
  return (
    <ImageFormatConverter
      accept="image/avif"
      targetMime="image/jpeg"
      targetExt="jpg"
      needsBackgroundFill
      showQuality
    />
  );
}
