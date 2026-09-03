"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/tools/copy-button";
import { PASSPHRASE_WORDS } from "@/lib/passphrase-words";

const BITS_PER_WORD = Math.log2(PASSPHRASE_WORDS.length);

function randomWord(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return PASSPHRASE_WORDS[bytes[0] % PASSPHRASE_WORDS.length];
}

function randomDigit(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(bytes[0] % 10);
}

function capitalize(word: string): string {
  return word[0].toUpperCase() + word.slice(1);
}

export function PassphraseGenerator() {
  const [wordCount, setWordCount] = React.useState(5);
  const [separator, setSeparator] = React.useState("-");
  const [capitalizeWords, setCapitalizeWords] = React.useState(false);
  const [appendNumber, setAppendNumber] = React.useState(true);
  const [passphrase, setPassphrase] = React.useState("");

  const generate = React.useCallback(() => {
    const words = Array.from({ length: wordCount }, randomWord).map((w) =>
      capitalizeWords ? capitalize(w) : w
    );
    if (appendNumber) words.push(randomDigit() + randomDigit());
    setPassphrase(words.join(separator));
  }, [wordCount, separator, capitalizeWords, appendNumber]);

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entropyBits = Math.round(wordCount * BITS_PER_WORD + (appendNumber ? Math.log2(100) : 0));

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Input
          readOnly
          value={passphrase}
          className="font-mono text-base"
          onFocus={(e) => e.target.select()}
        />
        <CopyButton value={passphrase} />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        ~{entropyBits} bits of entropy from a {PASSPHRASE_WORDS.length.toLocaleString()}-word list
        (~{BITS_PER_WORD.toFixed(1)} bits per word)
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <Label htmlFor="word-count" className="text-sm text-muted-foreground">
            Number of words: {wordCount}
          </Label>
          <input
            id="word-count"
            type="range"
            min={3}
            max={10}
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="mt-1.5 w-full"
          />
        </div>

        <div>
          <Label htmlFor="separator" className="text-sm text-muted-foreground">
            Separator
          </Label>
          <Input
            id="separator"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="mt-1.5 w-24"
            maxLength={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Capitalize each word</Label>
          <Switch checked={capitalizeWords} onCheckedChange={setCapitalizeWords} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm">Append a random 2-digit number</Label>
          <Switch checked={appendNumber} onCheckedChange={setAppendNumber} />
        </div>
      </div>

      <Button type="button" onClick={generate} className="mt-5 w-full">
        Generate new passphrase
      </Button>
    </div>
  );
}
