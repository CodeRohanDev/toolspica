"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const WIDTH = 850;
const HEIGHT = 1100;

export function LetterheadGenerator() {
  const [companyName, setCompanyName] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [accentColor, setAccentColor] = React.useState("#2563eb");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, WIDTH, 12);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 32px Arial";
    ctx.fillText(companyName || "Your Company Name", 50, 90);

    if (tagline) {
      ctx.fillStyle = accentColor;
      ctx.font = "italic 16px Arial";
      ctx.fillText(tagline, 50, 120);
    }

    ctx.strokeStyle = "#e5e7eb";
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(WIDTH - 50, 150);
    ctx.stroke();

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    if (address) ctx.fillText(address, WIDTH - 50, 60);
    if (contact) ctx.fillText(contact, WIDTH - 50, 80);
    ctx.textAlign = "left";

    // Footer accent bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, HEIGHT - 12, WIDTH, 12);
  }, [companyName, tagline, address, contact, accentColor]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "letterhead.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Company name</Label>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Tagline (optional)</Label>
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Contact</Label>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="phone · email" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Label className="text-sm text-muted-foreground">Accent color</Label>
        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-9 w-14 cursor-pointer rounded border" />
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-h-[500px] w-full max-w-[400px] rounded-lg border" style={{ aspectRatio: "850 / 1100" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
