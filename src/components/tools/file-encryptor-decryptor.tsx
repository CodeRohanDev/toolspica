"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { encryptBytes, decryptBytes } from "@/lib/aes";
import { Eye, EyeOff, Download } from "lucide-react";

function downloadBlob(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function FileEncryptorDecryptor() {
  const [mode, setMode] = React.useState<"encrypt" | "decrypt">("encrypt");
  const [file, setFile] = React.useState<File | null>(null);
  const [passphrase, setPassphrase] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  async function run() {
    if (!file || !passphrase) return;
    setBusy(true);
    setError(null);
    setDone(false);
    try {
      const inputBytes = new Uint8Array(await file.arrayBuffer());
      if (mode === "encrypt") {
        const output = await encryptBytes(inputBytes, passphrase);
        downloadBlob(output, `${file.name}.enc`);
      } else {
        const output = await decryptBytes(inputBytes, passphrase);
        const name = file.name.endsWith(".enc") ? file.name.slice(0, -4) : `${file.name}.decrypted`;
        downloadBlob(output, name);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Tabs
        value={mode}
        onValueChange={(v) => {
          if (v) {
            setMode(v as "encrypt" | "decrypt");
            setFile(null);
            setDone(false);
            setError(null);
          }
        }}
      >
        <TabsList>
          <TabsTrigger value="encrypt">Encrypt a file</TabsTrigger>
          <TabsTrigger value="decrypt">Decrypt a file</TabsTrigger>
        </TabsList>

        <TabsContent value={mode} className="mt-4">
          <Label htmlFor="file-crypto-input" className="text-sm text-muted-foreground">
            {mode === "encrypt" ? "Choose a file to encrypt" : "Choose an encrypted (.enc) file"}
          </Label>
          <Input
            id="file-crypto-input"
            type="file"
            className="mt-1.5"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setDone(false);
              setError(null);
            }}
          />

          <Label htmlFor="file-crypto-passphrase" className="mt-4 block text-sm text-muted-foreground">
            Passphrase
          </Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id="file-crypto-passphrase"
              type={visible ? "text" : "password"}
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder={mode === "encrypt" ? "Choose a strong passphrase" : "The passphrase used to encrypt this file"}
            />
            <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
              {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>

          <Button type="button" onClick={run} disabled={!file || !passphrase || busy} className="mt-4 w-full">
            <Download className="size-4" />
            {busy
              ? mode === "encrypt"
                ? "Encrypting..."
                : "Decrypting..."
              : mode === "encrypt"
                ? "Encrypt and download"
                : "Decrypt and download"}
          </Button>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {done && !error && (
            <p className="mt-3 text-sm text-green-600">
              Done — check your downloads.
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Everything happens locally in your browser — the file and passphrase are never
            uploaded anywhere.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
