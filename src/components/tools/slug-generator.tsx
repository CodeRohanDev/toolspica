"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

function toSlug(input: string, separator: string, lowercase: boolean) {
  let result = input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "") // strip accent marks (e.g. é -> e)
    .trim()
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .replace(/[\s_-]+/g, separator);

  const edgeSeparator = new RegExp(`^\\${separator}+|\\${separator}+$`, "g");
  result = result.replace(edgeSeparator, "");

  return lowercase ? result.toLowerCase() : result;
}

export function SlugGenerator() {
  const [text, setText] = React.useState("");
  const [separator, setSeparator] = React.useState<"-" | "_">("-");
  const [lowercase, setLowercase] = React.useState(true);

  const slug = React.useMemo(
    () => toSlug(text, separator, lowercase),
    [text, separator, lowercase]
  );

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="slug-input" className="text-sm font-medium text-muted-foreground">
        Text to convert
      </Label>
      <Input
        id="slug-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. 10 Best Productivity Tools for 2026!"
        className="mt-2"
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Separator</span>
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant={separator === "-" ? "default" : "outline"}
              onClick={() => setSeparator("-")}
            >
              hyphen -
            </Button>
            <Button
              type="button"
              size="sm"
              variant={separator === "_" ? "default" : "outline"}
              onClick={() => setSeparator("_")}
            >
              underscore _
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
          <Label htmlFor="lowercase" className="text-sm font-normal">
            Force lowercase
          </Label>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Slug</p>
          <CopyButton value={slug} />
        </div>
        <p className="mt-2 break-all rounded-lg bg-muted/40 p-3 font-mono text-sm">
          {slug || "your-slug-appears-here"}
        </p>
      </div>
    </div>
  );
}
