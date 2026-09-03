"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

export function RoundedCornersImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [radius, setRadius] = React.useState(24);
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

  const process = React.useCallback(async (targetFile: File, r: number) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    const clampedRadius = Math.min(r, img.width / 2, img.height / 2);
    ctx.beginPath();
    ctx.moveTo(clampedRadius, 0);
    ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, clampedRadius);
    ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, clampedRadius);
    ctx.arcTo(0, canvas.height, 0, 0, clampedRadius);
    ctx.arcTo(0, 0, canvas.width, 0, clampedRadius);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, radius);
  }, [file, radius, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-rounded.png`)}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="radius" className="shrink-0 text-sm text-muted-foreground">
          Corner radius
        </Label>
        <input
          id="radius"
          type="range"
          min={0}
          max={200}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          disabled={!file}
          className="flex-1"
        />
        <span className="w-14 shrink-0 text-sm tabular-nums">{radius}px</span>
      </div>
    </div>
  );
}
