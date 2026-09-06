"use client";

import * as React from "react";
import { Download } from "lucide-react";
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
import { loadImageFromFile, canvasToBlob, downloadBlob, formatBytes, stripExtension } from "@/lib/image-processing";

const ASPECT_OPTIONS = [
  { value: "free", label: "Freeform", ratio: null },
  { value: "1:1", label: "Square (1:1)", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
];

type Handle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const HANDLES: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
const HIT_RADIUS = 14;
const MIN_SIZE = 16;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Mode = { kind: "draw" } | { kind: "move" } | { kind: "resize"; handle: Handle };

function handleCenter(rect: Rect, handle: Handle): { x: number; y: number } {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const left = rect.x;
  const right = rect.x + rect.w;
  const top = rect.y;
  const bottom = rect.y + rect.h;
  switch (handle) {
    case "nw": return { x: left, y: top };
    case "n": return { x: cx, y: top };
    case "ne": return { x: right, y: top };
    case "e": return { x: right, y: cy };
    case "se": return { x: right, y: bottom };
    case "s": return { x: cx, y: bottom };
    case "sw": return { x: left, y: bottom };
    case "w": return { x: left, y: cy };
  }
}

function pointInRect(x: number, y: number, r: Rect): boolean {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const modeRef = React.useRef<Mode | null>(null);
  const startPointRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRectRef = React.useRef<Rect>({ x: 0, y: 0, w: 0, h: 0 });

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

  function localPoint(e: PointerEvent | React.PointerEvent): { x: number; y: number } {
    const bounds = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(bounds.width, e.clientX - bounds.left)),
      y: Math.max(0, Math.min(bounds.height, e.clientY - bounds.top)),
    };
  }

  function clampRect(r: Rect, bounds: { width: number; height: number }): Rect {
    const w = Math.min(Math.max(r.w, MIN_SIZE), bounds.width);
    const h = Math.min(Math.max(r.h, MIN_SIZE), bounds.height);
    const x = Math.min(Math.max(r.x, 0), bounds.width - w);
    const y = Math.min(Math.max(r.y, 0), bounds.height - h);
    return { x, y, w, h };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const p = localPoint(e);

    if (rect) {
      const hit = HANDLES.find((h) => {
        const c = handleCenter(rect, h);
        return Math.hypot(p.x - c.x, p.y - c.y) <= HIT_RADIUS;
      });
      if (hit) {
        modeRef.current = { kind: "resize", handle: hit };
        startRectRef.current = { ...rect };
        startPointRef.current = p;
        e.preventDefault();
        return;
      }
      if (pointInRect(p.x, p.y, rect)) {
        modeRef.current = { kind: "move" };
        startRectRef.current = { ...rect };
        startPointRef.current = p;
        e.preventDefault();
        return;
      }
    }

    modeRef.current = { kind: "draw" };
    startPointRef.current = p;
    startRectRef.current = { x: p.x, y: p.y, w: 0, h: 0 };
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
    e.preventDefault();
  }

  React.useEffect(() => {
    function onMove(e: PointerEvent) {
      const mode = modeRef.current;
      if (!mode || !containerRef.current) return;
      const bounds = containerRef.current.getBoundingClientRect();
      const p = localPoint(e);
      const start = startPointRef.current;
      const base = startRectRef.current;

      if (mode.kind === "draw") {
        const w = p.x - start.x;
        let h = p.y - start.y;
        if (ratio) h = (Math.sign(h || 1) * Math.abs(w)) / ratio;
        setRect({
          x: w < 0 ? start.x + w : start.x,
          y: h < 0 ? start.y + h : start.y,
          w: Math.abs(w),
          h: Math.abs(h),
        });
        return;
      }

      if (mode.kind === "move") {
        const dx = p.x - start.x;
        const dy = p.y - start.y;
        setRect(clampRect({ x: base.x + dx, y: base.y + dy, w: base.w, h: base.h }, bounds));
        return;
      }

      // resize
      const right = base.x + base.w;
      const bottom = base.y + base.h;
      let rx = base.x;
      let ry = base.y;
      let rw = base.w;
      let rh = base.h;

      if (mode.handle.includes("e")) rw = p.x - rx;
      if (mode.handle.includes("w")) {
        rw = right - p.x;
        rx = p.x;
      }
      if (mode.handle.includes("s")) rh = p.y - ry;
      if (mode.handle.includes("n")) {
        rh = bottom - p.y;
        ry = p.y;
      }

      if (ratio) {
        const isVertical = mode.handle === "n" || mode.handle === "s";
        const isHorizontal = mode.handle === "e" || mode.handle === "w";
        if (isVertical) {
          rw = rh * ratio;
          rx = base.x + (base.w - rw) / 2;
        } else if (isHorizontal) {
          rh = rw / ratio;
          ry = base.y + (base.h - rh) / 2;
        } else {
          rh = Math.abs(rw) / ratio;
          if (mode.handle.includes("n")) ry = bottom - rh;
          if (mode.handle.includes("w")) rx = right - rw;
        }
      }

      if (rw < MIN_SIZE) {
        rw = MIN_SIZE;
        if (mode.handle.includes("w")) rx = right - MIN_SIZE;
      }
      if (rh < MIN_SIZE) {
        rh = MIN_SIZE;
        if (mode.handle.includes("n")) ry = bottom - MIN_SIZE;
      }

      setRect(clampRect({ x: rx, y: ry, w: rw, h: rh }, bounds));
    }

    function onUp() {
      modeRef.current = null;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [ratio]);

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

  const handleCursor: Record<Handle, string> = {
    n: "cursor-ns-resize",
    s: "cursor-ns-resize",
    e: "cursor-ew-resize",
    w: "cursor-ew-resize",
    ne: "cursor-nesw-resize",
    sw: "cursor-nesw-resize",
    nw: "cursor-nwse-resize",
    se: "cursor-nwse-resize",
  };

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!originalUrl && (
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
      )}

      {originalUrl && (
        <>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Drag to select a crop area — drag inside the box to move it, or drag a handle to resize
          </p>
          <div
            ref={containerRef}
            className="relative mt-2 inline-block max-w-full touch-none select-none overflow-hidden rounded-xl border"
            onPointerDown={handlePointerDown}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={originalUrl} alt="To crop" className="pointer-events-none block max-h-[480px] max-w-full" draggable={false} />
            {rect && rect.w > 0 && rect.h > 0 && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 bg-black/40"
                  style={{
                    clipPath: `polygon(0 0, 0 100%, ${rect.x}px 100%, ${rect.x}px ${rect.y}px, ${rect.x + rect.w}px ${rect.y}px, ${rect.x + rect.w}px ${rect.y + rect.h}px, ${rect.x}px ${rect.y + rect.h}px, ${rect.x}px 100%, 100% 100%, 100% 0)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute border-2 border-brand"
                  style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
                >
                  {HANDLES.map((h) => {
                    const c = handleCenter(rect, h);
                    return (
                      <div
                        key={h}
                        className={`pointer-events-auto absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-background shadow ${handleCursor[h]}`}
                        style={{ left: c.x - rect.x, top: c.y - rect.y }}
                      />
                    );
                  })}
                </div>
              </>
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
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Result</p>
          <div
            className="mt-2 inline-block max-w-full overflow-hidden rounded-xl border"
            style={{
              backgroundImage:
                "conic-gradient(#00000010 0.25turn, transparent 0turn 0.5turn, #00000010 0turn 0.75turn, transparent 0turn)",
              backgroundSize: "20px 20px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt="Cropped result" className="block max-h-[480px] max-w-full object-contain" />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{resultBlob ? formatBytes(resultBlob.size) : " "}</p>
            <Button
              type="button"
              size="sm"
              onClick={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-cropped.png`)}
            >
              <Download className="size-3.5" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
