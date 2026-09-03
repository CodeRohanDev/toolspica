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
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickUniqueName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

const FORMATS = [
  { value: "mp3", label: "MP3", codec: ["-c:a", "libmp3lame", "-q:a", "2"], mime: "audio/mpeg" },
  { value: "wav", label: "WAV", codec: ["-c:a", "pcm_s16le"], mime: "audio/wav" },
  { value: "ogg", label: "OGG", codec: ["-c:a", "libvorbis"], mime: "audio/ogg" },
  { value: "flac", label: "FLAC", codec: ["-c:a", "flac"], mime: "audio/flac" },
];

export function VideoToAudioConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [format, setFormat] = React.useState("mp3");
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function convert() {
    if (!file) return;
    setError(null);
    try {
      const target = FORMATS.find((f) => f.value === format)!;
      const inputName = pickUniqueName("mp4");
      const outputName = pickUniqueName(target.value);
      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, "-vn", ...target.codec, outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}.${target.value}`, target.mime);
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="video/*" kind="video" />

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

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={convert} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Converting..." : `Convert to ${format.toUpperCase()}`}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Extracts and encodes a video&apos;s audio track into your chosen format — MP3 for
        compatibility, WAV for lossless, OGG or FLAC for open, efficient formats.
      </p>
    </div>
  );
}
