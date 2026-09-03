"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob } from "@/lib/image-processing";

export function ImageCompare() {
  const [fileA, setFileA] = React.useState<File | null>(null);
  const [urlA, setUrlA] = React.useState<string | null>(null);
  const [fileB, setFileB] = React.useState<File | null>(null);
  const [urlB, setUrlB] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [diffPercent, setDiffPercent] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const process = React.useCallback(async (a: File, b: File) => {
    setError(null);
    const [imgA, imgB] = await Promise.all([loadImageFromFile(a), loadImageFromFile(b)]);
    if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
      setError(
        `Images must be the same size to compare (${imgA.width}×${imgA.height} vs ${imgB.width}×${imgB.height}).`
      );
      setResultUrl(null);
      return;
    }
    const canvasA = document.createElement("canvas");
    canvasA.width = imgA.width;
    canvasA.height = imgA.height;
    const ctxA = canvasA.getContext("2d")!;
    ctxA.drawImage(imgA, 0, 0);
    const dataA = ctxA.getImageData(0, 0, canvasA.width, canvasA.height);

    const canvasB = document.createElement("canvas");
    canvasB.width = imgB.width;
    canvasB.height = imgB.height;
    const ctxB = canvasB.getContext("2d")!;
    ctxB.drawImage(imgB, 0, 0);
    const dataB = ctxB.getImageData(0, 0, canvasB.width, canvasB.height);

    const output = new Uint8ClampedArray(dataA.data.length);
    let diffPixels = 0;
    const totalPixels = canvasA.width * canvasA.height;
    for (let i = 0; i < dataA.data.length; i += 4) {
      const dr = Math.abs(dataA.data[i] - dataB.data[i]);
      const dg = Math.abs(dataA.data[i + 1] - dataB.data[i + 1]);
      const db = Math.abs(dataA.data[i + 2] - dataB.data[i + 2]);
      const changed = dr + dg + db > 30;
      if (changed) {
        diffPixels++;
        output[i] = 255;
        output[i + 1] = 0;
        output[i + 2] = 0;
        output[i + 3] = 255;
      } else {
        // Dimmed grayscale of original as context
        const gray = (dataA.data[i] + dataA.data[i + 1] + dataA.data[i + 2]) / 3;
        output[i] = gray;
        output[i + 1] = gray;
        output[i + 2] = gray;
        output[i + 3] = 120;
      }
    }
    const resultCanvas = document.createElement("canvas");
    resultCanvas.width = canvasA.width;
    resultCanvas.height = canvasA.height;
    resultCanvas.getContext("2d")!.putImageData(new ImageData(output, canvasA.width, canvasA.height), 0, 0);
    const blob = await canvasToBlob(resultCanvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
    setDiffPercent((diffPixels / totalPixels) * 100);
  }, []);

  React.useEffect(() => {
    if (fileA && fileB) process(fileA, fileB);
  }, [fileA, fileB, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard
          file={fileA}
          previewUrl={urlA}
          onFileSelect={(f) => {
            setFileA(f);
            setUrlA(URL.createObjectURL(f));
          }}
          onClear={() => {
            setFileA(null);
            setUrlA(null);
            setResultUrl(null);
          }}
          label="Image A"
        />
        <ImageUploadCard
          file={fileB}
          previewUrl={urlB}
          onFileSelect={(f) => {
            setFileB(f);
            setUrlB(URL.createObjectURL(f));
          }}
          onClear={() => {
            setFileB(null);
            setUrlB(null);
            setResultUrl(null);
          }}
          label="Image B"
        />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {resultUrl && (
        <div className="mt-5">
          <ImageResultCard
            previewUrl={resultUrl}
            fileSize={resultBlob?.size}
            label="Differences (highlighted in red)"
            onDownload={() => resultBlob && downloadBlob(resultBlob, "image-diff.png")}
          />
          {diffPercent !== null && (
            <p className="mt-2 text-sm text-muted-foreground">
              {diffPercent.toFixed(2)}% of pixels differ.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
