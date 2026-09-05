"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function ConcreteAndGravelCalculator() {
  const [length, setLength] = React.useState(10);
  const [width, setWidth] = React.useState(10);
  const [depthInches, setDepthInches] = React.useState(4);

  const cubicFeet = length * width * (depthInches / 12);
  const cubicYards = cubicFeet / 27;
  const bags80lb = Math.ceil(cubicFeet / 0.6); // one 80lb bag yields ~0.6 cu ft

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Length (ft)</Label>
          <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Width (ft)</Label>
          <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Depth (inches)</Label>
          <Input type="number" value={depthInches} onChange={(e) => setDepthInches(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <StatBar
        items={[
          { label: "cubic feet", value: cubicFeet.toFixed(1) },
          { label: "cubic yards", value: cubicYards.toFixed(2) },
          { label: "80lb bags", value: bags80lb },
        ]}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Works for concrete, gravel, sand, or mulch — just enter the area and fill depth. Bag count
        assumes standard 80lb pre-mix bags yielding about 0.6 cubic feet each.
      </p>
    </div>
  );
}
