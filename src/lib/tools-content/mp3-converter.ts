import type { ToolContent } from "./types";

export const mp3ConverterContent: ToolContent = {
  heroSubtitle: "Convert Any Audio File to MP3, Right in Your Browser",
  overview: [
    "MP3 remains the most universally compatible audio format in existence — every device, every player, every platform accepts it without question, which is exactly why converting an audio file to MP3 is such a common need regardless of what format it started as. This tool decodes essentially any audio format your browser's FFmpeg build supports and re-encodes it as MP3, entirely on your own device.",
    "A real FFmpeg build compiled to WebAssembly handles both the decoding and encoding steps, meaning the source format doesn't need to be specifically supported by this tool in advance — whatever FFmpeg's underlying decoder library can read, this can convert, from common formats like WAV and OGG to less common ones your browser might otherwise struggle to play at all.",
    "The output uses VBR (variable bitrate) quality level 2 — a setting that adapts bitrate to the audio's actual complexity moment to moment, generally producing better quality-per-size than a flat constant bitrate would at a comparable file size.",
    "Because everything runs inside your browser's WebAssembly sandbox rather than a remote server, your audio file — voice recordings, personal music, anything sensitive — never leaves your device during conversion.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Conversion runs locally", description: "Audio is decoded and re-encoded as MP3." },
    { title: "Download the MP3", description: "A universally playable audio file." },
  ],
  examples: [
    { label: "Converting an uncommon audio format", input: "less common audio file format", output: "a standard MP3 that plays anywhere" },
  ],
  faqs: [
    { question: "What audio formats can I convert from?", answer: "Essentially any format your browser's FFmpeg build can decode, since the audio is fully decoded before being re-encoded as MP3 — this covers WAV, OGG, FLAC, AAC, and many less common formats." },
    { question: "Is my audio uploaded to a server?", answer: "No — the entire conversion runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What MP3 quality does this produce?", answer: "VBR (variable bitrate) quality level 2, which adapts bitrate to the audio's complexity and generally gives strong quality for its file size compared to a flat bitrate setting." },
    { question: "Will converting to MP3 reduce audio quality?", answer: "If the source is already lossy (like another MP3 or AAC file), converting adds a small amount of additional quality loss from re-encoding — converting from a lossless source (WAV, FLAC) to MP3 involves the expected lossy compression trade-off inherent to the MP3 format itself." },
    { question: "Is there a file size limit?", answer: "No hard limit is enforced, though larger files take longer to process and use more browser memory during conversion." },
  ],
};
