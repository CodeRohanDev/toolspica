"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface Card {
  term: string;
  definition: string;
}

function parseCards(raw: string): Card[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [term, definition] = line.split("|").map((s) => s.trim());
      return { term: term ?? "", definition: definition ?? "" };
    })
    .filter((c) => c.term);
}

export function FlashcardMaker() {
  const [raw, setRaw] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const cards = React.useMemo(() => parseCards(raw), [raw]);
  const card = cards[index];

  function go(delta: number) {
    if (cards.length === 0) return;
    setIndex((i) => (i + delta + cards.length) % cards.length);
    setFlipped(false);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          setIndex(0);
          setFlipped(false);
        }}
        placeholder={"One card per line, format: Term | Definition\nMitochondria | The powerhouse of the cell\nPhotosynthesis | The process plants use to convert light into energy"}
        rows={5}
        className="resize-y"
      />

      {cards.length > 0 && card && (
        <div className="mt-5 border-t pt-4">
          <p className="mb-2 text-center text-sm text-muted-foreground">
            Card {index + 1} of {cards.length}
          </p>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="mx-auto flex min-h-40 w-full max-w-md items-center justify-center rounded-xl border-2 bg-muted/30 p-6 text-center transition-colors hover:bg-muted/50"
          >
            <div>
              <p className="text-lg font-medium">{flipped ? card.definition : card.term}</p>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <RotateCw className="size-3" /> Click to flip
              </p>
            </div>
          </button>

          <div className="mt-4 flex justify-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => go(-1)}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => go(1)}>
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
