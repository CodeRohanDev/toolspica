"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { ImageResultCard } from "@/components/tools/image-result-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";

const POSITIONS = [
  { value: "bottom-right", label: "Bottom right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "top-right", label: "Top right" },
  { value: "top-left", label: "Top left" },
  { value: "center", label: "Center" },
];

export function ImageWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [text, setText] = React.useState("© Your Name");
  const [position, setPosition] = React.useState("bottom-right");
  const [opacity, setOpacity] = React.useState(0.6);
  const [fontSize, setFontSize] = React.useState(5);
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
    async (targetFile: File, label: string, pos: string, op: number, sizePct: number) => {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      if (label.trim()) {
        const size = Math.max(12, (sizePct / 100) * canvas.width);
        ctx.font = `bold ${size}px sans-serif`;
        ctx.globalAlpha = op;
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = size / 12;
        const metrics = ctx.measureText(label);
        const padding = size * 0.6;
        let x = padding;
        let y = canvas.height - padding;
        if (pos.includes("right")) x = canvas.width - metrics.width - padding;
        if (pos === "center") {
          x = (canvas.width - metrics.width) / 2;
          y = canvas.height / 2;
        }
        if (pos.includes("top")) y = padding + size;
        ctx.textBaseline = "alphabetic";
        ctx.strokeText(label, x, y);
        ctx.fillText(label, x, y);
        ctx.globalAlpha = 1;
      }

      const blob = await canvasToBlob(canvas, "image/png");
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    },
    []
  );

  React.useEffect(() => {
    if (file) process(file, text, position, opacity, fontSize);
  }, [file, text, position, opacity, fontSize, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />
        <ImageResultCard
          previewUrl={resultUrl}
          fileSize={resultBlob?.size}
          onDownload={() =>
            resultBlob && file && downloadBlob(resultBlob, `${stripExtension(file.name)}-watermarked.png`)
          }
        />
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="wm-text" className="text-sm text-muted-foreground">
            Watermark text
          </Label>
          <Input
            id="wm-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <Label className="text-sm text-muted-foreground">Position</Label>
            <Select value={position} onValueChange={(v) => v && setPosition(v)}>
              <SelectTrigger className="mt-1.5 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="wm-size" className="shrink-0 text-sm text-muted-foreground">
              Size
            </Label>
            <input
              id="wm-size"
              type="range"
              min={2}
              max={12}
              step={0.5}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="wm-opacity" className="shrink-0 text-sm text-muted-foreground">
              Opacity
            </Label>
            <input
              id="wm-opacity"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
