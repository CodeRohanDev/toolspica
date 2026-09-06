"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { StatBar } from "@/components/tools/stat-bar";

const MAX_ROWS = 200;

function fileToAsyncBuffer(file: File) {
  return {
    byteLength: file.size,
    async slice(start: number, end?: number) {
      return file.slice(start, end).arrayBuffer();
    },
  };
}

export function ParquetViewer() {
  const [rows, setRows] = React.useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = React.useState<string[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setRows([]);
    try {
      const { parquetMetadataAsync, parquetReadObjects } = await import("hyparquet");
      const asyncBuffer = fileToAsyncBuffer(file);
      const metadata = await parquetMetadataAsync(asyncBuffer);
      const rowCount = Number(metadata.num_rows);
      setTotalRows(rowCount);

      const data = await parquetReadObjects({
        file: asyncBuffer,
        rowStart: 0,
        rowEnd: Math.min(MAX_ROWS, rowCount),
      });
      setRows(data as Record<string, unknown>[]);
      setColumns(data.length > 0 ? Object.keys(data[0] as object) : []);
    } catch {
      setError("Couldn't read this file — make sure it's a valid .parquet file.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload a .parquet file"}
        <input type="file" accept=".parquet" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {rows.length > 0 && (
        <>
          <StatBar items={[{ label: "total rows", value: totalRows }, { label: "columns", value: columns.length }, { label: "showing", value: rows.length }]} />
          <div className="mt-2 max-h-[650px] overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b bg-muted/40">
                  {columns.map((col) => (
                    <th key={col} className="whitespace-nowrap p-2 text-left font-medium text-muted-foreground">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    {columns.map((col) => (
                      <td key={col} className="whitespace-nowrap p-2 font-mono text-xs">{String(row[col] ?? "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalRows > MAX_ROWS && <p className="mt-2 text-xs text-muted-foreground">Showing the first {MAX_ROWS} of {totalRows.toLocaleString()} rows.</p>}
        </>
      )}
    </div>
  );
}
