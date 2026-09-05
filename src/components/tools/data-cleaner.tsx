"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { parseCsv, rowsToCsv } from "@/lib/csv-parse";

export function DataCleaner() {
  const [input, setInput] = React.useState("name, age \nAlice , 30\n\nBob,25\nAlice ,30");
  const [trimWhitespace, setTrimWhitespace] = React.useState(true);
  const [removeEmptyRows, setRemoveEmptyRows] = React.useState(true);
  const [removeDuplicates, setRemoveDuplicates] = React.useState(true);

  const { result, stats } = React.useMemo(() => {
    let rows = parseCsv(input);
    if (rows.length === 0) return { result: "", stats: null };

    if (trimWhitespace) {
      rows = rows.map((r) => r.map((c) => c.trim()));
    }

    const [header, ...body] = rows;
    let cleanedBody = body;
    const originalCount = cleanedBody.length;

    if (removeEmptyRows) {
      cleanedBody = cleanedBody.filter((r) => r.some((c) => c !== ""));
    }
    const afterEmpty = cleanedBody.length;

    if (removeDuplicates) {
      const seen = new Set<string>();
      cleanedBody = cleanedBody.filter((r) => {
        const key = r.join("|");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return {
      result: rowsToCsv([header, ...cleanedBody]),
      stats: {
        original: originalCount,
        emptyRemoved: originalCount - afterEmpty,
        duplicatesRemoved: afterEmpty - cleanedBody.length,
        final: cleanedBody.length,
      },
    };
  }, [input, trimWhitespace, removeEmptyRows, removeDuplicates]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste messy CSV data..." rows={8} className="resize-y font-mono text-sm" />

      <div className="mt-3 flex flex-wrap gap-4">
        {[
          { label: "Trim whitespace", checked: trimWhitespace, set: setTrimWhitespace },
          { label: "Remove empty rows", checked: removeEmptyRows, set: setRemoveEmptyRows },
          { label: "Remove duplicate rows", checked: removeDuplicates, set: setRemoveDuplicates },
        ].map((opt) => (
          <Label key={opt.label} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)} />
            {opt.label}
          </Label>
        ))}
      </div>

      {stats && (
        <div className="mt-5 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {stats.original} rows in — {stats.emptyRemoved} empty removed, {stats.duplicatesRemoved} duplicates removed — {stats.final} rows out
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Cleaned CSV</p>
            <CopyButton value={result} />
          </div>
          <Textarea readOnly value={result} rows={8} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
