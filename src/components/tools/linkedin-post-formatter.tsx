"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const BOLD_MAP: Record<string, string> = {};
const ITALIC_MAP: Record<string, string> = {};
const boldStart = 0x1d400;
const italicStart = 0x1d434;
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => {
  BOLD_MAP[c] = String.fromCodePoint(boldStart + i);
  ITALIC_MAP[c] = String.fromCodePoint(italicStart + i);
});
"abcdefghijklmnopqrstuvwxyz".split("").forEach((c, i) => {
  BOLD_MAP[c] = String.fromCodePoint(boldStart + 26 + i);
  ITALIC_MAP[c] = String.fromCodePoint(italicStart + 26 + i);
});
"0123456789".split("").forEach((c, i) => {
  BOLD_MAP[c] = String.fromCodePoint(0x1d7ce + i);
});

function transform(text: string, map: Record<string, string>) {
  return text
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

export function LinkedinPostFormatter() {
  const [text, setText] = React.useState("");

  function wrapSelection(map: Record<string, string>) {
    setText((t) => transform(t, map));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => wrapSelection(BOLD_MAP)}>
          Convert to bold
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => wrapSelection(ITALIC_MAP)}>
          Convert to italic
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")} className="ml-auto">
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your LinkedIn post, then click Bold or Italic to style it with Unicode characters..."
        className="mt-3 min-h-[240px]"
      />
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-sm text-muted-foreground">{text.length} characters</p>
        <CopyButton value={text} label="Copy formatted text" />
      </div>
    </div>
  );
}
