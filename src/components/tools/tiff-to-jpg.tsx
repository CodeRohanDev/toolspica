"use client";

import * as React from "react";
import { ImagePlus } from "lucide-react";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { canvasToBlob, downloadBlob, formatBytes, stripExtension } from "@/lib/image-processing";
import { decodeTiff } from "@/lib/tiff-decoder";

export function TiffToJpg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setError(null);
    setResultUrl(null);
    try {
      const buffer = await picked.arrayBuffer();
      const { width, height, pixels } = decodeTiff(buffer);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.putImageData(new ImageData(new Uint8ClampedArray(pixels), width, height), 0, 0);
      const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read this TIFF file.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 p-6 text-center hover:border-brand/50"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-muted">
          <ImagePlus className="size-5 text-muted-foreground" />
        </span>
        <p className="text-sm font-medium">Click to choose a TIFF file</p>
        <p className="text-xs text-muted-foreground">Processed locally in your browser — never uploaded</p>
        <input
          ref={inputRef}
          type="file"
          accept=".tif,.tiff,image/tiff"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {file && <p className="mt-2 text-xs text-muted-foreground">{file.name} · {formatBytes(file.size)}</p>}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {resultUrl && (
        <div className="mt-5 max-w-md">
          <ImageResultCard
            previewUrl={resultUrl}
            fileSize={resultBlob?.size}
            onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}.jpg`)}
          />
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Supports uncompressed and PackBits-compressed TIFF files — the common cases from most
        scanners and image editors. LZW-compressed TIFFs aren&apos;t currently supported and will
        show a clear error rather than a broken image.
      </p>
    </div>
  );
}
