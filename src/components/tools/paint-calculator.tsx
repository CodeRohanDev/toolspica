"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

const COVERAGE_PER_GALLON = 350; // sq ft, standard one-coat coverage

export function PaintCalculator() {
  const [length, setLength] = React.useState(12);
  const [width, setWidth] = React.useState(10);
  const [height, setHeight] = React.useState(8);
  const [openings, setOpenings] = React.useState(2);
  const [coats, setCoats] = React.useState(2);

  const perimeter = 2 * (length + width);
  const wallArea = Math.max(0, perimeter * height - openings * 20);
  const gallons = (wallArea * coats) / COVERAGE_PER_GALLON;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <Label className="text-xs text-muted-foreground">Length (ft)</Label>
          <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Width (ft)</Label>
          <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Height (ft)</Label>
          <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Doors/windows</Label>
          <Input type="number" value={openings} onChange={(e) => setOpenings(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Coats</Label>
          <Input type="number" min={1} max={3} value={coats} onChange={(e) => setCoats(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <StatBar
        items={[
          { label: "wall area", value: `${wallArea.toFixed(0)} sq ft` },
          { label: "paint needed", value: `${gallons.toFixed(2)} gal` },
          { label: "gallons to buy", value: Math.ceil(gallons) },
        ]}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Assumes standard one-coat coverage of {COVERAGE_PER_GALLON} sq ft per gallon, and 20 sq ft
        deducted per door/window opening.
      </p>
    </div>
  );
}
