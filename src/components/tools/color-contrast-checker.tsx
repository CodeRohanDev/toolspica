"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { hexToRgb, contrastRatio, isValidHex } from "@/lib/color";

function PassBadge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
      <span>{label}</span>
      {pass ? (
        <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" /> Pass
        </span>
      ) : (
        <span className="flex items-center gap-1 font-medium text-destructive">
          <XCircle className="size-4" /> Fail
        </span>
      )}
    </div>
  );
}

export function ColorContrastChecker() {
  const [foreground, setForeground] = React.useState("#1f2937");
  const [background, setBackground] = React.useState("#ffffff");

  const fgValid = isValidHex(foreground);
  const bgValid = isValidHex(background);
  const ratio =
    fgValid && bgValid ? contrastRatio(hexToRgb(foreground)!, hexToRgb(background)!) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="contrast-fg" className="text-sm text-muted-foreground">
            Text color
          </Label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input value={foreground} onChange={(e) => setForeground(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <Label htmlFor="contrast-bg" className="text-sm text-muted-foreground">
            Background color
          </Label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="size-8 cursor-pointer rounded border"
            />
            <Input value={background} onChange={(e) => setBackground(e.target.value)} className="font-mono" />
          </div>
        </div>
      </div>

      {ratio !== null && (
        <>
          <div
            className="mt-5 flex items-center justify-center rounded-lg border p-6 text-lg font-medium"
            style={{ backgroundColor: background, color: foreground }}
          >
            Sample text preview
          </div>

          <div className="mt-4 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">{ratio.toFixed(2)}:1</p>
            <p className="mt-1 text-sm text-muted-foreground">contrast ratio</p>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <PassBadge pass={ratio >= 4.5} label="AA — normal text (4.5:1)" />
            <PassBadge pass={ratio >= 3} label="AA — large text (3:1)" />
            <PassBadge pass={ratio >= 7} label="AAA — normal text (7:1)" />
            <PassBadge pass={ratio >= 4.5} label="AAA — large text (4.5:1)" />
          </div>
        </>
      )}
    </div>
  );
}
