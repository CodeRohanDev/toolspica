"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfAddWatermark() {
  const [text, setText] = React.useState("CONFIDENTIAL");
  const [opacity, setOpacity] = React.useState(0.3);
  const [fontSize, setFontSize] = React.useState(60);
  const [rotation, setRotation] = React.useState(45);

  const convert = React.useCallback(
    async (file: File) => {
      if (!text.trim()) throw new Error("Enter watermark text first.");
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
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      return { blob, name: `${stripPdfExtension(file.name)}-watermarked.pdf` };
    },
    [text, opacity, fontSize, rotation]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to watermark" />

      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="wm-text" className="text-sm text-muted-foreground">
            Watermark text (applies to every file you add)
          </Label>
          <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5" />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-opacity" className="shrink-0 text-sm text-muted-foreground">
              Opacity
            </Label>
            <input id="wm-opacity" type="range" min={0.05} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-size" className="shrink-0 text-sm text-muted-foreground">
              Size
            </Label>
            <input id="wm-size" type="range" min={20} max={120} step={5} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="wm-rotation" className="shrink-0 text-sm text-muted-foreground">
              Angle
            </Label>
            <input id="wm-rotation" type="range" min={0} max={90} step={5} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
          </div>
        </div>
      </div>

      <BatchFileList items={items} onRemove={removeItem} zipName="watermarked-pdfs.zip" />
    </div>
  );
}
