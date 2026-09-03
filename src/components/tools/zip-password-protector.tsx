"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, X } from "lucide-react";
import { MediaUploadZone, formatBytes } from "@/components/tools/media-upload-zone";
import { createSevenZip } from "@/lib/sevenzip-setup";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function ZipPasswordProtector() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function addFiles(picked: File[]) {
    setFiles((prev) => [...prev, ...picked]);
  }
  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function protect() {
    if (files.length === 0 || !password) return;
    setError(null);
    setBusy(true);
    try {
      const sevenZip = await createSevenZip();
      for (const f of files) sevenZip.FS.writeFile(f.name, new Uint8Array(await f.arrayBuffer()));
      sevenZip.callMain(["a", `-p${password}`, "-mem=AES256", "out.zip", ...files.map((f) => f.name)]);
      const zipBytes = sevenZip.FS.readFile("out.zip") as Uint8Array;
      downloadMediaBytes(zipBytes, "protected.zip", "application/zip");
    } catch {
      setError("Couldn't create the protected ZIP.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={null} onFileSelect={() => {}} onClear={() => {}} kind="archive" multiple onFilesSelect={addFiles} label="Add files to protect" />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
              </div>
              <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFile(i)} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Label htmlFor="new-pw" className="text-sm text-muted-foreground">Password</Label>
        <Input id="new-pw" type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" placeholder="Set a password" />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={protect} disabled={files.length === 0 || !password || busy}>
        <Download className="size-4" />
        {busy ? "Encrypting..." : "Create protected ZIP"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Encrypts with AES-256, ZIP's strongest standard encryption — a real 7-Zip build compiled to WebAssembly does the encryption entirely in your browser. Remember the password: it can't be recovered if lost.
      </p>
    </div>
  );
}
