"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfCrop() {
  const [file, setFile] = React.useState<File | null>(null);
  const [margins, setMargins] = React.useState({ top: 5, bottom: 5, left: 5, right: 5 });
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function apply() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const left = (margins.left / 100) * width;
        const right = (margins.right / 100) * width;
        const top = (margins.top / 100) * height;
        const bottom = (margins.bottom / 100) * height;
        page.setCropBox(left, bottom, width - left - right, height - top - bottom);
      });
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-cropped.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't crop this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <div key={side}>
            <Label htmlFor={`crop-${side}`} className="text-sm capitalize text-muted-foreground">
              {side} margin ({margins[side]}%)
            </Label>
            <input
              id={`crop-${side}`}
              type="range"
              min={0}
              max={40}
              value={margins[side]}
              onChange={(e) => setMargins((m) => ({ ...m, [side]: Number(e.target.value) }))}
              className="mt-1.5 w-full"
            />
          </div>
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Cropping..." : "Crop and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Sets each page&apos;s crop box (the standard, non-destructive way to crop a PDF) — the
        underlying content isn&apos;t deleted, only the visible/printable area changes.
      </p>
    </div>
  );
}
