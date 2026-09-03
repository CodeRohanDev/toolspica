"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, XCircle } from "lucide-react";

function clean(text: string, ignoreSpaces: boolean, ignorePunctuation: boolean) {
  let result = text.toLowerCase();
  if (ignorePunctuation) result = result.replace(/[^a-z0-9\s]/g, "");
  if (ignoreSpaces) result = result.replace(/\s+/g, "");
  return result;
}

export function PalindromeChecker() {
  const [text, setText] = React.useState("");
  const [ignoreSpaces, setIgnoreSpaces] = React.useState(true);
  const [ignorePunctuation, setIgnorePunctuation] = React.useState(true);

  const cleaned = clean(text, ignoreSpaces, ignorePunctuation);
  const isPalindrome =
    cleaned.length > 0 && cleaned === cleaned.split("").reverse().join("");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="palindrome-input" className="text-sm font-medium text-muted-foreground">
        Text to check
      </Label>
      <Input
        id="palindrome-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. A man a plan a canal Panama"
        className="mt-2"
      />

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="ignore-spaces"
            checked={ignoreSpaces}
            onCheckedChange={setIgnoreSpaces}
          />
          <Label htmlFor="ignore-spaces" className="text-sm font-normal">
            Ignore spaces
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="ignore-punctuation"
            checked={ignorePunctuation}
            onCheckedChange={setIgnorePunctuation}
          />
          <Label htmlFor="ignore-punctuation" className="text-sm font-normal">
            Ignore punctuation & capitalization
          </Label>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        {text.trim().length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Enter some text above to check.
          </p>
        ) : (
          <div className="flex items-center gap-2">
            {isPalindrome ? (
              <>
                <CheckCircle2 className="size-5 text-emerald-600" />
                <p className="text-sm font-medium">
                  Yes — that's a palindrome!
                </p>
              </>
            ) : (
              <>
                <XCircle className="size-5 text-muted-foreground" />
                <p className="text-sm font-medium">
                  No, that's not a palindrome.
                </p>
              </>
            )}
          </div>
        )}
        {text.trim().length > 0 && (
          <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
            Compared as: "{cleaned}"
          </p>
        )}
      </div>
    </div>
  );
}
