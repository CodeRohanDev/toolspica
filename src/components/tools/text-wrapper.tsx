"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

type Mode = "width" | "affix";

function wrapToWidth(text: string, width: number): string {
  return text
    .split("\n")
    .map((line) => {
      const words = line.split(" ");
      const wrapped: string[] = [];
      let current = "";
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > width && current) {
          wrapped.push(current);
          current = word;
        } else {
          current = candidate;
        }
      }
      if (current) wrapped.push(current);
      return wrapped.join("\n");
    })
    .join("\n");
}

function wrapWithAffix(text: string, prefix: string, suffix: string): string {
  return text
    .split("\n")
    .map((line) => `${prefix}${line}${suffix}`)
    .join("\n");
}

export function TextWrapper() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("width");
  const [width, setWidth] = React.useState(60);
  const [prefix, setPrefix] = React.useState('"');
  const [suffix, setSuffix] = React.useState('"');

  const output = React.useMemo(() => {
    if (mode === "width") return wrapToWidth(text, Math.max(10, width));
    return wrapWithAffix(text, prefix, suffix);
  }, [text, mode, width, prefix, suffix]);

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
        placeholder="Paste text to wrap..."
        rows={6}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "width" ? "default" : "outline"}
          onClick={() => setMode("width")}
        >
          Wrap to line width
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "affix" ? "default" : "outline"}
          onClick={() => setMode("affix")}
        >
          Add prefix/suffix per line
        </Button>
      </div>

      {mode === "width" ? (
        <div className="mt-4">
          <Label htmlFor="wrap-width" className="text-sm text-muted-foreground">
            Max characters per line
          </Label>
          <Input
            id="wrap-width"
            type="number"
            min={10}
            max={200}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-1.5 w-28"
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="prefix" className="text-sm text-muted-foreground">
              Prefix (before each line)
            </Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="suffix" className="text-sm text-muted-foreground">
              Suffix (after each line)
            </Label>
            <Input
              id="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      )}

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Result</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={8}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
