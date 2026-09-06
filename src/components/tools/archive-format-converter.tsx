"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { createSevenZip } from "@/lib/sevenzip-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

const FORMATS = [
  { value: "zip", label: "ZIP", ext: "zip", flag: "-tzip" },
  { value: "7z", label: "7Z", ext: "7z", flag: "-t7z" },
  { value: "tar", label: "TAR", ext: "tar", flag: "-ttar" },
];

export function ArchiveFormatConverter() {
  const [format, setFormat] = React.useState("zip");

  const convert = React.useCallback(
    async (file: File) => {
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
      const blob = new Blob([data as BlobPart], { type: "application/octet-stream" });
      return { blob, name: `${stripMediaExtension(file.name)}.${target.ext}` };
    },
    [format]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone onFilesSelect={addFiles} label="Drop ZIP, 7Z, TAR, RAR, or ISO files" />

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
      <p className="mt-2 text-xs text-muted-foreground">
        Extracts each source archive (ZIP, 7Z, TAR, RAR, or ISO) and repacks its contents into your
        chosen format, using a real 7-Zip build compiled to WebAssembly, entirely in your browser.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="converted-archives.zip" />
    </div>
  );
}
