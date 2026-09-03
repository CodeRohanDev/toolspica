"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function RandomTeamGenerator() {
  const [namesText, setNamesText] = React.useState("");
  const [teamCount, setTeamCount] = React.useState("2");
  const [teams, setTeams] = React.useState<string[][]>([]);
  const [error, setError] = React.useState("");

  function generate() {
    const names = namesText
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    const n = Math.max(2, Math.min(20, parseInt(teamCount, 10) || 2));
    if (names.length < n) {
      setError(`Need at least ${n} names to make ${n} teams.`);
      setTeams([]);
      return;
    }
    setError("");
    const shuffled = shuffle(names);
    const result: string[][] = Array.from({ length: n }, () => []);
    shuffled.forEach((name, i) => result[i % n].push(name));
    setTeams(result);
  }

  const teamsText = teams
    .map((team, i) => `Team ${i + 1}:\n${team.map((m) => `  ${m}`).join("\n")}`)
    .join("\n\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div>
        <Label htmlFor="team-names" className="text-sm text-muted-foreground">
          Names (one per line)
        </Label>
        <Textarea
          id="team-names"
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          placeholder={"Alice\nBob\nCarol\nDavid\nEve\nFrank"}
          rows={6}
          className="mt-1.5 resize-y text-sm"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="team-count" className="text-sm text-muted-foreground">
            Number of teams (2-20)
          </Label>
          <Input
            id="team-count"
            type="number"
            inputMode="numeric"
            min={2}
            max={20}
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Make teams
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {teams.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Teams</p>
            <CopyButton value={teamsText} />
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {teams.map((team, i) => (
              <div key={i} className="rounded-lg border p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Team {i + 1} ({team.length})
                </p>
                <ul className="mt-1.5 space-y-1">
                  {team.map((member, j) => (
                    <li key={j} className="text-sm">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
