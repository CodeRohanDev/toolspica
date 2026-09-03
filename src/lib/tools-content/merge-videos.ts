import type { ToolContent } from "./types";

export const mergeVideosContent: ToolContent = {
  heroSubtitle: "Combine Multiple Video Clips Into One File",
  overview: [
    "Stitching several video clips together into one continuous file — combining scenes, joining recordings from a multi-part event, or assembling a compilation — traditionally required a video editor just for a simple concatenation task. This tool joins any number of video files end-to-end using a real FFmpeg build compiled to WebAssembly, running entirely inside your browser.",
    "Every clip is re-encoded to a common format (H.264 video, AAC audio) before joining, using FFmpeg's concat filter rather than the simpler concat demuxer — this is deliberately more robust, since it works correctly even when your source clips started with different resolutions, frame rates, or codecs, which a naive concatenation approach often fails on.",
    "Clips are combined in the exact order shown in the list, with up/down controls to rearrange them before merging — the same reordering pattern used throughout this site's file-combining tools, so setting the right sequence is quick and visual rather than requiring you to rename files or guess at alphabetical ordering.",
    "Because every clip is fully re-encoded rather than simply concatenated at the byte level, this handles genuinely mixed-source footage reliably — the trade-off is that merging takes real processing time proportional to the combined length of all the clips involved.",
  ],
  howItWorks: [
    { title: "Add two or more video clips", description: "Select multiple video files to combine." },
    { title: "Set the order", description: "Use the up/down arrows to arrange the sequence." },
    { title: "Merge and download", description: "One combined video, re-encoded for compatibility." },
  ],
  examples: [
    { label: "Combining event recordings", input: "3 separate video clips from a multi-part event", output: "one continuous merged video file" },
  ],
  faqs: [
    { question: "Can I merge clips with different resolutions or frame rates?", answer: "Yes — every clip is re-encoded to a common format before joining using FFmpeg's concat filter, which is specifically robust to clips that started with different resolutions, frame rates, or codecs." },
    { question: "Is my video uploaded anywhere?", answer: "No — merging runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does merging affect video quality?", answer: "Since every clip is fully re-encoded, there's some generational quality change inherent to that process, though it's generally not noticeable at normal viewing sizes." },
    { question: "How many clips can I merge at once?", answer: "There's no fixed limit, though more clips (or longer combined footage) mean more processing time and browser memory used during the merge." },
    { question: "Can I trim clips before merging them?", answer: "Not with this tool — for merging with custom in/out points per clip, use the Video Joiner by Timeline tool instead." },
  ],
};
