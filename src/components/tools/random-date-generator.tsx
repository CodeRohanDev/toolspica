"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function RandomDateGenerator() {
  const [startDate, setStartDate] = React.useState("2000-01-01");
  const [endDate, setEndDate] = React.useState("2030-12-31");
  const [count, setCount] = React.useState("1");
  const [dates, setDates] = React.useState<Date[]>([]);
  const [error, setError] = React.useState("");

  function generate() {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
      setError("Start date must be on or before the end date.");
      setDates([]);
      return;
    }
    setError("");
    const n = Math.max(1, Math.min(20, parseInt(count, 10) || 1));
    const startMs = start.getTime();
    const rangeMs = end.getTime() - startMs;
    const result: Date[] = [];
    for (let i = 0; i < n; i++) {
      const randomMs = startMs + Math.random() * rangeMs;
      const d = new Date(randomMs);
      d.setHours(0, 0, 0, 0);
      result.push(d);
    }
    setDates(result);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="rd-start" className="text-sm text-muted-foreground">
            Earliest date
          </Label>
          <Input
            id="rd-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rd-end" className="text-sm text-muted-foreground">
            Latest date
          </Label>
          <Input
            id="rd-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="rd-count" className="text-sm text-muted-foreground">
            How many (1-20)
          </Label>
          <Input
            id="rd-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <Button type="button" onClick={generate} className="mt-4">
        Generate
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {dates.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Random date{dates.length > 1 ? "s" : ""}</p>
            <CopyButton value={dates.map((d) => d.toISOString().slice(0, 10)).join("\n")} />
          </div>
          <ul className="mt-2 space-y-1.5">
            {dates.map((d, i) => (
              <li key={i} className="rounded-lg bg-brand-soft px-4 py-2 text-sm font-medium">
                {formatDate(d)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
