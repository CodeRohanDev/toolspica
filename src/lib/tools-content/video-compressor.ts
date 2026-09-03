import type { ToolContent } from "./types";

export const videoCompressorContent: ToolContent = {
  heroSubtitle: "Shrink a Video File Without Uploading It Anywhere",
  overview: [
    "A video that's too large to email, too slow to upload, or eating up storage space usually needs re-encoding at a lower bitrate to shrink down — but that traditionally means installing dedicated software or trusting a conversion website with the file. This tool runs a genuine FFmpeg build compiled to WebAssembly directly in your browser, compressing the video entirely on your own device.",
    "Compression is controlled through a single quality slider using H.264's CRF (Constant Rate Factor) setting — a lower CRF value produces higher quality and a larger file, a higher CRF value produces a smaller file at reduced visual quality. This is the same approach professional video encoders use, since CRF adapts the bitrate per-scene based on complexity rather than forcing a single flat bitrate across the whole video.",
    "The encode uses FFmpeg's \"veryfast\" preset, trading a small amount of compression efficiency for meaningfully faster processing — a reasonable trade-off for a browser-based tool where encoding speed directly affects how long you wait, especially on longer videos.",
    "Before and after file sizes are shown once compression finishes, so you can immediately see how much was saved and decide whether to try a different quality setting for a better balance.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose a compression level", description: "Slide toward higher quality or smaller file size." },
    { title: "Compress and download", description: "See the before/after size and save the smaller file." },
  ],
  examples: [
    { label: "Shrinking a phone video for email", input: "80MB video, balanced compression setting", output: "significantly smaller file, comparable visual quality" },
  ],
  faqs: [
    { question: "What does the compression slider actually control?", answer: "H.264's CRF (Constant Rate Factor) value — lower means higher quality and larger file size, higher means smaller file size at reduced quality. It adapts per scene rather than forcing one flat bitrate." },
    { question: "Is my video uploaded to a server?", answer: "No — the entire compression process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "How much smaller will my file get?", answer: "It depends heavily on the original video's bitrate and content — a video already compressed efficiently will shrink less than one from a high-bitrate camera source. Try a higher CRF value for more aggressive shrinking." },
    { question: "Will compression noticeably hurt video quality?", answer: "At moderate CRF settings the difference is usually subtle; pushing toward the smallest-file end of the slider will introduce visible quality loss, especially in fast-motion or highly detailed scenes." },
    { question: "How long does compression take?", answer: "Time scales with the video's length, resolution, and how much detail the encoder has to work through — a progress bar tracks real encoding progress as it runs." },
  ],
};
