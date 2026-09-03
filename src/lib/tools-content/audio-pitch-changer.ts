import type { ToolContent } from "./types";

export const audioPitchChangerContent: ToolContent = {
  heroSubtitle: "Shift Audio Pitch Up or Down Without Changing Speed",
  overview: [
    "Transposing music into a different key, creating a deeper or higher-pitched voice effect, or adjusting a recording to match a different instrument's tuning all require shifting pitch while keeping playback speed exactly the same — the opposite trade-off from the Change Audio Speed tool, which deliberately does the reverse.",
    "This uses the classic resample-then-correct-tempo technique: the audio is first resampled at a different rate (which shifts pitch but also changes speed as a side effect via the asetrate filter), then a tempo correction filter brings the speed back to exactly the original rate — the net result is pitch shifted, speed unchanged.",
    "Pitch is adjusted in semitones, the standard musical unit (12 semitones make one octave), ranging from -12 to +12 in this tool — covering a full octave down or up, which spans the practical range most pitch-adjustment needs fall into.",
    "A real FFmpeg build compiled to WebAssembly performs this entirely inside your browser, chaining the resample and tempo-correction filters together in one pass and re-encoding the result as MP3 — no audio is ever uploaded during the process.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the pitch shift", description: "From -12 to +12 semitones (one octave down or up)." },
    { title: "Apply and download", description: "Pitch changes; playback speed stays exactly the same." },
  ],
  examples: [
    { label: "Transposing a recording down an octave", input: "audio file, -12 semitones", output: "the same recording pitched a full octave lower, same speed" },
  ],
  faqs: [
    { question: "Will changing pitch also change the playback speed?", answer: "No — this uses a resample-then-correct-tempo technique specifically to isolate pitch from speed, so the output plays at exactly the original speed with only the pitch shifted." },
    { question: "What does 12 semitones mean?", answer: "12 semitones equals one full octave — the standard musical interval doubling or halving a note's frequency. This tool's range covers a full octave down (-12) to a full octave up (+12)." },
    { question: "Is my audio uploaded anywhere?", answer: "No — the entire process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "How is this different from the Change Audio Speed tool?", answer: "This tool shifts pitch while deliberately keeping speed the same; Change Audio Speed does the reverse, adjusting speed while deliberately keeping pitch natural." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded with the pitch shift applied." },
  ],
};
