import type { ToolContent } from "./types";

export const videoJoinerByTimelineContent: ToolContent = {
  heroSubtitle: "Splice Specific Sections From Multiple Clips Into One",
  overview: [
    "Merging entire video files together is one thing; pulling out specific sections from several source clips and joining just those parts is a different, more precise task — the kind of editing needed to assemble a highlight reel from multiple longer recordings. This tool adds a trim in/out point per clip before joining everything together in one pass.",
    "Each added clip gets its duration read automatically, with editable start and end fields defaulting to the clip's full length — narrow these down to the exact section you want kept from that specific file, and every clip's kept section joins together in the order shown.",
    "A real FFmpeg build compiled to WebAssembly performs both the trimming and the joining together in a single filter graph, trimming each clip's video and audio to its specified range, resetting timestamps so each trimmed segment starts cleanly at zero, then concatenating all the trimmed segments into one continuous output — all inside your browser, without writing intermediate files to disk.",
    "Every clip is re-encoded to a common format (H.264/AAC) as part of this process, which means source clips with different resolutions, frame rates, or codecs can still be spliced together successfully into one consistent output file.",
  ],
  howItWorks: [
    { title: "Add two or more clips", description: "Each clip's duration is read automatically." },
    { title: "Set in/out points per clip", description: "Trim each clip to the exact section you want kept." },
    { title: "Join and download", description: "All trimmed sections combine into one video, in order." },
  ],
  examples: [
    { label: "Building a highlight reel from raw footage", input: "3 clips, specific sections trimmed from each", output: "one combined video containing just those sections" },
  ],
  faqs: [
    { question: "Can I trim each clip to a different section before joining?", answer: "Yes — that's the specific purpose of this tool. Each added clip gets its own editable start and end time, letting you keep only a specific section from each source file." },
    { question: "How is this different from the regular Merge Videos tool?", answer: "Merge Videos joins entire files together end-to-end; this tool lets you trim each clip to a specific in/out range first, then joins just those trimmed sections — useful for splicing highlights from longer source footage." },
    { question: "Can I join clips with different resolutions or codecs?", answer: "Yes — every clip is re-encoded to a common format (H.264/AAC) as part of the process, so mismatched source formats can still be combined successfully." },
    { question: "Is my video uploaded anywhere?", answer: "No — trimming and joining both happen entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What time format do the start/end fields use?", answer: "Plain seconds, as a number — the fields default to each clip's detected duration, so you can see the valid range before narrowing it down." },
  ],
};
