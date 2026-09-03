import type { ToolContent } from "./types";

export const aacConverterContent: ToolContent = {
  heroSubtitle: "Convert Audio to AAC (.m4a), Apple's Default Format",
  overview: [
    "AAC is the format Apple devices, iTunes, and Apple Music use by default, and it generally achieves better audio quality than MP3 at the same bitrate thanks to a more modern encoding design. This tool converts any audio your browser's FFmpeg build can decode into AAC, packaged in the standard .m4a container Apple software expects.",
    "A real FFmpeg build compiled to WebAssembly performs the encoding entirely inside your browser using FFmpeg's native AAC encoder at 192kbps, a bitrate that comfortably preserves strong audio quality for both spoken word and music content.",
    "The output uses the .m4a file extension rather than raw .aac, since .m4a is the standard container Apple's own software and most modern players expect when working with AAC audio — this ensures the file behaves correctly when imported into iTunes/Music or transferred to an Apple device.",
    "AAC's efficiency advantage over MP3 is most noticeable at lower bitrates; at higher bitrates like the 192kbps used here, both formats sound very close to transparent for most listeners, so the main practical reason to choose AAC specifically is compatibility with Apple's ecosystem and software.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Conversion runs locally", description: "Audio is encoded as AAC at 192kbps." },
    { title: "Download the .m4a file", description: "Ready for iTunes, Apple Music, or any AAC-compatible player." },
  ],
  examples: [
    { label: "Preparing audio for an Apple device", input: "audio file needed in Apple's default format", output: "an .m4a (AAC) file ready to import" },
  ],
  faqs: [
    { question: "Why does the output use .m4a instead of .aac?", answer: ".m4a is the standard container format Apple's own software (iTunes/Music) and most modern players expect for AAC audio — using it ensures the file is recognized and behaves correctly when imported." },
    { question: "Is AAC actually better than MP3?", answer: "AAC generally achieves better quality per bitrate than MP3, especially at lower bitrates — at higher bitrates like the 192kbps used here, the practical difference is minor for most listeners, and compatibility considerations often matter more than the technical quality edge." },
    { question: "Is my audio uploaded to a server?", answer: "No — encoding runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What bitrate does this use?", answer: "192kbps, a setting that comfortably preserves strong audio quality for both spoken word and music." },
    { question: "Will this play on non-Apple devices too?", answer: "Yes — AAC is broadly supported well beyond just Apple's ecosystem, including most modern phones, browsers, and media players, though MP3 remains slightly more universally recognized by the oldest or simplest devices." },
  ],
};
