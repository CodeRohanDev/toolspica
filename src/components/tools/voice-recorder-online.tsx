"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Download } from "lucide-react";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function VoiceRecorderOnline() {
  const [recording, setRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);

  async function start() {
    setError(null);
    setAudioUrl(null);
    setAudioBlob(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        streamRef.current?.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't access your microphone — permission may have been denied.");
    }
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-8 text-center">
        {!recording ? (
          <Button type="button" onClick={start}>
            <Mic className="size-4" /> Start recording
          </Button>
        ) : (
          <Button type="button" variant="destructive" onClick={stop}>
            <Square className="size-4 fill-current" /> Stop recording
          </Button>
        )}
        <p className="text-xs text-muted-foreground">Your browser will ask for microphone permission.</p>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {audioUrl && (
        <div className="mt-4">
          <audio src={audioUrl} controls className="w-full" />
          <Button type="button" className="mt-3" onClick={() => audioBlob && downloadBlob(audioBlob, "recording.webm")}>
            <Download className="size-4" /> Download recording
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Records directly from your microphone using your browser&apos;s native recording API —
        nothing is uploaded, and the audio never leaves your device.
      </p>
    </div>
  );
}
