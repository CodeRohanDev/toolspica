"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

export function CsvViewer() {
  const [rows, setRows] = React.useState<string[][]>([]);
  const [fileName, setFileName] = React.useState("");

  function handleFile(file: File) {
    setFileName(file.name);
    file.text().then((text) => setRows(parseCsv(text)));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="text-sm"
      />
      {rows.length > 0 && (
        <>
          <p className="mt-3 text-sm text-muted-foreground">{fileName} — {rows.length - 1} rows × {rows[0]?.length ?? 0} columns</p>
          <div className="mt-2 max-h-[500px] overflow-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr>{rows[0]?.map((h, i) => <th key={i} className="border-b px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.slice(1).map((r, ri) => (
                  <tr key={ri} className="border-t">
                    {r.map((c, ci) => <td key={ci} className="px-3 py-1.5">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => { setRows([]); setFileName(""); }}>
            Clear
          </Button>
        </>
      )}
    </div>
  );
}
