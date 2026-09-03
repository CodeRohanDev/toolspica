"use client";

import * as React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

const SIZES = [
  { value: "a4", label: "A4", width: 595.28, height: 841.89 },
  { value: "letter", label: "US Letter", width: 612, height: 792 },
  { value: "legal", label: "US Legal", width: 612, height: 1008 },
];

export function PdfPageSizeConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [targetSize, setTargetSize] = React.useState("a4");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function apply() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
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
        // Center the scaled content on the new, larger page.
        page.translateContent((target.width - newWidth) / 2, (target.height - newHeight) / 2);
      });

      const outBytes = await doc.save();
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-${targetSize}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resize this PDF — it may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

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

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : "Convert page size and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Scales each page&apos;s content proportionally to fit the new size, centered with equal
        margins, rather than stretching it out of proportion.
      </p>
    </div>
  );
}
