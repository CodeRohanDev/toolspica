"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function formatXml(xml: string) {
  const PADDING = "  ";
  let formatted = "";
  let pad = 0;
  const nodes = xml.replace(/>\s*</g, "><").replace(/</g, "~::~<").split("~::~").filter(Boolean);
  for (let node of nodes) {
    if (node.match(/^<\/\w/)) pad = Math.max(0, pad - 1);
    formatted += PADDING.repeat(pad) + node + "\n";
    if (node.match(/^<\?/) || node.match(/\/>\s*$/) || node.match(/^<\w[^>]*\/>$/)) {
      // self-closing or declaration, no indent change
    } else if (node.match(/^<\w/) && !node.match(/<\/\w[^>]*>$/)) {
      pad++;
    }
  }
  return formatted.trim();
}

export function XmlFormatter() {
  const [input, setInput] = React.useState("<root><item id=\"1\">Hello</item></root>");
  const [error, setError] = React.useState<string | null>(null);

  const output = React.useMemo(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "application/xml");
      if (doc.querySelector("parsererror")) throw new Error("Invalid XML");
      setError(null);
      return formatXml(input);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid XML");
      return "";
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste XML..." className="min-h-[180px] font-mono text-sm" />
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {!error && (
        <>
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <p className="text-sm font-medium text-muted-foreground">Formatted XML</p>
            <CopyButton value={output} label="Copy" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
