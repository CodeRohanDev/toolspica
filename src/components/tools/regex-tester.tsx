"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegexTester() {
  const [pattern, setPattern] = React.useState("");
  const [flags, setFlags] = React.useState("g");
  const [testString, setTestString] = React.useState("");

  const { matches, error } = React.useMemo(() => {
    if (!pattern) return { matches: [] as RegExpMatchArray[], error: null as string | null };
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const found = [...testString.matchAll(regex)];
      return { matches: found, error: null as string | null };
    } catch (e) {
      return { matches: [], error: (e as Error).message };
    }
  }, [pattern, flags, testString]);

  const highlighted = React.useMemo(() => {
    if (error || !pattern || matches.length === 0) return null;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match, i) => {
      const start = match.index ?? 0;
      parts.push(testString.slice(lastIndex, start));
      parts.push(
        <mark key={i} className="rounded bg-brand-soft px-0.5 text-brand">
          {match[0]}
        </mark>
      );
      lastIndex = start + match[0].length;
    });
    parts.push(testString.slice(lastIndex));
    return parts;
  }, [matches, testString, pattern, error]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <Label htmlFor="regex-pattern" className="text-sm text-muted-foreground">
            Pattern
          </Label>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\d{3}-\d{4}"
            className="mt-1.5 font-mono"
          />
        </div>
        <div>
          <Label htmlFor="regex-flags" className="text-sm text-muted-foreground">
            Flags
          </Label>
          <Input
            id="regex-flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gi"
            className="mt-1.5 w-24 font-mono"
          />
        </div>
      </div>

      <Label htmlFor="regex-test-string" className="mt-4 block text-sm text-muted-foreground">
        Test string
      </Label>
      <Textarea
        id="regex-test-string"
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        placeholder="Call 555-1234 or 555-5678 for support."
        rows={6}
        className="mt-1.5 resize-y font-mono text-sm"
      />

      <div className="mt-5 border-t pt-4">
        {error ? (
          <p className="text-sm text-destructive">Invalid regex: {error}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {matches.length} match{matches.length === 1 ? "" : "es"} found
          </p>
        )}
        {highlighted && (
          <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-muted/40 p-3 font-mono text-sm">
            {highlighted}
          </p>
        )}
      </div>
    </div>
  );
}
