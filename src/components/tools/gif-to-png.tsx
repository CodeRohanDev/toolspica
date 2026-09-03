"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function GifToPng() {
  return <ImageFormatConverter accept="image/gif" targetMime="image/png" targetExt="png" />;
}
