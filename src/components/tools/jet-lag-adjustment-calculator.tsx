"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JetLagAdjustmentCalculator() {
  const [homeOffset, setHomeOffset] = React.useState(0);
  const [destOffset, setDestOffset] = React.useState(9);

  const rawDiff = destOffset - homeOffset;
  // Normalize to [-12, 12]
  let diff = rawDiff;
  if (diff > 12) diff -= 24;
  if (diff < -12) diff += 24;

  const direction = diff > 0 ? "eastward" : diff < 0 ? "westward" : "no";
  const hoursToAdjust = Math.abs(diff);
  // Eastward travel is harder to adjust to (shorter day), roughly 1 day per hour;
  // westward is easier, roughly 1.5 hours per day.
  const daysToAdjust = direction === "eastward" ? Math.ceil(hoursToAdjust) : Math.ceil(hoursToAdjust / 1.5);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Home timezone offset (UTC)</Label>
          <Input type="number" step={0.5} value={homeOffset} onChange={(e) => setHomeOffset(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Destination timezone offset (UTC)</Label>
          <Input type="number" step={0.5} value={destOffset} onChange={(e) => setDestOffset(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-4 rounded-lg border bg-muted/30 p-4">
        {direction === "no" ? (
          <p className="text-sm">No time difference — jet lag shouldn&apos;t be a factor.</p>
        ) : (
          <>
            <p className="text-lg font-medium">
              {hoursToAdjust} hour{hoursToAdjust !== 1 ? "s" : ""} {direction}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Expect roughly <span className="font-medium text-foreground">{daysToAdjust} day{daysToAdjust !== 1 ? "s" : ""}</span> to
              fully adjust your body clock.
            </p>
          </>
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Tips:</p>
        {direction === "eastward" && (
          <ul className="list-disc space-y-1 pl-5">
            <li>Start shifting your sleep 1 hour earlier per day, a few days before departure</li>
            <li>Seek bright light in the morning at your destination</li>
            <li>Avoid alcohol and caffeine close to your new bedtime</li>
          </ul>
        )}
        {direction === "westward" && (
          <ul className="list-disc space-y-1 pl-5">
            <li>Stay up slightly later than usual before departure</li>
            <li>Seek bright light in the evening at your destination</li>
            <li>Westward travel is generally easier to adjust to than eastward</li>
          </ul>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Estimate based on general chronobiology guidance — individual adjustment speed varies.
      </p>
    </div>
  );
}
