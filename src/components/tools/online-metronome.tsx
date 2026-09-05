"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function OnlineMetronome() {
  const [bpm, setBpm] = React.useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = React.useState(4);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentBeat, setCurrentBeat] = React.useState(0);

  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const beatRef = React.useRef(0);
  const bpmRef = React.useRef(bpm);
  const beatsPerMeasureRef = React.useRef(beatsPerMeasure);

  React.useEffect(() => {
    bpmRef.current = bpm;
    beatsPerMeasureRef.current = beatsPerMeasure;
  }, [bpm, beatsPerMeasure]);

  const playClick = React.useCallback((accent: boolean) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = accent ? 1000 : 700;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  const stop = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setCurrentBeat(0);
    beatRef.current = 0;
  }, []);

  const start = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    setIsPlaying(true);
    beatRef.current = 0;

    const tick = () => {
      const beat = beatRef.current % beatsPerMeasureRef.current;
      playClick(beat === 0);
      setCurrentBeat(beat);
      beatRef.current += 1;
      timerRef.current = setTimeout(tick, (60 / bpmRef.current) * 1000);
    };
    tick();
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="rounded-xl border bg-card p-5 text-center sm:p-6">
      <p className="text-5xl font-bold tabular-nums">{bpm}</p>
      <p className="mt-1 text-sm text-muted-foreground">BPM</p>

      <input
        type="range"
        min={40}
        max={240}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="mt-4 w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-3">
        <Label className="text-sm text-muted-foreground">Beats per measure</Label>
        <select
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
          className="rounded-md border bg-transparent px-2 py-1 text-sm"
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full ${isPlaying && currentBeat === i ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      <Button size="lg" className="mt-6" onClick={isPlaying ? stop : start}>
        {isPlaying ? "Stop" : "Start"}
      </Button>
    </div>
  );
}
