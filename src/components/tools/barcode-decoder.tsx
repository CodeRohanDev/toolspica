"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";

export function BarcodeDecoder() {
  const [result, setResult] = React.useState<string | null>(null);
  const [format, setFormat] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResult(null);
    setFormat(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Wait a tick for the <img> to receive the new src before decoding.
    requestAnimationFrame(async () => {
      const img = imgRef.current;
      if (!img) return;
      const decodeNow = async () => {
        try {
          const { BrowserMultiFormatReader } = await import("@zxing/library");
          const reader = new BrowserMultiFormatReader();
          const decoded = await reader.decodeFromImageElement(img);
          setResult(decoded.getText());
          setFormat(decoded.getBarcodeFormat().toString());
        } catch {
          setError("No barcode found in this image.");
        }
      };
      if (img.complete) decodeNow();
      else img.onload = decodeNow;
    });
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload a barcode image
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {previewUrl && (
        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={previewUrl} alt="Uploaded barcode" className="max-h-48 rounded-lg border object-contain" crossOrigin="anonymous" />
          <div className="min-w-0 flex-1">
            {error && <p className="text-sm text-destructive">{error}</p>}
            {result && (
              <>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{format}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Decoded content</p>
                  <CopyButton value={result} />
                </div>
                <p className="mt-2 break-all rounded-md border bg-muted/40 p-3 font-mono text-sm">{result}</p>
              </>
            )}
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Supports UPC, EAN, Code 128, Code 39, ITF, and other common 1D barcode formats — no
        camera needed.
      </p>
    </div>
  );
}
