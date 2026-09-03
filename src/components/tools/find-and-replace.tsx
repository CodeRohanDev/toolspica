"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function FindAndReplace() {
  const [text, setText] = React.useState("");
  const [find, setFind] = React.useState("");
  const [replace, setReplace] = React.useState("");
  const [caseSensitive, setCaseSensitive] = React.useState(false);
  const [wholeWord, setWholeWord] = React.useState(false);
  const [useRegex, setUseRegex] = React.useState(false);

  const { output, matchCount, error } = React.useMemo(() => {
    if (!find) return { output: text, matchCount: 0, error: null as string | null };

    try {
      const pattern = useRegex ? find : escapeRegExp(find);
      const wrapped = wholeWord ? `\\b${pattern}\\b` : pattern;
      const flags = caseSensitive ? "g" : "gi";
      const regex = new RegExp(wrapped, flags);
      const matches = text.match(regex);
      return {
        output: text.replace(regex, replace),
        matchCount: matches ? matches.length : 0,
        error: null as string | null,
      };
    } catch {
      return { output: text, matchCount: 0, error: "Invalid regular expression" };
    }
  }, [text, find, replace, caseSensitive, wholeWord, useRegex]);

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
        placeholder="Paste your text here..."
        rows={8}
        className="mt-3 resize-y text-sm"
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="find-input" className="text-sm text-muted-foreground">
            Find
          </Label>
          <Input
            id="find-input"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="text to find"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="replace-input" className="text-sm text-muted-foreground">
            Replace with
          </Label>
          <Input
            id="replace-input"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="replacement text"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="case-sensitive"
            checked={caseSensitive}
            onCheckedChange={setCaseSensitive}
          />
          <Label htmlFor="case-sensitive" className="text-sm font-normal">
            Case-sensitive
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="whole-word" checked={wholeWord} onCheckedChange={setWholeWord} />
          <Label htmlFor="whole-word" className="text-sm font-normal">
            Whole word only
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="use-regex" checked={useRegex} onCheckedChange={setUseRegex} />
          <Label htmlFor="use-regex" className="text-sm font-normal">
            Treat "Find" as regex
          </Label>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {error ?? `${matchCount} match${matchCount === 1 ? "" : "es"} replaced`}
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
