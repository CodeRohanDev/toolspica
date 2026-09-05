"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, rowsToCsv } from "@/lib/csv-parse";

type Aggregation = "sum" | "count" | "average";

export function PivotTableGenerator() {
  const [input, setInput] = React.useState(
    "region,product,sales\nEast,Widget,100\nEast,Gadget,150\nWest,Widget,200\nWest,Gadget,80\nEast,Widget,50"
  );
  const rows = React.useMemo(() => parseCsv(input), [input]);
  const header = rows[0] ?? [];
  const body = rows.slice(1);

  const [rowField, setRowField] = React.useState(0);
  const [colField, setColField] = React.useState(1);
  const [valueField, setValueField] = React.useState(2);
  const [aggregation, setAggregation] = React.useState<Aggregation>("sum");

  const pivot = React.useMemo(() => {
    if (header.length < 3 || body.length === 0) return null;

    const rowKeys = Array.from(new Set(body.map((r) => r[rowField] ?? ""))).sort();
    const colKeys = Array.from(new Set(body.map((r) => r[colField] ?? ""))).sort();

    const cells = new Map<string, number[]>();
    for (const r of body) {
      const key = `${r[rowField]}|${r[colField]}`;
      const val = Number(r[valueField]) || 0;
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key)!.push(val);
    }

    function aggregate(values: number[] | undefined): number {
      if (!values || values.length === 0) return 0;
      if (aggregation === "count") return values.length;
      const sum = values.reduce((a, b) => a + b, 0);
      return aggregation === "average" ? sum / values.length : sum;
    }

    const table: (string | number)[][] = [["", ...colKeys, "Total"]];
    for (const rk of rowKeys) {
      const rowValues = colKeys.map((ck) => aggregate(cells.get(`${rk}|${ck}`)));
      const total = aggregation === "average" ? rowValues.reduce((a, b) => a + b, 0) / (rowValues.length || 1) : rowValues.reduce((a, b) => a + b, 0);
      table.push([rk, ...rowValues.map((v) => Math.round(v * 100) / 100), Math.round(total * 100) / 100]);
    }

    return { table, rowKeys, colKeys };
  }, [body, rowField, colField, valueField, aggregation, header.length]);

  const csvOutput = pivot ? rowsToCsv(pivot.table.map((r) => r.map(String))) : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={7} className="resize-y font-mono text-sm" />

      {header.length >= 3 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <div>
            <Label className="text-xs text-muted-foreground">Rows</Label>
            <select value={rowField} onChange={(e) => setRowField(Number(e.target.value))} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
              {header.map((h, i) => (
                <option key={i} value={i}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Columns</Label>
            <select value={colField} onChange={(e) => setColField(Number(e.target.value))} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
              {header.map((h, i) => (
                <option key={i} value={i}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Values</Label>
            <select value={valueField} onChange={(e) => setValueField(Number(e.target.value))} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
              {header.map((h, i) => (
                <option key={i} value={i}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Aggregation</Label>
            <select value={aggregation} onChange={(e) => setAggregation(e.target.value as Aggregation)} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
              <option value="sum">Sum</option>
              <option value="count">Count</option>
              <option value="average">Average</option>
            </select>
          </div>
        </div>
      )}

      {pivot && (
        <div className="mt-5 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pivot table</p>
            <CopyButton value={csvOutput} label="Copy as CSV" />
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[400px] border-collapse text-sm">
              <thead>
                <tr>
                  {pivot.table[0].map((h, i) => (
                    <th key={i} className="border p-1.5 text-left font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pivot.table.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border p-1.5 tabular-nums">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
