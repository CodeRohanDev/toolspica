import type { ToolContent } from "./types";

export const universalFileCompressorContent: ToolContent = {
  heroSubtitle: "Compress Any File Using Your Browser's Native GZIP",
  overview: [
    "Sometimes you just need to shrink a single file — a large text file, a log, a data export — without the overhead of a full archive tool. This works on any file type using your browser's own built-in GZIP compression, with zero external library needed for the compression itself.",
    "Modern browsers include a native CompressionStream API supporting GZIP directly — this tool pipes your uploaded file through that stream, producing a standard .gz file that any GZIP-compatible tool can decompress, including this site's own GZIP Extractor.",
    "How much a file shrinks depends entirely on its content: text-heavy files (logs, CSVs, plain documents) typically compress significantly, while already-compressed formats (JPG, MP4, PNG, ZIP) barely shrink further at all, since there's little redundancy left for GZIP to exploit.",
    "Everything happens locally in your browser using a native web platform API — no upload, no external library, and the compressed result is ready to download immediately.",
  ],
  howItWorks: [
    { title: "Upload any file", description: "Works on any file type." },
    { title: "Compression runs natively", description: "Your browser's built-in GZIP API handles it." },
    { title: "Download the compressed file", description: "A standard .gz file, ready to share or store." },
  ],
  examples: [
    { label: "Shrinking a large log file", input: "50MB text log", output: "a much smaller .gz file" },
  ],
  faqs: [
    { question: "Why didn't my JPG or MP4 file shrink much?", answer: "Already-compressed formats (JPG, MP4, PNG, ZIP) have little redundancy left for GZIP to exploit, so further compression yields minimal size reduction — this is expected, not a bug." },
    { question: "Is my file uploaded anywhere?", answer: "No — compression uses your browser's native CompressionStream API, running entirely on your device." },
    { question: "What compression format does this use?", answer: "GZIP, a widely-supported single-file compression format — the output opens with this site's GZIP Extractor or any standard GZIP-compatible tool." },
    { question: "Does this work on any file type?", answer: "Yes — GZIP compression is content-agnostic, so it works on any file, though the amount of size reduction varies significantly based on the content." },
    { question: "Can I compress multiple files into one archive instead?", answer: "GZIP compresses one file at a time — use ZIP Creator instead if you need to bundle multiple files together." },
  ],
};
