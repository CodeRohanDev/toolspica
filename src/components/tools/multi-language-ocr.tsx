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
import { ImageUploadCard } from "@/components/tools/image-upload-card";
import { CopyButton } from "@/components/tools/copy-button";
import { useTesseractOcr } from "@/lib/use-tesseract-ocr";
import { downloadTextFile } from "@/lib/pdf/pdf-helpers";
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
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [lang, setLang] = React.useState("eng");
  const [text, setText] = React.useState("");
  const { recognize, status, busy, error, setError } = useTesseractOcr();

  function handleFile(picked: File) {
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setText("");
    setError(null);
  }
  function clear() {
    setFile(null);
    setPreviewUrl(null);
    setText("");
    setError(null);
  }

  async function run() {
    if (!file) return;
    try {
      const data = await recognize(file, lang);
      setText(data.text.trim());
    } catch {
      // error already set by hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <ImageUploadCard file={file} previewUrl={previewUrl} onFileSelect={handleFile} onClear={clear} />

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

      {file && (
        <Button type="button" className="mt-4" onClick={run} disabled={busy}>
          {busy ? status || "Recognizing..." : "Extract text"}
        </Button>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {text && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recognized text</p>
            <div className="flex gap-2">
              <CopyButton value={text} />
              <Button type="button" size="sm" onClick={() => downloadTextFile(text, `${stripExtension(file!.name)}.txt`)}>
                <Download className="size-3.5" /> Download .txt
              </Button>
            </div>
          </div>
          <pre className="mt-1.5 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">{text}</pre>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Downloads the appropriate language model the first time you use it, then recognizes text in that language entirely on your device. Choose the language that matches your image's text for best accuracy.
      </p>
    </div>
  );
}
