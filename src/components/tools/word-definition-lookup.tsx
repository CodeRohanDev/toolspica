"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Search } from "lucide-react";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

export function WordDefinitionLookup() {
  const [word, setWord] = React.useState("");
  const [definition, setDefinition] = React.useState<{ text: string; partOfSpeech: string } | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    const query = word.trim();
    if (!query) return;
    setLoading(true);
    setError("");
    setDefinition(null);
    try {
      const res = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const firstMeaning = data[0]?.meanings?.[0];
      const firstDef = firstMeaning?.definitions?.[0]?.definition;
      if (!firstDef) throw new Error("no definition");
      setDefinition({ text: firstDef, partOfSpeech: firstMeaning.partOfSpeech });
    } catch {
      setError(`No definition found for "${query}".`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <form onSubmit={lookup} className="flex gap-2">
        <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Enter a word..." />
        <Button type="submit" disabled={loading}>
          <Search className="size-4" /> {loading ? "..." : "Define"}
        </Button>
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {definition && (
        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{definition.partOfSpeech}</p>
              <p className="mt-1 text-sm">{definition.text}</p>
            </div>
            <CopyButton value={definition.text} label="" />
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows just the single most relevant definition — for full entries with every meaning and
        examples, use the Dictionary Lookup tool instead.
      </p>
    </div>
  );
}
