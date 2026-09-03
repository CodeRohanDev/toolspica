import type { ToolContent } from "./types";

export const audioCutterContent: ToolContent = {
  heroSubtitle: "Extract an Exact Section From an Audio File",
  overview: [
    "Pulling out a specific section of a longer audio file — a favorite part of a song, a relevant clip from a recording, a segment to share separately — is one of the most common audio editing needs, and doesn't require a full audio editor to accomplish. This tool reads a file's actual duration automatically once uploaded, then lets you set precise start and end times before cutting.",
    "A real FFmpeg build compiled to WebAssembly performs the cut entirely inside your browser, decoding the selected time range and re-encoding it as MP3 — this guarantees the cut points land exactly where you specify, rather than being limited to wherever the nearest natural boundary in the original file happens to fall.",
    "Start and end times are entered in minute:second format with input validation preventing an end time set before the start time — catching the most common mistake before wasting processing time on an invalid range.",
    "The output is always a fresh MP3 encode of just the selected section — the rest of the original file is discarded entirely, not merely hidden, so the result contains only the portion you chose to keep.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Duration is detected automatically." },
    { title: "Set start and end times", description: "Enter exact minute:second boundaries for the section to keep." },
    { title: "Cut and download", description: "Just that section, re-encoded as MP3." },
  ],
  examples: [
    { label: "Extracting a clip from a longer recording", input: "20-minute recording, cut to 3:10–3:45", output: "a 35-second MP3 clip of just that section" },
  ],
  faqs: [
    { question: "Will the cut points be exact?", answer: "Yes — the audio is fully decoded and re-encoded for the selected range, guaranteeing the output starts and ends exactly at the times you specify." },
    { question: "Is my audio uploaded anywhere?", answer: "No — cutting runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What output format does this produce?", answer: "MP3, encoded at a high VBR quality setting for the extracted section." },
    { question: "What time format should I use?", answer: "Minutes and seconds separated by a colon, like 3:45 — the tool detects and pre-fills the full duration so you know the valid range for your file." },
    { question: "Can I extract more than one section from the same file?", answer: "Run the tool again with different start/end times for each additional section — this tool cuts one continuous range at a time." },
  ],
};
