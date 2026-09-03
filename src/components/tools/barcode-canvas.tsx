"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BarcodeCanvasProps {
  widths: number[];
  label?: string;
  moduleWidth?: number;
  height?: number;
  filename?: string;
}

export function BarcodeCanvas({
  widths,
  label,
  moduleWidth = 2,
  height = 80,
  filename = "barcode",
}: BarcodeCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const totalModules = widths.reduce((a, b) => a + b, 0);
  const quietZone = 10;
  const labelHeight = label ? 24 : 0;
  const pixelWidth = totalModules * moduleWidth + quietZone * 2;
  const pixelHeight = height + labelHeight;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pixelWidth, pixelHeight);
    ctx.fillStyle = "#000000";

    let x = quietZone;
    let isBar = true;
    for (const width of widths) {
      const pxWidth = width * moduleWidth;
      if (isBar) ctx.fillRect(x, 0, pxWidth, height);
      x += pxWidth;
      isBar = !isBar;
    }

    if (label) {
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(label, pixelWidth / 2, height + 18);
    }
  }, [widths, label, moduleWidth, height, pixelWidth, pixelHeight]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        className="max-w-full rounded-lg border"
        style={{ imageRendering: "pixelated" }}
      />
      <Button type="button" variant="outline" size="sm" onClick={download}>
        <Download className="size-3.5" /> Download PNG
      </Button>
    </div>
  );
}
