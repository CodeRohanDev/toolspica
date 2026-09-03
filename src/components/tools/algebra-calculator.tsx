"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compileExpression, fitQuadratic } from "@/lib/math-expression";

function fmt(n: number): string {
  const rounded = Math.round(n * 1e9) / 1e9;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function buildSimplified(a: number, b: number, c: number): string {
  const terms: string[] = [];
  if (Math.abs(a) > 1e-9) terms.push(`${a === 1 ? "" : a === -1 ? "-" : fmt(a)}x²`);
  if (Math.abs(b) > 1e-9) {
    const sign = b > 0 && terms.length ? " + " : b < 0 ? (terms.length ? " - " : "-") : "";
    const mag = Math.abs(b);
    terms.push(`${sign}${mag === 1 ? "" : fmt(mag)}x`);
  }
  if (Math.abs(c) > 1e-9 || terms.length === 0) {
    const sign = c > 0 && terms.length ? " + " : c < 0 ? (terms.length ? " - " : "-") : "";
    terms.push(`${sign}${fmt(Math.abs(c))}`);
  }
  return terms.join("");
}

export function AlgebraCalculator() {
  const [expr, setExpr] = React.useState("3x + 2(x - 4) + 7");
  const [evalAt, setEvalAt] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const analysis = React.useMemo(() => {
    setError(null);
    try {
      const f = compileExpression(expr);
      const { a, b, c } = fitQuadratic(f);
      return { a, b, c, f };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't parse this expression.");
      return null;
    }
  }, [expr]);

  const evalNum = parseFloat(evalAt);
  const evalResult =
    analysis && evalAt.trim() && Number.isFinite(evalNum) ? analysis.f(evalNum) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="algebra-expr" className="text-sm text-muted-foreground">
        Expression in x
      </Label>
      <Input
        id="algebra-expr"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        className="mt-1.5 font-mono"
        placeholder="e.g. 3x + 2(x - 4) + 7"
      />

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {analysis && (
        <div className="mt-4 rounded-lg bg-brand-soft p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Simplified
          </p>
          <p className="mt-1 font-mono text-lg font-semibold">
            {buildSimplified(analysis.a, analysis.b, analysis.c)}
          </p>
        </div>
      )}

      <div className="mt-4">
        <Label htmlFor="algebra-eval" className="text-sm text-muted-foreground">
          Evaluate at x = (optional)
        </Label>
        <Input
          id="algebra-eval"
          value={evalAt}
          onChange={(e) => setEvalAt(e.target.value)}
          className="mt-1.5 w-32 font-mono"
          placeholder="e.g. 5"
        />
        {evalResult !== null && (
          <p className="mt-2 text-sm">
            Result: <span className="font-mono font-semibold">{fmt(evalResult)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
