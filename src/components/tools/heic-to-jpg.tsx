"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { decodeHeicToCanvas } from "@/lib/heic-decoder";

export function HeicToJpg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setLoading(true);
    try {
      const canvas = await decodeHeicToCanvas(picked);
      const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this HEIC file.");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setFile(null);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard
          file={file}
          previewUrl={null}
          onFileSelect={handleFile}
          onClear={clear}
          accept=".heic,.heif,image/heic,image/heif"
          label={loading ? "Decoding HEIC..." : "Upload a HEIC/HEIF file"}
        />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}.jpg`)}
        />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        HEIC (used by default on iPhone) decodes entirely in your browser via WebAssembly — nothing
        is uploaded. Most cameras save two images (a full photo and a thumbnail) inside one HEIC
        file; this converts the primary, full-resolution image.
      </p>
    </div>
  );
}
