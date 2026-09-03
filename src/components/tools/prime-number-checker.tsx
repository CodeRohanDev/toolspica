"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const THREE = BigInt(3);
const FOUR = BigInt(4);

function isPrime(n: bigint): boolean {
  if (n < TWO) return false;
  if (n < FOUR) return true;
  if (n % TWO === ZERO) return false;
  for (let i = THREE; i * i <= n; i += TWO) {
    if (n % i === ZERO) return false;
  }
  return true;
}

function primeFactors(n: bigint): bigint[] {
  const factors: bigint[] = [];
  let remaining = n;
  for (let i = TWO; i * i <= remaining; i++) {
    while (remaining % i === ZERO) {
      factors.push(i);
      remaining /= i;
    }
  }
  if (remaining > ONE) factors.push(remaining);
  return factors;
}

export function PrimeNumberChecker() {
  const [input, setInput] = React.useState("97");

  let value: bigint | null = null;
  try {
    if (/^\d+$/.test(input.trim())) value = BigInt(input.trim());
  } catch {
    value = null;
  }

  const prime = value !== null ? isPrime(value) : null;
  const factors = value !== null && !prime && value >= TWO ? primeFactors(value) : null;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="prime-input" className="text-sm text-muted-foreground">
        Enter a whole number
      </Label>
      <Input
        id="prime-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1.5 font-mono"
        placeholder="e.g. 97"
      />

      {value === null && input.trim() && (
        <p className="mt-3 text-sm text-destructive">Enter a non-negative whole number.</p>
      )}

      {value !== null && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm font-semibold ${
            prime ? "bg-brand-soft" : "bg-muted/40"
          }`}
        >
          {value.toString()} is {prime ? "a prime number" : "not a prime number"}
        </div>
      )}

      {factors && factors.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Prime factorization: {factors.join(" × ")}
        </p>
      )}
    </div>
  );
}
