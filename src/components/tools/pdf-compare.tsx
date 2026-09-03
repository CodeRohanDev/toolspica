"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PdfUploadZone } from "@/components/tools/pdf-upload-zone";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";
import { downloadBytesFile } from "@/lib/pdf/pdf-helpers";
import { createZip } from "@/lib/zip-writer";

export function PdfCompare() {
  const [fileA, setFileA] = React.useState<File | null>(null);
  const [fileB, setFileB] = React.useState<File | null>(null);
  const [diffUrls, setDiffUrls] = React.useState<{ page: number; url: string; percent: number }[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function renderAllPages(file: File) {
    const buffer = await file.arrayBuffer();
    const doc = await loadPdfDocument(new Uint8Array(buffer));
    const canvases: HTMLCanvasElement[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas }).promise;
      canvases.push(canvas);
    }
    return canvases;
  }

  async function compare() {
    if (!fileA || !fileB) return;
    setProcessing(true);
    setError(null);
    setDiffUrls([]);
    try {
      const [pagesA, pagesB] = await Promise.all([renderAllPages(fileA), renderAllPages(fileB)]);
      const pageCount = Math.max(pagesA.length, pagesB.length);
      const results: { page: number; url: string; percent: number }[] = [];

      for (let i = 0; i < pageCount; i++) {
        const a = pagesA[i];
        const b = pagesB[i];
        if (!a || !b) continue;
        if (a.width !== b.width || a.height !== b.height) continue;

        const ctxA = a.getContext("2d")!;
        const ctxB = b.getContext("2d")!;
        const dataA = ctxA.getImageData(0, 0, a.width, a.height);
        const dataB = ctxB.getImageData(0, 0, b.width, b.height);
        const output = new Uint8ClampedArray(dataA.data.length);
        let diffPixels = 0;
        const total = a.width * a.height;

        for (let p = 0; p < dataA.data.length; p += 4) {
          const dr = Math.abs(dataA.data[p] - dataB.data[p]);
          const dg = Math.abs(dataA.data[p + 1] - dataB.data[p + 1]);
          const db = Math.abs(dataA.data[p + 2] - dataB.data[p + 2]);
          if (dr + dg + db > 30) {
            diffPixels++;
            output[p] = 255;
            output[p + 1] = 0;
            output[p + 2] = 0;
            output[p + 3] = 255;
          } else {
            const gray = (dataA.data[p] + dataA.data[p + 1] + dataA.data[p + 2]) / 3;
            output[p] = gray;
            output[p + 1] = gray;
            output[p + 2] = gray;
            output[p + 3] = 120;
          }
        }

        const resultCanvas = document.createElement("canvas");
        resultCanvas.width = a.width;
        resultCanvas.height = a.height;
        resultCanvas.getContext("2d")!.putImageData(new ImageData(output, a.width, a.height), 0, 0);
        results.push({ page: i + 1, url: resultCanvas.toDataURL("image/png"), percent: (diffPixels / total) * 100 });
      }

      setDiffUrls(results);
      if (pagesA.length !== pagesB.length) {
        setError(`Note: the files have different page counts (${pagesA.length} vs ${pagesB.length}) — only shared pages were compared.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't compare these PDFs.");
    } finally {
      setProcessing(false);
    }
  }

  async function downloadAll() {
    const entries = await Promise.all(
      diffUrls.map(async (d) => {
        const res = await fetch(d.url);
        const blob = await res.blob();
        return { name: `page-${d.page}-diff.png`, data: new Uint8Array(await blob.arrayBuffer()) };
      })
    );
    const zip = createZip(entries);
    downloadBytesFile(zip, "pdf-diff.zip", "application/zip");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <PdfUploadZone file={fileA} onFileSelect={setFileA} onClear={() => setFileA(null)} label="PDF A — drop or click" />
        <PdfUploadZone file={fileB} onFileSelect={setFileB} onClear={() => setFileB(null)} label="PDF B — drop or click" />
      </div>

      <Button type="button" className="mt-4" onClick={compare} disabled={!fileA || !fileB || processing}>
        {processing ? "Comparing..." : "Compare PDFs"}
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {diffUrls.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Differences by page</p>
            <Button type="button" size="sm" onClick={downloadAll}>
              <Download className="size-3.5" /> Download all as ZIP
            </Button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {diffUrls.map((d) => (
              <div key={d.page} className="overflow-hidden rounded border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.url} alt={`Page ${d.page} diff`} className="w-full" />
                <p className="bg-muted/40 py-1 text-center text-xs">
                  Page {d.page} — {d.percent.toFixed(2)}% different
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
