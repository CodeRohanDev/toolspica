"use client";

import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegPromise: Promise<FFmpeg> | null = null;

/** Lazily loads a single shared FFmpeg WASM instance, self-hosted (no CDN). */
export function getFFmpeg(): Promise<FFmpeg> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");
      const ffmpeg = new FFmpeg();

      const coreURL = await toBlobURL("/ffmpeg-core/ffmpeg-core.js", "text/javascript");
      const wasmURL = await toBlobURL("/ffmpeg-core/ffmpeg-core.wasm", "application/wasm");
      await ffmpeg.load({ coreURL, wasmURL });
      return ffmpeg;
    })();
  }
  return ffmpegPromise;
}

export function pickUniqueName(extension: string): string {
  return `f${Date.now()}${Math.floor(Math.random() * 1e6)}.${extension}`;
}

/** Keeps the source file's own extension so ffmpeg's format probing has the best signal. */
export function pickInputName(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  return pickUniqueName(ext);
}

let fontLoaded = false;

/** Writes the self-hosted Liberation Sans font into ffmpeg's virtual filesystem, once. Needed by drawtext (no default font is available in the WASM sandbox). */
export async function ensureDrawtextFont(ffmpeg: FFmpeg): Promise<string> {
  const fontPath = "libsans.ttf";
  if (!fontLoaded) {
    const buf = new Uint8Array(await (await fetch("/fonts/LiberationSans-Regular.ttf")).arrayBuffer());
    await ffmpeg.writeFile(fontPath, buf);
    fontLoaded = true;
  }
  return fontPath;
}
