"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function parseTimeToMinutes(value: string) {
  const [h, m] = value.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function TimeDurationCalculator() {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [nextDay, setNextDay] = React.useState(false);

  const result = React.useMemo(() => {
    if (!startTime || !endTime) return null;
    const start = parseTimeToMinutes(startTime);
    const end = parseTimeToMinutes(endTime);
    if (start === null || end === null) return null;

    let diff = end - start;
    if (nextDay) diff += 24 * 60;
    if (diff < 0) return null;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes, totalMinutes: diff, decimalHours: Math.round((diff / 60) * 100) / 100 };
  }, [startTime, endTime, nextDay]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="dur-start" className="text-sm text-muted-foreground">
            Start time
          </Label>
          <Input
            id="dur-start"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="dur-end" className="text-sm text-muted-foreground">
            End time
          </Label>
          <Input
            id="dur-end"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Switch id="dur-next-day" checked={nextDay} onCheckedChange={setNextDay} />
        <Label htmlFor="dur-next-day" className="text-sm font-normal">
          End time is the next day
        </Label>
      </div>

      {startTime && endTime && !result && !nextDay && (
        <p className="mt-4 text-sm text-destructive">
          End time is before start time — turn on &ldquo;End time is the next day&rdquo; if it spans midnight.
        </p>
      )}

      {result && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">
            {result.hours}h {result.minutes}m
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.totalMinutes} total minutes — {result.decimalHours} decimal hours
          </p>
        </div>
      )}
    </div>
  );
}
