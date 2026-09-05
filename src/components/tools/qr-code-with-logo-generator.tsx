"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateQrCode } from "@/lib/qrcode";
import { Download, Upload } from "lucide-react";

const MODULE_SIZE = 8;
const QUIET_ZONE = 4;

export function QrCodeWithLogoGenerator() {
  const [text, setText] = React.useState("https://toolspica.cloud");
  const [logo, setLogo] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const result = React.useMemo(() => {
    if (!text.trim()) return null;
    try {
      return generateQrCode(text);
    } catch {
      return null;
    }
  }, [text]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !result) return;

    const pixelSize = (result.size + QUIET_ZONE * 2) * MODULE_SIZE;
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pixelSize, pixelSize);
    ctx.fillStyle = "#000000";

    for (let r = 0; r < result.size; r++) {
      for (let c = 0; c < result.size; c++) {
        if (result.matrix[r][c] === 1) {
          ctx.fillRect((c + QUIET_ZONE) * MODULE_SIZE, (r + QUIET_ZONE) * MODULE_SIZE, MODULE_SIZE, MODULE_SIZE);
        }
      }
    }

    if (logo) {
      const img = new Image();
      img.onload = () => {
        const logoSize = pixelSize * 0.22;
        const center = (pixelSize - logoSize) / 2;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(center - 6, center - 6, logoSize + 12, logoSize + 12);
        ctx.drawImage(img, center, center, logoSize, logoSize);
      };
      img.src = logo;
    }
  }, [result, logo]);

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode-with-logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a URL or text..." />

      <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {logo ? "Change logo" : "Upload a logo"}
        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
      </label>

      {result && (
        <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
          <canvas ref={canvasRef} className="max-w-full rounded-lg border" style={{ width: 260, height: 260 }} />
          <Button type="button" onClick={download}>
            <Download className="size-4" /> Download PNG
          </Button>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        A logo placed over the center of a QR code reduces its error-correction margin — test the
        scan with your phone&apos;s camera before printing or publishing.
      </p>
    </div>
  );
}
