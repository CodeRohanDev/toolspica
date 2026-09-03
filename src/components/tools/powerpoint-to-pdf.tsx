"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { readZip, readZipEntryText } from "@/lib/pdf/zip-reader";
import { downloadPdfBytes } from "@/lib/pdf/pdf-helpers";

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
      downloadPdfBytes(outBytes, `${picked.name.replace(/\.pptx$/i, "")}.pdf`);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this file — make sure it's a valid .pptx file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".pptx"
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
          <span className="text-sm font-medium">Click to upload a .pptx file</span>
          <span className="text-xs text-muted-foreground">PowerPoint 2007+ format (.pptx)</span>
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
        Extracts slide text only, one landscape PDF page per slide — images, backgrounds, and
        exact positioning from the original slides aren&apos;t preserved.
      </p>
    </div>
  );
}
