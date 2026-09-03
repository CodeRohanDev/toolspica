"use client";

import * as React from "react";
import { CopyButton } from "@/components/tools/copy-button";

export function CronExpressionGenerator() {
  const [minute, setMinute] = React.useState("*");
  const [hour, setHour] = React.useState("*");
  const [dom, setDom] = React.useState("*");
  const [month, setMonth] = React.useState("*");
  const [dow, setDow] = React.useState("*");

  const expr = `${minute} ${hour} ${dom} ${month} ${dow}`;

  function describe() {
    if (expr === "* * * * *") return "Every minute";
    if (minute !== "*" && hour !== "*" && [dom, month, dow].every((f) => f === "*")) return `Every day at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    if (minute === "0" && hour === "*" && [dom, month, dow].every((f) => f === "*")) return "Every hour, on the hour";
    return "Custom schedule";
  }

  const fields: [string, string, React.Dispatch<React.SetStateAction<string>>, string][] = [
    ["Minute", minute, setMinute, "0-59"],
    ["Hour", hour, setHour, "0-23"],
    ["Day of month", dom, setDom, "1-31"],
    ["Month", month, setMonth, "1-12"],
    ["Day of week", dow, setDow, "0-6 (Sun-Sat)"],
  ];

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-5">
        {fields.map(([label, value, setter, hint]) => (
          <div key={label}>
            <label className="text-xs text-muted-foreground">{label}</label>
            <input value={value} onChange={(e) => setter(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-mono" />
            <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md border bg-muted p-3">
        <code className="text-lg font-mono">{expr}</code>
        <CopyButton value={expr} label="Copy" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{describe()}</p>
    </div>
  );
}
