"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, ImagePlus, X } from "lucide-react";
import { downloadPdfBytes, formatBytes } from "@/lib/pdf/pdf-helpers";

interface QueueItem {
  file: File;
  previewUrl: string;
}

export function JpgToPdf() {
  const [items, setItems] = React.useState<QueueItem[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files)
      .filter((f) => /jpe?g/i.test(f.type))
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
      const doc = await PDFDocument.create();
      for (const { file } of items) {
        const bytes = await file.arrayBuffer();
        const img = await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await doc.save();
      downloadPdfBytes(pdfBytes, "images.pdf");
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
        <p className="text-sm font-medium">Click to add JPG images (select multiple, order matters)</p>
        <p className="text-xs text-muted-foreground">Processed locally in your browser — never uploaded</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg"
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
