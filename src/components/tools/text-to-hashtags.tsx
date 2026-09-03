"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

type Mode = "per-word" | "combined";

function toHashtags(text: string, mode: Mode): string {
  const words = text
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  if (words.length === 0) return "";

  if (mode === "combined") {
    const combined = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    return `#${combined}`;
  }

  return words.map((w) => `#${w.toLowerCase()}`).join(" ");
}

export function TextToHashtags() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("per-word");

  const output = React.useMemo(() => toHashtags(text, mode), [text, mode]);

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
        placeholder="digital marketing tips for small business"
        rows={4}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "per-word" ? "default" : "outline"}
          onClick={() => setMode("per-word")}
        >
          One hashtag per word
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "combined" ? "default" : "outline"}
          onClick={() => setMode("combined")}
        >
          Combine into one #CamelCase tag
        </Button>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Hashtags</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={4}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>
    </div>
  );
}
