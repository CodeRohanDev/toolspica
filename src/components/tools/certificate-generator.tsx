"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const WIDTH = 1100;
const HEIGHT = 780;

export function CertificateGenerator() {
  const [recipient, setRecipient] = React.useState("");
  const [reason, setReason] = React.useState("Completion of the Web Development Course");
  const [issuer, setIssuer] = React.useState("");
  const [date, setDate] = React.useState("");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "#fdfaf3";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, WIDTH - 60, HEIGHT - 60);
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, WIDTH - 92, HEIGHT - 92);

    ctx.textAlign = "center";
    ctx.fillStyle = "#78350f";
    ctx.font = "bold 22px Georgia, serif";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", WIDTH / 2, 150);

    ctx.fillStyle = "#111827";
    ctx.font = "16px Georgia, serif";
    ctx.fillText("This certificate is proudly presented to", WIDTH / 2, 230);

    ctx.font = "bold 48px Georgia, serif";
    ctx.fillStyle = "#78350f";
    ctx.fillText(recipient || "Recipient Name", WIDTH / 2, 310);

    ctx.fillStyle = "#111827";
    ctx.font = "18px Georgia, serif";
    ctx.fillText("for", WIDTH / 2, 360);
    ctx.font = "20px Georgia, serif";
    const words = (reason || "").split(" ");
    let line = "";
    let y = 400;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > WIDTH - 200 && line) {
        ctx.fillText(line, WIDTH / 2, y);
        line = word;
        y += 30;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, WIDTH / 2, y);

    ctx.textAlign = "left";
    ctx.font = "16px Georgia, serif";
    ctx.fillText(`Issued by: ${issuer || "[Issuer]"}`, 100, HEIGHT - 100);
    ctx.textAlign = "right";
    ctx.fillText(`Date: ${date || "[Date]"}`, WIDTH - 100, HEIGHT - 100);
  }, [recipient, reason, issuer, date]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Recipient name</Label>
          <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Jane Doe" className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Issuer / organization</Label>
          <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Acme Academy" className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm text-muted-foreground">Reason / achievement</Label>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="January 1, 2026" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-h-[500px] w-full max-w-[550px] rounded-lg border" style={{ aspectRatio: "1100 / 780" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
