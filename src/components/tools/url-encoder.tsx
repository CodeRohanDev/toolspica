"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function UrlEncoder() {
  const [text, setText] = React.useState("");
  const [fullUri, setFullUri] = React.useState(false);

  const output = React.useMemo(() => {
    try {
      return fullUri ? encodeURI(text) : encodeURIComponent(text);
    } catch {
      return "";
    }
  }, [text, fullUri]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Text or URL to encode
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="https://example.com/search?q=hello world&lang=en"
        rows={6}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-4 flex items-center gap-2">
        <Switch id="full-uri" checked={fullUri} onCheckedChange={setFullUri} />
        <Label htmlFor="full-uri" className="text-sm font-normal">
          Full URL mode (keep :/?&= characters, encode a whole URL)
        </Label>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Encoded result</p>
          <CopyButton value={output} />
        </div>
        <Textarea
          readOnly
          value={output}
          rows={6}
          className="mt-2 resize-y bg-muted/40 font-mono text-sm"
        />
      </div>
    </div>
  );
}
