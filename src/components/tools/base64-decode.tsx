"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function fromBase64(input: string): string {
  const binary = atob(input.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function Base64Decode() {
  const [input, setInput] = React.useState("");

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      return { output: fromBase64(input), error: null as string | null };
    } catch {
      return {
        output: "",
        error: "Invalid Base64 — check for typos, missing padding, or invalid characters.",
      };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Base64 input</p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setInput("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="SGVsbG8sIHdvcmxkIQ=="
        rows={6}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{error ?? "Decoded text"}</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={6}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}
