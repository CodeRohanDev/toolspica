"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

function countWorkDays(start: Date, end: Date, holidays: Set<string>) {
  let count = 0;
  const d = new Date(start);
  while (d <= end) {
    const day = d.getDay();
    const iso = d.toISOString().slice(0, 10);
    if (day !== 0 && day !== 6 && !holidays.has(iso)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

export function WorkDaysCalculator() {
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [holidaysText, setHolidaysText] = React.useState("");

  const holidays = new Set(holidaysText.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean));
  const result = start && end ? countWorkDays(new Date(start), new Date(end), holidays) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground">Start date</label>
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">End date</label>
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>
      <div className="mt-3">
        <label className="text-xs text-muted-foreground">Holidays to exclude (YYYY-MM-DD, comma or newline separated, optional)</label>
        <textarea value={holidaysText} onChange={(e) => setHolidaysText(e.target.value)} className="mt-1 min-h-[60px] w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="2026-01-01, 2026-12-25" />
      </div>
      {result !== null && (
        <div className="mt-4 border-t pt-4">
          <p className="text-3xl font-bold tabular-nums">{result}</p>
          <p className="text-sm text-muted-foreground">working days (Mon–Fri, excluding listed holidays)</p>
        </div>
      )}
    </div>
  );
}
