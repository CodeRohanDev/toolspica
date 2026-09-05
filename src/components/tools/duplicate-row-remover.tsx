"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, rowsToCsv } from "@/lib/csv-parse";

export function DuplicateRowRemover() {
  const [input, setInput] = React.useState("name,age\nAlice,30\nBob,25\nAlice,30");

  const { result, removedCount } = React.useMemo(() => {
    const rows = parseCsv(input);
    if (rows.length === 0) return { result: "", removedCount: 0 };
    const [header, ...body] = rows;
    const seen = new Set<string>();
    const deduped: string[][] = [];
    for (const row of body) {
      const key = row.join("");
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(row);
      }
    }
    return { result: rowsToCsv([header, ...deduped]), removedCount: body.length - deduped.length };
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste CSV data..." rows={10} className="resize-y font-mono text-sm" />

      {input.trim() && (
        <div className="mt-5 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {removedCount} duplicate row{removedCount === 1 ? "" : "s"} removed
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Cleaned CSV</p>
            <CopyButton value={result} />
          </div>
          <Textarea readOnly value={result} rows={8} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
