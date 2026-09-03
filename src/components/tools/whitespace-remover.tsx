"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const MODES: { value: "all" | "line-breaks-only"; label: string }[] = [
  { value: "all", label: "Remove all whitespace" },
  { value: "line-breaks-only", label: "Remove line breaks only" },
];

function removeWhitespace(text: string, mode: "all" | "line-breaks-only") {
  return mode === "all" ? text.replace(/\s+/g, "") : text.replace(/\r?\n/g, "");
}

export function WhitespaceRemover() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<"all" | "line-breaks-only">("all");

  const output = React.useMemo(() => removeWhitespace(text, mode), [text, mode]);
  const removedCount = text.length - output.length;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Your text</p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to strip whitespace from..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <Button
            key={m.value}
            type="button"
            size="sm"
            variant={mode === m.value ? "default" : "outline"}
            onClick={() => setMode(m.value)}
          >
            {m.label}
          </Button>
        ))}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {removedCount > 0
              ? `Removed ${removedCount} whitespace character${removedCount === 1 ? "" : "s"}`
              : "Result"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={8}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}
