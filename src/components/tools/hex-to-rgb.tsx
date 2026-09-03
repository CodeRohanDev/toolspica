"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { hexToRgb, isValidHex } from "@/lib/color";

export function HexToRgb() {
  const [hex, setHex] = React.useState("#4f46e5");
  const valid = isValidHex(hex);
  const rgb = valid ? hexToRgb(hex) : null;
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="hex-input" className="text-sm text-muted-foreground">
            HEX color
          </Label>
          <Input
            id="hex-input"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#4f46e5"
            className="mt-1.5 w-36 font-mono"
          />
        </div>
        {valid && (
          <div
            className="size-11 shrink-0 rounded-lg border"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
        )}
      </div>

      {!valid && hex.length > 0 && (
        <p className="mt-3 text-sm text-destructive">
          Enter a valid HEX color, like #4f46e5 or #fff.
        </p>
      )}

      {rgb && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-semibold">{rgbString}</span>
            <CopyButton value={rgbString} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground tabular-nums">{rgb.r}</p>
              Red
            </div>
            <div>
              <p className="font-semibold text-foreground tabular-nums">{rgb.g}</p>
              Green
            </div>
            <div>
              <p className="font-semibold text-foreground tabular-nums">{rgb.b}</p>
              Blue
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
