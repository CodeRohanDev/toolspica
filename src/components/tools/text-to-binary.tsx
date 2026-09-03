"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function textToBinary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

export function TextToBinary() {
  const [text, setText] = React.useState("");
  const output = React.useMemo(() => textToBinary(text), [text]);

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
        placeholder="Type or paste text to convert to binary..."
        rows={6}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Binary (8 bits per byte, UTF-8)
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={8}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
