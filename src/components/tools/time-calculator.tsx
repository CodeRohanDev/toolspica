"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function toSeconds(h: string, m: string, s: string) {
  const hh = parseInt(h, 10) || 0;
  const mm = parseInt(m, 10) || 0;
  const ss = parseInt(s, 10) || 0;
  return hh * 3600 + mm * 60 + ss;
}

function formatHMS(totalSeconds: number) {
  const sign = totalSeconds < 0 ? "-" : "";
  const abs = Math.abs(totalSeconds);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  return `${sign}${h}h ${m}m ${s}s`;
}

function TimeInputGroup({
  legend,
  h,
  m,
  s,
  onH,
  onM,
  onS,
  prefix,
}: {
  legend: string;
  h: string;
  m: string;
  s: string;
  onH: (v: string) => void;
  onM: (v: string) => void;
  onS: (v: string) => void;
  prefix: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{legend}</p>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor={`${prefix}-h`} className="text-xs text-muted-foreground">
            Hours
          </Label>
          <Input
            id={`${prefix}-h`}
            type="number"
            inputMode="numeric"
            min={0}
            value={h}
            onChange={(e) => onH(e.target.value)}
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-m`} className="text-xs text-muted-foreground">
            Minutes
          </Label>
          <Input
            id={`${prefix}-m`}
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            value={m}
            onChange={(e) => onM(e.target.value)}
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-s`} className="text-xs text-muted-foreground">
            Seconds
          </Label>
          <Input
            id={`${prefix}-s`}
            type="number"
            inputMode="numeric"
            min={0}
            max={59}
            value={s}
            onChange={(e) => onS(e.target.value)}
            placeholder="0"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

export function TimeCalculator() {
  const [aH, setAH] = React.useState("");
  const [aM, setAM] = React.useState("");
  const [aS, setAS] = React.useState("");
  const [bH, setBH] = React.useState("");
  const [bM, setBM] = React.useState("");
  const [bS, setBS] = React.useState("");
  const [operation, setOperation] = React.useState<"add" | "subtract">("add");

  const hasInput = [aH, aM, aS, bH, bM, bS].some((v) => v !== "");
  const secondsA = toSeconds(aH, aM, aS);
  const secondsB = toSeconds(bH, bM, bS);
  const total = operation === "add" ? secondsA + secondsB : secondsA - secondsB;
  const decimalHours = Math.round((total / 3600) * 100) / 100;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TimeInputGroup
          legend="Time A"
          h={aH}
          m={aM}
          s={aS}
          onH={setAH}
          onM={setAM}
          onS={setAS}
          prefix="time-a"
        />
        <TimeInputGroup
          legend="Time B"
          h={bH}
          m={bM}
          s={bS}
          onH={setBH}
          onM={setBM}
          onS={setBS}
          prefix="time-b"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={operation === "add" ? "default" : "outline"}
          onClick={() => setOperation("add")}
        >
          Add
        </Button>
        <Button
          type="button"
          size="sm"
          variant={operation === "subtract" ? "default" : "outline"}
          onClick={() => setOperation("subtract")}
        >
          Subtract (A − B)
        </Button>
      </div>

      {hasInput && (
        <div className="mt-5 rounded-lg bg-brand-soft p-4 text-center">
          <p className="text-3xl font-semibold tabular-nums">{formatHMS(total)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{decimalHours} decimal hours</p>
        </div>
      )}
    </div>
  );
}
