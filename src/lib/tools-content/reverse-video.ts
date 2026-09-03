import type { ToolContent } from "./types";

export const reverseVideoContent: ToolContent = {
  heroSubtitle: "Play a Video and Its Audio Backward",
  overview: [
    "Reversing a video — for a creative effect, a fun social clip, or reviewing an action in reverse — means playing every frame back in the opposite order, and doing it properly requires reversing the audio too, not just the picture. This tool handles both together using a real FFmpeg build compiled to WebAssembly, running entirely inside your browser.",
    "Video reversal uses FFmpeg's reverse filter and audio reversal uses the corresponding areverse filter — applied together in one pass so the output has both streams flipped and still properly synchronized, rather than a silent reversed video or one where the reversed audio doesn't match the reversed picture.",
    "Reversing fundamentally requires holding the entire clip in memory at once, since every frame's new position depends on knowing the full frame count in advance — this is different from operations like trimming or cropping that can process a video more incrementally. As a result, reversal works most reliably on shorter clips; very long or high-resolution videos may run slowly or use significant browser memory.",
    "The reversed output is fully re-encoded (there's no way to reverse via a fast stream copy, since the underlying frame order genuinely changes), so processing time scales with both the video's length and its resolution.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Reversal runs locally", description: "Both video and audio streams are flipped together." },
    { title: "Download the reversed video", description: "Plays backward from end to start, in sync." },
  ],
  examples: [
    { label: "Creating a reverse-motion effect clip", input: "short forward-playing clip", output: "the same clip playing backward, audio included" },
  ],
  faqs: [
    { question: "Will the audio be reversed too, or just the video?", answer: "Both — video and audio are reversed together in one pass, keeping them synchronized so the audio matches the reversed picture rather than playing forward while the video plays backward." },
    { question: "Why does this work best on shorter clips?", answer: "Reversing requires holding the entire clip in memory at once, since every frame's new position depends on the total frame count — this makes it more memory- and processing-intensive than operations that can work through a video incrementally." },
    { question: "Is my video uploaded anywhere?", answer: "No — reversal runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Can I reverse just the video without the audio?", answer: "Not with this tool as configured — it reverses both together. For video-only manipulation, you'd need a tool or workflow that separates the streams first." },
    { question: "What happens with very long or high-resolution videos?", answer: "They may process slowly or use significant browser memory, since the whole clip has to be held and processed at once — shorter or lower-resolution clips reverse more reliably." },
  ],
};
