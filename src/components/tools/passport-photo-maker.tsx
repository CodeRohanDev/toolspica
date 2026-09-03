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

const PRESETS = [
  { value: "us-2x2", label: "US Passport (2×2 in)", w: 600, h: 600 },
  { value: "intl-35x45", label: "International (35×45 mm)", w: 413, h: 531 },
  { value: "uk-35x45", label: "UK/Schengen Visa (35×45 mm)", w: 413, h: 531 },
  { value: "india-51x51", label: "India OCI/Visa (2×2 in)", w: 600, h: 600 },
];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function PassportPhotoMaker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [preset, setPreset] = React.useState("us-2x2");
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [sheetUrl, setSheetUrl] = React.useState<string | null>(null);
  const [sheetBlob, setSheetBlob] = React.useState<Blob | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const dragOrigin = React.useRef<{ x: number; y: number } | null>(null);

  const active = PRESETS.find((p) => p.value === preset)!;
  const ratio = active.w / active.h;

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setRect(null);
    setResultUrl(null);
    setSheetUrl(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setRect(null);
    setResultUrl(null);
    setResultBlob(null);
    setSheetUrl(null);
    setSheetBlob(null);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    dragOrigin.current = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
    setRect({ x: dragOrigin.current.x, y: dragOrigin.current.y, w: 0, h: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragOrigin.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, e.clientX - bounds.left));
    let w = x - dragOrigin.current.x;
    const h = w / ratio;
    setRect({
      x: w < 0 ? dragOrigin.current.x + w : dragOrigin.current.x,
      y: h < 0 ? dragOrigin.current.y + h : dragOrigin.current.y,
      w: Math.abs(w),
      h: Math.abs(h),
    });
  }
  function handlePointerUp() {
    dragOrigin.current = null;
  }

  async function applyCrop() {
    if (!file || !rect || !imgRef.current || rect.w < 5) return;
    const displayed = imgRef.current.getBoundingClientRect();
    const img = await loadImageFromFile(file);
    const scaleX = img.width / displayed.width;
    const scaleY = img.height / displayed.height;
    const sx = rect.x * scaleX;
    const sy = rect.y * scaleY;
    const sw = rect.w * scaleX;
    const sh = rect.h * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = active.w;
    canvas.height = active.h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, active.w, active.h);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));

    // Build a 4x6in @300dpi print sheet tiled with copies
    const sheetW = 1200;
    const sheetH = 1800;
    const margin = 20;
    const cols = Math.max(1, Math.floor((sheetW - margin) / (active.w + margin)));
    const rows = Math.max(1, Math.floor((sheetH - margin) / (active.h + margin)));
    const sheetCanvas = document.createElement("canvas");
    sheetCanvas.width = sheetW;
    sheetCanvas.height = sheetH;
    const sctx = sheetCanvas.getContext("2d")!;
    sctx.fillStyle = "#ffffff";
    sctx.fillRect(0, 0, sheetW, sheetH);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = margin + c * (active.w + margin);
        const y = margin + r * (active.h + margin);
        sctx.drawImage(img, sx, sy, sw, sh, x, y, active.w, active.h);
      }
    }
    const sheetBlobResult = await canvasToBlob(sheetCanvas, "image/jpeg", 0.95);
    setSheetBlob(sheetBlobResult);
    setSheetUrl(URL.createObjectURL(sheetBlobResult));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!originalUrl && (
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
      )}

      {originalUrl && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Label className="text-sm text-muted-foreground">Photo size</Label>
            <Select
              value={preset}
              onValueChange={(v) => {
                if (v) {
                  setPreset(v);
                  setRect(null);
                }
              }}
            >
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Drag to select the face crop area
          </p>
          <div
            className="relative mt-2 max-w-full touch-none select-none overflow-hidden rounded-xl border"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={originalUrl}
              alt="To crop"
              className="block max-h-[480px] w-full object-contain"
              draggable={false}
            />
            {rect && rect.w > 0 && (
              <div
                className="absolute border-2 border-brand bg-brand/10"
                style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
              />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={applyCrop} disabled={!rect || rect.w < 5}>
              Generate passport photo
            </Button>
            <Button type="button" variant="outline" onClick={clear}>
              Choose a different image
            </Button>
          </div>
        </>
      )}

      {resultUrl && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <ImageResultCard
            previewUrl={resultUrl}
            fileSize={resultBlob?.size}
            label={`Single photo (${active.w}×${active.h}px)`}
            onDownload={() =>
              resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-passport.jpg`)
            }
          />
          <ImageResultCard
            previewUrl={sheetUrl}
            fileSize={sheetBlob?.size}
            label="4×6 in print sheet (multiple copies)"
            onDownload={() => sheetBlob && downloadBlob(sheetBlob, "passport-photo-sheet.jpg")}
          />
        </div>
      )}
    </div>
  );
}
