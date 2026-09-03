"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

export function TransparentBackgroundMaker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [targetColor, setTargetColor] = React.useState<[number, number, number] | null>(null);
  const [tolerance, setTolerance] = React.useState(40);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setTargetColor(null);
    setResultUrl(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setTargetColor(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  function pickColorFromClick(e: React.MouseEvent<HTMLImageElement>) {
    const img = imgRef.current;
    if (!img) return;
    const bounds = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / bounds.width;
    const scaleY = img.naturalHeight / bounds.height;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const x = Math.round((e.clientX - bounds.left) * scaleX);
    const y = Math.round((e.clientY - bounds.top) * scaleY);
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    setTargetColor([r, g, b]);
  }

  const process = React.useCallback(
    async (targetFile: File, color: [number, number, number], tol: number) => {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const [tr, tg, tb] = color;
      for (let i = 0; i < data.length; i += 4) {
        const dist = colorDistance(data[i], data[i + 1], data[i + 2], tr, tg, tb);
        if (dist < tol) data[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    },
    []
  );

  React.useEffect(() => {
    if (file && targetColor) process(file, targetColor, tolerance);
  }, [file, targetColor, tolerance, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {originalUrl ? "Click the background color to remove" : "Original"}
          </p>
          <div className="mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border">
            {originalUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={originalUrl}
                alt="Click to pick background color"
                className="size-full cursor-crosshair object-contain"
                onClick={pickColorFromClick}
              />
            ) : (
              <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
            )}
          </div>
        </div>
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-transparent.png`)
          }
        />
      </div>

      {originalUrl && (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {targetColor && (
            <div className="flex items-center gap-2">
              <span
                className="size-6 rounded border"
                style={{ backgroundColor: `rgb(${targetColor.join(",")})` }}
              />
              <span className="text-xs text-muted-foreground">Selected color</span>
            </div>
          )}
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="tbm-tolerance" className="shrink-0 text-sm text-muted-foreground">
              Tolerance
            </Label>
            <input
              id="tbm-tolerance"
              type="range"
              min={5}
              max={150}
              value={tolerance}
              onChange={(e) => setTolerance(Number(e.target.value))}
              disabled={!targetColor}
              className="flex-1"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={clear}>
            Choose a different image
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Click a spot in the image to pick the background color, then adjust tolerance — this makes
        every pixel close to that color transparent. Works best for solid or near-solid color
        backgrounds; it isn&apos;t AI-based subject detection.
      </p>
    </div>
  );
}
