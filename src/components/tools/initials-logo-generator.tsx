"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#111827"];
const SHAPES = ["circle", "square", "rounded"] as const;

export function InitialsLogoGenerator() {
  const [initials, setInitials] = React.useState("JD");
  const [colorIndex, setColorIndex] = React.useState(0);
  const [shape, setShape] = React.useState<(typeof SHAPES)[number]>("circle");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const size = 240;
    canvas.width = size * 2;
    canvas.height = size * 2;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = COLORS[colorIndex];
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "rounded") {
      const r = 32;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 96px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials.slice(0, 2).toUpperCase(), size / 2, size / 2 + 6);
  }, [initials, colorIndex, shape]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Initials (1-2 letters)</Label>
      <Input value={initials} onChange={(e) => setInitials(e.target.value.slice(0, 2))} className="mt-1.5 w-24" maxLength={2} />

      <div className="mt-4 flex flex-wrap gap-2">
        {COLORS.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => setColorIndex(i)}
            className={`size-8 rounded-full border-2 ${i === colorIndex ? "border-foreground" : "border-transparent"}`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        {SHAPES.map((s) => (
          <Button key={s} type="button" size="sm" variant={s === shape ? "default" : "outline"} onClick={() => setShape(s)}>
            {s}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
