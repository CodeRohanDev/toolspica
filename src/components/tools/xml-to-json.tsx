"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function xmlNodeToObj(node: Element): unknown {
  const children = Array.from(node.children);
  if (children.length === 0) return node.textContent ?? "";
  const result: Record<string, unknown> = {};
  for (const child of children) {
    const value = xmlNodeToObj(child);
    if (result[child.tagName] !== undefined) {
      if (!Array.isArray(result[child.tagName])) result[child.tagName] = [result[child.tagName]];
      (result[child.tagName] as unknown[]).push(value);
    } else result[child.tagName] = value;
  }
  return result;
}

export function XmlToJson() {
  const [input, setInput] = React.useState("<root><item>Hello</item><item>World</item></root>");
  const [error, setError] = React.useState<string | null>(null);

  const json = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      if (doc.querySelector("parsererror")) throw new Error("Invalid XML");
      setError(null);
      const root = doc.documentElement;
      return JSON.stringify({ [root.tagName]: xmlNodeToObj(root) }, null, 2);
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
            <p className="text-sm font-medium text-muted-foreground">JSON output</p>
            <CopyButton value={json} label="Copy" />
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">{json}</pre>
        </>
      )}
    </div>
  );
}
