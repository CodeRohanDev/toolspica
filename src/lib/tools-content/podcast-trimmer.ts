import type { ToolContent } from "./types";

export const podcastTrimmerContent: ToolContent = {
  heroSubtitle: "Trim Dead Air From the Start and End of a Recording",
  overview: [
    "Podcast recordings almost always have some amount of unwanted material bookending the actual content — a countdown before recording properly starts, silence while someone gets settled, trailing dead air after the conversation wraps up. Rather than needing to specify exact clip boundaries the way a general trim tool requires, this tool is built specifically around the common podcast-editing pattern: trim a certain amount off the start, trim a certain amount off the end, keep everything in between.",
    "You enter how many seconds to remove from the start and how many to remove from the end separately — the tool calculates the resulting keep-range automatically from the file's detected total duration, so you don't have to do that arithmetic yourself or figure out exact minute:second boundaries.",
    "A real FFmpeg build compiled to WebAssembly performs the trim entirely inside your browser, re-encoding just the kept middle section as MP3 — the discarded intro and outro material is fully removed, not merely skipped during playback.",
    "This complements the more general Audio Cutter tool: use Podcast Trimmer when you know how much to cut off each end rather than the exact timestamps you want to keep, and Audio Cutter when you know the precise start and end times you're targeting instead.",
  ],
  howItWorks: [
    { title: "Upload your recording", description: "Duration is detected automatically." },
    { title: "Set seconds to trim from each end", description: "The kept range is calculated automatically." },
    { title: "Trim and download", description: "Just the middle section, re-encoded as MP3." },
  ],
  examples: [
    { label: "Removing a countdown and trailing silence", input: "recording, 5s trimmed from start, 8s from end", output: "an MP3 with just the actual content in between" },
  ],
  faqs: [
    { question: "How is this different from the regular Audio Cutter?", answer: "Audio Cutter requires exact start and end timestamps for what to keep; this tool instead asks how much to trim off each end, which is a more natural way to think about removing dead air from a recording's edges." },
    { question: "Is my audio uploaded anywhere?", answer: "No — trimming runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What happens if I trim more than the file's total length?", answer: "The tool checks that something remains to keep after both trims are applied and will flag an error if the combined trim amounts leave nothing." },
    { question: "What output format does this produce?", answer: "MP3, encoded at a high VBR quality setting for the kept section." },
    { question: "Can I also add fades after trimming?", answer: "Not in the same step — run the trimmed output through the Audio Fade In/Out Editor tool afterward if you also want smooth fade transitions at the new start and end points." },
  ],
};
