"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfAddWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("CONFIDENTIAL");
  const [opacity, setOpacity] = React.useState(0.3);
  const [fontSize, setFontSize] = React.useState(60);
  const [rotation, setRotation] = React.useState(45);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function apply() {
    if (!file || !text.trim()) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const textWidth = font.widthOfTextAtSize(text, fontSize);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotation),
        });
      }
      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-watermarked.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add a watermark — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="wm-text" className="text-sm text-muted-foreground">
            Watermark text
          </Label>
          <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5" />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-opacity" className="shrink-0 text-sm text-muted-foreground">
              Opacity
            </Label>
            <input
              id="wm-opacity"
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-size" className="shrink-0 text-sm text-muted-foreground">
              Size
            </Label>
            <input
              id="wm-size"
              type="range"
              min={20}
              max={120}
              step={5}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-rotation" className="shrink-0 text-sm text-muted-foreground">
              Angle
            </Label>
            <input
              id="wm-rotation"
              type="range"
              min={0}
              max={90}
              step={5}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || !text.trim() || processing}>
        <Download className="size-4" />
        {processing ? "Applying..." : "Add watermark and download"}
      </Button>
    </div>
  );
}
