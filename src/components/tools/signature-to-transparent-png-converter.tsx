"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Upload } from "lucide-react";

export function SignatureToTransparentPngConverter() {
  const [threshold, setThreshold] = React.useState(220);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  function render() {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !img || !ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (brightness >= threshold) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  React.useEffect(() => {
    if (imageLoaded) render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, imageLoaded]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
    img.src = URL.createObjectURL(file);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "signature-transparent.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {imageLoaded ? "Change image" : "Upload a signature photo"}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>

      {imageLoaded && (
        <>
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground">
              White-removal threshold: {threshold} (lower keeps more, higher removes more)
            </Label>
            <input
              type="range"
              min={150}
              max={254}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div
            className="mt-5 flex flex-col items-center gap-3 border-t pt-4"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
            }}
          >
            <canvas ref={canvasRef} className="max-w-full rounded-lg border" />
            <Button type="button" onClick={download}>
              <Download className="size-4" /> Download transparent PNG
            </Button>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Works best on a signature photographed or scanned on a plain white background — pixels
        brighter than the threshold become transparent.
      </p>
    </div>
  );
}
