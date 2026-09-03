"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv } from "@/lib/csv-parse";

export function CsvToJson() {
  const [input, setInput] = React.useState("name,age\nAlice,30\nBob,25");

  const json = React.useMemo(() => {
    const rows = parseCsv(input);
    if (rows.length === 0) return "";
    const [header, ...body] = rows;
    const objs = body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
    return JSON.stringify(objs, null, 2);
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste CSV data..." className="min-h-[160px] font-mono text-sm" />
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">JSON output</p>
        <CopyButton value={json} label="Copy JSON" />
      </div>
      <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{json}</pre>
    </div>
  );
}
