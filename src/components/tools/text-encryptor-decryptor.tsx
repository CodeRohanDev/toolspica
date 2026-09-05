"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function TextEncryptorDecryptor() {
  const [mode, setMode] = React.useState<"encrypt" | "decrypt">("encrypt");
  const [input, setInput] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  async function run() {
    setError("");
    setOutput("");
    if (!input.trim() || !password) return;

    try {
      if (mode === "encrypt") {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKey(password, salt);
        const ciphertext = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv as BufferSource },
          key,
          new TextEncoder().encode(input)
        );
        const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
        setOutput(toBase64(combined));
      } else {
        const combined = fromBase64(input.trim());
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const ciphertext = combined.slice(28);
        const key = await deriveKey(password, salt);
        const plaintext = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv: iv as BufferSource },
          key,
          ciphertext as BufferSource
        );
        setOutput(new TextDecoder().decode(plaintext));
      }
    } catch {
      setError(
        mode === "encrypt"
          ? "Encryption failed — try again."
          : "Decryption failed — check the password and that the input is valid encrypted text."
      );
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === "encrypt" ? "default" : "outline"} onClick={() => setMode("encrypt")}>
          Encrypt
        </Button>
        <Button type="button" size="sm" variant={mode === "decrypt" ? "default" : "outline"} onClick={() => setMode("decrypt")}>
          Decrypt
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Paste encrypted text to decrypt..."}
        rows={6}
        className="mt-4 resize-y"
      />

      <div className="mt-3">
        <Label className="text-sm text-muted-foreground">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="mt-1.5"
        />
      </div>

      <Button type="button" className="mt-4" onClick={run} disabled={!input.trim() || !password}>
        {mode === "encrypt" ? "Encrypt" : "Decrypt"}
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {output && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            <CopyButton value={output} />
          </div>
          <Textarea readOnly value={output} rows={6} className="mt-2 resize-y bg-muted/40 font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
