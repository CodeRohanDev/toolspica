"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function BmpToJpg() {
  return (
    <ImageFormatConverter
      accept="image/bmp"
      targetMime="image/jpeg"
      targetExt="jpg"
      showQuality
    />
  );
}
