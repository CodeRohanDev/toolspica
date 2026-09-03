"use client";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";

export function SvgToPng() {
  return <ImageFormatConverter accept="image/svg+xml" targetMime="image/png" targetExt="png" />;
}
