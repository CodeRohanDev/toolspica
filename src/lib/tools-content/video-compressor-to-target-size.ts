import type { ToolContent } from "./types";

export const videoCompressorToTargetSizeContent: ToolContent = {
  heroSubtitle: "Compress a Video to Hit a Specific File Size",
  overview: [
    "Many upload forms and platforms cap file size at a hard limit — a 25MB email attachment, a 100MB submission portal — and knowing what quality setting will actually land you under that limit is mostly guesswork with a generic compressor. This tool works backward from your target size instead: tell it the size you need, and it calculates the exact bitrate required.",
    "The math is straightforward but precise: your target size in megabytes converts to a total bit budget, the video's actual duration (read automatically from the uploaded file) determines how that budget spreads across the timeline, and a fixed audio bitrate (128kbps) is subtracted first so the remaining budget goes entirely toward video quality at the calculated bitrate.",
    "A real FFmpeg build compiled to WebAssembly runs the compression entirely inside your browser using this calculated bitrate, encoding with the fast \"veryfast\" preset since single-pass bitrate-targeted encoding doesn't need the extra encoding passes a maximum-efficiency encode would use.",
    "Because this uses single-pass encoding (rather than a slower two-pass approach that can hit an exact target more precisely), the actual result typically lands close to your target size but not always exactly at it — variance depends on how much the video's content complexity varies over its length. The exact resulting size is shown after compression so you know precisely where it landed.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "Duration is detected automatically." },
    { title: "Set your target size in MB", description: "The required bitrate is calculated from size and duration." },
    { title: "Compress and download", description: "See the exact resulting size once it's done." },
  ],
  examples: [
    { label: "Meeting an email attachment limit", input: "video compressed with a 10MB target", output: "a file landing close to 10MB, ready to attach" },
  ],
  faqs: [
    { question: "Will the result be exactly my target size?", answer: "Close, but not always exact — this uses fast single-pass encoding, so actual size can vary slightly depending on how much the video's content complexity changes over its length. The exact resulting size is shown after compression." },
    { question: "How is the target bitrate calculated?", answer: "Your target size converts to a total bit budget over the video's actual duration, with a fixed 128kbps set aside for audio first — the remaining budget determines the video bitrate used for encoding." },
    { question: "Is my video uploaded anywhere?", answer: "No — the entire process, including duration detection and compression, runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What if my target size is unrealistically small for the video's length?", answer: "The calculated video bitrate has a reasonable minimum floor, but an extremely small target relative to a long video will still produce visibly lower quality, since there's a limit to how much any encoder can compress without degrading the image." },
    { question: "How is this different from the regular Video Compressor?", answer: "The regular Video Compressor uses a quality slider (CRF) where the resulting size is whatever it ends up being; this tool works backward from a target size you specify to calculate the bitrate needed." },
  ],
};
