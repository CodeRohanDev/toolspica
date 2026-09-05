"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";

interface WordPronunciation {
  word: string;
  phonetic: string | null;
  audio: string | null;
  found: boolean;
}

export function TextPronunciationGuide() {
  const [text, setText] = React.useState("");
  const [results, setResults] = React.useState<WordPronunciation[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function lookupAll(e?: React.FormEvent) {
    e?.preventDefault();
    const words = Array.from(new Set(text.toLowerCase().match(/[a-z']+/g) ?? [])).slice(0, 15);
    if (words.length === 0) return;
    setLoading(true);
    setResults([]);

    const looked = await Promise.all(
      words.map(async (word): Promise<WordPronunciation> => {
        try {
          const res = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
          if (!res.ok) throw new Error();
          const data = await res.json();
          const phonetics = data[0]?.phonetics ?? [];
          const withAudio = phonetics.find((p: { audio?: string }) => p.audio);
          return {
            word,
            phonetic: data[0]?.phonetic ?? phonetics[0]?.text ?? null,
            audio: withAudio?.audio ?? null,
            found: true,
          };
        } catch {
          return { word, phonetic: null, audio: null, found: false };
        }
      })
    );
    setResults(looked);
    setLoading(false);
  }

  function playAudio(url: string) {
    new Audio(url).play().catch(() => {});
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <form onSubmit={lookupAll}>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a word or short phrase, e.g. entrepreneur" rows={3} className="resize-y" />
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? "Looking up..." : "Show pronunciation"}
        </Button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {results.map((r) => (
            <div key={r.word} className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
              <span className="min-w-[100px] font-medium">{r.word}</span>
              {r.found ? (
                <>
                  <span className="text-sm text-muted-foreground">{r.phonetic ?? "—"}</span>
                  {r.audio && (
                    <button type="button" onClick={() => playAudio(r.audio!)} aria-label={`Play pronunciation of ${r.word}`}>
                      <Volume2 className="size-4 text-brand" />
                    </button>
                  )}
                </>
              ) : (
                <span className="text-sm text-muted-foreground">no entry found</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows the IPA phonetic spelling and, where available, a native audio pronunciation for
        each word — up to 15 unique words per lookup.
      </p>
    </div>
  );
}
