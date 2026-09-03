"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { X, Plus } from "lucide-react";

type GradientType = "linear" | "radial" | "conic";

interface Stop {
  id: number;
  color: string;
}

let nextId = 3;

export function CssGradientGenerator() {
  const [type, setType] = React.useState<GradientType>("linear");
  const [angle, setAngle] = React.useState("90");
  const [stops, setStops] = React.useState<Stop[]>([
    { id: 1, color: "#4f46e5" },
    { id: 2, color: "#06b6d4" },
  ]);

  function addStop() {
    setStops((prev) => [...prev, { id: nextId++, color: "#ec4899" }]);
  }
  function removeStop(id: number) {
    setStops((prev) => prev.filter((s) => s.id !== id));
  }
  function updateStop(id: number, color: string) {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, color } : s)));
  }

  const colorList = stops.map((s) => s.color).join(", ");
  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${colorList})`
      : type === "radial"
        ? `radial-gradient(circle, ${colorList})`
        : `conic-gradient(from ${angle}deg, ${colorList})`;

  const cssDeclaration = `background: ${css};`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
          <Button
            key={t}
            type="button"
            size="sm"
            variant={type === t ? "default" : "outline"}
            onClick={() => setType(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      {type !== "radial" && (
        <div className="mt-4 max-w-xs">
          <Label htmlFor="css-grad-angle" className="text-sm text-muted-foreground">
            Angle (degrees)
          </Label>
          <Input
            id="css-grad-angle"
            type="number"
            inputMode="numeric"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="mt-1.5"
          />
        </div>
      )}

      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Color stops</p>
        {stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-2">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(stop.id, e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input
              value={stop.color}
              onChange={(e) => updateStop(stop.id, e.target.value)}
              className="font-mono"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeStop(stop.id)}
              disabled={stops.length <= 2}
              aria-label="Remove color stop"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addStop}>
          <Plus className="size-3.5" /> Add color stop
        </Button>
      </div>

      <div className="mt-5 h-32 rounded-lg border" style={{ background: css }} aria-hidden />

      <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-muted/40 p-3">
        <code className="break-all text-sm">{cssDeclaration}</code>
        <CopyButton value={cssDeclaration} />
      </div>
    </div>
  );
}
