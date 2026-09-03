"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractRows } from "@/lib/pdf/pdf-table-extract";
import { buildXlsx } from "@/lib/pdf/xlsx-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
  width: number;
}

export function PdfToExcel() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setDone(false);
    setError(null);
    setLoading(true);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      const allRows: string[][] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const items = (content.items as TextItemLike[]).map((it) => ({
          str: it.str,
          x: it.transform[4],
          y: it.transform[5],
          width: it.width,
        }));
        allRows.push(...extractRows(items));
      }
      if (allRows.length === 0) throw new Error("No extractable table data found in this PDF.");

      const xlsxBytes = buildXlsx(allRows);
      downloadBytesFile(xlsxBytes, `${stripPdfExtension(picked.name)}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract table data — the PDF may be corrupted, password-protected, or scanned images without embedded text.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {!file && <PdfUploadZone file={file} onFileSelect={handleFile} onClear={() => setFile(null)} />}

      {file && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm">{file.name}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
              Choose a different file
            </Button>
          </div>

          {loading && <p className="mt-3 text-sm text-muted-foreground">Converting to Excel...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {done && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Download className="size-4" /> Excel file downloaded.
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Reconstructs rows and columns from text position on the page — a heuristic that works
        well for clean, evenly-spaced tables but is approximate for complex or irregular layouts.
      </p>
    </div>
  );
}
