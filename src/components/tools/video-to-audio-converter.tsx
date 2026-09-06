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
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { stripMediaExtension } from "@/lib/media-helpers";

const FORMATS = [
  { value: "mp3", label: "MP3", codec: ["-c:a", "libmp3lame", "-q:a", "2"], mime: "audio/mpeg" },
  { value: "wav", label: "WAV", codec: ["-c:a", "pcm_s16le"], mime: "audio/wav" },
  { value: "ogg", label: "OGG", codec: ["-c:a", "libvorbis"], mime: "audio/ogg" },
  { value: "flac", label: "FLAC", codec: ["-c:a", "flac"], mime: "audio/flac" },
];

export function VideoToAudioConverter() {
  const [format, setFormat] = React.useState("mp3");
  const { run } = useFfmpegJob();

  const convert = React.useCallback(
    async (file: File) => {
      const target = FORMATS.find((f) => f.value === format)!;
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName(target.value);
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run([{ name: inputName, data: buffer }], ["-i", inputName, "-vn", ...target.codec, outputName], outputName);
      const blob = new Blob([data as BlobPart], { type: target.mime });
      return { blob, name: `${stripMediaExtension(file.name)}.${target.value}` };
    },
    [format, run]
  );

  const { items, addFiles, removeItem } = useBatchFiles(convert);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <BatchUploadZone accept="video/*" onFilesSelect={addFiles} label="Drop video files to extract audio from" />

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Output format</Label>
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
        Extracts and encodes each video&apos;s audio track into your chosen format — MP3 for
        compatibility, WAV for lossless, OGG or FLAC for open, efficient formats.
      </p>

      <BatchFileList items={items} onRemove={removeItem} zipName={`extracted-${format}s.zip`} />
    </div>
  );
}
