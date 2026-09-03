import type { ToolContent } from "./types";

export const oggConverterContent: ToolContent = {
  heroSubtitle: "Convert Audio to the Open Vorbis (OGG) Format",
  overview: [
    "OGG Vorbis is an open, patent-free audio codec that generally achieves better quality per file size than MP3 at equivalent bitrates, and it's the default or preferred format across a range of open-source software, games, and platforms that specifically favor unencumbered formats. This tool converts any audio your browser's FFmpeg build can decode into OGG.",
    "A real FFmpeg build compiled to WebAssembly performs the encoding entirely inside your browser using the libvorbis encoder at a quality setting (level 5) tuned for a strong balance of fidelity and file size, appropriate for general-purpose audio conversion.",
    "Being open and patent-free means Vorbis carries none of the licensing considerations historically associated with MP3 and AAC — a meaningful factor for open-source projects and platforms that specifically choose formats without those encumbrances.",
    "Despite Vorbis's technical advantages, MP3 remains more universally recognized by consumer devices and simpler players — OGG is the better choice specifically when targeting software or platforms that support it well, rather than as a universal default replacement for MP3.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Conversion runs locally", description: "Audio is encoded with the open Vorbis codec." },
    { title: "Download the OGG file", description: "An efficient, patent-free audio file." },
  ],
  examples: [
    { label: "Converting for open-source software", input: "audio file needed in OGG for a game or app", output: "an OGG Vorbis file ready to use" },
  ],
  faqs: [
    { question: "Why would I choose OGG over MP3?", answer: "Vorbis generally achieves better quality per file size than MP3 at equivalent bitrates and is open and patent-free — it's the preferred or required format for many open-source projects, games, and platforms." },
    { question: "Is my audio uploaded to a server?", answer: "No — encoding runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Will OGG play on every device?", answer: "Less universally than MP3 — while broadly supported by modern browsers and many players, some older or simpler consumer devices don't recognize OGG the way they do MP3." },
    { question: "What quality setting does this use?", answer: "Vorbis quality level 5, tuned for a strong general-purpose balance between file size and audio fidelity." },
    { question: "What formats can I convert from?", answer: "Any audio format your browser's FFmpeg build can decode, since the source is fully decoded before being re-encoded to OGG." },
  ],
};
