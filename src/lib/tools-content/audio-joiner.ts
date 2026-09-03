import type { ToolContent } from "./types";

export const audioJoinerContent: ToolContent = {
  heroSubtitle: "Join Multiple Audio Files Together, End-to-End",
  overview: [
    "Combining several audio files into one continuous track — joining recorded segments from a session, stitching together separately-recorded parts of a podcast, assembling a compilation — is a sequential concatenation task that doesn't need a full audio editor. This tool joins any number of audio files end-to-end, one after another, using a real FFmpeg build compiled to WebAssembly running entirely inside your browser.",
    "Files join in exactly the order shown in the list, with up/down controls to rearrange them before combining — the same reordering pattern used throughout this site's file-combining tools, making it quick to set the right sequence visually rather than needing to rename files or rely on alphabetical ordering.",
    "Every file is decoded and re-encoded together into a single output using FFmpeg's concat filter, which means files of different original formats or sample rates can be joined successfully into one consistent MP3 — the filter handles reconciling those differences during the join rather than requiring matching source formats.",
    "This joins tracks sequentially (one after another in time), which is a different operation from mixing — for combining tracks so they play simultaneously at the same time instead, like a voice-over layered under background music, use the Audio Merger tool instead.",
  ],
  howItWorks: [
    { title: "Add two or more audio files", description: "Select multiple audio files to combine." },
    { title: "Set the order", description: "Use the up/down arrows to arrange the sequence." },
    { title: "Join and download", description: "One combined MP3, tracks joined end-to-end." },
  ],
  examples: [
    { label: "Combining recorded session segments", input: "3 separately recorded audio files", output: "one continuous MP3 with all segments joined in order" },
  ],
  faqs: [
    { question: "Can I join files of different formats or sample rates?", answer: "Yes — every file is decoded and re-encoded together using FFmpeg's concat filter, which reconciles differences in the source formats during the join." },
    { question: "Is my audio uploaded anywhere?", answer: "No — joining runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "How is this different from Audio Merger?", answer: "This tool joins files sequentially, one after another in time; Audio Merger instead mixes files together to play at the same time, like layering a voice-over under background music." },
    { question: "How many files can I join at once?", answer: "There's no fixed limit, though more files (or longer combined audio) mean more processing time and browser memory used during the join." },
    { question: "What output format does this produce?", answer: "MP3, encoded at a high VBR quality setting for the joined result." },
  ],
};
