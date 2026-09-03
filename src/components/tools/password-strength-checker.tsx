"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMMON_PASSWORDS = new Set([
  "password","123456","123456789","12345678","12345","1234567","qwerty","abc123",
  "password1","111111","123123","admin","letmein","welcome","monkey","dragon",
  "master","login","princess","qwertyuiop","solo","passw0rd","starwars","football",
  "iloveyou","sunshine","superman","trustno1","1q2w3e4r","000000","hello","freedom",
]);

const SEQUENCES = ["abcdefghijklmnopqrstuvwxyz", "0123456789", "qwertyuiop", "asdfghjkl", "zxcvbnm"];

function hasSequence(password: string): boolean {
  const lower = password.toLowerCase();
  for (const seq of SEQUENCES) {
    for (let i = 0; i <= seq.length - 3; i++) {
      const forward = seq.slice(i, i + 3);
      const backward = forward.split("").reverse().join("");
      if (lower.includes(forward) || lower.includes(backward)) return true;
    }
  }
  return false;
}

function hasRepeat(password: string): boolean {
  return /(.)\1\1/.test(password);
}

interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
  entropyBits: number;
  issues: string[];
}

function checkStrength(password: string): StrengthResult {
  const issues: string[] = [];
  if (!password) {
    return { score: 0, label: "—", color: "bg-muted", entropyBits: 0, issues: [] };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;
  const entropyBits = Math.round(password.length * Math.log2(Math.max(poolSize, 1)));

  if (password.length < 8) issues.push("Shorter than 8 characters");
  if (!/[A-Z]/.test(password)) issues.push("No uppercase letters");
  if (!/[a-z]/.test(password)) issues.push("No lowercase letters");
  if (!/[0-9]/.test(password)) issues.push("No numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) issues.push("No symbols");
  if (COMMON_PASSWORDS.has(password.toLowerCase())) issues.push("This is one of the most common leaked passwords");
  if (hasSequence(password)) issues.push("Contains a keyboard or alphabetic sequence (abc, 123, qwerty)");
  if (hasRepeat(password)) issues.push("Contains 3+ repeated characters in a row");

  let score: number;
  if (COMMON_PASSWORDS.has(password.toLowerCase())) score = 0;
  else if (entropyBits < 28) score = 0;
  else if (entropyBits < 36) score = 1;
  else if (entropyBits < 50) score = 2;
  else if (entropyBits < 70) score = 3;
  else score = 4;

  if (score > 0 && (hasSequence(password) || hasRepeat(password))) score = Math.max(0, score - 1);

  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

  return { score, label: labels[score], color: colors[score], entropyBits, issues };
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const result = React.useMemo(() => checkStrength(password), [password]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="pw-check" className="text-sm text-muted-foreground">
        Enter a password to check
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="pw-check"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password..."
          className="font-mono"
        />
        <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>

      {password && (
        <div className="mt-4">
          <div className="flex h-2 gap-1 overflow-hidden rounded-full bg-muted">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 ${i <= result.score ? result.color : "bg-transparent"}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-semibold">{result.label}</span>
            <span className="text-muted-foreground">~{result.entropyBits} bits of entropy</span>
          </div>

          {result.issues.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {result.issues.map((issue) => (
                <li key={issue} className="flex items-start gap-1.5">
                  <span className="text-destructive">•</span> {issue}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        This check runs entirely in your browser — your password is never sent anywhere.
      </p>
    </div>
  );
}
