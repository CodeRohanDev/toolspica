"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { readZip, readZipEntryText, type ZipReadEntry } from "@/lib/pdf/zip-reader";
import { downloadPdfBytes } from "@/lib/pdf/pdf-helpers";

function parseSharedStrings(xml: string | null): string[] {
  if (!xml) return [];
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  return Array.from(doc.getElementsByTagNameNS(ns, "si")).map((si) =>
    Array.from(si.getElementsByTagNameNS(ns, "t")).map((t) => t.textContent ?? "").join("")
  );
}

function colToIndex(ref: string): number {
  const letters = ref.match(/^[A-Z]+/)?.[0] ?? "A";
  let index = 0;
  for (const ch of letters) index = index * 26 + (ch.charCodeAt(0) - 64);
  return index - 1;
}

function parseSheet(xml: string, sharedStrings: string[]): string[][] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  const rowEls = Array.from(doc.getElementsByTagNameNS(ns, "row"));
  const rows: string[][] = [];

  for (const rowEl of rowEls) {
    const cells = Array.from(rowEl.getElementsByTagNameNS(ns, "c"));
    const row: string[] = [];
    for (const c of cells) {
      const ref = c.getAttribute("r") ?? "";
      const idx = ref ? colToIndex(ref) : row.length;
      const type = c.getAttribute("t");
      let value = "";
      if (type === "inlineStr") {
        value = c.getElementsByTagNameNS(ns, "t")[0]?.textContent ?? "";
      } else {
        const v = c.getElementsByTagNameNS(ns, "v")[0]?.textContent ?? "";
        value = type === "s" ? (sharedStrings[Number(v)] ?? "") : v;
      }
      while (row.length < idx) row.push("");
      row[idx] = value;
    }
    rows.push(row);
  }
  return rows;
}

async function findFirstSheet(entries: ZipReadEntry[]): Promise<string | null> {
  const direct = await readZipEntryText(entries, "xl/worksheets/sheet1.xml");
  if (direct) return direct;
  const anySheet = entries.find((e) => /^xl\/worksheets\/sheet\d+\.xml$/.test(e.name));
  if (!anySheet) return null;
  return new TextDecoder().decode(await anySheet.getData());
}

export function ExcelToPdf() {
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
      const sheetXml = await findFirstSheet(entries);
      if (!sheetXml) throw new Error("This doesn't look like a valid .xlsx file.");
      const sharedXml = await readZipEntryText(entries, "xl/sharedStrings.xml");
      const sharedStrings = parseSharedStrings(sharedXml);
      const rows = parseSheet(sheetXml, sharedStrings).map((r) => r.map((c) => c ?? ""));
      if (rows.length === 0) throw new Error("No data found in this spreadsheet.");

      const colCount = Math.max(...rows.map((r) => r.length), 1);
      const outDoc = await PDFDocument.create();
      const font = await outDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await outDoc.embedFont(StandardFonts.HelveticaBold);
      const pageWidth = Math.max(612, 90 * colCount + 80);
      const pageHeight = 792;
      const margin = 40;
      const colWidth = (pageWidth - margin * 2) / colCount;
      const rowHeight = 20;

      let page = outDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      rows.forEach((row, rowIdx) => {
        if (y < margin + rowHeight) {
          page = outDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        const useFont = rowIdx === 0 ? boldFont : font;
        for (let c = 0; c < colCount; c++) {
          const text = (row[c] ?? "").slice(0, 40);
          page.drawText(text, { x: margin + c * colWidth + 4, y: y - 14, size: 9, font: useFont, color: rgb(0.1, 0.1, 0.1) });
        }
        page.drawLine({
          start: { x: margin, y: y - rowHeight },
          end: { x: margin + colWidth * colCount, y: y - rowHeight },
          thickness: 0.5,
          color: rgb(0.85, 0.85, 0.85),
        });
        y -= rowHeight;
      });

      const outBytes = await outDoc.save();
      downloadPdfBytes(outBytes, `${picked.name.replace(/\.xlsx$/i, "")}.pdf`);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this file — make sure it's a valid .xlsx file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
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
          <span className="text-sm font-medium">Click to upload an .xlsx file</span>
          <span className="text-xs text-muted-foreground">Excel 2007+ format (.xlsx)</span>
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
        Renders the first sheet as a simple grid — cell values only, columns auto-sized evenly.
        Formulas, formatting, charts, and additional sheets aren&apos;t carried over.
      </p>
    </div>
  );
}
