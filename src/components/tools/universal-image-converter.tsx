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

const FORMATS = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/jpeg", label: "JPEG", ext: "jpg" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

export function UniversalImageConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [format, setFormat] = React.useState("image/jpeg");
  const [quality, setQuality] = React.useState(0.92);
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setError(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  const process = React.useCallback(async (targetFile: File) => {
    try {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (format === "image/jpeg") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, format, format === "image/png" ? undefined : quality);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("Couldn't convert this file — the format may not be supported by your browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, quality, bgColor]);

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  const targetExt = FORMATS.find((f) => f.value === format)?.ext ?? "png";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard
          file={file}
          previewUrl={originalUrl}
          onFileSelect={handleFile}
          onClear={clear}
        />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}.${targetExt}`)
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Convert to</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {format === "image/jpeg" && (
          <div className="flex items-center gap-2">
            <Label htmlFor="ic-bg" className="text-sm text-muted-foreground">
              Background
            </Label>
            <input
              id="ic-bg"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
          </div>
        )}
        {format !== "image/png" && (
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="ic-quality" className="shrink-0 text-sm text-muted-foreground">
              Quality
            </Label>
            <input
              id="ic-quality"
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 shrink-0 text-sm tabular-nums">{Math.round(quality * 100)}%</span>
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {file && resultBlob && (
        <p className="mt-3 text-xs text-muted-foreground">
          {formatBytes(file.size)} → {formatBytes(resultBlob.size)}
        </p>
      )}
    </div>
  );
}
