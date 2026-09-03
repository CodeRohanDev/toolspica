"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { StatBar } from "@/components/tools/stat-bar";

export function JsonMinifier() {
  const [input, setInput] = React.useState("");

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      return { output: JSON.stringify(JSON.parse(input)), error: null as string | null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input]);

  const originalSize = new TextEncoder().encode(input).length;
  const minifiedSize = new TextEncoder().encode(output).length;
  const reduction =
    originalSize > 0 ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">JSON input</p>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{\n  "name": "Toolspica",\n  "free": true\n}'
        rows={10}
        className="mt-3 resize-y font-mono text-sm"
      />

      {input.trim() && !error && (
        <StatBar
          items={[
            { label: "original bytes", value: originalSize },
            { label: "minified bytes", value: minifiedSize },
            { label: "smaller by", value: `${reduction}%` },
          ]}
        />
      )}

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {error ? `Invalid JSON: ${error}` : "Minified output"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={4}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
