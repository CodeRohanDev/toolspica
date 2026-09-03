"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { MediaUploadZone } from "@/components/tools/media-upload-zone";
import { MediaProgressBar } from "@/components/tools/media-progress-bar";
import { useFfmpegJob } from "@/lib/use-ffmpeg-job";
import { pickInputName } from "@/lib/ffmpeg-setup";
import { downloadMediaBytes, stripMediaExtension } from "@/lib/media-helpers";

export function AudioMetadataEditor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [album, setAlbum] = React.useState("");
  const [year, setYear] = React.useState("");
  const { run, progress, processing, error, setError } = useFfmpegJob();

  async function apply() {
    if (!file) return;
    setError(null);
    try {
      const inputName = pickInputName(file);
      const ext = inputName.split(".").pop()!;
      const outputName = `out.${ext}`;
      const buffer = new Uint8Array(await file.arrayBuffer());
      const metaArgs: string[] = [];
      if (title) metaArgs.push("-metadata", `title=${title}`);
      if (artist) metaArgs.push("-metadata", `artist=${artist}`);
      if (album) metaArgs.push("-metadata", `album=${album}`);
      if (year) metaArgs.push("-metadata", `date=${year}`);
      const data = await run(
        [{ name: inputName, data: buffer }],
        ["-i", inputName, ...metaArgs, "-c", "copy", outputName],
        outputName
      );
      downloadMediaBytes(data, `${stripMediaExtension(file.name)}-tagged.${ext}`, file.type || "audio/mpeg");
    } catch {
      // error state already set by the hook
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <MediaUploadZone file={file} onFileSelect={setFile} onClear={() => setFile(null)} accept="audio/*" kind="audio" />

      {file && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="meta-title" className="text-sm text-muted-foreground">Title</Label>
            <Input id="meta-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="meta-artist" className="text-sm text-muted-foreground">Artist</Label>
            <Input id="meta-artist" value={artist} onChange={(e) => setArtist(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="meta-album" className="text-sm text-muted-foreground">Album</Label>
            <Input id="meta-album" value={album} onChange={(e) => setAlbum(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="meta-year" className="text-sm text-muted-foreground">Year</Label>
            <Input id="meta-year" value={year} onChange={(e) => setYear(e.target.value)} className="mt-1.5 font-mono" />
          </div>
        </div>
      )}

      {processing && <MediaProgressBar progress={progress} />}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <Button type="button" className="mt-4" onClick={apply} disabled={!file || processing}>
        <Download className="size-4" />
        {processing ? "Saving..." : "Save tags and download"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Writes tags directly into the file without re-encoding the audio, so quality and file size
        stay exactly the same — only the metadata changes.
      </p>
    </div>
  );
}
