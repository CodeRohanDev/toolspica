"use client";

import * as React from "react";
import * as XLSX from "xlsx";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";
import { Upload } from "lucide-react";

export function ExcelToCsv() {
  const [csv, setCsv] = React.useState("");
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
      setCsv(XLSX.utils.sheet_to_csv(sheet));
    } catch {
      setError("Couldn't read that file — make sure it's a valid .xlsx or .xls file.");
      setCsv("");
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

      {csv && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">CSV output (first sheet)</p>
            <CopyButton value={csv} />
          </div>
          <Textarea readOnly value={csv} rows={12} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
