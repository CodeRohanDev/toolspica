import type { ToolContent } from "./types";

export const audioVolumeBoosterContent: ToolContent = {
  heroSubtitle: "Increase or Decrease an Audio File's Volume",
  overview: [
    "A recording that came out too quiet — a phone-recorded voice memo, a video's audio track picked up from a distant microphone — often just needs a straightforward volume boost rather than any more sophisticated processing. This tool applies a precise gain adjustment in decibels, the standard unit for measuring relative loudness in audio engineering.",
    "A real FFmpeg build compiled to WebAssembly applies the gain entirely inside your browser using FFmpeg's volume filter, which multiplies the audio signal by a factor calculated from your chosen decibel value — positive values boost volume, negative values reduce it, with 0dB leaving the audio unchanged.",
    "Boosting volume too aggressively on audio that's already close to peak level can cause audible clipping — a harsh, distorted sound that happens when the signal exceeds the maximum representable level. This is a genuine risk with any flat gain boost, not a flaw specific to this tool, and it's worth previewing the result and backing off the gain if distortion appears.",
    "For audio with inconsistent volume throughout (quiet in some parts, loud in others) rather than uniformly too quiet, the Audio Normalizer tool's loudness-based approach will generally produce a more even, professional-sounding result than a flat gain boost applied here.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Set the gain in decibels", description: "Positive boosts volume, negative reduces it." },
    { title: "Apply and download", description: "The adjusted audio, re-encoded as MP3." },
  ],
  examples: [
    { label: "Boosting a quiet voice recording", input: "quiet voice memo, +8dB gain", output: "a noticeably louder MP3 file" },
  ],
  faqs: [
    { question: "What happens if I boost the volume too much?", answer: "Audio that's already close to peak level can start clipping — a harsh, distorted sound caused by the signal exceeding the maximum representable level. If this happens, try a smaller gain value or use the Audio Normalizer instead." },
    { question: "Is my audio uploaded anywhere?", answer: "No — the volume adjustment runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What's the difference between this and the Audio Normalizer?", answer: "This applies a flat, uniform gain change across the whole file; the Normalizer instead uses loudness-based analysis to even out inconsistent volume throughout a track — better suited when volume varies rather than being uniformly too quiet or loud." },
    { question: "What unit is the gain measured in?", answer: "Decibels (dB), the standard unit for relative loudness in audio engineering — roughly, +6dB doubles perceived loudness and -6dB halves it." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded with the volume adjustment applied." },
  ],
};
