"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { rgbToHex } from "@/lib/color";

export function RgbToHex() {
  const [r, setR] = React.useState("79");
  const [g, setG] = React.useState("70");
  const [b, setB] = React.useState("229");

  const numR = parseInt(r, 10);
  const numG = parseInt(g, 10);
  const numB = parseInt(b, 10);
  const valid =
    !Number.isNaN(numR) && !Number.isNaN(numG) && !Number.isNaN(numB) &&
    [numR, numG, numB].every((v) => v >= 0 && v <= 255);

  const hex = valid ? rgbToHex({ r: numR, g: numG, b: numB }) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="rgb-r" className="text-sm text-muted-foreground">
            Red (0-255)
          </Label>
          <Input
            id="rgb-r"
            type="number"
            inputMode="numeric"
            min={0}
            max={255}
            value={r}
            onChange={(e) => setR(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rgb-g" className="text-sm text-muted-foreground">
            Green (0-255)
          </Label>
          <Input
            id="rgb-g"
            type="number"
            inputMode="numeric"
            min={0}
            max={255}
            value={g}
            onChange={(e) => setG(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rgb-b" className="text-sm text-muted-foreground">
            Blue (0-255)
          </Label>
          <Input
            id="rgb-b"
            type="number"
            inputMode="numeric"
            min={0}
            max={255}
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {!valid && (
        <p className="mt-3 text-sm text-destructive">Each value must be a number from 0 to 255.</p>
      )}

      {hex && (
        <div className="mt-5 flex items-center gap-4 rounded-lg bg-brand-soft p-4">
          <div className="size-11 shrink-0 rounded-lg border" style={{ backgroundColor: hex }} />
          <span className="font-mono text-lg font-semibold">{hex}</span>
          <CopyButton value={hex} />
        </div>
      )}
    </div>
  );
}
