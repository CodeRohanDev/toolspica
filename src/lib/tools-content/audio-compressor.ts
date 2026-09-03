import type { ToolContent } from "./types";

export const audioCompressorContent: ToolContent = {
  heroSubtitle: "Shrink an Audio File's Size at a Lower Bitrate",
  overview: [
    "A large audio file — a long recording, a high-bitrate music file, a lengthy podcast episode — sometimes needs to shrink down for email attachment limits, storage constraints, or faster uploads. This tool re-encodes audio at a bitrate you choose, giving direct control over the trade-off between file size and audio fidelity.",
    "A real FFmpeg build compiled to WebAssembly performs the re-encode entirely inside your browser, producing an MP3 at your chosen constant bitrate — lower bitrates shrink the file more aggressively but reduce audio fidelity, higher bitrates preserve more detail at a larger size.",
    "The bitrate slider ranges from 32kbps (heavily compressed, suitable mainly for spoken word where fidelity matters less) up to 256kbps (near-transparent quality for most listeners, appropriate for music), covering the full practical range most compression needs fall into.",
    "Before and after file sizes are shown once compression completes, so you can immediately judge whether the result meets your size target or whether a different bitrate setting would strike a better balance.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose a bitrate", description: "Lower shrinks the file more; higher preserves more fidelity." },
    { title: "Compress and download", description: "See the before/after size and save the smaller file." },
  ],
  examples: [
    { label: "Shrinking a podcast episode for email", input: "large audio file, 96kbps setting", output: "a much smaller MP3, still clear for spoken word" },
  ],
  faqs: [
    { question: "What bitrate should I use?", answer: "128kbps is a common good-enough balance for spoken word content like podcasts or lectures; 192-256kbps preserves more detail for music. Lower values (32-96kbps) shrink the file further at a more noticeable quality cost." },
    { question: "Is my audio uploaded to a server?", answer: "No — compression runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does compressing an already-compressed file (like an existing MP3) hurt quality more?", answer: "Yes — re-encoding a file that's already lossy compounds the quality loss from both encoding passes, which is an inherent property of lossy compression rather than something specific to this tool." },
    { question: "What output format does this produce?", answer: "MP3, encoded at the constant bitrate you select on the slider." },
    { question: "How much smaller will my file get?", answer: "It depends on your chosen bitrate relative to the source file's original bitrate — the size and bitrate scale roughly proportionally, so halving the bitrate roughly halves the resulting file size." },
  ],
};
