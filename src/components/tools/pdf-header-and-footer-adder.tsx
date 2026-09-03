"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfHeaderAndFooterAdder() {
  const [file, setFile] = React.useState<File | null>(null);
  const [headerText, setHeaderText] = React.useState("");
  const [footerText, setFooterText] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function apply() {
    if (!file || (!headerText.trim() && !footerText.trim())) return;
    setProcessing(true);
    setError(null);
    try {
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
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-headers-footers.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add header/footer — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

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

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button
        type="button"
        className="mt-4"
        onClick={apply}
        disabled={!file || (!headerText.trim() && !footerText.trim()) || processing}
      >
        <Download className="size-4" />
        {processing ? "Applying..." : "Add header/footer and download"}
      </Button>
    </div>
  );
}
