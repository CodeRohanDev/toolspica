"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";

function hexToHsl(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  const r = parseInt(m[1].slice(0, 2), 16) / 255;
  const g = parseInt(m[1].slice(2, 4), 16) / 255;
  const b = parseInt(m[1].slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function buildSwatches(hex: string) {
  const hsl = hexToHsl(hex);
  if (!hsl) return null;
  const [h, s, l] = hsl;
  return {
    complementary: [hex.toLowerCase(), hslToHex(h + 180, s, l)],
    analogous: [hslToHex(h - 30, s, l), hex.toLowerCase(), hslToHex(h + 30, s, l)],
    triadic: [hex.toLowerCase(), hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)],
    shades: [20, 35, 50, 65, 80].map((lightness) => hslToHex(h, s, lightness)),
  };
}

function Swatch({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="size-14 rounded-lg border shadow-sm" style={{ backgroundColor: color }} />
      <div className="flex items-center gap-1">
        <span className="font-mono text-xs">{color}</span>
        <CopyButton value={color} label="" />
      </div>
    </div>
  );
}

export function ColorPaletteGenerator() {
  const [hex, setHex] = React.useState("#3b82f6");
  const palettes = buildSwatches(hex);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Label className="text-sm text-muted-foreground">Base color</Label>
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#3b82f6"}
          onChange={(e) => setHex(e.target.value)}
          className="h-9 w-14 cursor-pointer rounded border"
        />
        <Input value={hex} onChange={(e) => setHex(e.target.value)} className="w-32 font-mono" />
      </div>

      {!palettes ? (
        <p className="mt-4 text-sm text-destructive">Enter a valid 6-digit hex color, e.g. #3b82f6</p>
      ) : (
        <div className="mt-5 space-y-5 border-t pt-4">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Complementary</p>
            <div className="flex gap-3">
              {palettes.complementary.map((c) => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Analogous</p>
            <div className="flex gap-3">
              {palettes.analogous.map((c) => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Triadic</p>
            <div className="flex gap-3">
              {palettes.triadic.map((c) => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Shades</p>
            <div className="flex gap-3">
              {palettes.shades.map((c) => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
