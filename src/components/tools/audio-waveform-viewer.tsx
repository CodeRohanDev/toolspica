"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { StatBar } from "@/components/tools/stat-bar";
import { formatTime } from "@/lib/media-helpers";

export function AudioWaveformViewer() {
  const [fileName, setFileName] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [sampleRate, setSampleRate] = React.useState(0);
  const [channels, setChannels] = React.useState(0);
  const [error, setError] = React.useState("");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      setDuration(audioBuffer.duration);
      setSampleRate(audioBuffer.sampleRate);
      setChannels(audioBuffer.numberOfChannels);
      drawWaveform(audioBuffer);
      ctx.close();
    } catch {
      setError("Couldn't decode that audio file.");
    }
  }

  function drawWaveform(audioBuffer: AudioBuffer) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = 1200;
    const height = 260;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < width; i++) {
      let min = 1;
      let max = -1;
      for (let j = 0; j < step; j++) {
        const sample = data[i * step + j] ?? 0;
        if (sample < min) min = sample;
        if (sample > max) max = sample;
      }
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        {fileName || "Upload an audio file"}
        <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {duration > 0 && (
        <>
          <canvas ref={canvasRef} className="mt-4 w-full rounded-lg border" />
          <StatBar
            items={[
              { label: "duration", value: formatTime(duration) },
              { label: "sample rate", value: `${sampleRate.toLocaleString()} Hz` },
              { label: "channels", value: channels },
            ]}
          />
        </>
      )}
    </div>
  );
}
