"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function toCsv(data: unknown): string {
  const arr = Array.isArray(data) ? data : [data];
  const objs = arr.filter((r) => r && typeof r === "object" && !Array.isArray(r)) as Record<string, unknown>[];
  if (objs.length === 0) return "";
  const headers = [...new Set(objs.flatMap((o) => Object.keys(o)))];
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = objs.map((o) => headers.map((h) => escape(o[h])).join(","));
  return [headers.join(","), ...rows].join("\n");
}

export function JsonToCsv() {
  const [input, setInput] = React.useState('[\n  {"name": "Alice", "age": 30},\n  {"name": "Bob", "age": 25}\n]');
  const [error, setError] = React.useState<string | null>(null);

  const csv = React.useMemo(() => {
    try {
      setError(null);
      return toCsv(JSON.parse(input));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      return "";
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste a JSON array of objects..." className="min-h-[180px] font-mono text-sm" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && csv && (
        <>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <p className="text-sm font-medium text-muted-foreground">CSV output</p>
            <CopyButton value={csv} label="Copy CSV" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{csv}</pre>
        </>
      )}
    </div>
  );
}
