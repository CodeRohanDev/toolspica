"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { loadImageFromFile, downloadBlob, stripExtension, formatBytes } from "@/lib/image-processing";

interface ImageTracerApi {
  imagedataToSVG(
    imageData: { width: number; height: number; data: Uint8ClampedArray },
    options: Record<string, unknown>
  ): string;
}

export function PngToSvg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [colors, setColors] = React.useState(16);
  const [svg, setSvg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setSvg(null);
    setError(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setSvg(null);
    setError(null);
  }

  const trace = React.useCallback(async (targetFile: File, numberofcolors: number) => {
    setLoading(true);
    setError(null);
    try {
      const img = await loadImageFromFile(targetFile);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const mod = await import("imagetracerjs");
      const ImageTracer = (mod as unknown as { default: ImageTracerApi }).default;
      const svgString = ImageTracer.imagedataToSVG(
        { width: imageData.width, height: imageData.height, data: imageData.data },
        { numberofcolors }
      );
      setSvg(svgString);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't trace this image to SVG.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (file) {
      const timeout = setTimeout(() => trace(file, colors), 150);
      return () => clearTimeout(timeout);
    }
  }, [file, colors, trace]);

  const svgBlob = svg ? new Blob([svg], { type: "image/svg+xml" }) : null;
  const svgDataUrl = svg ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Original</p>
          <div className="mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border">
            {originalUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={originalUrl} alt="Original" className="size-full object-contain" />
            ) : (
              <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} accept="image/png,image/jpeg" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {loading ? "Tracing..." : "SVG preview"}
          </p>
          <div className="mt-2 flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border bg-white">
            {svgDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={svgDataUrl} alt="Traced SVG result" className="size-full object-contain" />
            ) : (
              <p className="p-6 text-center text-sm text-muted-foreground">Your traced SVG will appear here</p>
            )}
          </div>
        </div>
      </div>

      {originalUrl && (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <Label htmlFor="svg-colors" className="shrink-0 text-sm text-muted-foreground">
              Colors ({colors})
            </Label>
            <input
              id="svg-colors"
              type="range"
              min={2}
              max={64}
              value={colors}
              onChange={(e) => setColors(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={clear}>
            Choose a different image
          </Button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {svgBlob && (
        <Button
          type="button"
          className="mt-4"
          onClick={() => file && downloadBlob(svgBlob, `${stripExtension(file.name)}.svg`)}
        >
          Download SVG ({formatBytes(svgBlob.size)})
        </Button>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Traces the raster image into vector paths using color-region detection — this works well for
        logos, icons, and simple flat-color graphics, but photos and gradients produce large, complex
        SVGs since they aren&apos;t truly vector content to begin with. Fewer colors give a simpler,
        smaller SVG; more colors capture finer detail at the cost of file size and complexity.
      </p>
    </div>
  );
}
