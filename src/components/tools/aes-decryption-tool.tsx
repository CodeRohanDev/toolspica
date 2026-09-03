"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { decryptText } from "@/lib/aes";
import { Eye, EyeOff } from "lucide-react";

export function AesDecryptionTool() {
  const [ciphertext, setCiphertext] = React.useState("");
  const [passphrase, setPassphrase] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [plaintext, setPlaintext] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function decrypt() {
    if (!ciphertext || !passphrase) return;
    setBusy(true);
    setError(null);
    setPlaintext("");
    try {
      setPlaintext(await decryptText(ciphertext.trim(), passphrase));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decryption failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="aes-ciphertext" className="text-sm text-muted-foreground">
        Encrypted text (Base64)
      </Label>
      <Textarea
        id="aes-ciphertext"
        value={ciphertext}
        onChange={(e) => setCiphertext(e.target.value)}
        placeholder="Paste the encrypted Base64 text here..."
        rows={5}
        className="mt-1.5 resize-y font-mono text-sm"
      />

      <Label htmlFor="aes-decrypt-passphrase" className="mt-4 block text-sm text-muted-foreground">
        Passphrase
      </Label>
      <div className="mt-1.5 flex gap-2">
        <Input
          id="aes-decrypt-passphrase"
          type={visible ? "text" : "password"}
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="The passphrase used to encrypt this"
        />
        <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>

      <Button
        type="button"
        onClick={decrypt}
        disabled={!ciphertext || !passphrase || busy}
        className="mt-4 w-full"
      >
        {busy ? "Decrypting..." : "Decrypt"}
      </Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {plaintext && (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Decrypted text
            </p>
            <CopyButton value={plaintext} />
          </div>
          <p className="mt-1.5 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted/40 p-3 text-sm">
            {plaintext}
          </p>
        </div>
      )}
    </div>
  );
}
