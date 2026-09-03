"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function binaryToText(input: string): { output: string; error: string | null } {
  const cleaned = input.trim();
  if (!cleaned) return { output: "", error: null };

  const groups = cleaned.split(/\s+/);
  const bytes: number[] = [];

  for (const group of groups) {
    if (!/^[01]+$/.test(group)) {
      return {
        output: "",
        error: `"${group}" isn't valid binary — only 0s and 1s are allowed, separated by spaces.`,
      };
    }
    if (group.length % 8 !== 0) {
      return {
        output: "",
        error: `"${group}" isn't a multiple of 8 bits — each character needs a full 8-bit byte.`,
      };
    }
    for (let i = 0; i < group.length; i += 8) {
      bytes.push(parseInt(group.slice(i, i + 8), 2));
    }
  }

  try {
    const output = new TextDecoder("utf-8", { fatal: true }).decode(
      new Uint8Array(bytes)
    );
    return { output, error: null };
  } catch {
    return { output: "", error: "Couldn't decode this as valid UTF-8 text." };
  }
}

export function BinaryToText() {
  const [input, setInput] = React.useState("");
  const { output, error } = React.useMemo(() => binaryToText(input), [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Binary input</p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setInput("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="01001000 01100101 01101100 01101100 01101111"
        rows={8}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {error ?? "Decoded text"}
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
