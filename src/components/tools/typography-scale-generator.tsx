"use client";

import * as React from "react";
import { CopyButton } from "@/components/tools/copy-button";

const RATIOS = [
  { label: "Minor Second (1.067)", value: 1.067 },
  { label: "Major Second (1.125)", value: 1.125 },
  { label: "Minor Third (1.2)", value: 1.2 },
  { label: "Major Third (1.25)", value: 1.25 },
  { label: "Perfect Fourth (1.333)", value: 1.333 },
  { label: "Golden Ratio (1.618)", value: 1.618 },
];

const STEPS = [
  { name: "Caption", n: -1 },
  { name: "Body", n: 0 },
  { name: "H6", n: 1 },
  { name: "H5", n: 2 },
  { name: "H4", n: 3 },
  { name: "H3", n: 4 },
  { name: "H2", n: 5 },
  { name: "H1", n: 6 },
];

export function TypographyScaleGenerator() {
  const [base, setBase] = React.useState(16);
  const [ratio, setRatio] = React.useState(1.25);

  const scale = STEPS.map((s) => ({ ...s, px: Math.round(base * Math.pow(ratio, s.n)) }));
  const css = scale.map((s) => `--font-${s.name.toLowerCase()}: ${(s.px / base).toFixed(3)}rem; /* ${s.px}px */`).join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Base size (px)</label>
          <input type="number" value={base} onChange={(e) => setBase(Number(e.target.value) || 16)} className="block w-24 rounded-md border bg-background px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Scale ratio</label>
          <select value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className="block rounded-md border bg-background px-2 py-1.5 text-sm">
            {RATIOS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-5 space-y-3 border-t pt-4">
        {scale.reverse().map((s) => (
          <div key={s.name} className="flex items-baseline gap-3">
            <span className="w-16 shrink-0 text-xs text-muted-foreground">{s.name}</span>
            <span style={{ fontSize: s.px }} className="truncate font-semibold">Aa {s.name}</span>
            <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">{s.px}px</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-medium text-muted-foreground">CSS variables</p>
        <CopyButton value={css} label="Copy CSS" />
      </div>
      <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">{css}</pre>
    </div>
  );
}
