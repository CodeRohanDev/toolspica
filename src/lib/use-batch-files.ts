"use client";

import * as React from "react";

export type BatchItemStatus = "queued" | "processing" | "done" | "error";

export interface BatchItem {
  id: string;
  file: File;
  status: BatchItemStatus;
  resultBlob?: Blob;
  resultName?: string;
  error?: string;
}

export type BatchConvertFn = (file: File) => Promise<{ blob: Blob; name: string }>;

interface UseBatchFilesOptions {
  /**
   * When true, re-runs `convert` on every already-added file (debounced)
   * whenever the `convert` function identity changes — i.e. whenever a
   * setting it closes over changes. Gives a "live preview" that always
   * reflects current settings, for tools with cheap (canvas-based) conversion.
   */
  live?: boolean;
}

/**
 * Manages an unbounded list of files and runs `convert` on each one, sequentially,
 * via a shared promise queue — required for single-instance engines like ffmpeg.wasm
 * and Tesseract, which can't process more than one job at a time.
 */
export function useBatchFiles(convert: BatchConvertFn, options?: UseBatchFilesOptions) {
  const [items, setItems] = React.useState<BatchItem[]>([]);
  const itemsRef = React.useRef<BatchItem[]>([]);
  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  const queueRef = React.useRef<Promise<void>>(Promise.resolve());
  const live = options?.live ?? false;

  const updateItem = React.useCallback((id: string, patch: Partial<BatchItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const processOne = React.useCallback(
    (item: BatchItem, fn: BatchConvertFn) => {
      queueRef.current = queueRef.current.then(async () => {
        updateItem(item.id, { status: "processing", error: undefined });
        try {
          const { blob, name } = await fn(item.file);
          updateItem(item.id, { status: "done", resultBlob: blob, resultName: name });
        } catch (err) {
          updateItem(item.id, {
            status: "error",
            error: err instanceof Error ? err.message : "Conversion failed.",
          });
        }
      });
    },
    [updateItem]
  );

  const addFiles = React.useCallback(
    (files: File[]) => {
      const newItems: BatchItem[] = files.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`,
        file,
        status: "queued",
      }));
      setItems((prev) => [...prev, ...newItems]);
      for (const item of newItems) processOne(item, convert);
    },
    [convert, processOne]
  );

  const skipFirstRef = React.useRef(true);
  React.useEffect(() => {
    if (!live) return;
    if (skipFirstRef.current) {
      skipFirstRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      for (const item of itemsRef.current) processOne(item, convert);
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convert, live]);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  return { items, addFiles, removeItem, clear };
}
