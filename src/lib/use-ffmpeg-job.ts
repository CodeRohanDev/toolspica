"use client";

import * as React from "react";
import { getFFmpeg } from "@/lib/ffmpeg-setup";

interface FfmpegInput {
  name: string;
  data: Uint8Array;
}

export function useFfmpegJob() {
  const [progress, setProgress] = React.useState(0);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const run = React.useCallback(
    async (inputs: FfmpegInput[], args: string[], outputName: string): Promise<Uint8Array> => {
      setProcessing(true);
      setProgress(0);
      setError(null);
      const ffmpeg = await getFFmpeg();
      const onProgress = ({ progress: p }: { progress: number }) => setProgress(Math.min(1, Math.max(0, p)));
      ffmpeg.on("progress", onProgress);
      try {
        for (const input of inputs) await ffmpeg.writeFile(input.name, input.data);
        const code = await ffmpeg.exec(args);
        if (code !== 0) throw new Error("Processing failed — the file may be corrupted or in an unsupported variant.");
        const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
        return data;
      } finally {
        ffmpeg.off("progress", onProgress);
        for (const input of inputs) {
          await ffmpeg.deleteFile(input.name).catch(() => {});
        }
        await ffmpeg.deleteFile(outputName).catch(() => {});
        setProcessing(false);
      }
    },
    []
  );

  return { run, progress, processing, error, setError };
}
