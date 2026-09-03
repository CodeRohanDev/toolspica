"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface Options {
  stripHtml: boolean;
  collapseSpaces: boolean;
  removeLineBreaks: boolean;
  removeSpecialChars: boolean;
  trim: boolean;
}

function cleanText(text: string, options: Options): string {
  let result = text;

  if (options.stripHtml) {
    result = result.replace(/<[^>]*>/g, "");
  }
  if (options.removeSpecialChars) {
    result = result.replace(/[^\w\s.,!?'"-]/g, "");
  }
  if (options.removeLineBreaks) {
    result = result.replace(/\r?\n+/g, " ");
  }
  if (options.collapseSpaces) {
    result = result.replace(/[ \t]+/g, " ");
    result = result
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }
  if (options.trim) {
    result = result.trim();
  }

  return result;
}

const DEFAULT_OPTIONS: Options = {
  stripHtml: true,
  collapseSpaces: true,
  removeLineBreaks: false,
  removeSpecialChars: false,
  trim: true,
};

const OPTION_LABELS: { key: keyof Options; label: string }[] = [
  { key: "stripHtml", label: "Strip HTML tags" },
  { key: "collapseSpaces", label: "Collapse extra spaces" },
  { key: "removeLineBreaks", label: "Remove line breaks" },
  { key: "removeSpecialChars", label: "Remove special characters" },
  { key: "trim", label: "Trim start/end whitespace" },
];

export function TextCleaner() {
  const [text, setText] = React.useState("");
  const [options, setOptions] = React.useState<Options>(DEFAULT_OPTIONS);

  const output = React.useMemo(() => cleanText(text, options), [text, options]);

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
        placeholder="Paste messy text — copied from a PDF, email, or webpage..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {OPTION_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <Switch
              id={key}
              checked={options[key]}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, [key]: checked }))
              }
            />
            <Label htmlFor={key} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Cleaned text</p>
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
