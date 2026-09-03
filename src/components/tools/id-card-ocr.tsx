"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { CopyButton } from "@/components/tools/copy-button";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { downloadTextFile } from "@/lib/pdf/pdf-helpers";
import { stripExtension } from "@/lib/image-processing";

export function IdCardOcr() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [text, setText] = React.useState("");
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setText("");
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setText("");
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const data = await recognize(file);
      setText(data.text.trim());
    } catch {
      // error already set by hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Extract ID card text"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {text && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recognized text</p>
            <div className="flex gap-2">
              <CopyButton value={text} />
              <Button type="button" size="sm" onClick={() => downloadTextFile(text, `${stripExtension(file!.name)}.txt`)}>
                <Download className="size-3.5" /> Download .txt
              </Button>
            </div>
          </div>
          <pre className="mt-1.5 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">{text}</pre>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Extracts printed text from an ID card photo entirely on your device — nothing is ever uploaded, which matters given how sensitive ID document content is. This is generic OCR, not structured field parsing (name/DOB/ID number aren&apos;t separated automatically).
      </p>
    </div>
  );
}
