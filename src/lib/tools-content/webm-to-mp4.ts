import type { ToolContent } from "./types";

export const webmToMp4Content: ToolContent = {
  heroSubtitle: "Convert WebM to Universally-Compatible MP4",
  overview: [
    "WebM plays natively in every modern browser, but plenty of software, older devices, and platforms still expect MP4 specifically — a video editor that doesn't recognize WebM, a phone gallery app, or a platform requiring MP4 uploads. This tool converts a WebM file into MP4, re-encoding with H.264 video and AAC audio, the most universally supported combination in existence.",
    "Since WebM typically uses VP8 or VP9 for video and Vorbis or Opus for audio — none of which are valid inside an MP4 container — a genuine re-encode is required rather than a fast repackage. This runs through a real FFmpeg build compiled to WebAssembly, executing entirely inside your browser rather than on a remote server.",
    "The output uses standard settings (H.264 with 4:2:0 chroma subsampling via yuv420p, AAC audio) chosen specifically for maximum compatibility — this is the same baseline configuration that plays correctly on essentially any device or platform that accepts MP4 at all, including older hardware and less common media players.",
    "A live progress bar reflects FFmpeg's own reported encoding progress, since a full re-encode takes real time proportional to the video's length and resolution rather than finishing instantly.",
  ],
  howItWorks: [
    { title: "Upload your WebM file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg re-encodes to H.264 video and AAC audio." },
    { title: "Download the MP4", description: "A universally compatible MP4 file is ready to save." },
  ],
  examples: [
    { label: "Preparing a screen recording for a video editor", input: "WebM screen capture", output: "an MP4 file that opens cleanly in editors expecting H.264/AAC" },
  ],
  faqs: [
    { question: "Why can't the WebM just be repackaged into MP4 directly?", answer: "WebM's typical VP8/VP9 video and Vorbis/Opus audio codecs aren't valid inside an MP4 container, so a genuine re-encode to H.264/AAC is required rather than a fast container swap." },
    { question: "Is my video uploaded anywhere?", answer: "No — the entire conversion runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will the MP4 play on older devices and software?", answer: "Yes — H.264 with 4:2:0 chroma subsampling and AAC audio is chosen specifically as the most broadly compatible combination available, matching what virtually any MP4-capable player expects." },
    { question: "Does converting reduce video quality?", answer: "Some quality change is inherent to any re-encode, but at standard settings the difference is generally not noticeable at normal viewing sizes." },
    { question: "How long will conversion take?", answer: "Roughly proportional to the video's length and resolution — a progress bar tracks the actual encoding progress so you can see it advancing." },
  ],
};
