"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { loadImageFromFile, canvasToBlob, downloadBlob, stripExtension } from "@/lib/image-processing";
import { createZip } from "@/lib/zip-writer";

export function ImageSplitter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState("2");
  const [cols, setCols] = React.useState("2");
  const [tiles, setTiles] = React.useState<string[]>([]);
  const [tileBlobs, setTileBlobs] = React.useState<Blob[]>([]);

  function handleFile(picked: File) {
    setFile(picked);
    setOriginalUrl(URL.createObjectURL(picked));
    setTiles([]);
    setTileBlobs([]);
  }
  function clear() {
    setFile(null);
    setOriginalUrl(null);
    setTiles([]);
    setTileBlobs([]);
  }

  const rowsNum = Math.max(1, Math.min(10, parseInt(rows, 10) || 1));
  const colsNum = Math.max(1, Math.min(10, parseInt(cols, 10) || 1));

  const process = React.useCallback(async (targetFile: File, r: number, c: number) => {
    const img = await loadImageFromFile(targetFile);
    const tileW = Math.floor(img.width / c);
    const tileH = Math.floor(img.height / r);
    const blobs: Blob[] = [];
    const urls: string[] = [];
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        const canvas = document.createElement("canvas");
        canvas.width = tileW;
        canvas.height = tileH;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, col * tileW, row * tileH, tileW, tileH, 0, 0, tileW, tileH);
        const blob = await canvasToBlob(canvas, "image/png");
        blobs.push(blob);
        urls.push(URL.createObjectURL(blob));
      }
    }
    setTileBlobs(blobs);
    setTiles(urls);
  }, []);

  React.useEffect(() => {
    if (file) process(file, rowsNum, colsNum);
  }, [file, rowsNum, colsNum, process]);

  async function downloadAll() {
    if (!file || tileBlobs.length === 0) return;
    const entries = await Promise.all(
      tileBlobs.map(async (blob, i) => ({
        name: `${stripExtension(file.name)}-tile-${i + 1}.png`,
        data: new Uint8Array(await blob.arrayBuffer()),
      }))
    );
    const zip = createZip(entries);
    downloadBlob(new Blob([zip as BlobPart]), `${stripExtension(file.name)}-split.zip`);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={originalUrl} onFileSelect={handleFile} onClear={clear} />

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="split-rows" className="text-sm text-muted-foreground">
            Rows
          </Label>
          <Input
            id="split-rows"
            type="number"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="mt-1.5 w-20"
            disabled={!file}
          />
        </div>
        <div>
          <Label htmlFor="split-cols" className="text-sm text-muted-foreground">
            Columns
          </Label>
          <Input
            id="split-cols"
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(e.target.value)}
            className="mt-1.5 w-20"
            disabled={!file}
          />
        </div>
        {tiles.length > 0 && (
          <Button type="button" onClick={downloadAll}>
            <Download className="size-4" />
            Download all as ZIP
          </Button>
        )}
      </div>

      {tiles.length > 0 && (
        <div
          className="mt-5 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${colsNum}, minmax(0, 1fr))` }}
        >
          {tiles.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={url} alt={`Tile ${i + 1}`} className="w-full border" />
          ))}
        </div>
      )}
    </div>
  );
}
