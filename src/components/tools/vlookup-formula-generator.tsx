"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/tools/copy-button";

export function VlookupFormulaGenerator() {
  const [lookupValue, setLookupValue] = React.useState("A2");
  const [tableArray, setTableArray] = React.useState("Sheet2!A:C");
  const [colIndex, setColIndex] = React.useState("2");
  const [exact, setExact] = React.useState(true);

  const formula = `=VLOOKUP(${lookupValue}, ${tableArray}, ${colIndex}, ${exact ? "FALSE" : "TRUE"})`;
  const xlookup = `=XLOOKUP(${lookupValue}, ${tableArray.split("!")[0]}!A:A, ${tableArray.split("!")[0]}!${String.fromCharCode(64 + Number(colIndex || 1))}:${String.fromCharCode(64 + Number(colIndex || 1))})`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground">Lookup value cell</label>
          <Input value={lookupValue} onChange={(e) => setLookupValue(e.target.value)} placeholder="A2" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Table array range</label>
          <Input value={tableArray} onChange={(e) => setTableArray(e.target.value)} placeholder="Sheet2!A:C" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Column index to return</label>
          <Input value={colIndex} onChange={(e) => setColIndex(e.target.value)} placeholder="2" type="number" min={1} />
        </div>
        <label className="mt-5 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={exact} onChange={(e) => setExact(e.target.checked)} />
          Exact match
        </label>
      </div>
      <div className="mt-4 space-y-2 border-t pt-4">
        <div className="flex items-center justify-between rounded-md bg-muted p-3">
          <code className="text-sm">{formula}</code>
          <CopyButton value={formula} label="" />
        </div>
        <p className="text-xs text-muted-foreground">Modern equivalent (Excel 365 / Google Sheets):</p>
        <div className="flex items-center justify-between rounded-md bg-muted p-3">
          <code className="text-sm">{xlookup}</code>
          <CopyButton value={xlookup} label="" />
        </div>
      </div>
    </div>
  );
}
