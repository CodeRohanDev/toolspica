"use client";

import * as React from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

export function ExcelViewer() {
  const [sheetNames, setSheetNames] = React.useState<string[]>([]);
  const [activeSheet, setActiveSheet] = React.useState(0);
  const [rows, setRows] = React.useState<unknown[][]>([]);
  const [error, setError] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const workbookRef = React.useRef<XLSX.WorkBook | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      workbookRef.current = workbook;
      setSheetNames(workbook.SheetNames);
      setActiveSheet(0);
      loadSheet(workbook, 0);
    } catch {
      setError("Couldn't read that file — make sure it's a valid .xlsx or .xls file.");
      setSheetNames([]);
      setRows([]);
    }
  }

  function loadSheet(workbook: XLSX.WorkBook, index: number) {
    const sheet = workbook.Sheets[workbook.SheetNames[index]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];
    setRows(data);
  }

  function selectSheet(index: number) {
    setActiveSheet(index);
    if (workbookRef.current) loadSheet(workbookRef.current, index);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an Excel file (.xlsx / .xls)"}
        <input type="file" accept=".xlsx,.xls" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {sheetNames.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {sheetNames.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => selectSheet(i)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${i === activeSheet ? "border-brand bg-brand-soft text-brand" : "hover:bg-accent"}`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-4 max-h-[650px] overflow-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i === 0 ? "border-b bg-muted/40 font-medium" : "border-b last:border-b-0"}>
                  {row.map((cell, j) => (
                    <td key={j} className="whitespace-nowrap border-r p-2 last:border-r-0">
                      {cell === undefined || cell === null ? "" : String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
