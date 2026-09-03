"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertTriangle, ShieldCheck } from "lucide-react";

async function sha1Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function DataBreachEmailChecker() {
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [breachCount, setBreachCount] = React.useState<number | null>(null);

  async function check() {
    if (!password) return;
    setLoading(true);
    setError(null);
    setBreachCount(null);
    try {
      const hash = await sha1Hex(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!res.ok) throw new Error("Could not reach the breach database. Try again.");
      const text = await res.text();
      const match = text.split("\n").find((line) => line.startsWith(suffix));
      setBreachCount(match ? parseInt(match.split(":")[1].trim(), 10) : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="breach-password" className="text-sm text-muted-foreground">
        Password to check
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="breach-password"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password..."
          className="font-mono"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
        <Button type="button" onClick={check} disabled={loading || !password}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Uses the Have I Been Pwned k-anonymity API: only the first 5 characters of your
        password&apos;s SHA-1 hash are ever sent — never the password itself, and never the full
        hash.
      </p>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {breachCount !== null && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold ${
            breachCount > 0 ? "bg-destructive/10 text-destructive" : "bg-brand-soft"
          }`}
        >
          {breachCount > 0 ? (
            <>
              <AlertTriangle className="size-4 shrink-0" />
              Found in {breachCount.toLocaleString()} known data breaches — do not use this
              password.
            </>
          ) : (
            <>
              <ShieldCheck className="size-4 shrink-0" />
              Not found in any known breach in this database.
            </>
          )}
        </div>
      )}
    </div>
  );
}
