import type { ToolContent } from "./types";

export const aviToMp4Content: ToolContent = {
  heroSubtitle: "Convert an Old AVI File to Modern, Compatible MP4",
  overview: [
    "AVI is one of the oldest video container formats still occasionally encountered, dating back to early Windows, and it can hold a wide range of codecs — some quite old and poorly supported by modern devices, phones, and web browsers. Converting an AVI file to MP4 with standard H.264/AAC encoding fixes this at the source, producing a file format virtually every modern device and platform can play natively.",
    "A real FFmpeg build compiled to WebAssembly handles the conversion entirely inside your browser, decoding whatever codec the source AVI actually uses internally (which varies file to file, since AVI is just a container) and re-encoding to H.264 video with 4:2:0 chroma subsampling and AAC audio — the most universally compatible combination available.",
    "Because AVI files can contain such a wide variety of internal codecs, this conversion is a genuine re-encode rather than a fast repackaging — the actual video and audio data is decoded and rebuilt in the new, modern format, not just wrapped in a different container.",
    "This addresses a real, common frustration: an old AVI file that plays fine in one specific old media player but fails to open at all in modern phone galleries, web uploaders, or newer video software — converting to MP4 resolves that compatibility gap directly.",
  ],
  howItWorks: [
    { title: "Upload your AVI file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg decodes and re-encodes to H.264/AAC MP4." },
    { title: "Download the MP4", description: "A modern, universally playable video file." },
  ],
  examples: [
    { label: "Modernizing an old video file", input: "legacy .avi file with an outdated codec", output: "an MP4 file playable on any current device or platform" },
  ],
  faqs: [
    { question: "Why won't my AVI file open in modern software?", answer: "AVI is just a container format that can hold a wide range of codecs, some quite old — modern devices and software often lack support for these older codecs, which is exactly what converting to standard H.264/AAC MP4 resolves." },
    { question: "Is my video uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will this work regardless of what codec is inside the AVI?", answer: "Yes — FFmpeg decodes whatever codec the source file actually uses internally before re-encoding to H.264/AAC, so the specific original codec doesn't matter for the conversion to succeed." },
    { question: "Does converting reduce quality?", answer: "Since this is a genuine re-encode, some quality change is inherent, though at standard settings it's generally not noticeable at normal viewing sizes." },
    { question: "How long does conversion take?", answer: "Proportional to the video's length and resolution — a progress bar tracks the actual encoding progress as FFmpeg works through the file." },
  ],
};
