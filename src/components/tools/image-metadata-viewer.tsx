"use client";

import * as React from "react";
import { ImagePlus } from "lucide-react";
import { readImageMetadata, type ImageMetadata } from "@/lib/exif-parser";
import { formatBytes } from "@/lib/image-processing";

const FRIENDLY_LABELS: Record<string, string> = {
  Make: "Camera make",
  Model: "Camera model",
  Orientation: "Orientation",
  XResolution: "Horizontal resolution (DPI)",
  YResolution: "Vertical resolution (DPI)",
  DateTime: "Date taken",
  ExposureTime: "Exposure time",
  FNumber: "Aperture (f-number)",
  ISOSpeedRatings: "ISO speed",
  FocalLength: "Focal length (mm)",
  Software: "Software",
};

export function ImageMetadataViewer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [metadata, setMetadata] = React.useState<ImageMetadata | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setMetadata(await readImageMetadata(picked));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 p-6 text-center hover:border-brand/50"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-muted">
          <ImagePlus className="size-5 text-muted-foreground" />
        </span>
        <p className="text-sm font-medium">Click to choose an image (JPEG or PNG)</p>
        <p className="text-xs text-muted-foreground">Read entirely in your browser — never uploaded</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {metadata && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="rounded-lg border object-contain" />
          )}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "File type", value: metadata.fileType },
                { label: "File size", value: formatBytes(metadata.fileSize) },
                { label: "Dimensions", value: metadata.width ? `${metadata.width} × ${metadata.height}px` : "Unknown" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border bg-card p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            {metadata.exif && Object.keys(metadata.exif).length > 0 ? (
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  EXIF data
                </p>
                <div className="mt-1.5 space-y-1">
                  {Object.entries(metadata.exif).map(([key, value]) => (
                    <p key={key} className="text-sm">
                      <span className="text-muted-foreground">{FRIENDLY_LABELS[key] ?? key}: </span>
                      <span className="font-medium">{String(value)}</span>
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                No EXIF metadata found in this file.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
