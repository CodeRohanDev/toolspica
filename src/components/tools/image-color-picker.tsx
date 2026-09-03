"use client";

import * as React from "react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { CopyButton } from "@/components/tools/copy-button";
import { loadImageFromFile } from "@/lib/image-processing";

function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

export function ImageColorPicker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
  const [picked, setPicked] = React.useState<{ r: number; g: number; b: number } | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  async function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setPicked(null);
    const img = await loadImageFromFile(picked);
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    c.getContext("2d")!.drawImage(img, 0, 0);
    setCanvas(c);
  }

  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setCanvas(null);
    setPicked(null);
  }

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    if (!canvas || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);
    const data = canvas.getContext("2d")!.getImageData(x, y, 1, 1).data;
    setPicked({ r: data[0], g: data[1], b: data[2] });
  }

  const hex = picked ? `#${toHex(picked.r)}${toHex(picked.g)}${toHex(picked.b)}` : "";
  const rgb = picked ? `rgb(${picked.r}, ${picked.g}, ${picked.b})` : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {originalUrl ? (
            <div className="mt-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Click anywhere on the image to pick a color
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={originalUrl}
                alt="Uploaded"
                onClick={handleClick}
                className="mt-2 aspect-square w-full cursor-crosshair rounded-xl border object-contain"
              />
            </div>
          ) : (
            <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
          )}
          {file && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Choose a different image
            </button>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Picked color
          </p>
          <div className="mt-2 flex flex-col gap-3 rounded-xl border p-4">
            <div
              className="h-24 w-full rounded-lg border"
              style={{ backgroundColor: picked ? rgb : "transparent" }}
            />
            {picked ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{hex}</span>
                  <CopyButton value={hex} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{rgb}</span>
                  <CopyButton value={rgb} />
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Upload an image and click on it to sample a color.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
