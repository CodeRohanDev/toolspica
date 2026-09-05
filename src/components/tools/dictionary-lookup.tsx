"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Volume2 } from "lucide-react";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

interface Entry {
  word: string;
  phonetic?: string;
  audio?: string;
  meanings: Meaning[];
}

export function DictionaryLookup() {
  const [word, setWord] = React.useState("");
  const [entries, setEntries] = React.useState<Entry[] | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    const query = word.trim();
    if (!query) return;
    setLoading(true);
    setError("");
    setEntries(null);
    try {
      const res = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const mapped: Entry[] = data.map((d: Record<string, unknown>) => {
        const phonetics = (d.phonetics as Record<string, unknown>[]) ?? [];
        const withAudio = phonetics.find((p) => p.audio);
        return {
          word: d.word as string,
          phonetic: (d.phonetic as string) ?? (phonetics[0]?.text as string) ?? undefined,
          audio: withAudio?.audio as string | undefined,
          meanings: ((d.meanings as Record<string, unknown>[]) ?? []).map((m) => ({
            partOfSpeech: m.partOfSpeech as string,
            definitions: (m.definitions as Record<string, unknown>[]).map((def) => ({
              definition: def.definition as string,
              example: def.example as string | undefined,
            })),
            synonyms: (m.synonyms as string[]) ?? [],
          })),
        };
      });
      setEntries(mapped);
    } catch {
      setError(`No dictionary entry found for "${query}".`);
    } finally {
      setLoading(false);
    }
  }

  function playAudio(url: string) {
    new Audio(url).play().catch(() => {});
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <form onSubmit={lookup} className="flex gap-2">
        <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Enter a word, e.g. serendipity" />
        <Button type="submit" disabled={loading}>
          <Search className="size-4" /> {loading ? "Looking up..." : "Look up"}
        </Button>
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {entries?.map((entry, i) => (
        <div key={i} className="mt-5 border-t pt-4">
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">{entry.word}</p>
            {entry.phonetic && <p className="text-muted-foreground">{entry.phonetic}</p>}
            {entry.audio && (
              <button type="button" onClick={() => playAudio(entry.audio!)} aria-label="Play pronunciation">
                <Volume2 className="size-4 text-brand" />
              </button>
            )}
          </div>

          {entry.meanings.map((meaning, j) => (
            <div key={j} className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{meaning.partOfSpeech}</p>
              <ol className="mt-1 list-decimal space-y-1.5 pl-5 text-sm">
                {meaning.definitions.map((def, k) => (
                  <li key={k}>
                    {def.definition}
                    {def.example && <p className="mt-0.5 text-xs italic text-muted-foreground">&ldquo;{def.example}&rdquo;</p>}
                  </li>
                ))}
              </ol>
              {meaning.synonyms.length > 0 && (
                <p className="mt-1.5 text-xs text-muted-foreground">Synonyms: {meaning.synonyms.slice(0, 8).join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      ))}
      <p className="mt-3 text-xs text-muted-foreground">
        Definitions provided by the free, open dictionaryapi.dev service, called directly from
        your browser.
      </p>
    </div>
  );
}
