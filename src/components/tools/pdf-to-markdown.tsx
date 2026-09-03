"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { CopyButton } from "@/components/tools/copy-button";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { extractLines, linesToMarkdown } from "@/lib/pdf/pdf-text-lines";
import { downloadTextFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

interface TextItemLike {
  str: string;
  transform: number[];
}

export function PdfToMarkdown() {
  const [file, setFile] = React.useState<File | null>(null);
  const [markdown, setMarkdown] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setMarkdown("");
    setError(null);
    setLoading(true);
    try {
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));
      const sections: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const items = (content.items as TextItemLike[]).map((it) => ({
          str: it.str,
          x: it.transform[4],
          y: it.transform[5],
          fontSize: it.transform[0],
        }));
        sections.push(linesToMarkdown(extractLines(items)));
      }
      setMarkdown(sections.join("\n\n---\n\n"));
    } catch {
      setError("Couldn't convert this PDF — it may be corrupted, password-protected, or scanned images without embedded text.");
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

          {loading && <p className="mt-3 text-sm text-muted-foreground">Converting...</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {markdown && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Markdown</p>
                <div className="flex gap-2">
                  <CopyButton value={markdown} />
                  <Button type="button" size="sm" onClick={() => downloadTextFile(markdown, `${stripPdfExtension(file.name)}.md`, "text/markdown")}>
                    <Download className="size-3.5" /> Download .md
                  </Button>
                </div>
              </div>
              <pre className="mt-1.5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">
                {markdown}
              </pre>
            </div>
          )}
        </>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Headings are inferred from relative font size, since PDF has no built-in semantic
        structure — works well for typically-formatted documents, approximate for unusual layouts.
      </p>
    </div>
  );
}
