"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const STYLES = [
  { name: "Elegant", font: "'Brush Script MT', cursive", size: 64 },
  { name: "Casual", font: "'Segoe Script', 'Comic Sans MS', cursive", size: 52 },
  { name: "Bold", font: "Georgia, serif", size: 56, italic: true },
  { name: "Classic", font: "'Times New Roman', serif", size: 54, italic: true },
];

export function HandwrittenSignatureGenerator() {
  const [name, setName] = React.useState("");
  const [styleIndex, setStyleIndex] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const style = STYLES[styleIndex];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 500;
    const height = 160;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111111";
    ctx.font = `${style.italic ? "italic " : ""}${style.size}px ${style.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name || "Your Name", width / 2, height / 2);
  }, [name, style]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Your name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />

      <div className="mt-3 flex flex-wrap gap-2">
        {STYLES.map((s, i) => (
          <Button key={s.name} type="button" size="sm" variant={i === styleIndex ? "default" : "outline"} onClick={() => setStyleIndex(i)}>
            {s.name}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-w-full rounded-lg border bg-white" />
        <Button type="button" onClick={download} disabled={!name.trim()}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
