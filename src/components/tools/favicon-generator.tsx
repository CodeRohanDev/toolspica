"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { buildIco } from "@/lib/ico-writer";
import { createZip } from "@/lib/zip-writer";

const PNG_SIZES = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];
const ICO_SIZES = [16, 32, 48];

export function FaviconGenerator() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [previews, setPreviews] = React.useState<{ size: number; url: string }[]>([]);
  const [ready, setReady] = React.useState(false);
  const [zipBlob, setZipBlob] = React.useState<Blob | null>(null);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setReady(false);
    setZipBlob(null);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setPreviews([]);
    setReady(false);
    setZipBlob(null);
  }

  const process = React.useCallback(async (targetFile: File) => {
    const img = await loadImageFromFile(targetFile);

    async function renderPng(size: number): Promise<Blob> {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      return canvasToBlob(canvas, "image/png");
    }

    const pngBlobs = await Promise.all(PNG_SIZES.map((p) => renderPng(p.size)));
    setPreviews(
      PNG_SIZES.map((p, i) => ({ size: p.size, url: URL.createObjectURL(pngBlobs[i]) }))
    );

    const icoEntries = await Promise.all(
      ICO_SIZES.map(async (size) => ({
        size,
        pngData: new Uint8Array(await (await renderPng(size)).arrayBuffer()),
      }))
    );
    const icoBytes = buildIco(icoEntries);

    const manifest = JSON.stringify(
      {
        name: "App",
        icons: [
          { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
      null,
      2
    );

    const zipEntries = await Promise.all(
      PNG_SIZES.map(async (p, i) => ({
        name: p.name,
        data: new Uint8Array(await pngBlobs[i].arrayBuffer()),
      }))
    );
    zipEntries.push({ name: "favicon.ico", data: new Uint8Array(icoBytes) });
    zipEntries.push({ name: "site.webmanifest", data: new TextEncoder().encode(manifest) });

    const zip = createZip(zipEntries);
    setZipBlob(new Blob([zip as BlobPart]));
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (file) process(file);
  }, [file, process]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />

      {previews.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Generated sizes
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-4">
            {previews.map((p) => (
              <div key={p.size} className="flex flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={`${p.size}x${p.size}`}
                  style={{ width: Math.min(64, p.size), height: Math.min(64, p.size) }}
                  className="rounded border"
                />
                <span className="text-xs text-muted-foreground">{p.size}px</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {ready && (
        <Button
          type="button"
          className="mt-5"
          onClick={() =>
            zipBlob && file && downloadBlob(zipBlob, `${stripExtension(file.name)}-favicons.zip`)
          }
        >
          <Download className="size-4" />
          Download full favicon package (.zip)
        </Button>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Includes favicon.ico, every standard PNG size (16 to 512px), an apple-touch-icon, and a
        site.webmanifest — everything a modern site needs for browser tabs, bookmarks, and home
        screen icons.
      </p>
    </div>
  );
}
