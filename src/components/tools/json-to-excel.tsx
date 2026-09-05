"use client";

import * as React from "react";
import * as XLSX from "xlsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function JsonToExcel() {
  const [input, setInput] = React.useState('[\n  { "name": "Alice", "age": 30 },\n  { "name": "Bob", "age": 25 }\n]');
  const [error, setError] = React.useState("");

  function download() {
    setError("");
    let data: unknown;
    try {
      data = JSON.parse(input);
    } catch {
      setError("Invalid JSON — check for missing commas, quotes, or brackets.");
      return;
    }
    if (!Array.isArray(data)) {
      setError("JSON must be an array of objects, e.g. [{ \"name\": \"Alice\" }].");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data as Record<string, unknown>[]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "converted.xlsx");
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='[{ "name": "Alice", "age": 30 }]'
        rows={10}
        className="resize-y font-mono text-sm"
      />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <Button type="button" className="mt-4" onClick={download} disabled={!input.trim()}>
        <Download className="size-4" /> Download as .xlsx
      </Button>
    </div>
  );
}
