"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { AlertTriangle } from "lucide-react";

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(b64url.length + ((4 - (b64url.length % 4)) % 4), "=");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function encryptNote(note: string): Promise<{ data: string; key: string }> {
  const keyBytes = crypto.getRandomValues(new Uint8Array(32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", keyBytes as BufferSource, "AES-GCM", false, ["encrypt"]);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, new TextEncoder().encode(note))
  );
  const packed = new Uint8Array(iv.length + ciphertext.length);
  packed.set(iv, 0);
  packed.set(ciphertext, iv.length);
  return { data: bytesToBase64Url(packed), key: bytesToBase64Url(keyBytes) };
}

async function decryptNote(data: string, keyB64: string): Promise<string> {
  const packed = base64UrlToBytes(data);
  const iv = packed.slice(0, 12);
  const ciphertext = packed.slice(12);
  const keyBytes = base64UrlToBytes(keyB64);
  const key = await crypto.subtle.importKey("raw", keyBytes as BufferSource, "AES-GCM", false, ["decrypt"]);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv as BufferSource }, key, ciphertext as BufferSource);
  return new TextDecoder().decode(plaintext);
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function SelfDestructingSecureNoteGenerator() {
  const [mode, setMode] = React.useState<"create" | "view" | "destroyed">("create");
  const [note, setNote] = React.useState("");
  const [link, setLink] = React.useState("");
  const [viewedNote, setViewedNote] = React.useState<string | null>(null);
  const [viewError, setViewError] = React.useState<string | null>(null);
  const [destroyKey, setDestroyKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const data = params.get("data");
    const key = params.get("key");
    if (!data || !key) return;

    (async () => {
      const localFlagKey = `note-destroyed:${await sha256Hex(data + key)}`;
      setDestroyKey(localFlagKey);
      if (localStorage.getItem(localFlagKey)) {
        setMode("destroyed");
        return;
      }
      try {
        const plaintext = await decryptNote(data, key);
        setViewedNote(plaintext);
        setMode("view");
      } catch {
        setViewError("This note could not be decrypted — the link may be incomplete or corrupted.");
        setMode("view");
      }
    })();
  }, []);

  async function generateLink() {
    if (!note.trim()) return;
    const { data, key } = await encryptNote(note);
    const url = `${window.location.origin}${window.location.pathname}#data=${data}&key=${key}`;
    setLink(url);
  }

  function destroyNote() {
    if (destroyKey) localStorage.setItem(destroyKey, "1");
    setViewedNote(null);
    setMode("destroyed");
  }

  if (mode === "destroyed") {
    return (
      <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
        <p className="text-sm font-semibold">This note has been destroyed.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          It can no longer be viewed in this browser.
        </p>
      </div>
    );
  }

  if (mode === "view") {
    return (
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        {viewError ? (
          <p className="text-sm text-destructive">{viewError}</p>
        ) : (
          <>
            <div className="rounded-lg bg-brand-soft p-3 text-sm">
              <AlertTriangle className="mb-1 size-4" />
              This note will be marked as destroyed in this browser once you close or leave this
              message. Read it now.
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-lg border bg-muted/40 p-4 text-sm">
              {viewedNote}
            </p>
            <Button type="button" onClick={destroyNote} variant="destructive" className="mt-4">
              I&apos;ve read this — destroy it now
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type the secret note you want to share..."
        rows={5}
        className="resize-y"
      />
      <Button type="button" onClick={generateLink} disabled={!note.trim()} className="mt-3">
        Create secure link
      </Button>

      {link && (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Shareable link
            </p>
            <CopyButton value={link} />
          </div>
          <p className="mt-1.5 max-h-24 overflow-auto break-all rounded-lg border bg-muted/40 p-3 font-mono text-xs">
            {link}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            The note is encrypted entirely in your browser — the encryption key lives only in the
            link itself (after the # symbol), which is never sent to any server. Whoever opens
            this link can read the note once; after that, it&apos;s flagged as destroyed only in{" "}
            <em>their</em> browser — nothing is stored on a server, so the link itself still
            technically works if opened again from a different browser or device.
          </p>
        </div>
      )}
    </div>
  );
}
