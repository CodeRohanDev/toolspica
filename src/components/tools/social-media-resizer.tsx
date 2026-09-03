"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "X (Twitter) Post", width: 1600, height: 900 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
];

export function SocialMediaResizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [preset, setPreset] = React.useState(PRESETS[0]);
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

  const process = React.useCallback(
    async (targetFile: File, targetWidth: number, targetHeight: number) => {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d")!;

      // Cover-fit: scale to fill the target box, cropping any overflow.
      const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const offsetX = (targetWidth - drawWidth) / 2;
      const offsetY = (targetHeight - drawHeight) / 2;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    },
    []
  );

  React.useEffect(() => {
    if (file) process(file, preset.width, preset.height);
  }, [file, preset, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            type="button"
            size="sm"
            variant={preset.label === p.label ? "default" : "outline"}
            onClick={() => setPreset(p)}
          >
            {p.label}
            <span className="ml-1 text-xs opacity-70">
              {p.width}×{p.height}
            </span>
          </Button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob &&
            file &&
            downloadBlob(resultBlob, `${stripExtension(file.name)}-${preset.width}x${preset.height}.jpg`)
          }
        />
      </div>
    </div>
  );
}
