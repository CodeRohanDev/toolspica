"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface UnitDef {
  id: string;
  label: string;
  /** Multiply a value in this unit by `toBase` to get the value in the base unit. */
  toBase: number;
}

interface UnitConverterProps {
  units: UnitDef[];
  defaultFromId: string;
  defaultToId: string;
  decimals?: number;
}

function formatNumber(n: number, decimals: number) {
  if (!Number.isFinite(n)) return "—";
  const rounded = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

export function UnitConverter({ units, defaultFromId, defaultToId, decimals = 6 }: UnitConverterProps) {
  const [value, setValue] = React.useState("1");
  const [fromId, setFromId] = React.useState(defaultFromId);
  const [toId, setToId] = React.useState(defaultToId);

  const fromUnit = units.find((u) => u.id === fromId)!;
  const toUnit = units.find((u) => u.id === toId)!;

  const numValue = parseFloat(value);
  const valid = value !== "" && !Number.isNaN(numValue);

  const result = valid ? (numValue * fromUnit.toBase) / toUnit.toBase : null;

  function swap() {
    setFromId(toId);
    setToId(fromId);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <Label htmlFor="uc-value" className="text-sm text-muted-foreground">
            Value
          </Label>
          <Input
            id="uc-value"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1.5"
          />
          <Select value={fromId} onValueChange={(v) => v && setFromId(v)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={swap}
          className="mb-[1px] justify-self-center"
          aria-label="Swap units"
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        <div>
          <Label className="text-sm text-muted-foreground">Result</Label>
          <div className="mt-1.5 flex h-8 items-center rounded-lg border bg-muted/30 px-2.5 text-base font-semibold tabular-nums">
            {result !== null ? formatNumber(result, decimals) : "—"}
          </div>
          <Select value={toId} onValueChange={(v) => v && setToId(v)}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {valid && (
        <div className="mt-5 border-t pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {value} {fromUnit.label} equals
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {units
              .filter((u) => u.id !== fromId)
              .map((u) => (
                <div key={u.id} className="rounded-lg bg-brand-soft px-3 py-2 text-sm">
                  <span className="font-semibold tabular-nums">
                    {formatNumber((numValue * fromUnit.toBase) / u.toBase, decimals)}
                  </span>{" "}
                  <span className="text-muted-foreground">{u.label}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
