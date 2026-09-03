"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function JsonFormatter() {
  const [input, setInput] = React.useState("");
  const [indent, setIndent] = React.useState(2);

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: null as string | null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, indent]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">JSON input</p>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant={indent === 2 ? "default" : "outline"}
            onClick={() => setIndent(2)}
          >
            2 spaces
          </Button>
          <Button
            type="button"
            size="sm"
            variant={indent === 4 ? "default" : "outline"}
            onClick={() => setIndent(4)}
          >
            4 spaces
          </Button>
        </div>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"name":"Toolspica","tools":573,"free":true}'
        rows={10}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {error ? `Invalid JSON: ${error}` : "Formatted output"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={12}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
