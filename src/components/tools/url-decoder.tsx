"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

export function UrlDecoder() {
  const [text, setText] = React.useState("");

  const { output, error } = React.useMemo(() => {
    if (!text) return { output: "", error: null as string | null };
    try {
      return { output: decodeURIComponent(text), error: null as string | null };
    } catch {
      return {
        output: "",
        error:
          "Couldn't decode this text — it contains an invalid % sequence (not valid percent-encoding).",
      };
    }
  }, [text]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Encoded text or URL
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
        rows={6}
        className="mt-3 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {error ?? "Decoded result"}
          </p>
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
