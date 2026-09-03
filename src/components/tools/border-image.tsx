"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

export function BorderImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [width, setWidth] = React.useState(20);
  const [color, setColor] = React.useState("#ffffff");
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

  const process = React.useCallback(async (targetFile: File, borderWidth: number, borderColor: string) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width + borderWidth * 2;
    canvas.height = img.height + borderWidth * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, borderWidth, borderWidth);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, width, color);
  }, [file, width, color, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-bordered.png`)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="border-width" className="shrink-0 text-sm text-muted-foreground">
            Border width
          </Label>
          <input
            id="border-width"
            type="range"
            min={2}
            max={100}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            disabled={!file}
            className="flex-1"
          />
          <span className="w-12 shrink-0 text-sm tabular-nums">{width}px</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="border-color" className="text-sm text-muted-foreground">
            Color
          </Label>
          <input
            id="border-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="size-8 cursor-pointer rounded border"
          />
        </div>
      </div>
    </div>
  );
}
