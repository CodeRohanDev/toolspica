"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines } from "@/lib/pdf/pdf-text-lines";
import { buildDocx, type DocxParagraph } from "@/lib/pdf/docx-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToWord() {
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
      const paragraphs: DocxParagraph[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const items = (content.items as TextItemLike[]).map((it) => ({
          str: it.str,
          x: it.transform[4],
          y: it.transform[5],
          fontSize: it.transform[0],
        }));
        const lines = extractLines(items);
        if (lines.length === 0) continue;
        const sizes = lines.map((l) => l.fontSize);
        const median = [...sizes].sort((a, b) => a - b)[Math.floor(sizes.length / 2)];
        for (const line of lines) {
          if (!line.text) continue;
          paragraphs.push({ text: line.text, heading: line.fontSize > median * 1.4 });
        }
      }
      if (paragraphs.length === 0) throw new Error("No extractable text found in this PDF.");

      const docxBytes = buildDocx(paragraphs);
      downloadBytesFile(docxBytes, `${stripPdfExtension(picked.name)}.docx`, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this PDF — it may be corrupted, password-protected, or scanned images without embedded text.");
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

          {loading && <p className="mt-3 text-sm text-muted-foreground">Converting to Word...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {done && (
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Download className="size-4" /> Word document downloaded.
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts text as editable paragraphs with basic heading detection — a plain-text
        conversion, not a layout-preserving one, so columns, images, and tables aren&apos;t carried over.
      </p>
    </div>
  );
}
