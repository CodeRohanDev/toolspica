"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

const ASPECT_OPTIONS = [
  { value: "free", label: "Freeform", ratio: null },
  { value: "1:1", label: "Square (1:1)", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function CropImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [naturalSize, setNaturalSize] = React.useState<{ w: number; h: number } | null>(null);
  const [aspect, setAspect] = React.useState("free");
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const dragState = React.useRef<{ startX: number; startY: number } | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setRect(null);
    setResultUrl(null);
    loadImageFromFile(picked).then((img) => setNaturalSize({ w: img.width, h: img.height }));
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setNaturalSize(null);
    setRect(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  const ratio = ASPECT_OPTIONS.find((a) => a.value === aspect)?.ratio ?? null;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    dragState.current = { startX: x, startY: y };
    setRect({ x, y, w: 0, h: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, e.clientX - bounds.left));
    const y = Math.max(0, Math.min(bounds.height, e.clientY - bounds.top));
    const { startX, startY } = dragState.current;
    let w = x - startX;
    let h = y - startY;
    if (ratio) {
      h = Math.sign(h || 1) * Math.abs(w) / ratio;
    }
    setRect({
      x: w < 0 ? startX + w : startX,
      y: h < 0 ? startY + h : startY,
      w: Math.abs(w),
      h: Math.abs(h),
    });
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  async function applyCrop() {
    if (!file || !rect || !imgRef.current || !naturalSize || rect.w < 2 || rect.h < 2) return;
    const displayed = imgRef.current.getBoundingClientRect();
    const scaleX = naturalSize.w / displayed.width;
    const scaleY = naturalSize.h / displayed.height;
    const sx = rect.x * scaleX;
    const sy = rect.y * scaleY;
    const sw = rect.w * scaleX;
    const sh = rect.h * scaleY;

    const img = await loadImageFromFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!originalUrl && (
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
      )}

      {originalUrl && (
        <>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Drag on the image to select a crop area
          </p>
          <div
            className="relative mt-2 max-w-full touch-none select-none overflow-hidden rounded-xl border"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={originalUrl} alt="To crop" className="block max-h-[480px] w-full object-contain" draggable={false} />
            {rect && rect.w > 0 && rect.h > 0 && (
              <div
                className="absolute border-2 border-brand bg-brand/10"
                style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
              />
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Aspect ratio</Label>
              <Select value={aspect} onValueChange={(v) => v && setAspect(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ASPECT_OPTIONS.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="button" onClick={applyCrop} disabled={!rect || rect.w < 2 || rect.h < 2}>
              Apply crop
            </Button>
            <Button type="button" variant="outline" onClick={clear}>
              Choose a different image
            </Button>
          </div>
        </>
      )}

      {resultUrl && (
        <div className="mt-5">
          <ImageResultCard
            previewUrl={resultUrl}
            fileSize={resultBlob?.size}
            onDownload={() =>
              resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-cropped.png`)
            }
          />
        </div>
      )}
    </div>
  );
}
