"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { Mic, Square } from "lucide-react";

interface MinimalRecognitionEvent {
  resultIndex: number;
  results: { isFinal: boolean; [index: number]: { transcript: string } }[];
}

interface MinimalSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: MinimalRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getRecognitionCtor() {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => MinimalSpeechRecognition;
    webkitSpeechRecognition?: new () => MinimalSpeechRecognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function SpeechToText() {
  const [transcript, setTranscript] = React.useState("");
  const [listening, setListening] = React.useState(false);
  const [supported] = React.useState(() => getRecognitionCtor() !== null);
  const recognitionRef = React.useRef<MinimalSpeechRecognition | null>(null);

  React.useEffect(() => {
    const SpeechRecognitionCtor = getRecognitionCtor();
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalText += event.results[i][0].transcript;
      }
      if (finalText) setTranscript((prev) => (prev ? prev + " " : "") + finalText.trim());
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, []);

  function start() {
    setListening(true);
    recognitionRef.current?.start();
  }

  function stop() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  if (!supported) {
    return (
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <p className="text-sm text-destructive">
          Your browser doesn&apos;t support the Web Speech API for speech recognition. Try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex gap-2">
        <Button type="button" onClick={start} disabled={listening}>
          <Mic className="size-4" /> {listening ? "Listening…" : "Start"}
        </Button>
        <Button type="button" variant="outline" onClick={stop} disabled={!listening}>
          <Square className="size-4" /> Stop
        </Button>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Transcript</p>
          <CopyButton value={transcript} />
        </div>
        <Textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Your speech will appear here as text..."
          rows={8}
          className="mt-2 resize-y"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Your browser will ask for microphone permission the first time you press Start.
      </p>
    </div>
  );
}
