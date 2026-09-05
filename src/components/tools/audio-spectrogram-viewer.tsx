"use client";

import * as React from "react";
import { Upload, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

function frequencyToColor(value: number): string {
  // value 0-255 -> a blue-to-yellow-to-red heat scale
  const t = value / 255;
  const r = Math.round(255 * Math.min(1, t * 2));
  const g = Math.round(255 * Math.min(1, Math.max(0, t * 2 - 0.5) * 1.5));
  const b = Math.round(255 * Math.max(0, 1 - t * 2));
  return `rgb(${r},${g},${b})`;
}

export function AudioSpectrogramViewer() {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const ctxRef = React.useRef<AudioContext | null>(null);
  const rafRef = React.useRef<number | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUrl(URL.createObjectURL(file));
    setPlaying(false);
  }

  function setupAudioGraph() {
    if (ctxRef.current || !audioRef.current) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const source = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
  }

  function draw() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !analyser || !ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(data);

    const imageData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    for (let y = 0; y < canvas.height; y++) {
      const binIndex = Math.floor((1 - y / canvas.height) * bufferLength);
      const value = data[binIndex] ?? 0;
      ctx.fillStyle = frequencyToColor(value);
      ctx.fillRect(canvas.width - 1, y, 1, 1);
    }

    rafRef.current = requestAnimationFrame(draw);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    setupAudioGraph();
    ctxRef.current?.resume();
    if (playing) {
      audio.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setPlaying(false);
    } else {
      audio.play();
      rafRef.current = requestAnimationFrame(draw);
      setPlaying(true);
    }
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      canvas.width = 700;
      canvas.height = 200;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [fileUrl]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <Upload className="size-4" />
        Upload an audio file
        <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
      </label>

      {fileUrl && (
        <>
          <audio ref={audioRef} src={fileUrl} onEnded={() => setPlaying(false)} className="mt-3 w-full" controls />
          <canvas ref={canvasRef} className="mt-3 w-full rounded-lg border" />
          <Button type="button" className="mt-3" onClick={togglePlay}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Play"} to see live spectrogram
          </Button>
        </>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Shows frequency content live as the audio plays — brighter, warmer colors mean more
        energy at that frequency. Scroll builds left to right over time.
      </p>
    </div>
  );
}
