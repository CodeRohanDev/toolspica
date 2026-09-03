"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

function drawMemeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number
) {
  ctx.font = `bold ${fontSize}px Impact, "Arial Narrow", sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = fontSize / 12;
  ctx.lineJoin = "round";

  const words = text.toUpperCase().split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  lines.forEach((line, i) => {
    const lineY = y + i * fontSize * 1.1;
    ctx.strokeText(line, x, lineY);
    ctx.fillText(line, x, lineY);
  });
}

export function MemeGenerator() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [topText, setTopText] = React.useState("TOP TEXT");
  const [bottomText, setBottomText] = React.useState("BOTTOM TEXT");
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

  const process = React.useCallback(async (targetFile: File, top: string, bottom: string) => {
    const img = await loadImageFromFile(targetFile);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const fontSize = Math.max(24, Math.round(canvas.width / 12));
    const maxWidth = canvas.width * 0.9;
    if (top.trim()) drawMemeText(ctx, top, canvas.width / 2, fontSize * 1.2, maxWidth, fontSize);
    if (bottom.trim())
      drawMemeText(ctx, bottom, canvas.width / 2, canvas.height - fontSize * 0.6, maxWidth, fontSize);

    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  }, []);

  React.useEffect(() => {
    if (file) process(file, topText, bottomText);
  }, [file, topText, bottomText, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() => resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-meme.png`)}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="meme-top" className="text-sm text-muted-foreground">
            Top text
          </Label>
          <Input id="meme-top" value={topText} onChange={(e) => setTopText(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="meme-bottom" className="text-sm text-muted-foreground">
            Bottom text
          </Label>
          <Input
            id="meme-bottom"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
}
