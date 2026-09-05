"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, rowsToCsv } from "@/lib/csv-parse";

export function CsvSplitter() {
  const [input, setInput] = React.useState("name,age\nAlice,30\nBob,25\nCarol,28\nDave,35");
  const [rowsPerFile, setRowsPerFile] = React.useState(2);

  const chunks = React.useMemo(() => {
    const rows = parseCsv(input);
    if (rows.length < 2) return [];
    const [header, ...body] = rows;
    const result: string[] = [];
    for (let i = 0; i < body.length; i += Math.max(1, rowsPerFile)) {
      result.push(rowsToCsv([header, ...body.slice(i, i + rowsPerFile)]));
    }
    return result;
  }, [input, rowsPerFile]);

  function download(csv: string, index: number) {
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `split-${index + 1}.csv`;
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="resize-y font-mono text-sm" />

      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Rows per file (excluding header)</Label>
        <Input type="number" min={1} value={rowsPerFile} onChange={(e) => setRowsPerFile(Number(e.target.value))} className="mt-1.5 w-24" />
      </div>

      {chunks.length > 0 && (
        <div className="mt-5 space-y-3 border-t pt-4">
          <p className="text-sm text-muted-foreground">{chunks.length} file(s) generated</p>
          {chunks.map((chunk, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">split-{i + 1}.csv</p>
                <div className="flex gap-2">
                  <CopyButton value={chunk} label="Copy" />
                  <button type="button" onClick={() => download(chunk, i)} className="text-xs font-medium text-primary underline">
                    Download
                  </button>
                </div>
              </div>
              <pre className="mt-2 max-h-24 overflow-auto text-xs text-muted-foreground">{chunk}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
