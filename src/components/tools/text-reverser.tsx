"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

type Mode = "characters" | "words" | "lines" | "letters-in-words";

const MODES: { value: Mode; label: string }[] = [
  { value: "characters", label: "Reverse characters" },
  { value: "words", label: "Reverse word order" },
  { value: "lines", label: "Reverse line order" },
  { value: "letters-in-words", label: "Reverse letters in each word" },
];

function reverseText(text: string, mode: Mode): string {
  switch (mode) {
    case "characters":
      return text.split("").reverse().join("");
    case "words":
      return text.split(/(\s+)/).reverse().join("");
    case "lines":
      return text.split("\n").reverse().join("\n");
    case "letters-in-words":
      return text.replace(/[A-Za-z0-9]+/g, (word) =>
        word.split("").reverse().join("")
      );
  }
}

export function TextReverser() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("characters");

  const output = React.useMemo(() => reverseText(text, mode), [text, mode]);

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
        placeholder="Type or paste your text here..."
        rows={6}
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

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Result</p>
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
