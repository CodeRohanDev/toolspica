"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { downloadMediaBytes } from "@/lib/media-helpers";

export function SplitArchiveBySize() {
  const [file, setFile] = React.useState<File | null>(null);
  const [partMb, setPartMb] = React.useState("10");
  const [busy, setBusy] = React.useState(false);

  async function split() {
    if (!file) return;
    setBusy(true);
    try {
      const partSize = Math.max(1, Number(partMb) || 10) * 1024 * 1024;
      const buffer = new Uint8Array(await file.arrayBuffer());
      const totalParts = Math.ceil(buffer.length / partSize);
      for (let i = 0; i < totalParts; i++) {
        const chunk = buffer.subarray(i * partSize, Math.min((i + 1) * partSize, buffer.length));
        downloadMediaBytes(new Uint8Array(chunk), `${file.name}.${String(i + 1).padStart(3, "0")}`, "application/octet-stream");
        await new Promise((r) => setTimeout(r, 150));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} kind="archive" label="Drop any archive or large file to split" />

      <div className="mt-4 flex items-center gap-3">
        <Label htmlFor="part-mb" className="shrink-0 text-sm text-muted-foreground">Max size per part (MB)</Label>
        <Input id="part-mb" value={partMb} onChange={(e) => setPartMb(e.target.value.replace(/\D/g, ""))} className="w-24 font-mono" />
      </div>

      <Button type="button" className="mt-4" onClick={split} disabled={!file || busy}>
        <Download className="size-4" />
        {busy ? "Splitting..." : "Split and download parts"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Splits any file into raw byte-range parts named .001, .002, etc. Reassemble by concatenating the parts in order (e.g. `cat file.001 file.002 &gt; file` on Mac/Linux, or `copy /b file.001+file.002 file` on Windows) — this is a generic byte split, not a self-extracting multi-volume archive.
      </p>
    </div>
  );
}
