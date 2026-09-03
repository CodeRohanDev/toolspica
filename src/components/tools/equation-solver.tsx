"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { compileExpression, fitQuadratic } from "@/lib/math-expression";

interface SolveResult {
  kind: "linear" | "quadratic" | "identity" | "no-solution";
  roots: number[];
  steps: string[];
}

function fmt(n: number): string {
  const rounded = Math.round(n * 1e9) / 1e9;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function solveEquation(left: string, right: string): SolveResult {
  const fLeft = compileExpression(left);
  const fRight = compileExpression(right);
  const diff = (x: number) => fLeft(x) - fRight(x);
  const { a, b, c } = fitQuadratic(diff);

  if (Math.abs(a) > 1e-9) {
    const discriminant = b * b - 4 * a * c;
    const steps = [
      `Move everything to one side: ${fmt(a)}x² + ${fmt(b)}x + ${fmt(c)} = 0`,
      `Discriminant = b² - 4ac = ${fmt(discriminant)}`,
    ];
    if (discriminant < 0) {
      return { kind: "no-solution", roots: [], steps: [...steps, "No real solutions (negative discriminant)."] };
    }
    const sqrtD = Math.sqrt(discriminant);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    return {
      kind: "quadratic",
      roots: discriminant === 0 ? [r1] : [r1, r2],
      steps: [...steps, `x = (-b ± √discriminant) / 2a`],
    };
  }

  if (Math.abs(b) > 1e-9) {
    const root = -c / b;
    return {
      kind: "linear",
      roots: [root],
      steps: [`Simplify to: ${fmt(b)}x + ${fmt(c)} = 0`, `x = ${fmt(-c)} / ${fmt(b)}`],
    };
  }

  if (Math.abs(c) < 1e-9) {
    return { kind: "identity", roots: [], steps: ["Both sides are always equal — true for every x."] };
  }
  return { kind: "no-solution", roots: [], steps: ["Both sides simplify to a false statement — no solution."] };
}

export function EquationSolver() {
  const [left, setLeft] = React.useState("2x + 3");
  const [right, setRight] = React.useState("7");
  const [result, setResult] = React.useState<SolveResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function solve() {
    setError(null);
    setResult(null);
    try {
      setResult(solveEquation(left, right));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't solve this equation.");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          className="max-w-[240px] font-mono"
          placeholder="e.g. 2x + 3"
        />
        <span className="text-lg font-semibold text-muted-foreground">=</span>
        <Input
          value={right}
          onChange={(e) => setRight(e.target.value)}
          className="max-w-[240px] font-mono"
          placeholder="e.g. 7"
        />
        <Button type="button" onClick={solve}>
          Solve for x
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Supports linear and quadratic equations in x, including parentheses, exponents (x^2), and
        functions like sqrt().
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5">
          <div className="rounded-lg bg-brand-soft p-3 text-sm font-semibold">
            {result.kind === "identity" && "True for all values of x"}
            {result.kind === "no-solution" && "No solution"}
            {(result.kind === "linear" || result.kind === "quadratic") &&
              (result.roots.length === 1
                ? `x = ${fmt(result.roots[0])}`
                : `x = ${fmt(result.roots[0])} or x = ${fmt(result.roots[1])}`)}
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {result.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
