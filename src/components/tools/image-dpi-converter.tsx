"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { setImageDpi } from "@/lib/image-dpi";

const PRESETS = [72, 96, 150, 300, 600];

export function ImageDpiConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [dpi, setDpi] = React.useState("300");
  const [format, setFormat] = React.useState<"image/jpeg" | "image/png">("image/jpeg");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);

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

  const process = React.useCallback(async (targetFile: File, dpiValue: number, fmt: "image/jpeg" | "image/png") => {
    setError(null);
    try {
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
      const blob = await canvasToBlob(canvas, fmt, fmt === "image/jpeg" ? 0.95 : undefined);
      const reencoded = new File([blob], "reencoded", { type: fmt });
      const patchedBytes = await setImageDpi(reencoded, dpiValue);
      const finalBlob = new Blob([patchedBytes as BlobPart], { type: fmt });
      setResultBlob(finalBlob);
      setResultUrl(URL.createObjectURL(finalBlob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't set DPI on this image.");
    }
  }, []);

  React.useEffect(() => {
    const dpiNum = parseInt(dpi, 10);
    if (file && Number.isFinite(dpiNum) && dpiNum > 0) process(file, dpiNum, format);
  }, [file, dpi, format, process]);

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
            downloadBlob(resultBlob, `${stripExtension(file.name)}-${dpi}dpi.${format === "image/jpeg" ? "jpg" : "png"}`)
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="dpi-value" className="text-sm text-muted-foreground">
            DPI
          </Label>
          <Input
            id="dpi-value"
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
            className="mt-1.5 w-24 font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setDpi(String(p))}
              className={`rounded-md border px-2.5 py-1 text-xs ${
                dpi === String(p) ? "border-brand bg-brand-soft font-medium" : "hover:border-brand/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Format</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v as "image/jpeg" | "image/png")}>
            <SelectTrigger className="mt-1.5 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/png">PNG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        This changes the DPI metadata used for print sizing — it doesn&apos;t resample or change
        the actual pixel dimensions of the image.
      </p>
    </div>
  );
}
