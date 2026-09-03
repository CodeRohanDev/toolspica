"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

type Mode = "to-unicode" | "to-text";

function textToUnicode(text: string): string {
  return [...text]
    .map((char) => "U+" + char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0"))
    .join(" ");
}

function unicodeToText(input: string): string {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const hex = token.replace(/^U\+/i, "").replace(/^\\u/i, "");
      const code = parseInt(hex, 16);
      return Number.isNaN(code) ? "" : String.fromCodePoint(code);
    })
    .join("");
}

export function UnicodeConverter() {
  const [mode, setMode] = React.useState<Mode>("to-unicode");
  const [input, setInput] = React.useState("");

  const output = React.useMemo(
    () => (mode === "to-unicode" ? textToUnicode(input) : unicodeToText(input)),
    [input, mode]
  );

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-1">
        <Button
          type="button"
          size="sm"
          variant={mode === "to-unicode" ? "default" : "outline"}
          onClick={() => setMode("to-unicode")}
        >
          Text → Unicode
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "to-text" ? "default" : "outline"}
          onClick={() => setMode("to-text")}
        >
          Unicode → Text
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "to-unicode" ? "Hello 👋" : "U+0048 U+0065 U+006C U+006C U+006F"}
        rows={5}
        className="mt-4 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Result</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={5}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
