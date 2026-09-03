"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

export function SortLines() {
  const [text, setText] = React.useState("");
  const [descending, setDescending] = React.useState(false);
  const [caseInsensitive, setCaseInsensitive] = React.useState(false);
  const [removeEmpty, setRemoveEmpty] = React.useState(true);
  const [numeric, setNumeric] = React.useState(false);

  const output = React.useMemo(() => {
    let lines = text.split("\n");
    if (removeEmpty) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    const sorted = [...lines].sort((a, b) => {
      if (numeric) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
      }
      const valA = caseInsensitive ? a.toLowerCase() : a;
      const valB = caseInsensitive ? b.toLowerCase() : b;
      return valA.localeCompare(valB);
    });

    if (descending) sorted.reverse();
    return sorted.join("\n");
  }, [text, descending, caseInsensitive, removeEmpty, numeric]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Paste lines to sort...\nbanana\napple\ncherry"}
        rows={10}
        className="resize-y font-mono text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch id="descending" checked={descending} onCheckedChange={setDescending} />
          <Label htmlFor="descending" className="text-sm font-normal">
            Z → A (descending)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sort-case-insensitive"
            checked={caseInsensitive}
            onCheckedChange={setCaseInsensitive}
          />
          <Label htmlFor="sort-case-insensitive" className="text-sm font-normal">
            Case-insensitive
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="numeric" checked={numeric} onCheckedChange={setNumeric} />
          <Label htmlFor="numeric" className="text-sm font-normal">
            Numeric sort
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sort-remove-empty"
            checked={removeEmpty}
            onCheckedChange={setRemoveEmpty}
          />
          <Label htmlFor="sort-remove-empty" className="text-sm font-normal">
            Remove empty lines
          </Label>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Sorted result</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={10}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>

      <div className="mt-4">
        <Button type="button" variant="outline" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
    </div>
  );
}
