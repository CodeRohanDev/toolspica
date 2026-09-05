"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const THEMES = [
  { bg: "#111827", fg: "#ffffff", accent: "#3b82f6" },
  { bg: "#ffffff", fg: "#111827", accent: "#dc2626" },
  { bg: "#0f766e", fg: "#ffffff", accent: "#fbbf24" },
  { bg: "#fef3c7", fg: "#111827", accent: "#b45309" },
];

const WIDTH = 1050; // 3.5in @ 300dpi
const HEIGHT = 600; // 2in @ 300dpi

export function BusinessCardDesigner() {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [themeIndex, setThemeIndex] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const theme = THEMES[themeIndex];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, 0, 16, HEIGHT);

    ctx.fillStyle = theme.fg;
    ctx.textAlign = "left";
    ctx.font = "bold 56px Arial, sans-serif";
    ctx.fillText(name || "Your Name", 70, 200);

    ctx.font = "32px Arial, sans-serif";
    ctx.globalAlpha = 0.85;
    ctx.fillText([title, company].filter(Boolean).join(" · ") || "Job Title · Company", 70, 250);
    ctx.globalAlpha = 1;

    ctx.fillStyle = theme.accent;
    ctx.fillRect(70, 300, 80, 4);

    ctx.fillStyle = theme.fg;
    ctx.font = "28px Arial, sans-serif";
    ctx.fillText(contact || "phone · email · website", 70, 370);
  }, [name, title, company, contact, theme]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "business-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Title & company</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Designer" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Company</Label>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Contact line</Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="555-1234 · jane@acme.com" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {THEMES.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setThemeIndex(i)}
            className={`size-8 rounded-full border-2 ${i === themeIndex ? "border-foreground" : "border-transparent"}`}
            style={{ backgroundColor: t.bg }}
            aria-label={`Theme ${i + 1}`}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="w-full max-w-md rounded-lg border" style={{ aspectRatio: "3.5 / 2" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
