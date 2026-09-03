"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download, ImagePlus, X } from "lucide-react";
import { loadImageFromFile, canvasToBlob, downloadBlob, formatBytes, stripExtension } from "@/lib/image-processing";
import { createZip } from "@/lib/zip-writer";

interface QueueItem {
  file: File;
  previewUrl: string;
}

export function BatchImageResizer() {
  const [items, setItems] = React.useState<QueueItem[]>([]);
  const [maxWidth, setMaxWidth] = React.useState("1200");
  const [maxHeight, setMaxHeight] = React.useState("1200");
  const [keepAspect, setKeepAspect] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setItems((prev) => [...prev, ...picked]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function resizeOne(file: File, maxW: number, maxH: number, aspect: boolean): Promise<Blob> {
    const img = await loadImageFromFile(file);
    let w = img.width;
    let h = img.height;
    if (aspect) {
      const scale = Math.min(maxW / w, maxH / h, 1);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    } else {
      w = Math.min(w, maxW);
      h = Math.min(h, maxH);
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
    return canvasToBlob(canvas, "image/png");
  }

  async function processAll() {
    const maxW = parseInt(maxWidth, 10) || 1200;
    const maxH = parseInt(maxHeight, 10) || 1200;
    setProcessing(true);
    setProgress(0);
    const entries: { name: string; data: Uint8Array }[] = [];
    for (let i = 0; i < items.length; i++) {
      const blob = await resizeOne(items[i].file, maxW, maxH, keepAspect);
      entries.push({
        name: `${stripExtension(items[i].file.name)}-resized.png`,
        data: new Uint8Array(await blob.arrayBuffer()),
      });
      setProgress(i + 1);
    }
    const zip = createZip(entries);
    downloadBlob(new Blob([zip as BlobPart]), "resized-images.zip");
    setProcessing(false);
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
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
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
          <Label htmlFor="batch-w" className="text-sm text-muted-foreground">
            Max width (px)
          </Label>
          <Input id="batch-w" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} className="mt-1.5 w-28 font-mono" />
        </div>
        <div>
          <Label htmlFor="batch-h" className="text-sm text-muted-foreground">
            Max height (px)
          </Label>
          <Input id="batch-h" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} className="mt-1.5 w-28 font-mono" />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="batch-aspect" checked={keepAspect} onCheckedChange={setKeepAspect} />
          <Label htmlFor="batch-aspect" className="text-sm">
            Keep aspect ratio
          </Label>
        </div>
        <Button type="button" onClick={processAll} disabled={items.length === 0 || processing}>
          <Download className="size-4" />
          {processing ? `Processing ${progress}/${items.length}...` : `Resize all (${items.length}) & download ZIP`}
        </Button>
      </div>

      {items.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          {items.length} image{items.length === 1 ? "" : "s"} queued,{" "}
          {formatBytes(items.reduce((sum, i) => sum + i.file.size, 0))} total
        </p>
      )}
    </div>
  );
}
