"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { buildDocx } from "@/lib/pdf/docx-writer";
import { downloadBytesFile, stripPdfExtension } from "@/lib/pdf/pdf-helpers";

export function OcrToWord() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setDone(false);
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setDone(false);
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const data = await recognize(file);
      const paragraphs = data.text.split("\n").map((line) => line.trim()).filter(Boolean).map((text) => ({ text }));
      if (paragraphs.length === 0) throw new Error("No text recognized in this image.");
      const docx = buildDocx(paragraphs);
      downloadBytesFile(docx, `${stripPdfExtension(file.name)}.docx`, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't extract text from this image.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Recognize and download as Word"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {done && <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">Word document downloaded.</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text from an image and saves it directly as an editable .docx Word document — each recognized line becomes its own paragraph. Runs entirely in your browser, no upload.
      </p>
    </div>
  );
}
