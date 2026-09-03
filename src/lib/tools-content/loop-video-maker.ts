import type { ToolContent } from "./types";

export const loopVideoMakerContent: ToolContent = {
  heroSubtitle: "Repeat a Video Clip Back-to-Back, Fast and Lossless",
  overview: [
    "Looping a short clip to fill a longer duration — background video for a display, a repeating animation, extending a short recording to match a longer audio track — just means playing the same content over and over in sequence. This tool repeats a clip exactly that many times using FFmpeg's stream-loop option, running entirely inside your browser via a real FFmpeg build compiled to WebAssembly.",
    "Because stream-loop re-reads the same source file multiple times through the demuxer rather than decoding and re-encoding anything, this operation uses stream copy (-c copy) and is correspondingly fast — there's no quality loss from the looping itself, since no frame is ever re-compressed.",
    "The repeat count is adjustable from 2x up to 20x, covering everything from a simple doubling to a substantially extended loop, with the final output being one continuous file containing the clip played back-to-back that many times.",
    "This is a straightforward repetition tool, not a seamless-loop creator — if your source clip doesn't start and end at visually matching points, the loop points will still be visible as a jump each time the clip restarts, since this tool repeats the content exactly as-is rather than attempting to blend the seams.",
  ],
  howItWorks: [
    { title: "Upload your video clip", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the repeat count", description: "From 2x up to 20x." },
    { title: "Loop and download", description: "The clip repeats back-to-back, with zero quality loss." },
  ],
  examples: [
    { label: "Extending a short clip for background video", input: "10-second clip, looped 6x", output: "a 60-second video of the clip repeating" },
  ],
  faqs: [
    { question: "Does looping reduce video quality?", answer: "No — this uses stream copy rather than re-encoding, so the video data is copied as-is on each repeat with zero quality loss from the looping process itself." },
    { question: "Will the loop points look seamless?", answer: "Only if your source clip's start and end frames already match visually — this tool repeats the content exactly as-is rather than blending the seams, so a visible jump can occur at each loop point if the clip doesn't naturally match up." },
    { question: "Is my video uploaded anywhere?", answer: "No — looping runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Why is looping so much faster than other video tools here?", answer: "Because it uses stream copy rather than decoding and re-encoding — the source file is simply read multiple times through the demuxer, which is a lightweight operation compared to genuine video processing." },
    { question: "What's the maximum number of repeats?", answer: "20x in this tool's slider — for longer loops, run the output back through the tool again to compound the repetition further." },
  ],
};
