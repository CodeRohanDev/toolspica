"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { hexToRgb, rgbToHsl, isValidHex } from "@/lib/color";

export function HexToHsl() {
  const [hex, setHex] = React.useState("#4f46e5");
  const valid = isValidHex(hex);
  const rgb = valid ? hexToRgb(hex) : null;
  const hsl = rgb ? rgbToHsl(rgb) : null;
  const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="hex-hsl-input" className="text-sm text-muted-foreground">
            HEX color
          </Label>
          <Input
            id="hex-hsl-input"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#4f46e5"
            className="mt-1.5 w-36 font-mono"
          />
        </div>
        {valid && (
          <div className="size-11 shrink-0 rounded-lg border" style={{ backgroundColor: hex }} />
        )}
      </div>

      {!valid && hex.length > 0 && (
        <p className="mt-3 text-sm text-destructive">
          Enter a valid HEX color, like #4f46e5 or #fff.
        </p>
      )}

      {hsl && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-semibold">{hslString}</span>
            <CopyButton value={hslString} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground tabular-nums">{hsl.h}°</p>
              Hue
            </div>
            <div>
              <p className="font-semibold text-foreground tabular-nums">{hsl.s}%</p>
              Saturation
            </div>
            <div>
              <p className="font-semibold text-foreground tabular-nums">{hsl.l}%</p>
              Lightness
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
