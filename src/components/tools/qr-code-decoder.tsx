"use client";

import * as React from "react";
import jsQR from "jsqr";
import { Upload } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";

export function QrCodeDecoder() {
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResult(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setResult(code.data);
      } else {
        setError("No QR code found in this image.");
      }
    };
    img.src = url;
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload a QR code image
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {previewUrl && (
        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Uploaded QR code" className="max-h-48 rounded-lg border object-contain" />
          <div className="min-w-0 flex-1">
            {error && <p className="text-sm text-destructive">{error}</p>}
            {result && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Decoded content</p>
                  <CopyButton value={result} />
                </div>
                <p className="mt-2 break-all rounded-md border bg-muted/40 p-3 font-mono text-sm">{result}</p>
                {/^https?:\/\//i.test(result) && (
                  <a href={result} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary underline">
                    Open link
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Works from an uploaded image — no camera access needed.
      </p>
    </div>
  );
}
