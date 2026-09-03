"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { flattenWords, wordsToRows } from "@/lib/ocr-table";
import { buildXlsx } from "@/lib/pdf/xlsx-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function TableOcr() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState<string[][]>([]);
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setRows([]);
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setRows([]);
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const worker = await import("tesseract.js");
      const w = await worker.createWorker("eng", 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
      const { data } = await w.recognize(file, {}, { blocks: true });
      await w.terminate();
      setRows(wordsToRows(flattenWords(data)));
    } catch {
      setError("Couldn't extract a table from this image.");
    }
  }

  function download() {
    const xlsx = buildXlsx(rows);
    downloadBytesFile(xlsx, `${stripPdfExtension(file!.name)}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Extract table"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {rows.length > 0 && (
        <div className="mt-4">
          <div className="overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="border-r px-2 py-1 last:border-0">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button type="button" className="mt-3" onClick={download}>
            <Download className="size-4" /> Download as Excel
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text and reconstructs rows/columns from word position, the same heuristic used by our PDF table tools. Works best on tables with clear, evenly-spaced columns; tightly-packed or skewed photos may merge adjacent columns.
      </p>
    </div>
  );
}
