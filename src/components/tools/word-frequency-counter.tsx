"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const STOPWORDS = new Set(
  "a an the and or but of to in on at for with is are was were be been being this that these those it its as by from".split(
    " "
  )
);

export function WordFrequencyCounter() {
  const [text, setText] = React.useState("");
  const [ignoreStopwords, setIgnoreStopwords] = React.useState(false);
  const [minLength, setMinLength] = React.useState(1);

  const frequencies = React.useMemo(() => {
    const words = text
      .toLowerCase()
      .match(/[a-z0-9']+/g) ?? [];

    const counts = new Map<string, number>();
    for (const word of words) {
      if (word.length < minLength) continue;
      if (ignoreStopwords && STOPWORDS.has(word)) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30);
  }, [text, ignoreStopwords, minLength]);

  const maxCount = frequencies[0]?.[1] ?? 1;

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
        placeholder="Paste an article, essay, or transcript to see which words repeat most..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="ignore-stopwords"
            checked={ignoreStopwords}
            onCheckedChange={setIgnoreStopwords}
          />
          <Label htmlFor="ignore-stopwords" className="text-sm font-normal">
            Ignore common words (the, and, is...)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="min-length" className="text-sm font-normal text-muted-foreground">
            Min word length
          </Label>
          <Input
            id="min-length"
            type="number"
            min={1}
            max={10}
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="h-8 w-16 px-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          Top {frequencies.length} words
        </p>
        {frequencies.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Paste some text above to see word frequencies.
          </p>
        ) : (
          <div className="mt-3 space-y-1.5">
            {frequencies.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-sm font-medium">
                  {word}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground/70"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
