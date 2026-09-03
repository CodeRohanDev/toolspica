"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

export function BlurImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState(8);
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

  const process = React.useCallback(async (targetFile: File, blurAmount: number) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, amount);
  }, [file, amount, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-blurred.png`)}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="blur-amount" className="shrink-0 text-sm text-muted-foreground">
          Blur strength
        </Label>
        <input
          id="blur-amount"
          type="range"
          min={0}
          max={30}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={!file}
          className="flex-1"
        />
        <span className="w-12 shrink-0 text-sm tabular-nums">{amount}px</span>
      </div>
    </div>
  );
}
