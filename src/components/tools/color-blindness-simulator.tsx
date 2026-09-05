"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { applyCvdMatrix, type CvdType } from "@/lib/color-blindness";

const TYPES: { key: CvdType; label: string }[] = [
  { key: "protanopia", label: "Protanopia (red-weak)" },
  { key: "deuteranopia", label: "Deuteranopia (green-weak)" },
  { key: "tritanopia", label: "Tritanopia (blue-weak)" },
];

export function ColorBlindnessSimulator() {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const originalCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasRefs = React.useRef<Record<CvdType, HTMLCanvasElement | null>>({
    protanopia: null,
    deuteranopia: null,
    tritanopia: null,
  });
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  function render() {
    const img = imgRef.current;
    const originalCanvas = originalCanvasRef.current;
    if (!img || !originalCanvas) return;

    const w = img.naturalWidth;
    const h = img.naturalHeight;
    originalCanvas.width = w;
    originalCanvas.height = h;
    const originalCtx = originalCanvas.getContext("2d");
    originalCtx?.drawImage(img, 0, 0);

    for (const type of TYPES.map((t) => t.key)) {
      const canvas = canvasRefs.current[type];
      if (!canvas) continue;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, w, h);
      applyCvdMatrix(imageData.data, type);
      ctx.putImageData(imageData, 0, 0);
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
      requestAnimationFrame(render);
    };
    img.src = URL.createObjectURL(file);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {imageLoaded ? "Change image" : "Upload an image"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {imageLoaded && (
        <div className="mt-5 grid gap-4 border-t pt-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-sm font-medium text-muted-foreground">Original</p>
            <canvas ref={originalCanvasRef} className="w-full rounded-lg border" />
          </div>
          {TYPES.map((t) => (
            <div key={t.key}>
              <p className="mb-1.5 text-sm font-medium text-muted-foreground">{t.label}</p>
              <canvas
                ref={(el) => {
                  canvasRefs.current[t.key] = el;
                }}
                className="w-full rounded-lg border"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
