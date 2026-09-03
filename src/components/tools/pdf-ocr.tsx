"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { CopyButton } from "@/components/tools/copy-button";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadTextFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function PdfOcr() {
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setText("");
    setError(null);
    setLoading(true);
    try {
      const { createWorker } = await import("tesseract.js");
      const buffer = await picked.arrayBuffer();
      const doc = await loadPdfDocument(new Uint8Array(buffer));

      setStatus("Loading OCR engine...");
      const worker = await createWorker("eng", 1, {
        corePath: "/tesseract-core",
        workerPath: "/tesseract-worker.min.js",
        logger: (m) => {
          if (m.status === "recognizing text") {
            setStatus(`Recognizing text... ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      const pages: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        setStatus(`Rendering page ${i} of ${doc.numPages}...`);
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 2.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        setStatus(`Recognizing text on page ${i} of ${doc.numPages}...`);
        const { data } = await worker.recognize(canvas);
        pages.push(data.text.trim());
      }

      await worker.terminate();
      setText(pages.join("\n\n---\n\n"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't run OCR on this PDF.");
    } finally {
      setLoading(false);
      setStatus("");
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

          {loading && <p className="mt-3 text-sm text-muted-foreground">{status || "Working..."}</p>}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {text && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recognized text</p>
                <div className="flex gap-2">
                  <CopyButton value={text} />
                  <Button type="button" size="sm" onClick={() => downloadTextFile(text, `${stripPdfExtension(file.name)}-ocr.txt`, "text/plain")}>
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

      <p className="mt-3 text-xs text-muted-foreground">
        Renders each page to an image and recognizes text with an in-browser OCR engine (English) —
        built for scanned pages and image-only PDFs that have no embedded text layer. The first run
        downloads a small language model; recognition itself happens entirely on your device.
      </p>
    </div>
  );
}
