"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { hexToRgb, rgbToHex, isValidHex, type Rgb } from "@/lib/color";

const LIGHT_SHADES: { name: string; whiteMix: number }[] = [
  { name: "50", whiteMix: 0.95 },
  { name: "100", whiteMix: 0.9 },
  { name: "200", whiteMix: 0.75 },
  { name: "300", whiteMix: 0.6 },
  { name: "400", whiteMix: 0.3 },
];

const DARK_SHADES: { name: string; blackMix: number }[] = [
  { name: "600", blackMix: 0.15 },
  { name: "700", blackMix: 0.3 },
  { name: "800", blackMix: 0.45 },
  { name: "900", blackMix: 0.6 },
  { name: "950", blackMix: 0.75 },
];

function mix(base: Rgb, target: Rgb, amount: number): Rgb {
  return {
    r: base.r * (1 - amount) + target.r * amount,
    g: base.g * (1 - amount) + target.g * amount,
    b: base.b * (1 - amount) + target.b * amount,
  };
}

export function TailwindShadeGenerator() {
  const [hex, setHex] = React.useState("#4f46e5");
  const valid = isValidHex(hex);
  const base = valid ? hexToRgb(hex) : null;

  const shades = base
    ? [
        ...LIGHT_SHADES.map((s) => ({
          name: s.name,
          hex: rgbToHex(mix(base, { r: 255, g: 255, b: 255 }, s.whiteMix)),
        })),
        { name: "500", hex: rgbToHex(base) },
        ...DARK_SHADES.map((s) => ({
          name: s.name,
          hex: rgbToHex(mix(base, { r: 0, g: 0, b: 0 }, s.blackMix)),
        })),
      ]
    : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="tw-hex-input" className="text-sm text-muted-foreground">
            Base color
          </Label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="color"
              value={valid ? hex : "#4f46e5"}
              onChange={(e) => setHex(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input
              id="tw-hex-input"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-32 font-mono"
            />
          </div>
        </div>
      </div>

      {!valid && hex.length > 0 && (
        <p className="mt-3 text-sm text-destructive">
          Enter a valid HEX color, like #4f46e5 or #fff.
        </p>
      )}

      {shades && (
        <div className="mt-5 space-y-1.5">
          {shades.map((shade) => (
            <div key={shade.name} className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-sm font-medium text-muted-foreground">
                {shade.name}
              </span>
              <div
                className="h-9 flex-1 rounded-md border"
                style={{ backgroundColor: shade.hex }}
              />
              <span className="w-20 shrink-0 font-mono text-sm">{shade.hex}</span>
              <CopyButton value={shade.hex} />
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Your base color becomes shade 500, with lighter tints (50-400) and darker shades
        (600-950) generated around it — an approximation of Tailwind&apos;s shade scale, not an
        exact match to any specific official Tailwind palette.
      </p>
    </div>
  );
}
