import type { ToolContent } from "./types";

export const audioMergerContent: ToolContent = {
  heroSubtitle: "Mix Multiple Audio Tracks Together to Play at the Same Time",
  overview: [
    "Layering a voice-over on top of background music, combining separately-recorded instrument tracks, or blending multiple audio sources into one simultaneous mix is a fundamentally different operation from joining files end-to-end — this is about tracks playing together at the same time, not one after another. This tool mixes any number of audio tracks using FFmpeg's amix filter.",
    "A real FFmpeg build compiled to WebAssembly performs the mix entirely inside your browser, combining all input tracks into a single output where they all sound simultaneously from the start — this is a genuine audio mix, not a sequential concatenation.",
    "The mixed result runs as long as the longest individual input track, with shorter tracks simply ending early within the mix rather than looping or being padded — this matches the typical expectation for layering a shorter effect or voice clip over a longer background track.",
    "Because multiple audio sources summed together can produce a signal louder than any single source, some volume management is worth keeping in mind — if the mixed result sounds distorted or clipped, consider reducing the volume of individual tracks (using the Audio Volume Booster with a negative gain) before merging them together.",
  ],
  howItWorks: [
    { title: "Add two or more audio tracks", description: "Select the tracks you want to play simultaneously." },
    { title: "Mixing runs locally", description: "All tracks combine to play together from the start." },
    { title: "Download the mixed audio", description: "One MP3 file, running as long as the longest track." },
  ],
  examples: [
    { label: "Layering a voice-over with background music", input: "voice track + music track", output: "one mixed MP3 with both playing simultaneously" },
  ],
  faqs: [
    { question: "Do the tracks play one after another or at the same time?", answer: "At the same time — this is a genuine mix, layering all input tracks together to play simultaneously, not a sequential join. For sequential joining instead, use the Audio Joiner tool." },
    { question: "What happens if my tracks are different lengths?", answer: "The mixed result runs as long as the longest input track — shorter tracks simply end early within the mix rather than looping or being stretched to match." },
    { question: "Can mixing multiple tracks cause distortion?", answer: "It can, since combined audio sources can produce a louder signal than any single source alone — if the result sounds clipped, try reducing individual track volumes with the Audio Volume Booster before mixing." },
    { question: "Is my audio uploaded anywhere?", answer: "No — mixing runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "How many tracks can I mix together?", answer: "There's no fixed limit, though mixing more tracks together increases the risk of the combined signal clipping, and uses more processing time." },
  ],
};
