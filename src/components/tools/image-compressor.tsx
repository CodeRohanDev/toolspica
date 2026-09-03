"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import {
  loadImageFromFile,
  canvasToBlob,
  downloadBlob,
  formatBytes,
  stripExtension,
} from "@/lib/image-processing";

export function ImageCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [format, setFormat] = React.useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [quality, setQuality] = React.useState(0.7);
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

  const process = React.useCallback(async (targetFile: File, fmt: string, q: number) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    if (fmt === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, fmt, q);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, format, quality);
  }, [file, format, quality, process]);

  const savings =
    file && resultBlob && file.size > 0
      ? Math.round((1 - resultBlob.size / file.size) * 100)
      : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob &&
            file &&
            downloadBlob(
              resultBlob,
              `${stripExtension(file.name)}-compressed.${format === "image/jpeg" ? "jpg" : "webp"}`
            )
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Output format</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v as "image/jpeg" | "image/webp")}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="compress-quality" className="shrink-0 text-sm text-muted-foreground">
            Quality
          </Label>
          <input
            id="compress-quality"
            type="range"
            min={0.1}
            max={1}
            step={0.01}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            disabled={!file}
            className="flex-1"
          />
          <span className="w-10 shrink-0 text-sm tabular-nums">{Math.round(quality * 100)}%</span>
        </div>
      </div>

      {file && resultBlob && (
        <p className="mt-3 text-xs text-muted-foreground">
          {formatBytes(file.size)} → {formatBytes(resultBlob.size)}
          {savings !== null && savings > 0 && ` (${savings}% smaller)`}
        </p>
      )}
    </div>
  );
}
