"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

function removeAdjacentDuplicates(text: string, caseInsensitive: boolean): {
  output: string;
  removedCount: number;
} {
  const tokens = text.split(/(\s+)/);
  const result: string[] = [];
  let removed = 0;
  let lastWord: string | null = null;

  for (const token of tokens) {
    const isWord = /\S/.test(token) && !/^\s+$/.test(token);
    if (isWord) {
      const compareKey = caseInsensitive ? token.toLowerCase() : token;
      const compareLast = caseInsensitive && lastWord ? lastWord.toLowerCase() : lastWord;
      if (lastWord !== null && compareKey === compareLast) {
        removed += 1;
        continue;
      }
      lastWord = token;
    }
    result.push(token);
  }

  return { output: result.join(""), removedCount: removed };
}

export function DuplicateWordRemover() {
  const [text, setText] = React.useState("");
  const [caseInsensitive, setCaseInsensitive] = React.useState(true);

  const { output, removedCount } = React.useMemo(
    () => removeAdjacentDuplicates(text, caseInsensitive),
    [text, caseInsensitive]
  );

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
        placeholder="I think that that is the the right answer."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex items-center gap-2">
        <Switch
          id="dup-word-ci"
          checked={caseInsensitive}
          onCheckedChange={setCaseInsensitive}
        />
        <Label htmlFor="dup-word-ci" className="text-sm font-normal">
          Case-insensitive (catches "The the")
        </Label>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {removedCount > 0
              ? `Removed ${removedCount} repeated word${removedCount === 1 ? "" : "s"}`
              : "No repeated words found yet"}
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
