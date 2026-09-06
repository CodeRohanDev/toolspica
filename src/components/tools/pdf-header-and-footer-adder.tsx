"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfHeaderAndFooterAdder() {
  const [headerText, setHeaderText] = React.useState("");
  const [footerText, setFooterText] = React.useState("");

  const convert = React.useCallback(
    async (file: File) => {
      if (!headerText.trim() && !footerText.trim()) throw new Error("Enter a header or footer first.");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const size = 10;
      const margin = 24;

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        if (headerText.trim()) {
          const textWidth = font.widthOfTextAtSize(headerText, size);
          page.drawText(headerText, {
            x: width / 2 - textWidth / 2,
            y: height - margin,
            size,
            font,
            color: rgb(0.3, 0.3, 0.3),
          });
        }
        if (footerText.trim()) {
          const textWidth = font.widthOfTextAtSize(footerText, size);
          page.drawText(footerText, {
            x: width / 2 - textWidth / 2,
            y: margin - size,
            size,
            font,
            color: rgb(0.3, 0.3, 0.3),
          });
        }
      });

      const outBytes = await doc.save();
      const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
      return { blob, name: `${stripPdfExtension(file.name)}-headers-footers.pdf` };
    },
    [headerText, footerText]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="application/pdf,.pdf" onFilesSelect={addFiles} label="Drop PDFs to add a header/footer to" />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="header-text" className="text-sm text-muted-foreground">
            Header text
          </Label>
          <Input id="header-text" value={headerText} onChange={(e) => setHeaderText(e.target.value)} className="mt-1.5" placeholder="e.g. Company Name" />
        </div>
        <div>
          <Label htmlFor="footer-text" className="text-sm text-muted-foreground">
            Footer text
          </Label>
          <Input id="footer-text" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="mt-1.5" placeholder="e.g. Confidential — 2026" />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">This header/footer applies to every PDF you add.</p>

      <BatchFileList items={items} onRemove={removeItem} zipName="pdfs-with-headers-footers.zip" />
    </div>
  );
}
