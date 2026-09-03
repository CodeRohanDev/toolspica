"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Pipette } from "lucide-react";
import { hexToRgb, rgbToHsl } from "@/lib/color";

declare global {
  interface Window {
    EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
  }
}

export function ColorPicker() {
  const [hex, setHex] = React.useState("#4f46e5");
  const [supportsEyeDropper, setSupportsEyeDropper] = React.useState(false);

  React.useEffect(() => {
    setSupportsEyeDropper(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb) : null;

  async function pickFromScreen() {
    if (!window.EyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setHex(result.sRGBHex);
    } catch {
      // user cancelled — no action needed
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="size-16 cursor-pointer rounded-lg border"
          aria-label="Pick a color"
        />
        {supportsEyeDropper && (
          <Button type="button" variant="outline" size="sm" onClick={pickFromScreen}>
            <Pipette className="size-3.5" /> Pick from screen
          </Button>
        )}
      </div>

      {rgb && hsl && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-3">
            <Label className="text-xs text-muted-foreground">HEX</Label>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold">{hex}</span>
              <CopyButton value={hex} />
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <Label className="text-xs text-muted-foreground">RGB</Label>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </span>
              <CopyButton value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <Label className="text-xs text-muted-foreground">HSL</Label>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </span>
              <CopyButton value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
