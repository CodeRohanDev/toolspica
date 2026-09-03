import type { ToolContent } from "./types";

export const silenceRemoverContent: ToolContent = {
  heroSubtitle: "Automatically Cut Out Silent Gaps Throughout a Recording",
  overview: [
    "Long pauses, dead air between sentences, or gaps where a recording was left running unintentionally make a file longer and more tedious to listen through than necessary — and finding and cutting every one of these gaps by hand is slow work. This tool detects and removes silent stretches automatically throughout the entire recording, not just at the very start or end.",
    "A real FFmpeg build compiled to WebAssembly analyzes the audio entirely inside your browser using FFmpeg's silenceremove filter, applied in a configuration that catches silence anywhere in the track — at the beginning, scattered throughout the middle, and at the end — rather than only trimming the file's outer edges.",
    "A threshold slider controls how quiet a passage needs to be before it counts as \"silence\" worth removing — a higher threshold (closer to 0dB) catches quieter pauses and background noise as silence, while a lower threshold only removes stretches that are genuinely, deeply silent.",
    "This is a straightforward volume-based detection, not intelligent speech analysis — very quiet spoken passages could get caught by an aggressive threshold setting, so it's worth previewing the result and adjusting the threshold if meaningful content gets removed along with the actual silence.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the silence threshold", description: "Higher catches more (including quieter pauses)." },
    { title: "Remove silence and download", description: "Silent gaps throughout the recording are cut out." },
  ],
  examples: [
    { label: "Tightening up a rambling recording", input: "recording with several long pauses", output: "a shorter MP3 with the silent gaps removed" },
  ],
  faqs: [
    { question: "Does this only trim silence from the start and end?", answer: "No — this removes silent stretches anywhere throughout the entire recording, not just the outer edges, which is what distinguishes it from a simple start/end trim." },
    { question: "What does the threshold slider control?", answer: "How quiet a passage needs to be before it's treated as removable silence — a higher threshold catches quieter pauses and background noise, a lower threshold only removes stretches that are genuinely deeply silent." },
    { question: "Could this accidentally remove quiet speech?", answer: "Yes, if the threshold is set aggressively high relative to how quietly someone speaks — this is volume-based detection, not intelligent speech recognition, so it's worth previewing the result and adjusting the threshold if content gets caught along with actual silence." },
    { question: "Is my audio uploaded anywhere?", answer: "No — silence detection and removal run entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded with the detected silent sections removed." },
  ],
};
