"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { readZip, readZipEntryText } from "@/lib/pdf/zip-reader";

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
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
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
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${file.name.replace(/\.docx$/i, "")}.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".docx" onFilesSelect={addFiles} label="Drop .docx files to convert to PDF" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts paragraph text and rebuilds it as a paginated PDF with basic heading detection —
        images, tables, columns, and precise fonts from the original document aren&apos;t
        preserved.
      </p>
    </div>
  );
}
