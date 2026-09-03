"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { randomHexColor } from "@/lib/color";

const INITIAL_COLORS = ["#4f46e5", "#4f46e5", "#4f46e5", "#4f46e5", "#4f46e5", "#4f46e5"];

export function RandomColorGenerator() {
  const [colors, setColors] = React.useState<string[]>(INITIAL_COLORS);
  const [count, setCount] = React.useState("6");

  function generate() {
    const n = Math.max(1, Math.min(24, parseInt(count, 10) || 6));
    setColors(Array.from({ length: n }, () => randomHexColor()));
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="rc-count" className="text-sm text-muted-foreground">
            How many colors
          </Label>
          <Input
            id="rc-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={24}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {colors.map((color, i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <div className="h-16" style={{ backgroundColor: color }} />
            <div className="flex items-center justify-between gap-2 p-2">
              <span className="font-mono text-sm">{color}</span>
              <CopyButton value={color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
