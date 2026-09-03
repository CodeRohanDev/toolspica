"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "women" | "men";

const WOMEN_CHART = [
  { us: 0, uk: 4, eu: 32 },
  { us: 2, uk: 6, eu: 34 },
  { us: 4, uk: 8, eu: 36 },
  { us: 6, uk: 10, eu: 38 },
  { us: 8, uk: 12, eu: 40 },
  { us: 10, uk: 14, eu: 42 },
  { us: 12, uk: 16, eu: 44 },
  { us: 14, uk: 18, eu: 46 },
  { us: 16, uk: 20, eu: 48 },
];

const MEN_CHART = [
  { letter: "XS", us: "34", uk: "34", eu: 44 },
  { letter: "S", us: "36-38", uk: "36-38", eu: 46 },
  { letter: "M", us: "39-41", uk: "39-41", eu: 48 },
  { letter: "L", us: "42-44", uk: "42-44", eu: 50 },
  { letter: "XL", us: "46-48", uk: "46-48", eu: 52 },
  { letter: "XXL", us: "50-52", uk: "50-52", eu: 54 },
];

export function ClothingSizeConverter() {
  const [category, setCategory] = React.useState<Category>("women");
  const [womenUs, setWomenUs] = React.useState(String(WOMEN_CHART[3].us));
  const [menLetter, setMenLetter] = React.useState(MEN_CHART[2].letter);

  const womenRow = WOMEN_CHART.find((r) => String(r.us) === womenUs) ?? WOMEN_CHART[0];
  const menRow = MEN_CHART.find((r) => r.letter === menLetter) ?? MEN_CHART[0];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={category === "women" ? "default" : "outline"}
          onClick={() => setCategory("women")}
        >
          Women&apos;s
        </Button>
        <Button
          type="button"
          size="sm"
          variant={category === "men" ? "default" : "outline"}
          onClick={() => setCategory("men")}
        >
          Men&apos;s
        </Button>
      </div>

      {category === "women" ? (
        <>
          <div className="mt-4 max-w-xs">
            <Select value={womenUs} onValueChange={(v) => v && setWomenUs(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WOMEN_CHART.map((r) => (
                  <SelectItem key={r.us} value={String(r.us)}>
                    US {r.us}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">{womenRow.us}</p>
              <p className="mt-1 text-xs text-muted-foreground">US</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">{womenRow.uk}</p>
              <p className="mt-1 text-xs text-muted-foreground">UK</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums">{womenRow.eu}</p>
              <p className="mt-1 text-xs text-muted-foreground">EU</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 max-w-xs">
            <Select value={menLetter} onValueChange={(v) => v && setMenLetter(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEN_CHART.map((r) => (
                  <SelectItem key={r.letter} value={r.letter}>
                    {r.letter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-xl font-semibold tabular-nums">{menRow.letter}</p>
              <p className="mt-1 text-xs text-muted-foreground">US/UK letter</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-xl font-semibold tabular-nums">{menRow.us}</p>
              <p className="mt-1 text-xs text-muted-foreground">Chest (in)</p>
            </div>
            <div className="rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-xl font-semibold tabular-nums">{menRow.eu}</p>
              <p className="mt-1 text-xs text-muted-foreground">EU</p>
            </div>
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Based on commonly published general size charts. Actual fit varies significantly by
        brand — always check the specific brand&apos;s own size chart when available.
      </p>
    </div>
  );
}
