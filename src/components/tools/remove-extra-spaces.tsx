"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function RemoveExtraSpaces() {
  const [text, setText] = React.useState("");
  const [removeBlankLines, setRemoveBlankLines] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(true);

  const { output, removedCount } = React.useMemo(() => {
    let lines = text.split("\n").map((line) => {
      const collapsed = line.replace(/[ \t]{2,}/g, " ");
      return trimLines ? collapsed.trim() : collapsed;
    });

    if (removeBlankLines) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    const output = lines.join("\n");
    const originalSpaces = (text.match(/ /g) ?? []).length;
    const finalSpaces = (output.match(/ /g) ?? []).length;

    return { output, removedCount: Math.max(0, originalSpaces - finalSpaces) };
  }, [text, removeBlankLines, trimLines]);

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
        placeholder="Paste text with extra   spaces    between words..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch id="trim-lines" checked={trimLines} onCheckedChange={setTrimLines} />
          <Label htmlFor="trim-lines" className="text-sm font-normal">
            Trim start/end of each line
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="remove-blank"
            checked={removeBlankLines}
            onCheckedChange={setRemoveBlankLines}
          />
          <Label htmlFor="remove-blank" className="text-sm font-normal">
            Remove blank lines
          </Label>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {removedCount > 0
              ? `Removed ${removedCount} extra space${removedCount === 1 ? "" : "s"}`
              : "No extra spaces found yet"}
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
