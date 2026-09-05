"use client";

import * as React from "react";
import * as XLSX from "xlsx";
import { CopyButton } from "@/components/tools/copy-button";
import { Upload } from "lucide-react";

export function ExcelToJson() {
  const [json, setJson] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setFileName(file.name);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      setJson(JSON.stringify(rows, null, 2));
    } catch {
      setError("Couldn't read that file — make sure it's a valid .xlsx or .xls file.");
      setJson("");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an Excel file (.xlsx / .xls)"}
        <input type="file" accept=".xlsx,.xls" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {json && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">JSON output (first sheet)</p>
            <CopyButton value={json} />
          </div>
          <pre className="mt-2 max-h-72 overflow-auto rounded-md border bg-muted/40 p-3 text-xs">{json}</pre>
        </div>
      )}
    </div>
  );
}
