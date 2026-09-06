"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageBatchWorkspace } from "@/components/tools/image-batch-workspace";
import { useBatchFiles } from "@/lib/use-batch-files";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/image-processing";
import { setImageDpi } from "@/lib/image-dpi";

const PRESETS = [72, 96, 150, 300, 600];

export function ImageDpiConverter() {
  const [dpi, setDpi] = React.useState("300");
  const [format, setFormat] = React.useState<"image/jpeg" | "image/png">("image/jpeg");

  const convert = React.useCallback(
    async (file: File) => {
      const dpiNum = parseInt(dpi, 10) || 300;
      const img = await loadImageFromFile(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.95 : undefined);
      const reencoded = new File([blob], "reencoded", { type: format });
      const patchedBytes = await setImageDpi(reencoded, dpiNum);
      const finalBlob = new Blob([patchedBytes as BlobPart], { type: format });
      const ext = format === "image/jpeg" ? "jpg" : "png";
      return { blob: finalBlob, name: `${stripExtension(file.name)}-${dpiNum}dpi.${ext}` };
    },
    [dpi, format]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert, { live: true });

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageBatchWorkspace
        items={items}
        onFilesSelect={addFiles}
        onRemove={removeItem}
        uploadLabel="Drop images to set the DPI of"
        zipName="dpi-updated-images.zip"
      />

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="dpi-value" className="text-sm text-muted-foreground">
            DPI
          </Label>
          <Input id="dpi-value" value={dpi} onChange={(e) => setDpi(e.target.value)} className="mt-1.5 w-24 font-mono" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setDpi(String(p))}
              className={`rounded-md border px-2.5 py-1 text-xs ${
                dpi === String(p) ? "border-brand bg-brand-soft font-medium" : "hover:border-brand/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Format</Label>
          <Select value={format} onValueChange={(v) => v && setFormat(v as "image/jpeg" | "image/png")}>
            <SelectTrigger className="mt-1.5 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/png">PNG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        This changes the DPI metadata used for print sizing — it doesn&apos;t resample or change
        the actual pixel dimensions of the image.
      </p>
    </div>
  );
}
