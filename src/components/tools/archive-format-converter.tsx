"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { createSevenZip } from "@/lib/sevenzip-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

const FORMATS = [
  { value: "zip", label: "ZIP", ext: "zip", flag: "-tzip" },
  { value: "7z", label: "7Z", ext: "7z", flag: "-t7z" },
  { value: "tar", label: "TAR", ext: "tar", flag: "-ttar" },
];

export function ArchiveFormatConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [format, setFormat] = React.useState("zip");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function convert() {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const target = FORMATS.find((f) => f.value === format)!;
      const sevenZip = await createSevenZip();
      const buffer = new Uint8Array(await file.arrayBuffer());
      sevenZip.FS.writeFile(file.name, buffer);
      sevenZip.FS.mkdir("out");
      sevenZip.FS.chdir("out");
      sevenZip.callMain(["x", `../${file.name}`, "-y"]);
      const names = sevenZip.FS.readdir(".").filter((n) => n !== "." && n !== "..");
      if (names.length === 0) throw new Error("No files found in the source archive.");
      sevenZip.FS.chdir("..");
      sevenZip.callMain(["a", target.flag, `out.${target.ext}`, ...names.map((n) => `out/${n}`)]);
      const data = sevenZip.FS.readFile(`out.${target.ext}`) as Uint8Array;
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}.${target.ext}`, "application/octet-stream");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't convert this archive.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} kind="archive" label="Drop a ZIP, 7Z, TAR, RAR, or ISO file" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Convert to</Label>
        <Select value={format} onValueChange={(v) => v && setFormat(v)}>
          <SelectTrigger className="mt-1.5 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FORMATS.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || busy}>
        <Download className="size-4" />
        {busy ? "Converting..." : `Convert to ${format.toUpperCase()}`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Extracts the source archive (ZIP, 7Z, TAR, RAR, or ISO) and repacks its contents into your chosen format, using a real 7-Zip build compiled to WebAssembly, entirely in your browser.
      </p>
    </div>
  );
}
