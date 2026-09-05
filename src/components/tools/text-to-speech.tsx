"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Play, Square } from "lucide-react";

export function TextToSpeech() {
  const [text, setText] = React.useState("");
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = React.useState(0);
  const [rate, setRate] = React.useState(1);
  const [speaking, setSpeaking] = React.useState(false);
  const [supported] = React.useState(
    () => typeof window !== "undefined" && "speechSynthesis" in window
  );

  React.useEffect(() => {
    if (!supported) return;
    function loadVoices() {
      setVoices(window.speechSynthesis.getVoices());
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  function speak() {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex];
    utterance.rate = rate;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (!supported) {
    return (
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm text-destructive">
          Your browser doesn&apos;t support the Web Speech API. Try Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to have it read aloud..."
        rows={6}
        className="resize-y"
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Voice</Label>
          <select
            value={voiceIndex}
            onChange={(e) => setVoiceIndex(Number(e.target.value))}
            className="mt-1.5 w-full rounded-md border bg-transparent px-2.5 py-1.5 text-sm"
          >
            {voices.map((v, i) => (
              <option key={v.name + i} value={i}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Speed: {rate.toFixed(1)}x</Label>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2.5 w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 border-t pt-4">
        <Button type="button" onClick={speak} disabled={!text.trim() || speaking}>
          <Play className="size-4" /> Speak
        </Button>
        <Button type="button" variant="outline" onClick={stop} disabled={!speaking}>
          <Square className="size-4" /> Stop
        </Button>
      </div>
    </div>
  );
}
