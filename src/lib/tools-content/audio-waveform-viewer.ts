import type { ToolContent } from "./types";

export const audioWaveformViewerContent: ToolContent = {
  heroSubtitle: "See the Waveform of Any Audio File",
  overview: [
    "A visual waveform makes an audio file's structure instantly readable in a way listening straight through doesn't — where the loud sections are, where there's silence, roughly how the volume changes across the track — information that's useful for editing, trimming, or just understanding a file before working with it.",
    "This tool decodes an uploaded audio file using the browser's built-in Web Audio API and draws its waveform as a min/max amplitude plot across the full duration, alongside basic file details: duration, sample rate, and channel count.",
    "Decoding happens through the same audio engine your browser uses to actually play audio, so the waveform accurately reflects the real decoded audio data — not an approximation based on file size or bitrate alone.",
  ],
  howItWorks: [
    { title: "Upload an audio file", description: "Choose any common audio format your browser can play." },
    { title: "View the waveform", description: "See the amplitude plotted across the full duration." },
    { title: "Check the file details", description: "Duration, sample rate, and channel count are shown below." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A voice recording with pauses",
      output: "A waveform clearly showing taller peaks during speech and flat sections during silence.",
    },
  ],
  faqs: [
    {
      question: "What audio formats are supported?",
      answer:
        "Any format your browser can decode natively — MP3, WAV, OGG, and AAC/M4A are broadly supported across modern browsers via the Web Audio API.",
    },
    {
      question: "Does the waveform show stereo channels separately?",
      answer:
        "No — the waveform is drawn from the first audio channel only, which is a close visual approximation for most content even when the source file has multiple channels.",
    },
    {
      question: "Can I use this to find the exact silent sections in a recording?",
      answer:
        "It gives a reliable visual approximation of quiet versus loud sections, useful for a rough overview — for precise trim points, pair this with a dedicated audio editing tool.",
    },
    {
      question: "Is my audio file uploaded to a server?",
      answer:
        "No — decoding and rendering happen entirely in your browser using the Web Audio API. Nothing is uploaded anywhere.",
    },
  ],
};
