"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, rowsToCsv } from "@/lib/csv-parse";

export function CsvMerger() {
  const [a, setA] = React.useState("name,age\nAlice,30");
  const [b, setB] = React.useState("name,age\nBob,25");

  const merged = React.useMemo(() => {
    const rowsA = parseCsv(a);
    const rowsB = parseCsv(b);
    if (rowsA.length === 0) return rowsToCsv(rowsB);
    if (rowsB.length === 0) return rowsToCsv(rowsA);
    const [headerA, ...bodyA] = rowsA;
    const [, ...bodyB] = rowsB; // assume same header, skip second header row
    return rowsToCsv([headerA, ...bodyA, ...bodyB]);
  }, [a, b]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-sm text-muted-foreground">CSV file 1</p>
          <Textarea value={a} onChange={(e) => setA(e.target.value)} rows={8} className="resize-y font-mono text-sm" />
        </div>
        <div>
          <p className="mb-1.5 text-sm text-muted-foreground">CSV file 2</p>
          <Textarea value={b} onChange={(e) => setB(e.target.value)} rows={8} className="resize-y font-mono text-sm" />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Merged CSV</p>
          <CopyButton value={merged} />
        </div>
        <Textarea readOnly value={merged} rows={8} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Assumes both files share the same column headers — the second file&apos;s header row is
        skipped and only its data rows are appended.
      </p>
    </div>
  );
}
