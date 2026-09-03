"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Method = "lmp" | "conception";

function addDays(date: Date, days: number) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PregnancyDueDateCalculator() {
  const [method, setMethod] = React.useState<Method>("lmp");
  const [inputDate, setInputDate] = React.useState("");
  const [today, setToday] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  const result = React.useMemo(() => {
    if (!inputDate || !today) return null;
    const base = new Date(`${inputDate}T00:00:00`);
    if (Number.isNaN(base.getTime())) return null;

    const dueDate = method === "lmp" ? addDays(base, 280) : addDays(base, 266);
    const conceptionEstimate = method === "lmp" ? addDays(base, 14) : base;

    const gestationStart = method === "lmp" ? base : addDays(base, -14);
    const daysPregnant = Math.floor(
      (today.getTime() - gestationStart.getTime()) / 86_400_000
    );
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;

    let trimester = 1;
    if (weeks >= 27) trimester = 3;
    else if (weeks >= 13) trimester = 2;

    return { dueDate, conceptionEstimate, weeks, days, trimester, daysPregnant };
  }, [inputDate, method, today]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={method === "lmp" ? "default" : "outline"}
          onClick={() => setMethod("lmp")}
        >
          First day of last period
        </Button>
        <Button
          type="button"
          size="sm"
          variant={method === "conception" ? "default" : "outline"}
          onClick={() => setMethod("conception")}
        >
          Known conception date
        </Button>
      </div>

      <div className="mt-4">
        <Label htmlFor="preg-date" className="text-sm text-muted-foreground">
          {method === "lmp" ? "First day of last period" : "Conception date"}
        </Label>
        <Input
          id="preg-date"
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="mt-1.5 max-w-xs"
        />
      </div>

      {result && result.daysPregnant >= 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Estimated due date
            </p>
            <p className="mt-1 text-lg font-semibold">{formatDate(result.dueDate)}</p>
          </div>
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Current progress
            </p>
            <p className="mt-1 text-lg font-semibold">
              {result.weeks}w {result.days}d
            </p>
          </div>
          <div className="rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Trimester
            </p>
            <p className="mt-1 text-lg font-semibold">{result.trimester}</p>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This is an estimate based on standard averages (a 280-day or 266-day gestation), not a
        medical diagnosis. Only about 5% of babies arrive on their exact estimated due date —
        consult a healthcare provider for a clinically confirmed due date and prenatal care.
      </p>
    </div>
  );
}
