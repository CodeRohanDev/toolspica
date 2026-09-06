"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { StatBar } from "@/components/tools/stat-bar";

export function SvgViewer() {
  const [input, setInput] = React.useState('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" fill="#3b82f6" />\n</svg>');

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(setInput);
  }

  const { isValid, elementCount, width, height } = React.useMemo(() => {
    try {
      const doc = new DOMParser().parseFromString(input, "image/svg+xml");
      if (doc.querySelector("parsererror") || doc.documentElement.tagName !== "svg") {
        return { isValid: false, elementCount: 0, width: "—", height: "—" };
      }
      return {
        isValid: true,
        elementCount: doc.documentElement.querySelectorAll("*").length,
        width: doc.documentElement.getAttribute("width") ?? "—",
        height: doc.documentElement.getAttribute("height") ?? "—",
      };
    } catch {
      return { isValid: false, elementCount: 0, width: "—", height: "—" };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload an .svg file
        <input type="file" accept=".svg,image/svg+xml" onChange={handleUpload} className="hidden" />
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={16} className="resize-y font-mono text-xs" />
        <div className="min-h-[420px] rounded-lg border bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]">
          {isValid ? (
            <iframe
              title="SVG preview"
              srcDoc={`<!doctype html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh">${input}</body></html>`}
              sandbox=""
              className="h-full min-h-[420px] w-full border-0"
            />
          ) : (
            <p className="flex min-h-[420px] items-center justify-center text-sm text-destructive">Invalid SVG markup</p>
          )}
        </div>
      </div>

      {isValid && <StatBar items={[{ label: "elements", value: elementCount }, { label: "width", value: width }, { label: "height", value: height }]} />}
      <p className="mt-2 text-xs text-muted-foreground">
        Rendered directly from the SVG markup — edit the code on the left to see the preview
        update live.
      </p>
    </div>
  );
}
