"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

export function RemoveDuplicateLines() {
  const [text, setText] = React.useState("");
  const [caseInsensitive, setCaseInsensitive] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(true);
  const [removeEmpty, setRemoveEmpty] = React.useState(false);

  const { output, removedCount } = React.useMemo(() => {
    const lines = text.split("\n");
    const seen = new Set<string>();
    const result: string[] = [];
    let removed = 0;

    for (const rawLine of lines) {
      const line = trimLines ? rawLine.trim() : rawLine;
      if (removeEmpty && line.length === 0) {
        removed += 1;
        continue;
      }
      const key = caseInsensitive ? line.toLowerCase() : line;
      if (seen.has(key)) {
        removed += 1;
        continue;
      }
      seen.add(key);
      result.push(line);
    }

    return { output: result.join("\n"), removedCount: removed };
  }, [text, caseInsensitive, trimLines, removeEmpty]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Paste lines here, one per line...\napple\nbanana\napple\ncherry"}
        rows={10}
        className="resize-y font-mono text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="case-insensitive"
            checked={caseInsensitive}
            onCheckedChange={setCaseInsensitive}
          />
          <Label htmlFor="case-insensitive" className="text-sm font-normal">
            Case-insensitive
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="trim-lines"
            checked={trimLines}
            onCheckedChange={setTrimLines}
          />
          <Label htmlFor="trim-lines" className="text-sm font-normal">
            Trim whitespace
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="remove-empty"
            checked={removeEmpty}
            onCheckedChange={setRemoveEmpty}
          />
          <Label htmlFor="remove-empty" className="text-sm font-normal">
            Remove empty lines
          </Label>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {removedCount > 0
              ? `Removed ${removedCount} duplicate line${removedCount === 1 ? "" : "s"}`
              : "No duplicates removed yet"}
          </p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={10}
          className="mt-2 resize-y bg-muted/40 text-sm"
        />
      </div>

      <div className="mt-4">
        <Button type="button" variant="outline" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
    </div>
  );
}
