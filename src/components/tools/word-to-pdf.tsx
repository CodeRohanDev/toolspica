"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { readZip, readZipEntryText } from "@/lib/pdf/zip-reader";
import { downloadPdfBytes } from "@/lib/pdf/pdf-helpers";

interface ParsedParagraph {
  text: string;
  heading: boolean;
}

function parseDocumentXml(xml: string): ParsedParagraph[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  const paragraphs = Array.from(doc.getElementsByTagNameNS(ns, "p"));
  return paragraphs.map((p) => {
    const texts = Array.from(p.getElementsByTagNameNS(ns, "t")).map((t) => t.textContent ?? "");
    const text = texts.join("");
    const pStyle = p.getElementsByTagNameNS(ns, "pStyle")[0]?.getAttribute("w:val") ?? "";
    const hasBold = p.getElementsByTagNameNS(ns, "b").length > 0;
    const heading = /heading|title/i.test(pStyle) || (hasBold && text.length < 100 && texts.length <= 3);
    return { text, heading };
  }).filter((p) => p.text.trim().length > 0);
}

function wrapText(text: string, font: { widthOfTextAtSize: (t: string, s: number) => number }, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function WordToPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setDone(false);
    setError(null);
    setLoading(true);
    try {
      const buffer = new Uint8Array(await picked.arrayBuffer());
      const entries = await readZip(buffer);
      const xml = await readZipEntryText(entries, "word/document.xml");
      if (!xml) throw new Error("This doesn't look like a valid .docx file.");
      const paragraphs = parseDocumentXml(xml);
      if (paragraphs.length === 0) throw new Error("No text found in this document.");

      const outDoc = await PDFDocument.create();
      const font = await outDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await outDoc.embedFont(StandardFonts.HelveticaBold);
      const pageWidth = 612;
      const pageHeight = 792;
      const margin = 56;
      const maxWidth = pageWidth - margin * 2;

      let page = outDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      for (const para of paragraphs) {
        const size = para.heading ? 16 : 11;
        const useFont = para.heading ? boldFont : font;
        const lineHeight = size * 1.4;
        const lines = wrapText(para.text, useFont, size, maxWidth);
        for (const line of lines) {
          if (y < margin + lineHeight) {
            page = outDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(line, { x: margin, y: y - size, size, font: useFont, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
        }
        y -= lineHeight * 0.5;
      }

      const outBytes = await outDoc.save();
      downloadPdfBytes(outBytes, `${picked.name.replace(/\.docx$/i, "")}.pdf`);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this file — make sure it's a valid .docx file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".docx"
        className="hidden"
        onChange={(e) => {
          const picked = e.target.files?.[0];
          if (picked) void handleFile(picked);
          e.target.value = "";
        }}
      />

      {!file && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed p-10 text-center hover:border-primary/50"
        >
          <Upload className="size-6 text-muted-foreground" />
          <span className="text-sm font-medium">Click to upload a .docx file</span>
          <span className="text-xs text-muted-foreground">Word 2007+ format (.docx)</span>
        </button>
      )}

      {file && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Converting to PDF...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {done && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Download className="size-4" /> PDF downloaded.
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts paragraph text and rebuilds it as a paginated PDF with basic heading detection —
        images, tables, columns, and precise fonts from the original document aren&apos;t preserved.
      </p>
    </div>
  );
}
