"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

export function PixelateImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [pixelSize, setPixelSize] = React.useState(12);
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

  const process = React.useCallback(async (targetFile: File, size: number) => {
    const img = await loadImageFromFile(targetFile);
    const scale = 1 / size;
    const small = document.createElement("canvas");
    small.width = Math.max(1, Math.round(img.width * scale));
    small.height = Math.max(1, Math.round(img.height * scale));
    const smallCtx = small.getContext("2d")!;
    smallCtx.drawImage(img, 0, 0, small.width, small.height);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, canvas.width, canvas.height);

    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, pixelSize);
  }, [file, pixelSize, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-pixelated.png`)}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="pixel-size" className="shrink-0 text-sm text-muted-foreground">
          Pixel size
        </Label>
        <input
          id="pixel-size"
          type="range"
          min={2}
          max={40}
          value={pixelSize}
          onChange={(e) => setPixelSize(Number(e.target.value))}
          disabled={!file}
          className="flex-1"
        />
        <span className="w-10 shrink-0 text-sm tabular-nums">{pixelSize}</span>
      </div>
    </div>
  );
}
