"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatBar } from "@/components/tools/stat-bar";

export function CountdownTimerGenerator() {
  const [target, setTarget] = React.useState("");
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = React.useMemo(() => {
    if (!target || now === null) return null;
    const targetMs = new Date(target).getTime();
    if (Number.isNaN(targetMs)) return null;
    const diff = targetMs - now;
    if (diff <= 0) return { reached: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);
    return { reached: false, days, hours, minutes, seconds };
  }, [target, now]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label htmlFor="countdown-target" className="text-sm text-muted-foreground">
          Target date and time
        </Label>
        <Input
          id="countdown-target"
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-1.5"
        />
      </div>

      {remaining && remaining.reached && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-2xl font-semibold">The countdown has reached zero</p>
        </div>
      )}

      {remaining && !remaining.reached && (
        <>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {[
              { label: "days", value: remaining.days },
              { label: "hours", value: remaining.hours },
              { label: "min", value: remaining.minutes },
              { label: "sec", value: remaining.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-brand-soft p-3">
                <p className="text-2xl font-semibold tabular-nums">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <StatBar
            items={[
              {
                label: "total hours remaining",
                value: (
                  remaining.days * 24 +
                  remaining.hours +
                  remaining.minutes / 60
                ).toFixed(1),
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
