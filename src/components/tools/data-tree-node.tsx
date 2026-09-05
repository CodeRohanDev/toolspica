"use client";

import * as React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export function DataTreeNode({ label, value, depth }: { label: string | null; value: unknown; depth: number }) {
  const [open, setOpen] = React.useState(depth < 2);
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  if (!isObject) {
    const display =
      typeof value === "string" ? `"${value}"` : value === null || value === undefined ? "null" : String(value);
    const color =
      typeof value === "string" ? "text-emerald-600" : typeof value === "number" ? "text-blue-600" : "text-purple-600";
    return (
      <div style={{ paddingLeft: depth * 16 }} className="font-mono text-sm">
        {label !== null && <span className="text-muted-foreground">{label}: </span>}
        <span className={color}>{display}</span>
      </div>
    );
  }

  const entries = isArray ? (value as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(value as Record<string, unknown>);
  const bracket = isArray ? ["[", "]"] : ["{", "}"];

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 font-mono text-sm hover:bg-muted/50">
        {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        {label !== null && <span className="text-muted-foreground">{label}: </span>}
        <span className="text-muted-foreground">
          {bracket[0]}
          {!open && `...${entries.length}${bracket[1]}`}
        </span>
      </button>
      {open && (
        <>
          {entries.map(([k, v]) => (
            <DataTreeNode key={k} label={isArray ? null : k} value={v} depth={depth + 1} />
          ))}
          <div style={{ paddingLeft: (depth + 1) * 16 }} className="font-mono text-sm text-muted-foreground">
            {bracket[1]}
          </div>
        </>
      )}
    </div>
  );
}
