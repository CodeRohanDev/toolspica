"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { buildIco } from "@/lib/ico-writer";

const SIZES = [16, 32, 48, 64, 128, 256];

export function IcoConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  const process = React.useCallback(async (targetFile: File) => {
    const img = await loadImageFromFile(targetFile);
    const entries = await Promise.all(
      SIZES.map(async (size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await canvasToBlob(canvas, "image/png");
        return { size, pngData: new Uint8Array(await blob.arrayBuffer()) };
      })
    );
    const icoBytes = buildIco(entries);
    const blob = new Blob([icoBytes as BlobPart], { type: "image/x-icon" });
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}.ico`)}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Bundles {SIZES.join(", ")}px versions into a single multi-size .ico file — the standard
        format for website favicons and Windows application icons.
      </p>
    </div>
  );
}
