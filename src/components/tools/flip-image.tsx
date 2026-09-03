"use client";

import * as React from "react";
import { FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import {
  loadImageFromFile,
  canvasToBlob,
  downloadBlob,
  stripExtension,
} from "@/lib/image-processing";

export function FlipImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [flipH, setFlipH] = React.useState(false);
  const [flipV, setFlipV] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setFlipH(false);
    setFlipV(false);
  }

  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
  }

  const process = React.useCallback(async (targetFile: File, h: boolean, v: boolean) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(h ? canvas.width : 0, v ? canvas.height : 0);
    ctx.scale(h ? -1 : 1, v ? -1 : 1);
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, targetFile.type || "image/png", 0.92);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, flipH, flipV);
  }, [file, flipH, flipV, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard
          file={file}
          previewUrl={originalUrl}
          onFileSelect={handleFile}
          onClear={clear}
        />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob &&
            file &&
            downloadBlob(resultBlob, `${stripExtension(file.name)}-flipped.png`)
          }
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <Button
          type="button"
          variant={flipH ? "default" : "outline"}
          size="sm"
          disabled={!file}
          onClick={() => setFlipH((v) => !v)}
        >
          <FlipHorizontal className="size-4" /> Flip horizontal
        </Button>
        <Button
          type="button"
          variant={flipV ? "default" : "outline"}
          size="sm"
          disabled={!file}
          onClick={() => setFlipV((v) => !v)}
        >
          <FlipVertical className="size-4" /> Flip vertical
        </Button>
      </div>
    </div>
  );
}
