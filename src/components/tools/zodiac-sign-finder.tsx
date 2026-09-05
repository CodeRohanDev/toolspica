"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: string;
  dates: string;
  traits: string[];
}

const ZODIAC: ZodiacInfo[] = [
  { sign: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 – Jan 19", traits: ["Disciplined", "Ambitious", "Practical"] },
  { sign: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 – Feb 18", traits: ["Independent", "Original", "Humanitarian"] },
  { sign: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 – Mar 20", traits: ["Compassionate", "Artistic", "Intuitive"] },
  { sign: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 – Apr 19", traits: ["Bold", "Energetic", "Competitive"] },
  { sign: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 – May 20", traits: ["Reliable", "Patient", "Devoted"] },
  { sign: "Gemini", symbol: "♊", element: "Air", dates: "May 21 – Jun 20", traits: ["Curious", "Adaptable", "Witty"] },
  { sign: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 – Jul 22", traits: ["Nurturing", "Emotional", "Loyal"] },
  { sign: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 – Aug 22", traits: ["Confident", "Generous", "Dramatic"] },
  { sign: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 – Sep 22", traits: ["Analytical", "Meticulous", "Helpful"] },
  { sign: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 – Oct 22", traits: ["Diplomatic", "Fair-minded", "Social"] },
  { sign: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 – Nov 21", traits: ["Passionate", "Resourceful", "Intense"] },
  { sign: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 – Dec 21", traits: ["Adventurous", "Optimistic", "Free-spirited"] },
];

// month is 1-12, day is 1-31
function findZodiacSign(month: number, day: number): ZodiacInfo {
  const cutoffs: [number, number][] = [
    [1, 19], [2, 18], [3, 20], [4, 19], [5, 20], [6, 20],
    [7, 22], [8, 22], [9, 22], [10, 22], [11, 21], [12, 21],
  ];
  const [cutoffDay] = cutoffs[month - 1];
  const index = day <= cutoffDay ? month - 1 : month % 12;
  return ZODIAC[index];
}

export function ZodiacSignFinder() {
  const [dateStr, setDateStr] = React.useState("2000-06-15");

  const date = new Date(dateStr + "T00:00:00");
  const valid = !Number.isNaN(date.getTime());
  const result = valid ? findZodiacSign(date.getMonth() + 1, date.getDate()) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label className="text-sm text-muted-foreground">Birth date</Label>
      <Input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="mt-1.5" />

      {result && (
        <div className="mt-4 rounded-lg border bg-muted/30 p-5 text-center">
          <p className="text-5xl">{result.symbol}</p>
          <p className="mt-2 text-2xl font-semibold">{result.sign}</p>
          <p className="text-sm text-muted-foreground">{result.dates} · {result.element} sign</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {result.traits.map((t) => (
              <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>
            ))}
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Based on Western tropical zodiac date ranges — for entertainment purposes.
      </p>
    </div>
  );
}
