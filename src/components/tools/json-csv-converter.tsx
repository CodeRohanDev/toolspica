"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv } from "@/lib/csv-parse";

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

export function JsonCsvConverter() {
  const [jsonInput, setJsonInput] = React.useState('[\n  {"name": "Alice", "age": 30},\n  {"name": "Bob", "age": 25}\n]');
  const [csvInput, setCsvInput] = React.useState("name,age\nAlice,30\nBob,25");

  const { csv, jsonError } = React.useMemo(() => {
    try {
      return { csv: toCsv(JSON.parse(jsonInput)), jsonError: null as string | null };
    } catch (err) {
      return { csv: "", jsonError: err instanceof Error ? err.message : "Invalid JSON" };
    }
  }, [jsonInput]);

  const json = React.useMemo(() => {
    const rows = parseCsv(csvInput);
    if (rows.length === 0) return "";
    const [header, ...body] = rows;
    const objs = body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
    return JSON.stringify(objs, null, 2);
  }, [csvInput]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">JSON to CSV</p>
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste a JSON array of objects..."
          className="mt-3 min-h-[180px] font-mono text-sm"
        />
        {jsonError && <p className="mt-3 text-sm text-destructive">{jsonError}</p>}
        {!jsonError && csv && (
          <>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <p className="text-sm font-medium text-muted-foreground">CSV output</p>
              <CopyButton value={csv} label="Copy CSV" />
            </div>
            <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{csv}</pre>
          </>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold">CSV to JSON</p>
        <Textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="Paste CSV data..."
          className="mt-3 min-h-[180px] font-mono text-sm"
        />
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="text-sm font-medium text-muted-foreground">JSON output</p>
          <CopyButton value={json} label="Copy JSON" />
        </div>
        <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-muted p-3 text-xs">{json}</pre>
      </div>
    </div>
  );
}
