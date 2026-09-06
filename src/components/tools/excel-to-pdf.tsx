"use client";

import * as React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { readZip, readZipEntryText, type ZipReadEntry } from "@/lib/pdf/zip-reader";

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
  const convert = React.useCallback(async (file: File) => {
    const buffer = new Uint8Array(await file.arrayBuffer());
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
    const blob = new Blob([outBytes as BlobPart], { type: "application/pdf" });
    return { blob, name: `${file.name.replace(/\.xlsx$/i, "")}.pdf` };
  }, []);

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept=".xlsx" onFilesSelect={addFiles} label="Drop .xlsx files to convert to PDF" />

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-pdfs.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        Renders each spreadsheet&apos;s first sheet as a simple grid — cell values only, columns
        auto-sized evenly. Formulas, formatting, charts, and additional sheets aren&apos;t carried
        over.
      </p>
    </div>
  );
}
