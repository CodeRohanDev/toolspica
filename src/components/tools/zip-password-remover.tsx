"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { BatchUploadZone } from "@/components/tools/batch-upload-zone";
import { BatchFileList } from "@/components/tools/batch-file-list";
import { useBatchFiles } from "@/lib/use-batch-files";
import { extractArchive } from "@/lib/sevenzip-setup";
import { createZip } from "@/lib/zip-writer";
import { stripMediaExtension } from "@/lib/media-helpers";

export function ZipPasswordRemover() {
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const convert = React.useCallback(
    async (file: File) => {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const entries = await extractArchive(buffer, "in.zip", password);
      if (entries.length === 0) throw new Error("No files extracted — check the password.");
      const zip = createZip(entries);
      const blob = new Blob([zip as BlobPart], { type: "application/zip" });
      return { blob, name: `${stripMediaExtension(file.name)}-unlocked.zip` };
    },
    [password]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="mb-4">
        <Label htmlFor="zip-pw" className="text-sm text-muted-foreground">Current password (used for every file you add)</Label>
        <div className="mt-1.5 flex gap-2">
          <Input id="zip-pw" type={visible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the ZIPs' password" />
          <Button type="button" variant="outline" size="icon" onClick={() => setVisible((v) => !v)}>
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
      </div>

      <BatchUploadZone accept=".zip" onFilesSelect={addFiles} label="Drop password-protected ZIP files" />

      <BatchFileList items={items} onRemove={removeItem} zipName="unlocked-archives.zip" />

      <p className="mt-3 text-xs text-muted-foreground">
        You need to know each ZIP&apos;s current password — this can&apos;t crack or guess an
        unknown one. Decrypts the contents and rebuilds a fresh, password-free ZIP, entirely in
        your browser. All files you add use the same password entered above.
      </p>
    </div>
  );
}
