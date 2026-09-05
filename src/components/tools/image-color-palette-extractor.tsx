"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";

function toHex(v: number) {
  return v.toString(16).padStart(2, "0");
}

function extractPalette(ctx: CanvasRenderingContext2D, w: number, h: number, count = 8): string[] {
  const { data } = ctx.getImageData(0, 0, w, h);
  const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
  const step = 24; // quantization bucket size per channel

  for (let i = 0; i < data.length; i += 4) {
    const r = Math.floor(data[i] / step) * step;
    const g = Math.floor(data[i + 1] / step) * step;
    const b = Math.floor(data[i + 2] / step) * step;
    const key = `${r},${g},${b}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.r += data[i];
      existing.g += data[i + 1];
      existing.b += data[i + 2];
      existing.n += 1;
    } else {
      buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], n: 1 });
    }
  }

  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map((b) => `#${toHex(Math.round(b.r / b.n))}${toHex(Math.round(b.g / b.n))}${toHex(Math.round(b.b / b.n))}`);
}

export function ImageColorPaletteExtractor() {
  const [colors, setColors] = React.useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const w = Math.min(img.naturalWidth, 300);
      const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      setColors(extractPalette(ctx, w, h));
    };
    img.src = url;
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {previewUrl ? "Change image" : "Upload an image"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      <canvas ref={canvasRef} className="hidden" />

      {previewUrl && (
        <div className="mt-5 grid gap-4 border-t pt-4 sm:grid-cols-[auto_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Uploaded preview" className="max-h-48 rounded-lg border object-contain" />
          <div className="grid grid-cols-4 gap-3 self-start">
            {colors.map((c) => (
              <div key={c} className="flex flex-col items-center gap-1.5">
                <div className="size-12 rounded-lg border shadow-sm" style={{ backgroundColor: c }} />
                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs">{c}</span>
                  <CopyButton value={c} label="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
