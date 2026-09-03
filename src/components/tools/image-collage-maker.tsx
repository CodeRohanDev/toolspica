"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob } from "@/lib/image-processing";

interface QueueItem {
  file: File;
  previewUrl: string;
}

export function ImageCollageMaker() {
  const [items, setItems] = React.useState<QueueItem[]>([]);
  const [cols, setCols] = React.useState("2");
  const [spacing, setSpacing] = React.useState("8");
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setItems((prev) => [...prev, ...picked]);
  }
  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  const colsNum = Math.max(1, Math.min(6, parseInt(cols, 10) || 2));
  const spacingNum = Math.max(0, Math.min(40, parseInt(spacing, 10) || 0));

  const build = React.useCallback(async (queue: QueueItem[], c: number, gap: number) => {
    if (queue.length === 0) return;
    const images = await Promise.all(queue.map((q) => loadImageFromFile(q.file)));
    const rows = Math.ceil(images.length / c);
    const cellSize = 400;

    const canvas = document.createElement("canvas");
    canvas.width = c * cellSize + gap * (c + 1);
    canvas.height = rows * cellSize + gap * (rows + 1);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    images.forEach((img, i) => {
      const row = Math.floor(i / c);
      const col = i % c;
      const x = gap + col * (cellSize + gap);
      const y = gap + row * (cellSize + gap);
      // Cover-fit crop into the cell
      const scale = Math.max(cellSize / img.width, cellSize / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const offsetX = x + (cellSize - drawW) / 2;
      const offsetY = y + (cellSize - drawH) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cellSize, cellSize);
      ctx.clip();
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    });

    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    build(items, colsNum, spacingNum);
  }, [items, colsNum, spacingNum, build]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 p-6 text-center hover:border-brand/50"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-muted">
          <ImagePlus className="size-5 text-muted-foreground" />
        </span>
        <p className="text-sm font-medium">Click to add images (select multiple)</p>
        <p className="text-xs text-muted-foreground">Processed locally in your browser — never uploaded</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {items.map((item, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.previewUrl} alt={item.file.name} className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-background/90 shadow-sm"
                aria-label="Remove"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="collage-cols" className="text-sm text-muted-foreground">
            Columns
          </Label>
          <Input
            id="collage-cols"
            type="number"
            min={1}
            max={6}
            value={cols}
            onChange={(e) => setCols(e.target.value)}
            className="mt-1.5 w-20"
          />
        </div>
        <div>
          <Label htmlFor="collage-gap" className="text-sm text-muted-foreground">
            Spacing (px)
          </Label>
          <Input
            id="collage-gap"
            type="number"
            min={0}
            max={40}
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="mt-1.5 w-20"
          />
        </div>
      </div>

      {resultUrl && (
        <div className="mt-5 max-w-md">
          <ImageResultCard
            previewUrl={resultUrl}
            fileSize={resultBlob?.size}
            onDownload={() => resultBlob && downloadBlob(resultBlob, "collage.png")}
          />
        </div>
      )}
    </div>
  );
}
