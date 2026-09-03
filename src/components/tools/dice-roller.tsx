"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DIE_TYPES = [4, 6, 8, 10, 12, 20, 100];

export function DiceRoller() {
  const [sides, setSides] = React.useState(6);
  const [diceCount, setDiceCount] = React.useState("2");
  const [rolls, setRolls] = React.useState<number[]>([]);

  function roll() {
    const n = Math.max(1, Math.min(20, parseInt(diceCount, 10) || 1));
    setRolls(Array.from({ length: n }, () => 1 + Math.floor(Math.random() * sides)));
  }

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label className="text-sm text-muted-foreground">Die type</Label>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {DIE_TYPES.map((d) => (
            <Button
              key={d}
              type="button"
              size="sm"
              variant={sides === d ? "default" : "outline"}
              onClick={() => setSides(d)}
            >
              d{d}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="dice-count" className="text-sm text-muted-foreground">
            Number of dice (1-20)
          </Label>
          <Input
            id="dice-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={diceCount}
            onChange={(e) => setDiceCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={roll}>
          Roll
        </Button>
      </div>

      {rolls.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap justify-center gap-2">
            {rolls.map((r, i) => (
              <span
                key={i}
                className="flex size-12 items-center justify-center rounded-lg border-2 bg-brand-soft text-lg font-bold tabular-nums"
              >
                {r}
              </span>
            ))}
          </div>
          {rolls.length > 1 && (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Total: <span className="text-lg font-semibold text-foreground tabular-nums">{total}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
