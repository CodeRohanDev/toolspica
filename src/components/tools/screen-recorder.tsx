"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Circle, Square, Download } from "lucide-react";

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

export function ScreenRecorder() {
  const [recording, setRecording] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [videoBlob, setVideoBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  async function start() {
    setError(null);
    setVideoUrl(null);
    setVideoBlob(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9,opus" });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setVideoBlob(blob);
        setVideoUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      stream.getVideoTracks()[0].addEventListener("ended", () => recorder.stop());
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't start screen recording — permission may have been denied.");
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
            <Circle className="size-4 fill-current text-destructive" /> Start screen recording
          </Button>
        ) : (
          <Button type="button" variant="destructive" onClick={stop}>
            <Square className="size-4 fill-current" /> Stop recording
          </Button>
        )}
        <p className="text-xs text-muted-foreground">
          Your browser will ask you to choose a screen, window, or tab to share.
        </p>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {videoUrl && (
        <div className="mt-4">
          <video src={videoUrl} controls className="w-full rounded-lg border" />
          <Button
            type="button"
            className="mt-3"
            onClick={() => videoBlob && downloadBlob(videoBlob, "screen-recording.webm")}
          >
            <Download className="size-4" /> Download recording (.webm)
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Uses your browser&apos;s native screen-capture API — nothing is uploaded, and the recording
        is encoded directly on your device as it happens.
      </p>
    </div>
  );
}
