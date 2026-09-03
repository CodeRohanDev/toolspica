"use client";

import * as React from "react";

export function useTesseractOcr() {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const recognize = React.useCallback(
    async (image: HTMLCanvasElement | Blob | File, lang = "eng") => {
      setBusy(true);
      setError(null);
      setProgress(0);
      setStatus("Loading OCR engine...");
      try {
        const { createWorker } = await import("tesseract.js");
        const worker = await createWorker(lang, 1, {
          corePath: "/tesseract-core",
          workerPath: "/tesseract-worker.min.js",
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(m.progress);
              setStatus(`Recognizing text... ${Math.round(m.progress * 100)}%`);
            }
          },
        });
        const result = await worker.recognize(image);
        await worker.terminate();
        return result.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "OCR failed on this image.");
        throw err;
      } finally {
        setBusy(false);
        setStatus("");
      }
    },
    []
  );

  return { recognize, progress, status, busy, error, setError };
}
