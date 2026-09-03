"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

function analyzeJson(input: string) {
  if (!input.trim()) return null;
  try {
    const parsed = JSON.parse(input);
    const type = Array.isArray(parsed) ? "array" : typeof parsed;
    const keyCount =
      type === "object" && parsed !== null ? Object.keys(parsed).length : null;
    return { valid: true as const, type, keyCount, error: null };
  } catch (e) {
    return { valid: false as const, type: null, keyCount: null, error: (e as Error).message };
  }
}

export function JsonValidator() {
  const [input, setInput] = React.useState("");
  const result = React.useMemo(() => analyzeJson(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">JSON to validate</p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setInput("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"name": "Toolspica", "free": true,}'
        rows={12}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        {!result ? (
          <p className="text-sm text-muted-foreground">
            Paste JSON above to check whether it's valid.
          </p>
        ) : result.valid ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-600" />
            <p className="text-sm font-medium">
              Valid JSON
              {result.type ? ` — top-level type: ${result.type}` : ""}
              {result.keyCount !== null ? ` (${result.keyCount} keys)` : ""}
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
            <p className="text-sm font-medium">Invalid JSON — {result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
