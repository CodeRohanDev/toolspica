"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

export function ImageResizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [originalDims, setOriginalDims] = React.useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = React.useState("800");
  const [height, setHeight] = React.useState("600");
  const [lockAspect, setLockAspect] = React.useState(true);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    loadImageFromFile(picked).then((img) => {
      setOriginalDims({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
    });
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setOriginalDims(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  function onWidthChange(v: string) {
    setWidth(v);
    if (lockAspect && originalDims) {
      const w = parseInt(v, 10);
      if (Number.isFinite(w) && w > 0) {
        setHeight(String(Math.round((w / originalDims.w) * originalDims.h)));
      }
    }
  }
  function onHeightChange(v: string) {
    setHeight(v);
    if (lockAspect && originalDims) {
      const h = parseInt(v, 10);
      if (Number.isFinite(h) && h > 0) {
        setWidth(String(Math.round((h / originalDims.h) * originalDims.w)));
      }
    }
  }

  const process = React.useCallback(async (targetFile: File, w: number, h: number) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  const widthNum = parseInt(width, 10);
  const heightNum = parseInt(height, 10);
  const validDims = Number.isFinite(widthNum) && widthNum > 0 && Number.isFinite(heightNum) && heightNum > 0;

  React.useEffect(() => {
    if (file && validDims) process(file, widthNum, heightNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, widthNum, heightNum, validDims]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-resized.png`)
          }
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="resize-w" className="text-sm text-muted-foreground">
            Width (px)
          </Label>
          <Input
            id="resize-w"
            value={width}
            onChange={(e) => onWidthChange(e.target.value)}
            className="mt-1.5 w-28 font-mono"
            disabled={!file}
          />
        </div>
        <div>
          <Label htmlFor="resize-h" className="text-sm text-muted-foreground">
            Height (px)
          </Label>
          <Input
            id="resize-h"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
            className="mt-1.5 w-28 font-mono"
            disabled={!file}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="lock-aspect" checked={lockAspect} onCheckedChange={setLockAspect} />
          <Label htmlFor="lock-aspect" className="text-sm">
            Lock aspect ratio
          </Label>
        </div>
      </div>

      {originalDims && (
        <p className="mt-2 text-xs text-muted-foreground">
          Original: {originalDims.w} × {originalDims.h}px
        </p>
      )}
    </div>
  );
}
