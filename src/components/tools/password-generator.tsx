"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";
const AMBIGUOUS = new Set(["l", "I", "1", "O", "0", "o"]);

function randomChar(pool: string): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return pool[bytes[0] % pool.length];
}

function generatePassword(
  length: number,
  useUpper: boolean,
  useDigits: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean
): string {
  let pool = LOWER;
  if (useUpper) pool += UPPER;
  if (useDigits) pool += DIGITS;
  if (useSymbols) pool += SYMBOLS;
  if (excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((c) => !AMBIGUOUS.has(c))
      .join("");
  }
  if (!pool) return "";
  return Array.from({ length }, () => randomChar(pool)).join("");
}

function estimateEntropyBits(length: number, useUpper: boolean, useDigits: boolean, useSymbols: boolean) {
  let poolSize = LOWER.length;
  if (useUpper) poolSize += UPPER.length;
  if (useDigits) poolSize += DIGITS.length;
  if (useSymbols) poolSize += SYMBOLS.length;
  return Math.round(length * Math.log2(poolSize));
}

export function PasswordGenerator() {
  const [length, setLength] = React.useState(16);
  const [useUpper, setUseUpper] = React.useState(true);
  const [useDigits, setUseDigits] = React.useState(true);
  const [useSymbols, setUseSymbols] = React.useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const generate = React.useCallback(() => {
    setPassword(generatePassword(length, useUpper, useDigits, useSymbols, excludeAmbiguous));
  }, [length, useUpper, useDigits, useSymbols, excludeAmbiguous]);

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entropy = estimateEntropyBits(length, useUpper, useDigits, useSymbols);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Input
          readOnly
          value={password}
          className="font-mono text-base"
          onFocus={(e) => e.target.select()}
        />
        <CopyButton value={password} />
        <Button type="button" variant="outline" onClick={generate}>
          Regenerate
        </Button>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        ~{entropy} bits of entropy{" "}
        {entropy >= 80 ? "— very strong" : entropy >= 60 ? "— strong" : "— consider more length or character types"}
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pw-length" className="text-sm text-muted-foreground">
              Length: {length}
            </Label>
          </div>
          <input
            id="pw-length"
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-1.5 w-full"
          />
        </div>

        {[
          { label: "Uppercase letters (A-Z)", checked: useUpper, onChange: setUseUpper },
          { label: "Numbers (0-9)", checked: useDigits, onChange: setUseDigits },
          { label: "Symbols (!@#$...)", checked: useSymbols, onChange: setUseSymbols },
          { label: "Exclude ambiguous characters (l, I, 1, O, 0)", checked: excludeAmbiguous, onChange: setExcludeAmbiguous },
        ].map((opt) => (
          <div key={opt.label} className="flex items-center justify-between">
            <Label className="text-sm">{opt.label}</Label>
            <Switch checked={opt.checked} onCheckedChange={opt.onChange} />
          </div>
        ))}
      </div>

      <Button type="button" onClick={generate} className="mt-5 w-full">
        Generate new password
      </Button>
    </div>
  );
}
