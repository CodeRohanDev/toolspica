"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { CopyButton } from "@/components/tools/copy-button";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractRows, rowsToCsv } from "@/lib/pdf/pdf-table-extract";
import { downloadTextFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
  width: number;
}

export function PdfToCsv() {
  const [file, setFile] = React.useState<File | null>(null);
  const [csv, setCsv] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setCsv("");
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
      setCsv(rowsToCsv(allRows));
    } catch {
      setError("Couldn't extract table data — the PDF may be corrupted, password-protected, or scanned images without embedded text.");
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

          {loading && <p className="mt-3 text-sm text-muted-foreground">Extracting table data...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {csv && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">CSV preview</p>
                <div className="flex gap-2">
                  <CopyButton value={csv} />
                  <Button type="button" size="sm" onClick={() => downloadTextFile(csv, `${stripPdfExtension(file.name)}.csv`, "text/csv")}>
                    <Download className="size-3.5" /> Download .csv
                  </Button>
                </div>
              </div>
              <pre className="mt-1.5 max-h-[28rem] overflow-auto whitespace-pre rounded-lg border bg-muted/40 p-3 font-mono text-xs">
                {csv}
              </pre>
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Reconstructs rows and columns from text position on the page — a heuristic that works well
        for clean, evenly-spaced tables but is approximate for complex or irregular layouts.
      </p>
    </div>
  );
}
