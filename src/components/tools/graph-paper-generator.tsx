"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PRESETS = [
  { name: "Standard grid", spacing: 20, bold: 0 },
  { name: "Graph (bold every 5)", spacing: 20, bold: 5 },
  { name: "Dot grid", spacing: 24, bold: 0, dots: true },
  { name: "Isometric", spacing: 24, bold: 0, isometric: true },
];

export function GraphPaperGenerator() {
  const [presetIndex, setPresetIndex] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const preset = PRESETS[presetIndex];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 816; // 8.5in @ 96dpi
    const height = 1056; // 11in @ 96dpi
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const spacing = preset.spacing;

    if (preset.dots) {
      ctx.fillStyle = "#94a3b8";
      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (preset.isometric) {
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      const angle = Math.PI / 6;
      for (let offset = -height; offset < width + height; offset += spacing) {
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + height / Math.tan(angle), height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset - height / Math.tan(angle), height);
        ctx.stroke();
      }
    } else {
      let col = 0;
      for (let x = 0; x <= width; x += spacing, col++) {
        ctx.strokeStyle = preset.bold && col % preset.bold === 0 ? "#94a3b8" : "#cbd5e1";
        ctx.lineWidth = preset.bold && col % preset.bold === 0 ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      let row = 0;
      for (let y = 0; y <= height; y += spacing, row++) {
        ctx.strokeStyle = preset.bold && row % preset.bold === 0 ? "#94a3b8" : "#cbd5e1";
        ctx.lineWidth = preset.bold && row % preset.bold === 0 ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  }, [preset]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "graph-paper.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Style</Label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <Button key={p.name} type="button" size="sm" variant={i === presetIndex ? "default" : "outline"} onClick={() => setPresetIndex(i)}>
            {p.name}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-h-[500px] w-full max-w-[400px] rounded-lg border" style={{ aspectRatio: "8.5 / 11" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG (Letter size)
        </Button>
      </div>
    </div>
  );
}
