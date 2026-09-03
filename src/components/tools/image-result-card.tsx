"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/image-processing";

interface ImageResultCardProps {
  previewUrl: string | null;
  fileSize?: number | null;
  onDownload: () => void;
  label?: string;
  placeholder?: string;
}

export function ImageResultCard({
  previewUrl,
  fileSize,
  onDownload,
  label = "Result",
  placeholder = "Your result will appear here",
}: ImageResultCardProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div
        className="mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border"
        style={
          previewUrl
            ? {
                backgroundImage:
                  "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
                backgroundSize: "20px 20px",
              }
            : undefined
        }
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Result preview" className="size-full object-contain" />
        ) : (
          <p className="p-6 text-center text-sm text-muted-foreground">{placeholder}</p>
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {fileSize != null ? formatBytes(fileSize) : " "}
        </p>
        <Button type="button" size="sm" onClick={onDownload} disabled={!previewUrl}>
          <Download className="size-3.5" />
          Download
        </Button>
      </div>
    </div>
  );
}
