"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function JpgToPng() {
  return (
    <ImageFormatConverter accept="image/jpeg" targetMime="image/png" targetExt="png" />
  );
}
