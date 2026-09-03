"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

export function GradientGenerator() {
  const [colorA, setColorA] = React.useState("#4f46e5");
  const [colorB, setColorB] = React.useState("#ec4899");
  const [angle, setAngle] = React.useState("135");

  const css = `linear-gradient(${angle}deg, ${colorA}, ${colorB})`;
  const cssDeclaration = `background: ${css};`;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="grad-color-a" className="text-sm text-muted-foreground">
            Start color
          </Label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="color"
              value={colorA}
              onChange={(e) => setColorA(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input value={colorA} onChange={(e) => setColorA(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <Label htmlFor="grad-color-b" className="text-sm text-muted-foreground">
            End color
          </Label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="color"
              value={colorB}
              onChange={(e) => setColorB(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input value={colorB} onChange={(e) => setColorB(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <Label htmlFor="grad-angle" className="text-sm text-muted-foreground">
            Angle (degrees)
          </Label>
          <Input
            id="grad-angle"
            type="number"
            inputMode="numeric"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div
        className="mt-5 h-32 rounded-lg border"
        style={{ background: css }}
        aria-hidden
      />

      <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-muted/40 p-3">
        <code className="text-sm">{cssDeclaration}</code>
        <CopyButton value={cssDeclaration} />
      </div>
    </div>
  );
}
