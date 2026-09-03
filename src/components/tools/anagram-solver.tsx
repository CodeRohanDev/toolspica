"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, XCircle } from "lucide-react";

function normalize(text: string, ignoreSpaces: boolean) {
  let result = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  if (ignoreSpaces) result = result.replace(/\s+/g, "");
  return result.split("").sort().join("");
}

export function AnagramSolver() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  const [ignoreSpaces, setIgnoreSpaces] = React.useState(true);

  const normA = normalize(a, ignoreSpaces);
  const normB = normalize(b, ignoreSpaces);
  const bothFilled = a.trim().length > 0 && b.trim().length > 0;
  const isAnagram = bothFilled && normA === normB && normA.length > 0;

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="anagram-a" className="text-sm text-muted-foreground">
            First word or phrase
          </Label>
          <Input
            id="anagram-a"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="listen"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="anagram-b" className="text-sm text-muted-foreground">
            Second word or phrase
          </Label>
          <Input
            id="anagram-b"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="silent"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Switch
          id="anagram-ignore-spaces"
          checked={ignoreSpaces}
          onCheckedChange={setIgnoreSpaces}
        />
        <Label htmlFor="anagram-ignore-spaces" className="text-sm font-normal">
          Ignore spaces (needed for multi-word phrases)
        </Label>
      </div>

      <div className="mt-5 border-t pt-4">
        {!bothFilled ? (
          <p className="text-sm text-muted-foreground">
            Enter two words or phrases above to compare.
          </p>
        ) : (
          <div className="flex items-center gap-2">
            {isAnagram ? (
              <>
                <CheckCircle2 className="size-5 text-emerald-600" />
                <p className="text-sm font-medium">
                  Yes — these are anagrams of each other!
                </p>
              </>
            ) : (
              <>
                <XCircle className="size-5 text-muted-foreground" />
                <p className="text-sm font-medium">
                  No, these are not anagrams.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
