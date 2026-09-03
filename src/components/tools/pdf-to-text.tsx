"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { CopyButton } from "@/components/tools/copy-button";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadTextFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfToText() {
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setText("");
    setError(null);
    setLoading(true);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      const pageTexts: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => ("str" in item ? item.str : "")).join(" ");
        pageTexts.push(pageText);
      }
      setText(pageTexts.join("\n\n"));
    } catch {
      setError("Couldn't extract text — the PDF may be corrupted, password-protected, or scanned images without embedded text.");
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

          {loading && <p className="mt-3 text-sm text-muted-foreground">Extracting text...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {text && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Extracted text
                </p>
                <div className="flex gap-2">
                  <CopyButton value={text} />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => downloadTextFile(text, `${stripPdfExtension(file.name)}.txt`)}
                  >
                    <Download className="size-3.5" /> Download .txt
                  </Button>
                </div>
              </div>
              <pre className="mt-1.5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">
                {text}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
