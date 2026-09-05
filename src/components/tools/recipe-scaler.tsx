"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

function scaleLine(line: string, factor: number): string {
  const match = line.match(/^(\s*)(\d+(?:\.\d+)?|\d+\/\d+)(\s.*)$/);
  if (!match) return line;
  const [, indent, qtyStr, rest] = match;
  let qty: number;
  if (qtyStr.includes("/")) {
    const [num, den] = qtyStr.split("/").map(Number);
    qty = num / den;
  } else {
    qty = Number(qtyStr);
  }
  const scaled = qty * factor;
  const formatted = Number.isInteger(scaled) ? String(scaled) : scaled.toFixed(2).replace(/\.?0+$/, "");
  return `${indent}${formatted}${rest}`;
}

export function RecipeScaler() {
  const [originalServings, setOriginalServings] = React.useState(4);
  const [targetServings, setTargetServings] = React.useState(8);
  const [ingredients, setIngredients] = React.useState("2 cups flour\n1 cup sugar\n1/2 cup butter\n2 eggs\n1 tsp vanilla extract");

  const factor = originalServings > 0 ? targetServings / originalServings : 1;
  const scaled = ingredients
    .split("\n")
    .map((line) => scaleLine(line, factor))
    .join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm text-muted-foreground">Original servings</Label>
          <Input type="number" min={1} value={originalServings} onChange={(e) => setOriginalServings(Number(e.target.value))} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Target servings</Label>
          <Input type="number" min={1} value={targetServings} onChange={(e) => setTargetServings(Number(e.target.value))} className="mt-1.5" />
        </div>
      </div>

      <Label className="mt-3 block text-sm text-muted-foreground">Ingredients (one per line, quantity first)</Label>
      <Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={6} className="mt-1.5 resize-y font-mono text-sm" />

      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Scaled recipe ({factor.toFixed(2)}x)</p>
          <CopyButton value={scaled} />
        </div>
        <Textarea readOnly value={scaled} rows={6} className="mt-2 resize-y bg-muted/40 font-mono text-sm" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Recognizes whole numbers, decimals, and simple fractions (like 1/2) at the start of each
        line — text after the quantity is left as-is.
      </p>
    </div>
  );
}
