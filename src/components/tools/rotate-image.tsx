"use client";

import * as React from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import {
  loadImageFromFile,
  canvasToBlob,
  downloadBlob,
  stripExtension,
} from "@/lib/image-processing";

export function RotateImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState(0);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setRotation(0);
  }

  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
    setRotation(0);
  }

  const process = React.useCallback(async (targetFile: File, degrees: number) => {
    const img = await loadImageFromFile(targetFile);
    const swap = degrees % 180 !== 0;
    const canvas = document.createElement("canvas");
    canvas.width = swap ? img.height : img.width;
    canvas.height = swap ? img.width : img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    const blob = await canvasToBlob(canvas, targetFile.type || "image/png", 0.92);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, rotation);
  }, [file, rotation, process]);

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
            downloadBlob(resultBlob, `${stripExtension(file.name)}-rotated.png`)
          }
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!file}
          onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
        >
          <RotateCcw className="size-4" /> Rotate left 90°
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!file}
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          <RotateCw className="size-4" /> Rotate right 90°
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!file}
          onClick={() => setRotation((r) => (r + 180) % 360)}
        >
          Rotate 180°
        </Button>
      </div>
    </div>
  );
}
