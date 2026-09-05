"use client";

import * as React from "react";
import * as XLSX from "xlsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { parseCsv } from "@/lib/csv-parse";

export function CsvToExcel() {
  const [input, setInput] = React.useState("name,age\nAlice,30\nBob,25");

  function download() {
    const rows = parseCsv(input);
    if (rows.length === 0) return;
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "converted.xlsx");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste CSV data..."
        rows={10}
        className="resize-y font-mono text-sm"
      />
      <Button type="button" className="mt-4" onClick={download} disabled={!input.trim()}>
        <Download className="size-4" /> Download as .xlsx
      </Button>
    </div>
  );
}
