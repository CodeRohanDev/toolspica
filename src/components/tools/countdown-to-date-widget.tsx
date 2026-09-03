"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

export function CountdownToDateWidget() {
  const [target, setTarget] = React.useState("");
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target && now ? new Date(target).getTime() - now.getTime() : null;
  const past = diff !== null && diff < 0;
  const abs = diff !== null ? Math.abs(diff) : 0;
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const mins = Math.floor((abs % 3600000) / 60000);
  const secs = Math.floor((abs % 60000) / 1000);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      <Input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} className="mx-auto max-w-xs" />
      {diff !== null && (
        <>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {[["Days", days], ["Hours", hours], ["Min", mins], ["Sec", secs]].map(([label, val]) => (
              <div key={label as string} className="rounded-lg border p-3">
                <p className="text-3xl font-bold tabular-nums">{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{past ? "Time since this date" : "Time remaining until this date"}</p>
        </>
      )}
    </div>
  );
}
