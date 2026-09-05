"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SYNODIC_MONTH = 29.530588853;
// Known new moon reference: Jan 6, 2000, 18:14 UTC
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

const PHASES = [
  { name: "New Moon", emoji: "🌑", max: 1 / 16 },
  { name: "Waxing Crescent", emoji: "🌒", max: 3 / 16 },
  { name: "First Quarter", emoji: "🌓", max: 5 / 16 },
  { name: "Waxing Gibbous", emoji: "🌔", max: 7 / 16 },
  { name: "Full Moon", emoji: "🌕", max: 9 / 16 },
  { name: "Waning Gibbous", emoji: "🌖", max: 11 / 16 },
  { name: "Last Quarter", emoji: "🌗", max: 13 / 16 },
  { name: "Waning Crescent", emoji: "🌘", max: 15 / 16 },
  { name: "New Moon", emoji: "🌑", max: 1 },
];

function getMoonPhase(date: Date): { name: string; emoji: string; age: number; illumination: number } {
  const daysSinceReference = (date.getTime() - REFERENCE_NEW_MOON) / 86400000;
  const age = ((daysSinceReference % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const fraction = age / SYNODIC_MONTH;
  const phase = PHASES.find((p) => fraction <= p.max) || PHASES[0];
  const illumination = (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  return { name: phase.name, emoji: phase.emoji, age, illumination: illumination * 100 };
}

export function MoonPhaseCalculator() {
  const [dateStr, setDateStr] = React.useState(() => new Date().toISOString().slice(0, 10));

  const date = new Date(dateStr + "T12:00:00Z");
  const valid = !Number.isNaN(date.getTime());
  const result = valid ? getMoonPhase(date) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Date</Label>
      <Input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="mt-1.5" />

      {result && (
        <div className="mt-4 rounded-lg border bg-muted/30 p-5 text-center">
          <p className="text-6xl">{result.emoji}</p>
          <p className="mt-2 text-2xl font-semibold">{result.name}</p>
          <p className="text-sm text-muted-foreground">
            Moon age: {result.age.toFixed(1)} days · {result.illumination.toFixed(0)}% illuminated
          </p>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Calculated from the synodic month (~29.53 days) using a known reference new moon — accurate
        to within roughly a day for any given date.
      </p>
    </div>
  );
}
