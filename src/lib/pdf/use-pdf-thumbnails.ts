"use client";

import * as React from "react";
import { loadPdfDocument } from "@/lib/pdf/pdfjs-setup";

export interface PdfPageThumb {
  index: number; // 0-based
  url: string;
  width: number;
  height: number;
}

/** Renders a low-res thumbnail for every page of an uploaded PDF file. */
export function usePdfThumbnails(file: File | null) {
  const [thumbnails, setThumbnails] = React.useState<PdfPageThumb[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!file) {
      setThumbnails([]);
      setPageCount(0);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const buffer = await file.arrayBuffer();
        const doc = await loadPdfDocument(new Uint8Array(buffer));
        if (cancelled) return;
        setPageCount(doc.numPages);

        const results: PdfPageThumb[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const viewport = page.getViewport({ scale: 0.3 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          if (cancelled) return;
          results.push({
            index: i - 1,
            url: canvas.toDataURL("image/png"),
            width: viewport.width,
            height: viewport.height,
          });
        }
        if (!cancelled) setThumbnails(results);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Couldn't read this PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [file]);

  return { thumbnails, pageCount, loading, error };
}
