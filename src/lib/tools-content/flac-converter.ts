import type { ToolContent } from "./types";

export const flacConverterContent: ToolContent = {
  heroSubtitle: "Convert Audio to Lossless, Compressed FLAC",
  overview: [
    "FLAC occupies a useful middle ground between WAV and MP3 — genuinely lossless like WAV (every bit of the decoded audio preserved exactly), but compressed like MP3, typically shrinking file size by 40-60% compared to uncompressed WAV with zero quality loss. It's the standard choice for archiving audio when you want both compact storage and perfect fidelity.",
    "A real FFmpeg build compiled to WebAssembly handles the encoding entirely inside your browser using FFmpeg's native FLAC encoder, applying lossless compression to whatever audio you upload after decoding it from its original format.",
    "Unlike MP3 or OGG, FLAC doesn't discard any audio detail during encoding — the compression is purely about reducing redundancy in the data (similar in spirit to how ZIP compresses a file without changing its content), so decoding a FLAC file back to raw samples reproduces the exact original audio bit-for-bit.",
    "Converting from an already-lossy source (like MP3) to FLAC doesn't restore any quality lost during that original encoding — FLAC preserves whatever audio data it's given exactly, but it can't recover detail that was already discarded before it received the file.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Conversion runs locally", description: "Audio is losslessly compressed with the FLAC codec." },
    { title: "Download the FLAC file", description: "Perfect fidelity, at a meaningfully smaller size than WAV." },
  ],
  examples: [
    { label: "Archiving audio losslessly with smaller file size", input: "uncompressed WAV recording", output: "a FLAC file roughly half the size, bit-for-bit identical when decoded" },
  ],
  faqs: [
    { question: "Is FLAC really lossless, like WAV?", answer: "Yes — decoding a FLAC file back to raw audio samples reproduces the exact original data bit-for-bit. The compression only reduces redundancy in how the data is stored, similar to how ZIP compresses a file without altering its content." },
    { question: "How much smaller is FLAC than WAV?", answer: "Typically 40-60% smaller, though the exact reduction depends on the audio content — quieter or simpler audio compresses more than dense, complex material." },
    { question: "Will converting an MP3 to FLAC restore lost quality?", answer: "No — FLAC preserves whatever audio it's given exactly, but it can't recover detail already discarded during a prior lossy encoding like MP3." },
    { question: "Is my audio uploaded to a server?", answer: "No — encoding runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "When should I use FLAC instead of MP3?", answer: "When you want to archive or store audio with zero quality loss but still benefit from meaningful compression compared to uncompressed WAV — MP3 remains the better choice for maximum compatibility and even smaller file sizes when perfect fidelity isn't required." },
  ],
};
