import type { ToolContent } from "./types";

export const audioSpectrogramViewerContent: ToolContent = {
  heroSubtitle: "Watch an Audio File's Frequency Content Live",
  overview: [
    "A waveform shows volume over time, but it can't show which frequencies are actually present at any given moment — a spectrogram fills that gap, revealing bass, midrange, and treble content as it changes throughout a track, useful for spotting frequency patterns a plain waveform hides entirely.",
    "This tool plays an uploaded audio file while drawing a live, scrolling spectrogram — colors represent frequency energy (cooler colors for quiet, warmer colors for loud) at each moment, building left to right as the track plays, using the browser's built-in real-time frequency analysis.",
    "Because this generates the spectrogram live during playback using the Web Audio API's built-in analyser rather than a slower full-track offline calculation, you see and hear the audio simultaneously — press play and watch the frequency pattern build in real time alongside what you're hearing.",
  ],
  howItWorks: [
    { title: "Upload an audio file", description: "Choose any audio file your browser can play." },
    { title: "Press play", description: "The spectrogram builds live as the audio plays." },
    { title: "Read the colors", description: "Warmer colors indicate more energy at that frequency." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A song with a bass drop",
      output: "A visible surge of warm color in the lower frequency band exactly when the bass hits.",
    },
  ],
  faqs: [
    {
      question: "Does this generate a spectrogram for the whole track at once?",
      answer:
        "No — the spectrogram builds live as the audio plays, scrolling in real time rather than pre-computing the entire track's frequency content upfront.",
    },
    {
      question: "What do the colors represent?",
      answer:
        "A heat-map scale from cool (blue, low energy) through warm (yellow and red, high energy) — vertical position represents frequency, with higher frequencies toward the top.",
    },
    {
      question: "Can I pause and see the current frame frozen?",
      answer:
        "Yes — pausing playback stops the spectrogram from advancing, leaving the current visual frozen until you resume.",
    },
    {
      question: "Is my audio file uploaded to a server?",
      answer:
        "No — playback and analysis happen entirely in your browser using the Web Audio API. Nothing is uploaded anywhere.",
    },
  ],
};
