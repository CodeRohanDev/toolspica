"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QrCanvasProps {
  matrix: number[][];
  size: number;
  moduleSize?: number;
  filename?: string;
}

export function QrCanvas({ matrix, size, moduleSize = 8, filename = "qrcode" }: QrCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const quietZone = 4; // modules of white border, per spec recommendation
  const pixelSize = (size + quietZone * 2) * moduleSize;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = pixelSize;
    canvas.height = pixelSize;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pixelSize, pixelSize);
    ctx.fillStyle = "#000000";

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 1) {
          ctx.fillRect(
            (c + quietZone) * moduleSize,
            (r + quietZone) * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }
  }, [matrix, size, moduleSize, pixelSize]);

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
        className="border"
        style={{
          width: Math.min(320, pixelSize),
          height: Math.min(320, pixelSize),
          imageRendering: "pixelated",
        }}
      />
      <Button type="button" variant="outline" size="sm" onClick={download}>
        <Download className="size-3.5" /> Download PNG
      </Button>
    </div>
  );
}
