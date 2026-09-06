"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

const POSITIONS = [
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
];

export function PdfPageNumbering() {
  const [position, setPosition] = React.useState("bottom-center");
  const [startAt, setStartAt] = React.useState("1");
  const [format, setFormat] = React.useState("{n}");

  const convert = React.useCallback(
    async (file: File) => {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const start = parseInt(startAt, 10) || 1;

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const label = format.replace("{n}", String(start + i)).replace("{total}", String(pages.length));
        const size = 11;
        const textWidth = font.widthOfTextAtSize(label, size);
        const margin = 28;
        let x = width / 2 - textWidth / 2;
        let y = margin;
        if (position.includes("right")) x = width - textWidth - margin;
        if (position.includes("left")) x = margin;
        if (position.startsWith("top")) y = height - margin;
        page.drawText(label, { x, y, size, font, color: rgb(0.2, 0.2, 0.2) });
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      return { blob, name: `${stripPdfExtension(file.name)}-numbered.pdf` };
    },
    [position, startAt, format]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to add page numbers to" />

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label className="text-sm text-muted-foreground">Position</Label>
          <Select value={position} onValueChange={(v) => v && setPosition(v)}>
            <SelectTrigger className="mt-1.5 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POSITIONS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pn-start" className="text-sm text-muted-foreground">
            Start at
          </Label>
          <Input id="pn-start" value={startAt} onChange={(e) => setStartAt(e.target.value)} className="mt-1.5 w-20 font-mono" />
        </div>
        <div>
          <Label htmlFor="pn-format" className="text-sm text-muted-foreground">
            Format ({"{n}"} = number, {"{total}"} = total pages)
          </Label>
          <Input id="pn-format" value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1.5 w-40 font-mono" />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">These settings apply to every PDF you add.</p>

      <BatchFileList items={items} onRemove={removeItem} zipName="numbered-pdfs.zip" />
    </div>
  );
}
