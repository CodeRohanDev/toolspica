"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findNearestColorName, isValidHex } from "@/lib/color";

export function ColorNameFinder() {
  const [hex, setHex] = React.useState("#4f46e5");
  const valid = isValidHex(hex);
  const match = valid ? findNearestColorName(hex) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <Label htmlFor="name-hex-input" className="text-sm text-muted-foreground">
            HEX color
          </Label>
          <Input
            id="name-hex-input"
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

      {match && (
        <div className="mt-5 flex items-center gap-4 rounded-lg bg-brand-soft p-4">
          <div
            className="size-14 shrink-0 rounded-lg border"
            style={{ backgroundColor: match.hex }}
          />
          <div>
            <p className="text-xl font-semibold">{match.name}</p>
            <p className="text-sm text-muted-foreground">
              Closest named color — {match.hex} ({match.distance === 0 ? "exact match" : `distance ${match.distance}`})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
