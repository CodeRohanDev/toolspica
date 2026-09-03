"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { Button } from "@/components/ui/button";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { getImageSegmenter } from "@/lib/image-segmenter-setup";

export function RemoveBackground() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
  }

  async function process() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setStatus("Loading segmentation model...");
    try {
      const segmenter = await getImageSegmenter();
      setStatus("Analyzing image...");
      const img = await loadImageFromFile(file);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const result = segmenter.segment(img);
      const mask = result.categoryMask;
      if (!mask) throw new Error("Segmentation produced no mask.");

      const maskValues = mask.getAsUint8Array();
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = mask.width;
      maskCanvas.height = mask.height;

      let scaledMask: Uint8Array;
      if (mask.width === canvas.width && mask.height === canvas.height) {
        scaledMask = maskValues;
      } else {
        const maskImgData = maskCanvas.getContext("2d")!.createImageData(mask.width, mask.height);
        for (let i = 0; i < maskValues.length; i++) {
          const v = maskValues[i] === 0 ? 0 : 255;
          maskImgData.data[i * 4] = v;
          maskImgData.data[i * 4 + 1] = v;
          maskImgData.data[i * 4 + 2] = v;
          maskImgData.data[i * 4 + 3] = 255;
        }
        maskCanvas.getContext("2d")!.putImageData(maskImgData, 0, 0);
        const scaleCtx = document.createElement("canvas").getContext("2d")!;
        scaleCtx.canvas.width = canvas.width;
        scaleCtx.canvas.height = canvas.height;
        scaleCtx.imageSmoothingEnabled = true;
        scaleCtx.drawImage(maskCanvas, 0, 0, canvas.width, canvas.height);
        const scaled = scaleCtx.getImageData(0, 0, canvas.width, canvas.height).data;
        scaledMask = new Uint8Array(canvas.width * canvas.height);
        for (let i = 0; i < scaledMask.length; i++) scaledMask[i] = scaled[i * 4] > 127 ? 1 : 0;
      }

      const data = imageData.data;
      for (let i = 0; i < scaledMask.length; i++) {
        if (scaledMask[i] === 0) data[i * 4 + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      mask.close();

      const blob = await canvasToBlob(canvas, "image/png");
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't remove the background from this image.");
    } finally {
      setLoading(false);
      setStatus(null);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Original</p>
          <div className="mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border">
            {originalUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={originalUrl} alt="Original" className="size-full object-contain" />
            ) : (
              <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
            )}
          </div>
        </div>
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-no-bg.png`)}
        />
      </div>

      {originalUrl && (
        <div className="mt-4 flex items-center gap-3">
          <Button type="button" onClick={process} disabled={loading}>
            {loading ? status ?? "Processing..." : "Remove background"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={clear}>
            Choose a different image
          </Button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        Uses an in-browser AI segmentation model (no upload, runs locally via WebAssembly) to detect
        the main subject — people, animals, vehicles, and everyday objects — and cuts it out with a
        transparent background. Works best with a clearly separated subject against a simpler
        background; fine detail like loose hair strands may not be perfectly captured. The first run
        downloads a small model file, then everything processes on your device.
      </p>
    </div>
  );
}
