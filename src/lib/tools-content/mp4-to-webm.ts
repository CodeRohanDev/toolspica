import type { ToolContent } from "./types";

export const mp4ToWebmContent: ToolContent = {
  heroSubtitle: "Convert MP4 to WebM Entirely in Your Browser",
  overview: [
    "WebM is the format most modern web pages prefer for embedded video — smaller file sizes, open licensing, and native support in every major browser without a plugin. Converting an existing MP4 into WebM used to mean uploading to a conversion website (handing your video to someone else's server) or installing desktop software. This tool runs a genuine build of FFmpeg compiled to WebAssembly directly in your browser, so the entire conversion happens on your own device.",
    "The conversion re-encodes the video with the VP8 codec and the audio with Vorbis — WebM's standard, most broadly compatible codec pairing — rather than simply repackaging the existing H.264/AAC streams into a different container, since WebM's container format doesn't support those codecs. This means the output is a genuinely valid, standards-compliant WebM file that plays correctly in any browser's native video element.",
    "Because real transcoding is happening (not just remuxing), this takes real processing time proportional to the video's length and resolution — a live progress bar tracks FFmpeg's own reported progress through the encode, so you can see it's actively working rather than wondering if the page has frozen.",
    "Everything — reading the MP4, decoding it, re-encoding to VP8/Vorbis, and producing the final WebM file — happens inside your browser's WebAssembly sandbox. No video content, however sensitive, is ever transmitted anywhere.",
  ],
  howItWorks: [
    { title: "Upload your MP4", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "FFmpeg re-encodes the video to VP8 and audio to Vorbis." },
    { title: "Download the WebM", description: "A standards-compliant WebM file is ready to save." },
  ],
  examples: [
    { label: "Preparing a video for a web page", input: "45MB MP4 clip", output: "a WebM file, typically smaller, ready to embed with the native <video> tag" },
  ],
  faqs: [
    { question: "Is my video uploaded to a server during conversion?", answer: "No — a real FFmpeg build compiled to WebAssembly runs the entire conversion inside your browser; the video file never leaves your device." },
    { question: "Why does this take real time instead of finishing instantly?", answer: "This is a genuine re-encode, not a fast container swap — WebM requires VP8/Vorbis codecs, which are different from MP4's typical H.264/AAC, so full video and audio encoding has to run." },
    { question: "Will the converted WebM look identical to the original MP4?", answer: "Very close, though any lossy re-encode introduces a small amount of generational quality change — visually the difference is generally imperceptible at normal viewing sizes." },
    { question: "Does this work on very large video files?", answer: "It can, but larger files take proportionally longer and use more browser memory during processing, since the whole file is held in the browser's virtual filesystem while FFmpeg works on it." },
    { question: "Can I convert the WebM back to MP4 later?", answer: "Yes — use the WebM to MP4 tool, which reverses the process with an H.264/AAC re-encode." },
  ],
};
