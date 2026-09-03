"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";

const SEPARATORS = [
  { label: "Comma", value: ", " },
  { label: "Semicolon", value: "; " },
  { label: "Pipe", value: " | " },
];

export function ColumnToComma() {
  const [text, setText] = React.useState("");
  const [separator, setSeparator] = React.useState(SEPARATORS[0].value);
  const [quoted, setQuoted] = React.useState(false);
  const [removeEmpty, setRemoveEmpty] = React.useState(true);

  const output = React.useMemo(() => {
    let lines = text.split("\n").map((line) => line.trim());
    if (removeEmpty) lines = lines.filter((line) => line.length > 0);
    if (quoted) lines = lines.map((line) => `"${line}"`);
    return lines.join(separator);
  }, [text, separator, quoted, removeEmpty]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Column of values (one per line)
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"apple\nbanana\ncherry"}
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex gap-1">
          {SEPARATORS.map((s) => (
            <Button
              key={s.label}
              type="button"
              size="sm"
              variant={separator === s.value ? "default" : "outline"}
              onClick={() => setSeparator(s.value)}
            >
              {s.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Switch id="quoted" checked={quoted} onCheckedChange={setQuoted} />
          <Label htmlFor="quoted" className="text-sm font-normal">
            Wrap each value in quotes
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="col-remove-empty" checked={removeEmpty} onCheckedChange={setRemoveEmpty} />
          <Label htmlFor="col-remove-empty" className="text-sm font-normal">
            Skip empty lines
          </Label>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Result</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={4}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
