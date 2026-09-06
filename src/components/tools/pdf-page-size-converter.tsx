"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

const SIZES = [
  { value: "a4", label: "A4", width: 595.28, height: 841.89 },
  { value: "letter", label: "US Letter", width: 612, height: 792 },
  { value: "legal", label: "US Legal", width: 612, height: 1008 },
];

export function PdfPageSizeConverter() {
  const [targetSize, setTargetSize] = React.useState("a4");

  const convert = React.useCallback(
    async (file: File) => {
      const target = SIZES.find((s) => s.value === targetSize)!;
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const scale = Math.min(target.width / width, target.height / height);
        page.scaleContent(scale, scale);
        const newWidth = width * scale;
        const newHeight = height * scale;
        page.setSize(target.width, target.height);
        page.translateContent((target.width - newWidth) / 2, (target.height - newHeight) / 2);
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      return { blob, name: `${stripPdfExtension(file.name)}-${targetSize}.pdf` };
    },
    [targetSize]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to change the page size of" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Target page size</Label>
        <Select value={targetSize} onValueChange={(v) => v && setTargetSize(v)}>
          <SelectTrigger className="mt-1.5 w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SIZES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Scales each page&apos;s content proportionally to fit the new size, centered with equal
        margins, rather than stretching it out of proportion.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="resized-pdfs.zip" />
    </div>
  );
}
