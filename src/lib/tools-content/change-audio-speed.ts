import type { ToolContent } from "./types";

export const changeAudioSpeedContent: ToolContent = {
  heroSubtitle: "Speed Up or Slow Down Audio Without Changing Pitch",
  overview: [
    "Listening to a long lecture or podcast faster, or slowing down a piece of music to study a part more closely, both require changing playback speed while keeping the pitch natural — speeding up raw audio samples directly would raise the pitch (the classic chipmunk effect), and slowing down would drop it unnaturally. This tool uses FFmpeg's dedicated tempo-adjustment filter to change speed while keeping pitch exactly where it started.",
    "A real FFmpeg build compiled to WebAssembly performs the speed change entirely inside your browser using the atempo filter, which intelligently resamples the audio to alter playback speed independently of pitch — genuinely different from simply changing the sample rate, which would tie speed and pitch together.",
    "FFmpeg's tempo filter is only rated for factors between 0.5x and 2x in a single application, so for more extreme speed changes (very fast or very slow), this tool automatically chains multiple tempo adjustments together to reach the overall requested factor while each individual step stays within the filter's valid range.",
    "The result is re-encoded as MP3 at the new speed, with pitch sounding exactly as natural as the original recording — useful for anything from podcast binge-listening at 2x to slowing down a musical passage to half speed for learning.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the speed multiplier", description: "From 0.25x (quarter speed) to 4x (four times faster)." },
    { title: "Apply and download", description: "Speed changes; pitch stays exactly natural." },
  ],
  examples: [
    { label: "Speeding through a long podcast episode", input: "60-minute episode, 1.5x speed", output: "a 40-minute file, pitch unchanged" },
  ],
  faqs: [
    { question: "Will my audio sound like a chipmunk or unnaturally slow?", answer: "No — this uses a dedicated tempo-adjustment filter rather than simple sample-rate manipulation, so pitch stays exactly natural regardless of the speed factor applied." },
    { question: "Can I speed up by more than 2x or slow down below 0.5x?", answer: "Yes — the underlying tempo filter only supports 0.5x-2x per application, so this tool automatically chains multiple adjustments together for more extreme overall speed changes, from 0.25x up to 4x." },
    { question: "Is my audio uploaded anywhere?", answer: "No — the entire process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded at your chosen speed with pitch preserved." },
    { question: "How is this different from the Audio Pitch Changer tool?", answer: "This tool changes speed while deliberately keeping pitch unchanged; the Pitch Changer tool does the reverse — it shifts pitch while keeping speed exactly the same." },
  ],
};
