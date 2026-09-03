"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import {
  loadImageFromFile,
  canvasToBlob,
  downloadBlob,
  formatBytes,
  stripExtension,
} from "@/lib/image-processing";

interface ImageFormatConverterProps {
  accept: string;
  targetMime: string;
  targetExt: string;
  needsBackgroundFill?: boolean;
  showQuality?: boolean;
}

export function ImageFormatConverter({
  accept,
  targetMime,
  targetExt,
  needsBackgroundFill,
  showQuality,
}: ImageFormatConverterProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [quality, setQuality] = React.useState(0.92);
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
  }

  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  const process = React.useCallback(
    async (targetFile: File) => {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (needsBackgroundFill) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, targetMime, showQuality ? quality : undefined);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    },
    [needsBackgroundFill, bgColor, targetMime, showQuality, quality]
  );

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard
          file={file}
          previewUrl={originalUrl}
          onFileSelect={handleFile}
          onClear={clear}
          accept={accept}
        />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob &&
            file &&
            downloadBlob(resultBlob, `${stripExtension(file.name)}.${targetExt}`)
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {needsBackgroundFill && (
          <div className="flex items-center gap-2">
            <Label htmlFor="bg-color" className="text-sm text-muted-foreground">
              Background (for transparent areas)
            </Label>
            <input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
          </div>
        )}
        {showQuality && (
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="quality" className="shrink-0 text-sm text-muted-foreground">
              Quality
            </Label>
            <input
              id="quality"
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 shrink-0 text-sm tabular-nums">
              {Math.round(quality * 100)}%
            </span>
          </div>
        )}
      </div>

      {file && resultBlob && (
        <p className="mt-3 text-xs text-muted-foreground">
          {formatBytes(file.size)} → {formatBytes(resultBlob.size)}
        </p>
      )}
    </div>
  );
}
