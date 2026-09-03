"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { encryptText } from "@/lib/aes";
import { Eye, EyeOff } from "lucide-react";

export function AesEncryptionTool() {
  const [plaintext, setPlaintext] = React.useState("");
  const [passphrase, setPassphrase] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [ciphertext, setCiphertext] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function encrypt() {
    if (!plaintext || !passphrase) return;
    setBusy(true);
    setError(null);
    try {
      setCiphertext(await encryptText(plaintext, passphrase));
    } catch {
      setError("Encryption failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="aes-plaintext" className="text-sm text-muted-foreground">
        Text to encrypt
      </Label>
      <Textarea
        id="aes-plaintext"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
        placeholder="Type or paste the text you want to encrypt..."
        rows={5}
        className="mt-1.5 resize-y"
      />

      <Label htmlFor="aes-passphrase" className="mt-4 block text-sm text-muted-foreground">
        Passphrase
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="aes-passphrase"
          type={visible ? "text" : "password"}
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="A strong, memorable passphrase"
        />
        <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>

      <Button
        type="button"
        onClick={encrypt}
        disabled={!plaintext || !passphrase || busy}
        className="mt-4 w-full"
      >
        {busy ? "Encrypting..." : "Encrypt"}
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {ciphertext && (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Encrypted (Base64)
            </p>
            <CopyButton value={ciphertext} />
          </div>
          <p className="mt-1.5 max-h-48 overflow-auto break-all rounded-lg border bg-muted/40 p-3 font-mono text-xs">
            {ciphertext}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Share this text and the passphrase separately (never in the same message). Use the AES
            Decryption Tool with the same passphrase to recover the original text.
          </p>
        </div>
      )}
    </div>
  );
}
