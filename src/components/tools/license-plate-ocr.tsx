"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { CopyButton } from "@/components/tools/copy-button";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";

function cleanPlate(text: string): string {
  return text.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function LicensePlateOcr() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [plate, setPlate] = React.useState("");
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setPlate("");
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setPlate("");
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const data = await recognize(file);
      setPlate(cleanPlate(data.text));
    } catch {
      // error already set by hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Read license plate"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {plate && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border bg-muted/40 p-4">
          <p className="font-mono text-2xl font-bold tracking-widest">{plate || "—"}</p>
          <CopyButton value={plate} />
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Recognizes text and strips it down to letters and numbers only, matching a plate&apos;s typical format. Works best on a cropped, well-lit, front-on photo of just the plate — accuracy drops on angled shots or a photo with lots of surrounding vehicle visible.
      </p>
    </div>
  );
}
