"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
  else if (max === gn) h = ((bn - rn) / d + 2) * 60;
  else h = ((rn - gn) / d + 4) * 60;
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function ColorCodeConverter() {
  const [hex, setHex] = React.useState("#4f46e5");
  const rgb = React.useMemo(() => hexToRgb(hex), [hex]);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Label htmlFor="hex-input" className="text-sm text-muted-foreground">
          HEX color
        </Label>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="color"
          value={rgb ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          className="size-10 shrink-0 cursor-pointer rounded-lg border"
        />
        <Input
          id="hex-input"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="font-mono"
        />
      </div>

      {!rgb ? (
        <p className="mt-4 text-sm text-destructive">
          Enter a valid HEX color, like #4f46e5 or #fff.
        </p>
      ) : (
        <div className="mt-5 space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm">{rgbString}</p>
            <CopyButton value={rgbString} />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm">{hslString}</p>
            <CopyButton value={hslString} />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm">{hex.toUpperCase()}</p>
            <CopyButton value={hex.toUpperCase()} />
          </div>
        </div>
      )}
    </div>
  );
}
