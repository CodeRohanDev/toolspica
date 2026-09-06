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
import { stripExtension } from "@/lib/image-processing";

const LANGUAGES = [
  { value: "eng", label: "English" },
  { value: "spa", label: "Spanish" },
  { value: "fra", label: "French" },
  { value: "deu", label: "German" },
  { value: "hin", label: "Hindi" },
  { value: "chi_sim", label: "Chinese (Simplified)" },
  { value: "ara", label: "Arabic" },
  { value: "rus", label: "Russian" },
  { value: "por", label: "Portuguese" },
  { value: "jpn", label: "Japanese" },
];

export function MultiLanguageOcr() {
  const [lang, setLang] = React.useState("eng");

  const convert = React.useCallback(
    async (file: File) => {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(lang, 1, { corePath: "/tesseract-core", workerPath: "/tesseract-worker.min.js" });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const blob = new Blob([data.text.trim()], { type: "text/plain" });
      return { blob, name: `${stripExtension(file.name)}.txt` };
    },
    [lang]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="image/*" onFilesSelect={addFiles} label="Drop images to extract text from" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Language</Label>
        <Select value={lang} onValueChange={(v) => v && setLang(v)}>
          <SelectTrigger className="mt-1.5 w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Downloads the appropriate language model the first time you use it, then recognizes text
        in that language entirely on your device. Choose the language that matches your images&apos;
        text for best accuracy — the same language applies to every file you add.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName="extracted-text.zip" />
    </div>
  );
}
