import type { ToolContent } from "./types";

export const videoAspectRatioConverterContent: ToolContent = {
  heroSubtitle: "Fit a Video Into a New Aspect Ratio Without Cropping",
  overview: [
    "Different platforms expect different video shapes — widescreen 16:9 for most video sites, vertical 9:16 for stories and reels, square 1:1 for certain feed formats. A video shot in one aspect ratio doesn't natively fit another without either cropping content away or adding bars to fill the gap. This tool takes the non-destructive route: it fits your entire original video inside the new ratio and fills the remaining space with black letterbox or pillarbox bars.",
    "Four common target ratios are supported — 16:9 widescreen, 9:16 vertical (for reels and stories), 1:1 square, and 4:3 classic — each computed precisely from your video's actual dimensions using FFmpeg's scale and pad filters together in one operation, run through a real FFmpeg build compiled to WebAssembly entirely inside your browser.",
    "Because this pads rather than crops, none of your original visual content is ever lost or cut off — a portrait video fit into a 16:9 widescreen frame will show black bars on the left and right rather than losing the top or bottom of the shot, and vice versa for widescreen content fit into a vertical frame.",
    "This is the opposite trade-off from cropping to fit a new ratio: padding preserves 100% of the original frame but adds visible bars, while cropping fills the frame completely but discards part of the original content — this tool always chooses to preserve content over filling the frame.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose a target aspect ratio", description: "16:9, 9:16, 1:1, or 4:3." },
    { title: "Convert and download", description: "Your content fits inside the new ratio, letterboxed as needed." },
  ],
  examples: [
    { label: "Fitting a widescreen video for a vertical feed", input: "16:9 video, converted to 9:16", output: "the same content centered with black bars left and right" },
  ],
  faqs: [
    { question: "Will any of my video content be cropped or cut off?", answer: "No — this tool always fits the entire original frame inside the new aspect ratio and pads the remaining space with black bars, rather than cropping content away to fill the frame completely." },
    { question: "Which aspect ratios are supported?", answer: "16:9 (widescreen), 9:16 (vertical, for reels/stories), 1:1 (square), and 4:3 (classic) — covering the most common target shapes across current platforms." },
    { question: "Is my video uploaded anywhere?", answer: "No — the conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What color are the added bars?", answer: "Black, the standard convention for letterboxing and pillarboxing video content." },
    { question: "What if I want to fill the frame completely instead of adding bars?", answer: "That would require cropping instead of padding — use the Video Cropper tool if you're willing to lose some edge content in exchange for filling the frame without bars." },
  ],
};
