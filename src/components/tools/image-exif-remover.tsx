"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, formatBytes, stripExtension } from "@/lib/image-processing";
import { ShieldCheck } from "lucide-react";

export function ImageExifRemover() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
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

  const process = React.useCallback(async (targetFile: File) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const isJpeg = /jpe?g/i.test(targetFile.type);
    const blob = await canvasToBlob(canvas, isJpeg ? "image/jpeg" : "image/png", isJpeg ? 0.95 : undefined);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => {
            if (!resultBlob || !file) return;
            const ext = resultBlob.type === "image/jpeg" ? "jpg" : "png";
            downloadBlob(resultBlob, `${stripExtension(file.name)}-no-exif.${ext}`);
          }}
        />
      </div>

      {resultBlob && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-soft p-3 text-sm">
          <ShieldCheck className="size-4 shrink-0" />
          <span>
            All EXIF metadata (camera model, GPS location, timestamp, and more) has been stripped.
            {file && ` ${formatBytes(file.size)} → ${formatBytes(resultBlob.size)}.`}
          </span>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Re-rendering the image through a canvas — the technique used here — inherently discards
        all embedded metadata, since canvas only ever stores raw pixel data.
      </p>
    </div>
  );
}
