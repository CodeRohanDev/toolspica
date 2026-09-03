"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

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

function calculateAge(birth: Date, asOf: Date) {
  const { years, months, days } = diffYMD(birth, asOf);
  const totalDays = Math.floor((asOf.getTime() - birth.getTime()) / 86_400_000);
  const totalWeeks = Math.floor(totalDays / 7);

  let nextBirthday = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday.getTime() < asOf.getTime()) {
    nextBirthday = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - asOf.getTime()) / 86_400_000
  );

  return { years, months, days, totalDays, totalWeeks, daysUntilBirthday };
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = React.useState("");
  const [asOfDate, setAsOfDate] = React.useState("");

  React.useEffect(() => {
    if (!asOfDate) {
      setAsOfDate(new Date().toISOString().slice(0, 10));
    }
  }, [asOfDate]);

  const result = React.useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    const birth = new Date(`${birthDate}T00:00:00`);
    const asOf = new Date(`${asOfDate}T00:00:00`);
    if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) return null;
    if (birth.getTime() > asOf.getTime()) return null;
    return calculateAge(birth, asOf);
  }, [birthDate, asOfDate]);

  const invalidRange = Boolean(birthDate) && Boolean(asOfDate) && !result;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="age-birth-date" className="text-sm text-muted-foreground">
            Date of birth
          </Label>
          <Input
            id="age-birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="age-as-of-date" className="text-sm text-muted-foreground">
            Age as of
          </Label>
          <Input
            id="age-as-of-date"
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      {invalidRange && (
        <p className="mt-4 text-sm text-destructive">
          Date of birth must be on or before the &ldquo;age as of&rdquo; date.
        </p>
      )}

      {result && (
        <>
          <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
            <p className="text-3xl font-semibold tabular-nums">
              {result.years}
              <span className="mx-1 text-lg font-normal text-muted-foreground">
                years
              </span>
              {result.months}
              <span className="mx-1 text-lg font-normal text-muted-foreground">
                months
              </span>
              {result.days}
              <span className="mx-1 text-lg font-normal text-muted-foreground">
                days
              </span>
            </p>
          </div>
          <StatBar
            items={[
              { label: "total days lived", value: result.totalDays.toLocaleString() },
              { label: "total weeks lived", value: result.totalWeeks.toLocaleString() },
              { label: "days until next birthday", value: result.daysUntilBirthday },
            ]}
          />
        </>
      )}
    </div>
  );
}
