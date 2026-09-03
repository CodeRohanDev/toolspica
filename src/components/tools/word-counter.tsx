"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { StatBar } from "@/components/tools/stat-bar";

const SAMPLE_TEXT =
  "Toolspica is a free, privacy-first platform of browser-based tools. Paste your own text above to see live word, character, sentence, and paragraph counts, plus an estimated reading time.";

function countStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences =
    trimmed.length === 0
      ? 0
      : (trimmed.match(/[.!?]+(?=\s|$)/g) ?? []).length || 1;
  const paragraphs =
    trimmed.length === 0
      ? 0
      : trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length;
  const readingTimeMinutes = words === 0 ? 0 : Math.max(1, Math.round(words / 200));

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMinutes };
}

export function WordCounter() {
  const [text, setText] = React.useState("");
  const stats = countStats(text);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Your text</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setText(SAMPLE_TEXT)}
          >
            Sample text
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <CopyButton value={text} />
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        rows={10}
        className="mt-3 resize-y text-sm"
      />

      <StatBar
        items={[
          { label: "words", value: stats.words },
          { label: "characters", value: stats.characters },
          { label: "characters (no spaces)", value: stats.charactersNoSpaces },
          { label: "sentences", value: stats.sentences },
          { label: "paragraphs", value: stats.paragraphs },
          { label: "min read", value: stats.readingTimeMinutes },
        ]}
      />
    </div>
  );
}
