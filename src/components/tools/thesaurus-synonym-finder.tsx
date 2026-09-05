"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Search } from "lucide-react";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

interface WordResult {
  word: string;
  score: number;
}

export function ThesaurusSynonymFinder() {
  const [word, setWord] = React.useState("");
  const [synonyms, setSynonyms] = React.useState<WordResult[]>([]);
  const [antonyms, setAntonyms] = React.useState<WordResult[]>([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    const query = word.trim();
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const [synRes, antRes] = await Promise.all([
        fetchWithTimeout(`https://api.datamuse.com/words?ml=${encodeURIComponent(query)}&max=20`),
        fetchWithTimeout(`https://api.datamuse.com/words?rel_ant=${encodeURIComponent(query)}&max=10`),
      ]);
      const syn = await synRes.json();
      const ant = await antRes.json();
      if (syn.length === 0) throw new Error("none");
      setSynonyms(syn);
      setAntonyms(ant);
    } catch {
      setError(`No synonyms found for "${query}".`);
      setSynonyms([]);
      setAntonyms([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <form onSubmit={search} className="flex gap-2">
        <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Enter a word, e.g. happy" />
        <Button type="submit" disabled={loading}>
          <Search className="size-4" /> {loading ? "Searching..." : "Find synonyms"}
        </Button>
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {synonyms.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Synonyms</p>
            <CopyButton value={synonyms.map((s) => s.word).join(", ")} label="Copy all" />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <span key={s.word} className="rounded-full border bg-muted px-3 py-1 text-sm">{s.word}</span>
            ))}
          </div>
        </div>
      )}

      {antonyms.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">Antonyms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {antonyms.map((a) => (
              <span key={a.word} className="rounded-full border bg-muted px-3 py-1 text-sm">{a.word}</span>
            ))}
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Results ranked by relevance using the free, open Datamuse word-relationship API, queried
        directly from your browser.
      </p>
    </div>
  );
}
