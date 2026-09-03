"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, downloadBlob, stripExtension } from "@/lib/image-processing";
import { encodeGif } from "@/lib/gif-encoder";

export function PngToGif() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [processing, setProcessing] = React.useState(false);

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
    setProcessing(true);
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gifBytes = encodeGif(imageData);
    const blob = new Blob([gifBytes as BlobPart], { type: "image/gif" });
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
    setProcessing(false);
  }, []);

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} accept="image/png" />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}.gif`)}
        />
      </div>
      {processing && <p className="mt-3 text-sm text-muted-foreground">Quantizing colors and encoding...</p>}
      <p className="mt-3 text-xs text-muted-foreground">
        Uses a from-scratch GIF encoder with median-cut color quantization (reducing to up to 256
        colors, the GIF format&apos;s limit) — transparent PNG areas are filled white.
      </p>
    </div>
  );
}
