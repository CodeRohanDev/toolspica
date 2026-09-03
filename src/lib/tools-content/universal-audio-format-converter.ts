import type { ToolContent } from "./types";

export const universalAudioFormatConverterContent: ToolContent = {
  heroSubtitle: "One Tool for Converting Between Any Audio Format",
  overview: [
    "Rather than needing a separate dedicated tool for every specific format pair (MP3 to WAV, WAV to OGG, OGG to FLAC, and so on), this tool covers all of the common audio format conversions from one interface — pick your source file, choose the target format, and get the converted result.",
    "A real FFmpeg build compiled to WebAssembly handles the decoding and encoding entirely inside your browser, supporting five common output formats: MP3 for general compatibility, WAV for uncompressed lossless output, OGG for the open Vorbis codec, FLAC for lossless compression, and AAC (.m4a) for Apple's ecosystem — each encoded with settings appropriate to that specific format rather than one generic setting applied everywhere.",
    "The source format doesn't need to match any specific list, since FFmpeg decodes whatever audio format you upload before re-encoding it into your chosen target — this makes the tool genuinely universal on the input side, not just flexible on the output side.",
    "This is the most general-purpose audio conversion tool on the site — for a specific, named format pair (like MP3 to WAV specifically), the dedicated tools for that pair exist too and work identically, just with the target format already chosen for you.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Choose your target format", description: "MP3, WAV, OGG, FLAC, or AAC." },
    { title: "Convert and download", description: "The re-encoded file in your chosen format." },
  ],
  examples: [
    { label: "Converting to a specific target format", input: "audio file, FLAC selected as output", output: "a losslessly-compressed FLAC file" },
  ],
  faqs: [
    { question: "What formats can I convert between?", answer: "Any input format your browser's FFmpeg build can decode, converting to any of five output formats: MP3, WAV, OGG, FLAC, or AAC (.m4a)." },
    { question: "Is my audio uploaded to a server?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "How does this differ from the dedicated format-pair tools?", answer: "It works identically to tools like MP3 to WAV or WAV to MP3, just with the target format selectable from a dropdown rather than fixed — useful when you want one tool that covers every conversion rather than several separate ones." },
    { question: "Which format should I choose?", answer: "MP3 for general sharing and compatibility, WAV for lossless uncompressed output, FLAC for lossless with meaningful compression, OGG for an open patent-free alternative, or AAC specifically for Apple's ecosystem." },
    { question: "Does converting between lossy formats compound quality loss?", answer: "Yes — converting from one lossy format (like MP3) to another lossy format (like OGG) compounds the quality loss from both encoding passes, an inherent property of lossy compression rather than something specific to this tool." },
  ],
};
