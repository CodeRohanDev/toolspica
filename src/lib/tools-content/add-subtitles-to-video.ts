import type { ToolContent } from "./types";

export const addSubtitlesToVideoContent: ToolContent = {
  heroSubtitle: "Burn Subtitles Permanently Into a Video's Frames",
  overview: [
    "Subtitles usually exist as a separate, toggleable track that a player overlays on top of the video — convenient, but dependent on the platform actually supporting and displaying that track correctly. Some platforms strip subtitle tracks entirely, some players render them inconsistently. Burning subtitles directly into the video frames sidesteps all of that: what you see is guaranteed to be what everyone sees, everywhere.",
    "You provide a standard .srt subtitle file — the most common subtitle format, a plain text file listing timed text cues — and this tool parses every cue's start time, end time, and text, then builds a chain of precisely-timed text overlays using FFmpeg's drawtext filter, each one only visible during its own cue's exact time window.",
    "A real FFmpeg build compiled to WebAssembly renders this entirely inside your browser, using a self-hosted font (Liberation Sans, a freely licensed, metric-compatible font) since the WebAssembly sandbox has no system fonts of its own to draw text with by default.",
    "The permanence of burned-in subtitles is a deliberate trade-off: they can never be turned off or translated afterward without redoing the video entirely, but they're guaranteed to display correctly on any platform, including ones that strip out or mishandle separate subtitle tracks — a meaningful reliability guarantee for anything going out to an unpredictable audience.",
  ],
  howItWorks: [
    { title: "Upload your video and .srt file", description: "The subtitle file's timed cues are parsed and counted." },
    { title: "Burn-in runs locally", description: "Each cue is overlaid as text during its exact time window." },
    { title: "Download the subtitled video", description: "Subtitles are now a permanent part of every frame." },
  ],
  examples: [
    { label: "Adding captions to a shared clip", input: "video + matching .srt subtitle file", output: "the same video with subtitles permanently visible" },
  ],
  faqs: [
    { question: "Can these subtitles be turned off after burning them in?", answer: "No — burned-in subtitles become a permanent part of the video's pixels, unlike a toggleable soft-subtitle track. This is the deliberate trade-off for guaranteed display on every platform." },
    { question: "What subtitle file format is needed?", answer: "A standard .srt file — the most common subtitle format, listing sequential text cues with start and end timestamps in plain text." },
    { question: "Is my video or subtitle file uploaded anywhere?", answer: "No — parsing and burning-in both happen entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What font is used for the burned-in text?", answer: "Liberation Sans, a freely licensed font metric-compatible with Arial — it's self-hosted specifically for this tool since the WebAssembly sandbox has no system fonts available by default." },
    { question: "Why burn subtitles in instead of using a soft subtitle track?", answer: "Some platforms strip separate subtitle tracks entirely or render them inconsistently — burning them into the video frames guarantees they display correctly everywhere, at the cost of no longer being toggleable or translatable afterward." },
  ],
};
