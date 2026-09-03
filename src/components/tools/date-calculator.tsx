"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/tools/stat-bar";

type Mode = "difference" | "add-subtract";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DateCalculator() {
  const [mode, setMode] = React.useState<Mode>("difference");

  const [dateA, setDateA] = React.useState("");
  const [dateB, setDateB] = React.useState("");

  const [startDate, setStartDate] = React.useState("");
  const [dayCount, setDayCount] = React.useState("");
  const [operation, setOperation] = React.useState<"add" | "subtract">("add");

  const diffResult = React.useMemo(() => {
    if (!dateA || !dateB) return null;
    const a = new Date(`${dateA}T00:00:00`);
    const b = new Date(`${dateB}T00:00:00`);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    const earlier = a.getTime() <= b.getTime() ? a : b;
    const later = a.getTime() <= b.getTime() ? b : a;
    const ymd = diffYMD(earlier, later);
    const totalDays = Math.round((later.getTime() - earlier.getTime()) / 86_400_000);
    return { ...ymd, totalDays, totalWeeks: Math.floor(totalDays / 7) };
  }, [dateA, dateB]);

  const addResult = React.useMemo(() => {
    if (!startDate || dayCount === "") return null;
    const n = parseInt(dayCount, 10);
    if (Number.isNaN(n)) return null;
    const start = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const delta = operation === "add" ? n : -n;
    const result = new Date(start.getTime());
    result.setDate(result.getDate() + delta);
    return result;
  }, [startDate, dayCount, operation]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "difference" ? "default" : "outline"}
          onClick={() => setMode("difference")}
        >
          Difference between dates
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "add-subtract" ? "default" : "outline"}
          onClick={() => setMode("add-subtract")}
        >
          Add / subtract days
        </Button>
      </div>

      {mode === "difference" ? (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="date-calc-a" className="text-sm text-muted-foreground">
                First date
              </Label>
              <Input
                id="date-calc-a"
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="date-calc-b" className="text-sm text-muted-foreground">
                Second date
              </Label>
              <Input
                id="date-calc-b"
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          {diffResult && (
            <>
              <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
                <p className="text-3xl font-semibold tabular-nums">
                  {diffResult.years}
                  <span className="mx-1 text-lg font-normal text-muted-foreground">
                    years
                  </span>
                  {diffResult.months}
                  <span className="mx-1 text-lg font-normal text-muted-foreground">
                    months
                  </span>
                  {diffResult.days}
                  <span className="mx-1 text-lg font-normal text-muted-foreground">
                    days
                  </span>
                </p>
              </div>
              <StatBar
                items={[
                  { label: "total days", value: diffResult.totalDays.toLocaleString() },
                  { label: "total weeks", value: diffResult.totalWeeks.toLocaleString() },
                ]}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="date-calc-start" className="text-sm text-muted-foreground">
                Start date
              </Label>
              <Input
                id="date-calc-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="date-calc-days" className="text-sm text-muted-foreground">
                Number of days
              </Label>
              <Input
                id="date-calc-days"
                type="number"
                inputMode="numeric"
                min={0}
                value={dayCount}
                onChange={(e) => setDayCount(e.target.value)}
                placeholder="30"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Operation</Label>
              <div className="mt-1.5 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={operation === "add" ? "default" : "outline"}
                  onClick={() => setOperation("add")}
                  className="flex-1"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={operation === "subtract" ? "default" : "outline"}
                  onClick={() => setOperation("subtract")}
                  className="flex-1"
                >
                  Subtract
                </Button>
              </div>
            </div>
          </div>

          {addResult && (
            <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
              <p className="text-2xl font-semibold">{formatDate(addResult)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
