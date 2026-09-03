import type { ToolContent } from "./types";

export const changeVideoSpeedContent: ToolContent = {
  heroSubtitle: "Speed Up or Slow Down a Video, Audio Included",
  overview: [
    "Speeding through a long screen recording, creating a dramatic slow-motion effect, or fitting a clip to a specific duration all require changing playback speed — and doing it well means video and audio have to stay perfectly in sync, not just the video track alone. This tool adjusts both together using a real FFmpeg build compiled to WebAssembly, running entirely inside your browser.",
    "Video speed changes by adjusting each frame's timestamp (the setpts filter) — a factor above 1 compresses the timeline to play faster, below 1 stretches it to play slower. Audio speed uses FFmpeg's dedicated tempo filter rather than the same timestamp trick, since directly speeding up raw audio samples changes their pitch — the tempo filter instead resamples intelligently to change speed while keeping pitch natural, avoiding the chipmunk-voice or slow-motion-groan effect a naive approach would cause.",
    "FFmpeg's tempo filter is only rated for factors between 0.5x and 2x per application, so for more extreme speed changes (very fast or very slow), this tool automatically chains multiple tempo adjustments together to reach the requested overall factor while staying within each individual filter's valid range.",
    "The result is a single re-encoded video where both streams speed up or slow down together and stay in sync throughout — critical for anything where audio timing matters, like a tutorial or narrated clip, not just a silent time-lapse.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the speed multiplier", description: "From 0.25x (quarter speed) to 4x (four times faster)." },
    { title: "Apply and download", description: "Video and audio speed change together, staying in sync." },
  ],
  examples: [
    { label: "Speeding through a long recording", input: "20-minute screen recording, 2x speed", output: "a 10-minute video, audio pitch unchanged" },
  ],
  faqs: [
    { question: "Will the audio pitch sound unnatural after speeding up?", answer: "No — audio uses a dedicated tempo-adjustment filter rather than simple sample-rate manipulation, so pitch stays natural at any speed rather than sounding like a chipmunk (sped up) or a groan (slowed down)." },
    { question: "Can I speed up by more than 2x or slow down below 0.5x?", answer: "Yes — the underlying audio tempo filter only supports 0.5x-2x per step, so this tool automatically chains multiple adjustments together for more extreme overall speed changes, from 0.25x up to 4x." },
    { question: "Will video and audio stay in sync?", answer: "Yes — both streams are adjusted together to the same overall speed factor, keeping them synchronized throughout the whole clip." },
    { question: "Is my video uploaded anywhere?", answer: "No — the entire process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does this work for creating slow-motion effects?", answer: "Yes — set a speed below 1x (like 0.5x for half speed) to slow the video and audio down together, with audio pitch staying natural rather than dropping unnaturally low." },
  ],
};
