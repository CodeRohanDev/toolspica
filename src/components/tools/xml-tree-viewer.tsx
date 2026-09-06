"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronDown } from "lucide-react";

function ElementNode({ el, depth }: { el: Element; depth: number }) {
  const [open, setOpen] = React.useState(depth < 2);
  const children = Array.from(el.children);
  const textContent = children.length === 0 ? (el.textContent ?? "").trim() : "";
  const attrs = Array.from(el.attributes);

  return (
    <div style={{ paddingLeft: depth * 16 }} className="font-mono text-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex flex-wrap items-center gap-1 hover:bg-muted/50" disabled={children.length === 0}>
        {children.length > 0 ? open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" /> : <span className="w-3.5" />}
        <span className="text-blue-600">&lt;{el.tagName}</span>
        {attrs.map((a) => (
          <span key={a.name} className="text-muted-foreground">
            {" "}
            <span className="text-purple-600">{a.name}</span>=&quot;<span className="text-emerald-600">{a.value}</span>&quot;
          </span>
        ))}
        <span className="text-blue-600">&gt;</span>
        {textContent && <span className="ml-1 text-foreground">{textContent}</span>}
      </button>
      {open && children.length > 0 && (
        <>
          {children.map((child, i) => (
            <ElementNode key={i} el={child} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}

export function XmlTreeViewer() {
  const [input, setInput] = React.useState('<root>\n  <user id="1">\n    <name>Alice</name>\n    <role>admin</role>\n  </user>\n</root>');

  const { rootEl, error } = React.useMemo(() => {
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const parserError = doc.querySelector("parsererror");
      if (parserError) throw new Error("Invalid XML — the document is not well-formed.");
      return { rootEl: doc.documentElement, error: "" };
    } catch (e) {
      return { rootEl: null, error: e instanceof Error ? e.message : "Invalid XML" };
    }
  }, [input]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={14} className="resize-y font-mono text-sm" />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {rootEl && (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-muted/30 p-3">
          <ElementNode el={rootEl} depth={0} />
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        Click any element with children to collapse or expand it. Attributes and text content are
        shown inline.
      </p>
    </div>
  );
}
