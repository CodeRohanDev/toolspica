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
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName, pickInputName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

const FORMATS = [
  { value: "mp3", label: "MP3", ext: "mp3", codec: ["-c:a", "libmp3lame", "-q:a", "2"], mime: "audio/mpeg" },
  { value: "wav", label: "WAV", ext: "wav", codec: ["-c:a", "pcm_s16le"], mime: "audio/wav" },
  { value: "ogg", label: "OGG", ext: "ogg", codec: ["-c:a", "libvorbis", "-q:a", "5"], mime: "audio/ogg" },
  { value: "flac", label: "FLAC", ext: "flac", codec: ["-c:a", "flac"], mime: "audio/flac" },
  { value: "aac", label: "AAC (.m4a)", ext: "m4a", codec: ["-c:a", "aac", "-b:a", "192k"], mime: "audio/mp4" },
];

export function UniversalAudioFormatConverter() {
  const [format, setFormat] = React.useState("mp3");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const target = FORMATS.find((f) => f.value === format)!;
      const inputName = pickInputName(file);
      const outputName = pickUniqueName(target.ext);
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, ...target.codec, outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: target.mime });
      return { blob, name: `${stripMediaExtension(file.name)}.${target.ext}` };
    },
    [format, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="audio/*" onFilesSelect={addFiles} label="Drop any audio files to convert" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Output format</Label>
        <Select value={format} onValueChange={(v) => v && setFormat(v)}>
          <SelectTrigger className="mt-1.5 w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FORMATS.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        One tool for any audio format swap — pick your target and this decodes each source file and
        re-encodes it, all locally in your browser. Files process one at a time, in order.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName={`converted-${format}s.zip`} />
    </div>
  );
}
