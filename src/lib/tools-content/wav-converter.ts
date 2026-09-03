import type { ToolContent } from "./types";

export const wavConverterContent: ToolContent = {
  heroSubtitle: "Convert Any Audio File to Lossless WAV",
  overview: [
    "WAV stores audio completely uncompressed — every sample exactly as decoded, with no lossy encoding applied at all. This makes it the format of choice whenever a downstream tool (an audio editor, a voice analysis pipeline, certain professional software) specifically expects lossless input rather than a compressed format like MP3. This tool converts any audio file your browser's FFmpeg build can decode into WAV.",
    "A real FFmpeg build compiled to WebAssembly handles the decoding and re-encoding entirely inside your browser, outputting standard 16-bit PCM audio — the most broadly compatible WAV variant, readable by essentially any software that accepts WAV files at all.",
    "The trade-off for WAV's lossless guarantee is file size: since nothing is compressed, a WAV file is typically many times larger than an equivalent MP3 or OGG file of the same audio — this is expected and inherent to the format, not something a conversion setting can avoid.",
    "Converting a file that started as a lossy format (MP3, AAC) to WAV doesn't add back any quality that was already lost during the original lossy encoding — WAV simply avoids introducing further loss beyond that point, rather than reversing prior compression.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Any format your browser's FFmpeg build can decode." },
    { title: "Conversion runs locally", description: "Audio is decoded and re-encoded as uncompressed WAV." },
    { title: "Download the WAV", description: "Lossless 16-bit PCM audio, ready for further processing." },
  ],
  examples: [
    { label: "Preparing audio for an editing tool", input: "compressed audio file", output: "an uncompressed WAV file ready for lossless editing" },
  ],
  faqs: [
    { question: "Why is the WAV file so much larger than my original?", answer: "WAV stores audio completely uncompressed, while most other formats (MP3, OGG, AAC) apply compression to reduce file size — the larger size is the direct, expected cost of WAV's lossless, uncompressed nature." },
    { question: "Will converting a lossy file (like MP3) to WAV restore lost quality?", answer: "No — quality already lost during the original lossy encoding can't be recovered. Converting to WAV just avoids introducing any further compression loss beyond that point." },
    { question: "Is my audio uploaded to a server?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What bit depth does the output WAV use?", answer: "Standard 16-bit PCM, the most broadly compatible WAV variant, readable by essentially any software that supports WAV files." },
    { question: "What formats can I convert from?", answer: "Any audio format your browser's FFmpeg build can decode, since the source is fully decoded before being re-encoded as WAV." },
  ],
};
