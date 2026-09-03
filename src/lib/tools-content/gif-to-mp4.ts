import type { ToolContent } from "./types";

export const gifToMp4Content: ToolContent = {
  heroSubtitle: "Convert a GIF Into a Much Smaller MP4 Video",
  overview: [
    "GIFs are convenient to share but shockingly inefficient as a storage format — since every frame is essentially its own image with no video-style compression between frames, a GIF is often many times larger than a video containing the exact same visual content. Converting a GIF to MP4 usually shrinks file size dramatically while keeping the same looping animation.",
    "A real FFmpeg build compiled to WebAssembly handles the conversion entirely inside your browser, re-encoding the GIF's frames as H.264 video. H.264 requires even pixel dimensions, so this automatically adjusts the width and height down by a pixel if needed — a small, automatic fix for GIFs that happen to have odd dimensions, which would otherwise cause the encode to fail outright.",
    "The output includes the faststart flag, which reorganizes the file so it can begin playing before fully downloading — useful when the resulting MP4 is going to be embedded on a web page rather than just downloaded and viewed locally.",
    "The trade-off for MP4's dramatically smaller size is that it needs a video player rather than displaying automatically like an image — most platforms handle this by auto-playing short MP4s in a GIF-like loop, but the underlying playback mechanism is genuinely different.",
  ],
  howItWorks: [
    { title: "Upload your GIF", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "Frames are re-encoded as H.264 video, with dimensions adjusted if needed." },
    { title: "Download the MP4", description: "A much smaller video file, ready to embed or share." },
  ],
  examples: [
    { label: "Shrinking a large GIF for a web page", input: "8MB animated GIF", output: "a much smaller MP4 video with the same visual content" },
  ],
  faqs: [
    { question: "Why is the MP4 so much smaller than the original GIF?", answer: "GIF has no efficient compression between frames — every frame is essentially a separate image — while H.264 video compression exploits similarity between consecutive frames, resulting in dramatically smaller files for the same visual content." },
    { question: "Will the MP4 loop automatically like the GIF did?", answer: "That depends on how it's embedded or played — most platforms and players can auto-loop a short MP4 similarly to a GIF, but this is a player/platform behavior rather than something baked into the file itself the way GIF's native looping is." },
    { question: "What happens if my GIF has odd pixel dimensions?", answer: "H.264 requires even width and height — this tool automatically adjusts dimensions down by a pixel if needed, so the conversion doesn't fail on GIFs with odd dimensions." },
    { question: "Is my GIF uploaded anywhere?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What does the faststart flag do?", answer: "It reorganizes the MP4's internal structure so playback can begin before the file fully downloads — useful for embedding the video on a web page." },
  ],
};
