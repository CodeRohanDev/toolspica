"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, ImagePlus, X } from "lucide-react";
import { loadImageFromFile, canvasToBlob, downloadBlob, formatBytes } from "@/lib/image-processing";
import { buildImagePdf } from "@/lib/pdf-writer";

interface QueueItem {
  file: File;
  previewUrl: string;
}

export function PngToPdf() {
  const [items, setItems] = React.useState<QueueItem[]>([]);
  const [processing, setProcessing] = React.useState(false);
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
  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = i + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  }

  async function generate() {
    setProcessing(true);
    try {
      const pages = await Promise.all(
        items.map(async ({ file }) => {
          const img = await loadImageFromFile(file);
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
          return {
            width: canvas.width,
            height: canvas.height,
            jpegBytes: new Uint8Array(await blob.arrayBuffer()),
          };
        })
      );
      const pdfBytes = buildImagePdf(pages);
      downloadBlob(new Blob([pdfBytes as BlobPart], { type: "application/pdf" }), "images.pdf");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 p-6 text-center hover:border-brand/50"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-muted">
          <ImagePlus className="size-5 text-muted-foreground" />
        </span>
        <p className="text-sm font-medium">Click to add images (select multiple, order matters)</p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, WEBP, and other formats all work — processed locally in your browser, never uploaded
        </p>
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
        <div className="mt-4 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.previewUrl} alt={item.file.name} className="size-12 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{item.file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(item.file.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, -1)} disabled={i === 0}>↑</Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</Button>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeItem(i)} aria-label="Remove">
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <Button type="button" className="mt-4" onClick={generate} disabled={processing}>
          <Download className="size-4" />
          {processing ? "Generating PDF..." : `Generate PDF (${items.length} page${items.length === 1 ? "" : "s"})`}
        </Button>
      )}
    </div>
  );
}
