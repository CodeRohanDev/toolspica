import type { ToolContent } from "./types";

export const audioNormalizerContent: ToolContent = {
  heroSubtitle: "Even Out Volume Automatically Using Loudness Standards",
  overview: [
    "Audio with inconsistent volume — quiet in some sections, loud in others, or simply recorded at a level below what feels natural on playback — benefits from normalization rather than a flat volume boost, since normalization analyzes and evens out perceived loudness across the whole track rather than uniformly scaling everything by the same fixed amount.",
    "This uses FFmpeg's loudnorm filter, which implements the EBU R128 loudness standard — the same measurement standard broadcasters and streaming platforms use to ensure consistent perceived loudness across different content. The target settings used (-16 LUFS integrated loudness, -1.5dB true peak) match the common target for podcasts and general streaming content.",
    "Unlike a simple gain boost (multiplying every sample by the same factor), loudness normalization analyzes the audio's actual perceived loudness characteristics and adjusts accordingly — this generally produces a more natural, professional-sounding result for content with varying volume than manually picking a flat gain value would.",
    "A real FFmpeg build compiled to WebAssembly performs the analysis and normalization entirely inside your browser, re-encoding the result as MP3 with the evened-out loudness applied.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Normalization runs automatically", description: "Loudness is analyzed and evened out using the EBU R128 standard." },
    { title: "Download the normalized file", description: "Consistent volume, re-encoded as MP3." },
  ],
  examples: [
    { label: "Evening out a podcast recording's volume", input: "recording with inconsistent segment volume", output: "an MP3 with more consistent, professional-sounding loudness" },
  ],
  faqs: [
    { question: "How is this different from just boosting the volume?", answer: "A flat volume boost multiplies every sample by the same factor, while normalization analyzes actual perceived loudness across the whole track and adjusts accordingly — better suited to audio where volume varies rather than being uniformly too quiet." },
    { question: "What loudness standard does this target?", answer: "EBU R128, targeting -16 LUFS integrated loudness with a -1.5dB true peak ceiling — the common target used by podcasts and general streaming content, ensuring consistent perceived loudness." },
    { question: "Is my audio uploaded anywhere?", answer: "No — normalization runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will normalizing cause distortion?", answer: "No — the true peak ceiling built into the loudness standard specifically prevents the output from exceeding a safe maximum level, unlike an aggressive flat gain boost which can clip." },
    { question: "What output format does this produce?", answer: "MP3, re-encoded with the loudness normalization applied." },
  ],
};
