"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { StatBar } from "@/components/tools/stat-bar";

function getDepth(value: unknown): number {
  if (value === null || typeof value !== "object") return 0;
  const values = Array.isArray(value) ? value : Object.values(value);
  return 1 + Math.max(0, ...values.map(getDepth));
}

function countKeys(value: unknown): number {
  if (value === null || typeof value !== "object") return 0;
  const entries = Array.isArray(value) ? value : Object.values(value);
  const own = Array.isArray(value) ? 0 : Object.keys(value).length;
  return own + entries.reduce((sum: number, v) => sum + countKeys(v), 0);
}

export function ApiResponseFormatter() {
  const [input, setInput] = React.useState("");

  const result = React.useMemo(() => {
    if (!input.trim()) return null;
    try {
      const parsed = JSON.parse(input);
      return {
        formatted: JSON.stringify(parsed, null, 2),
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        isArray: Array.isArray(parsed),
        length: Array.isArray(parsed) ? parsed.length : null,
        error: null as string | null,
      };
    } catch (e) {
      return { formatted: "", keys: 0, depth: 0, isArray: false, length: null, error: (e as Error).message };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">
        Raw API response (JSON)
      </p>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"status":"ok","data":[{"id":1,"name":"Item"}]}'
        rows={10}
        className="mt-3 resize-y font-mono text-sm"
      />

      {result && !result.error && (
        <StatBar
          items={[
            { label: "total keys", value: result.keys },
            { label: "max depth", value: result.depth },
            ...(result.isArray
              ? [{ label: "array length", value: result.length ?? 0 }]
              : []),
          ]}
        />
      )}

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {result?.error ? `Invalid JSON: ${result.error}` : "Formatted response"}
          </p>
          <CopyButton value={result?.formatted ?? ""} />
        </div>
        <Textarea
          readOnly
          value={result?.formatted ?? ""}
          rows={12}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
