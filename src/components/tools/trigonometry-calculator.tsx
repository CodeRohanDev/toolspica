"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "undefined";
  const rounded = Math.round(n * 1e6) / 1e6;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

export function TrigonometryCalculator() {
  const [angle, setAngle] = React.useState("30");
  const [unit, setUnit] = React.useState<"deg" | "rad">("deg");

  const angleNum = parseFloat(angle);
  const valid = Number.isFinite(angleNum);
  const radians = unit === "deg" ? (angleNum * Math.PI) / 180 : angleNum;

  const sin = Math.sin(radians);
  const cos = Math.cos(radians);
  const tan = Math.tan(radians);

  const results = valid
    ? [
        { label: "sin", value: sin },
        { label: "cos", value: cos },
        { label: "tan", value: Math.abs(cos) < 1e-12 ? Infinity : tan },
        { label: "csc (1/sin)", value: Math.abs(sin) < 1e-12 ? Infinity : 1 / sin },
        { label: "sec (1/cos)", value: Math.abs(cos) < 1e-12 ? Infinity : 1 / cos },
        { label: "cot (1/tan)", value: Math.abs(sin) < 1e-12 ? Infinity : cos / sin },
      ]
    : [];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="trig-angle" className="text-sm text-muted-foreground">
            Angle
          </Label>
          <Input
            id="trig-angle"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="mt-1.5 w-32 font-mono"
          />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Unit</Label>
          <Select value={unit} onValueChange={(v) => v && setUnit(v as "deg" | "rad")}>
            <SelectTrigger className="mt-1.5 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deg">Degrees</SelectItem>
              <SelectItem value="rad">Radians</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!valid && angle.trim() && (
        <p className="mt-3 text-sm text-destructive">Enter a valid numeric angle.</p>
      )}

      {valid && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {results.map((r) => (
            <div key={r.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {r.label}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold">{fmt(r.value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
