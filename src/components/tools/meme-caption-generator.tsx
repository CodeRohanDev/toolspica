"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test.toUpperCase()).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawCaption(ctx: CanvasRenderingContext2D, text: string, width: number, y: number, alignBottom: boolean) {
  if (!text.trim()) return;
  const fontSize = Math.max(24, Math.round(width / 12));
  ctx.font = `bold ${fontSize}px Impact, 'Arial Black', sans-serif`;
  ctx.textAlign = "center";
  ctx.lineWidth = fontSize / 12;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#ffffff";

  const lines = wrapText(ctx, text, width * 0.9);
  const lineHeight = fontSize * 1.15;
  const startY = alignBottom ? y - lines.length * lineHeight : y;

  lines.forEach((line, i) => {
    const ly = startY + i * lineHeight;
    ctx.strokeText(line.toUpperCase(), width / 2, ly);
    ctx.fillText(line.toUpperCase(), width / 2, ly);
  });
}

export function MemeCaptionGenerator() {
  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  function render() {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !img || !ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    drawCaption(ctx, topText, canvas.width, canvas.height * 0.1 + 30, false);
    drawCaption(ctx, bottomText, canvas.width, canvas.height * 0.95, true);
  }

  React.useEffect(() => {
    if (imageLoaded) render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topText, bottomText, imageLoaded]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
    img.src = URL.createObjectURL(file);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {imageLoaded ? "Change image" : "Upload an image"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Top text</Label>
          <Input value={topText} onChange={(e) => setTopText(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Bottom text</Label>
          <Input value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="mt-1.5" />
        </div>
      </div>

      {imageLoaded && (
        <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
          <canvas ref={canvasRef} className="max-w-full rounded-lg border" />
          <Button type="button" onClick={download}>
            <Download className="size-4" /> Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}
