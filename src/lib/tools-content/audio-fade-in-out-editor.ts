import type { ToolContent } from "./types";

export const audioFadeInOutEditorContent: ToolContent = {
  heroSubtitle: "Add Smooth Fade-In and Fade-Out to an Audio Clip",
  overview: [
    "An audio clip that starts or ends abruptly — cutting in mid-sound or stopping suddenly — sounds noticeably rougher than one with a smooth fade at each end, a small detail that makes a real difference in how polished a clip feels. This tool applies independently adjustable fade-in and fade-out durations to any audio file.",
    "A real FFmpeg build compiled to WebAssembly applies both fades entirely inside your browser using FFmpeg's afade filter, computing the fade-out's start point automatically from the file's detected duration and your chosen fade-out length, so the fade always lands correctly at the very end of the clip regardless of how long the file is.",
    "Fade-in and fade-out durations are set independently, since the right amount of smoothing at the start often differs from what's needed at the end — a quick half-second fade-in with a longer, more gradual fade-out is a common combination for many types of content.",
    "This applies a standard linear-style fade curve (FFmpeg's default), the same fundamental technique used in professional audio editors for basic fade effects — a reliable, widely-understood default rather than an exotic curve shape.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Duration is detected automatically." },
    { title: "Set fade-in and fade-out lengths", description: "Adjust each independently, in seconds." },
    { title: "Apply and download", description: "Smooth transitions at the start and end, re-encoded as MP3." },
  ],
  examples: [
    { label: "Polishing a music clip's start and end", input: "raw clip, 1s fade-in, 3s fade-out", output: "an MP3 with smooth transitions instead of abrupt cuts" },
  ],
  faqs: [
    { question: "Can I set different fade lengths for the start and end?", answer: "Yes — fade-in and fade-out durations are fully independent, so you can use a quick fade-in with a longer, more gradual fade-out or any other combination." },
    { question: "How does the tool know where to start the fade-out?", answer: "It calculates the fade-out's start point automatically from the file's detected total duration and your chosen fade-out length, ensuring it lands correctly at the very end regardless of the file's length." },
    { question: "Is my audio uploaded anywhere?", answer: "No — fading runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded with the fade-in and fade-out applied." },
    { question: "Can I set a fade length longer than the whole clip?", answer: "Setting fade durations close to or longer than the clip's total length can cause the fades to overlap oddly — keep fade lengths comfortably shorter than the total clip duration for best results." },
  ],
};
