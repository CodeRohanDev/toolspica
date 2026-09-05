"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function HandwritingPracticeSheetGenerator() {
  const [text, setText] = React.useState("ABC abc");
  const [repeats, setRepeats] = React.useState(6);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 816;
    const height = 1056;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const rowHeight = 90;
    const marginTop = 60;
    const marginX = 50;

    for (let r = 0; r < repeats; r++) {
      const baseY = marginTop + r * rowHeight;
      const topY = baseY - 40;
      const midY = baseY - 20;
      const bottomY = baseY;

      // Guide lines: top (dashed), midline (dashed), baseline (solid)
      ctx.strokeStyle = "#93c5fd";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(marginX, topY);
      ctx.lineTo(width - marginX, topY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(marginX, midY);
      ctx.lineTo(width - marginX, midY);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.strokeStyle = "#1e40af";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(marginX, bottomY);
      ctx.lineTo(width - marginX, bottomY);
      ctx.stroke();

      // Traceable text: first instance solid, rest faded (dashed-style via low opacity)
      ctx.font = "48px 'Comic Sans MS', cursive, sans-serif";
      ctx.textBaseline = "alphabetic";
      ctx.globalAlpha = r === 0 ? 1 : 0.25;
      ctx.fillStyle = "#111827";
      let x = marginX + 10;
      const repeatCount = Math.floor((width - marginX * 2) / (ctx.measureText(text + "  ").width || 100));
      for (let i = 0; i < Math.max(1, repeatCount); i++) {
        ctx.fillText(text, x, bottomY - 4);
        x += ctx.measureText(text + "   ").width;
      }
      ctx.globalAlpha = 1;
    }
  }, [text, repeats]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "handwriting-practice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <Label className="text-sm text-muted-foreground">Text to practice</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Rows</Label>
          <input
            type="number"
            min={2}
            max={11}
            value={repeats}
            onChange={(e) => setRepeats(Number(e.target.value))}
            className="mt-1.5 w-20 rounded-md border bg-transparent px-2.5 py-1.5 text-sm"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-h-[500px] w-full max-w-[400px] rounded-lg border" style={{ aspectRatio: "8.5 / 11" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG (Letter size)
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The first row shows the full text solid; remaining rows fade lighter as tracing guides
        against ruled writing lines.
      </p>
    </div>
  );
}
