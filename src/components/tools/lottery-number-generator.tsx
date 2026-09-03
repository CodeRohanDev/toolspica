"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

interface Preset {
  id: string;
  label: string;
  mainCount: number;
  mainMax: number;
  bonusCount: number;
  bonusMax: number;
  bonusName: string;
}

const PRESETS: Preset[] = [
  { id: "649", label: "6/49 Lotto", mainCount: 6, mainMax: 49, bonusCount: 0, bonusMax: 0, bonusName: "" },
  { id: "powerball", label: "Powerball (5/69 + 1/26)", mainCount: 5, mainMax: 69, bonusCount: 1, bonusMax: 26, bonusName: "Powerball" },
  { id: "megamillions", label: "Mega Millions (5/70 + 1/25)", mainCount: 5, mainMax: 70, bonusCount: 1, bonusMax: 25, bonusName: "Mega Ball" },
  { id: "euromillions", label: "EuroMillions (5/50 + 2/12)", mainCount: 5, mainMax: 50, bonusCount: 2, bonusMax: 12, bonusName: "Lucky Stars" },
];

function pickUnique(count: number, max: number): number[] {
  const picked = new Set<number>();
  while (picked.size < count) {
    picked.add(1 + Math.floor(Math.random() * max));
  }
  return [...picked].sort((a, b) => a - b);
}

export function LotteryNumberGenerator() {
  const [preset, setPreset] = React.useState<Preset>(PRESETS[0]);
  const [main, setMain] = React.useState<number[]>([]);
  const [bonus, setBonus] = React.useState<number[]>([]);

  function generate() {
    setMain(pickUnique(preset.mainCount, preset.mainMax));
    setBonus(preset.bonusCount > 0 ? pickUnique(preset.bonusCount, preset.bonusMax) : []);
  }

  const resultText = [...main, ...(bonus.length ? [`${preset.bonusName}: ${bonus.join(", ")}`] : [])].join(", ");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.id}
            type="button"
            size="sm"
            variant={preset.id === p.id ? "default" : "outline"}
            onClick={() => {
              setPreset(p);
              setMain([]);
              setBonus([]);
            }}
          >
            {p.label}
          </Button>
        ))}
      </div>

      <Button type="button" onClick={generate} className="mt-4">
        Generate numbers
      </Button>

      {main.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap justify-center gap-2">
            {main.map((n) => (
              <span
                key={n}
                className="flex size-11 items-center justify-center rounded-full border-2 bg-brand-soft text-lg font-bold tabular-nums"
              >
                {n}
              </span>
            ))}
            {bonus.map((n, i) => (
              <span
                key={`b${i}`}
                className="flex size-11 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-100 text-lg font-bold tabular-nums dark:bg-amber-950"
              >
                {n}
              </span>
            ))}
          </div>
          {bonus.length > 0 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Gold: {preset.bonusName}
            </p>
          )}
          <div className="mt-3 flex justify-center">
            <CopyButton value={resultText} />
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Every number is drawn uniformly at random — exactly like a quick pick. No set of numbers
        is luckier than any other, and this tool has no connection to any official lottery.
      </p>
    </div>
  );
}
