"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { downloadPdfBytes, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

const POSITIONS = [
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
];

export function PdfPageNumbering() {
  const [file, setFile] = React.useState<File | null>(null);
  const [position, setPosition] = React.useState("bottom-center");
  const [startAt, setStartAt] = React.useState("1");
  const [format, setFormat] = React.useState("{n}");
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function apply() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
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
      downloadPdfBytes(outBytes, `${stripPdfExtension(file.name)}-numbered.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't add page numbers — the PDF may be corrupted or password-protected.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <PdfUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} />

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

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Applying..." : "Add page numbers and download"}
      </Button>
    </div>
  );
}
