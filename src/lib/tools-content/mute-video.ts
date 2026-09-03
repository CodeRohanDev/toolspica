import type { ToolContent } from "./types";

export const muteVideoContent: ToolContent = {
  heroSubtitle: "Remove a Video's Audio Track Instantly",
  overview: [
    "Some videos just don't need sound — background footage for a website, a silent time-lapse, a clip where the original audio has unwanted noise or needs to be replaced entirely in another editor. Removing the audio track shouldn't require re-encoding the entire video just to strip out sound, and with this tool, it doesn't.",
    "This uses FFmpeg's stream-copy mode for the video track (-c:v copy), meaning the video data is copied byte-for-byte from the original file rather than being decoded and re-encoded — only the audio stream is dropped. This makes muting one of the fastest operations available, since no actual video processing happens at all, and video quality is completely unaffected because it was never touched.",
    "A real FFmpeg build compiled to WebAssembly runs this entirely inside your browser — even though stream-copy is fast, it still all happens locally, with no video data ever leaving your device during the process.",
    "The result is a video file identical to the original in every way except the complete absence of an audio track — a genuinely silent file, not just one with the volume set to zero, which matters for platforms or editors that check for the actual presence of an audio stream.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Audio is stripped", description: "The video stream is copied as-is; only audio is removed." },
    { title: "Download the muted video", description: "Identical video quality, with no audio track at all." },
  ],
  examples: [
    { label: "Preparing background footage for a website", input: "video with unwanted audio", output: "the same video, with no audio track present" },
  ],
  faqs: [
    { question: "Does muting reduce video quality?", answer: "No — the video stream is copied directly without re-encoding, so quality is completely unaffected. Only the audio is removed." },
    { question: "Why is this so much faster than other video tools here?", answer: "Because no actual video processing happens — the video data is copied as-is (stream copy) rather than decoded and re-encoded, which is what makes this nearly instant regardless of the video's length." },
    { question: "Is the result truly silent, or just volume set to zero?", answer: "Truly silent — the audio track is removed from the file entirely, not just muted. Some platforms and editors specifically check for the presence of an audio stream, and this produces a file with none." },
    { question: "Is my video uploaded anywhere?", answer: "No — the process runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Can I add different audio back afterward?", answer: "Not with this tool — it only removes audio. Adding new audio to a muted video would require a different editing tool that supports combining separate video and audio sources." },
  ],
};
