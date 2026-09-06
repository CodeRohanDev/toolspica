"use client";

import * as React from "react";
import { Upload } from "lucide-react";

export function WordDocumentViewer() {
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    try {
      const { renderAsync } = await import("docx-preview");
      await renderAsync(file, container, undefined, {
        inWrapper: false,
        ignoreWidth: false,
        ignoreHeight: true,
      });
    } catch {
      setError("Couldn't render this file — make sure it's a valid .docx document.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a Word document (.docx)"}
        <input type="file" accept=".docx" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div ref={containerRef} className="mt-4 max-h-[750px] overflow-auto rounded-lg border bg-white p-4 [&_*]:!max-w-full" />
      <p className="mt-3 text-xs text-muted-foreground">
        Renders a visual preview of the document&apos;s layout, text, and tables — complex
        formatting (headers/footers, some styles) may not be pixel-perfect compared to Microsoft
        Word.
      </p>
    </div>
  );
}
