"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Eye, EyeOff } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { extractArchive } from "@/lib/sevenzip-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";
import { createZip } from "@/lib/zip-writer";

export function ZipPasswordRemover() {
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function remove() {
    if (!file || !password) return;
    setError(null);
    setBusy(true);
    try {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const entries = await extractArchive(buffer, "in.zip", password);
      if (entries.length === 0) throw new Error("No files extracted — check the password.");
      const zip = createZip(entries);
      downloadMediaBytes(zip, `${stripMediaExtension(file.name)}-unlocked.zip`, "application/zip");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't unlock this ZIP — check the password is correct.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept=".zip" kind="archive" />

      <div className="mt-4">
        <Label htmlFor="zip-pw" className="text-sm text-muted-foreground">Current password</Label>
        <div className="mt-1.5 flex gap-2">
          <Input id="zip-pw" type={visible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the ZIP's password" />
          <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={remove} disabled={!file || !password || busy}>
        <Download className="size-4" />
        {busy ? "Unlocking..." : "Remove password and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        You need to know the ZIP's current password — this can't crack or guess an unknown one. Decrypts the contents and rebuilds a fresh, password-free ZIP, entirely in your browser.
      </p>
    </div>
  );
}
