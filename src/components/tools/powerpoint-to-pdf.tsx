"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { readZip, readZipEntryText } from "@/lib/pdf/zip-reader";

const P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";
const R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const RELS_NS = "http://schemas.openxmlformats.org/package/2006/relationships";

async function getOrderedSlidePaths(entries: Awaited<ReturnType<typeof readZip>>): Promise<string[]> {
  const presentationXml = await readZipEntryText(entries, "ppt/presentation.xml");
  const relsXml = await readZipEntryText(entries, "ppt/_rels/presentation.xml.rels");
  if (!presentationXml || !relsXml) {
    return entries.filter((e) => /^ppt\/slides\/slide\d+\.xml$/.test(e.name)).map((e) => e.name).sort();
  }

  const presDoc = new DOMParser().parseFromString(presentationXml, "application/xml");
  const rIds = Array.from(presDoc.getElementsByTagNameNS(P_NS, "sldId")).map((el) => el.getAttributeNS(R_NS, "id"));

  const relsDoc = new DOMParser().parseFromString(relsXml, "application/xml");
  const relMap = new Map<string, string>();
  for (const rel of Array.from(relsDoc.getElementsByTagNameNS(RELS_NS, "Relationship"))) {
    relMap.set(rel.getAttribute("Id") ?? "", rel.getAttribute("Target") ?? "");
  }

  return rIds
    .map((id) => relMap.get(id ?? ""))
    .filter((target): target is string => !!target)
    .map((target) => `ppt/${target.replace(/^\.?\/?/, "")}`);
}

function extractSlideText(xml: string): string[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const shapes = Array.from(doc.getElementsByTagNameNS(P_NS, "sp"));
  const lines: string[] = [];
  for (const shape of shapes) {
    const paragraphs = Array.from(shape.getElementsByTagNameNS(A_NS, "p"));
    for (const p of paragraphs) {
      const text = Array.from(p.getElementsByTagNameNS(A_NS, "t")).map((t) => t.textContent ?? "").join("");
      if (text.trim()) lines.push(text);
    }
  }
  return lines;
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

export function PowerpointToPdf() {
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const entries = await readZip(buffer);
    const slidePaths = await getOrderedSlidePaths(entries);
    if (slidePaths.length === 0) throw new Error("This doesn't look like a valid .pptx file.");

    const outDoc = await PDFDocument.create();
    const font = await outDoc.embedFont(StandardFonts.Helvetica);
    const titleFont = await outDoc.embedFont(StandardFonts.HelveticaBold);
    const pageWidth = 792;
    const pageHeight = 612;
    const margin = 56;
    const maxWidth = pageWidth - margin * 2;

    for (const slidePath of slidePaths) {
      const xml = await readZipEntryText(entries, slidePath);
      if (!xml) continue;
      const lines = extractSlideText(xml);

      const page = outDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      lines.forEach((line, idx) => {
        const isTitle = idx === 0;
        const size = isTitle ? 20 : 13;
        const useFont = isTitle ? titleFont : font;
        const lineHeight = size * 1.4;
        for (const wrapped of wrapText(line, useFont, size, maxWidth)) {
          if (y < margin + lineHeight) return;
          page.drawText(wrapped, { x: margin, y: y - size, size, font: useFont, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
        }
        y -= lineHeight * 0.4;
      });
    }

    const outBytes = await outDoc.save();
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${file.name.replace(/\.pptx$/i, "")}.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".pptx" onFilesSelect={addFiles} label="Drop .pptx files to convert to PDF" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts slide text only, one landscape PDF page per slide — images, backgrounds, and
        exact positioning from the original slides aren&apos;t preserved.
      </p>
    </div>
  );
}
