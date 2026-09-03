import type { ToolContent } from "./types";

export const gzipExtractorContent: ToolContent = {
  heroSubtitle: "Decompress a .gz File Using Your Browser's Native API",
  overview: [
    "GZIP is a common single-file compression format, especially on Linux and in web contexts — download archives, log files, and .tar.gz bundles all use it. This tool decompresses a .gz file using your browser's own native decompression API, with no external library needed at all.",
    "Modern browsers include a built-in DecompressionStream API supporting the GZIP format directly — this tool simply pipes your uploaded file through that native stream, which is both fast and requires zero additional code to implement the actual decompression algorithm.",
    "GZIP compresses exactly one file at a time (unlike ZIP, which bundles multiple files), so extraction always produces exactly one output file — if the compressed content was itself a TAR archive (the common .tar.gz combination), you'll get back a .tar file that still needs a second extraction step with the TAR Extractor tool.",
    "Everything happens locally in your browser using a native web platform API — no upload, no library, no server involved at any point.",
  ],
  howItWorks: [
    { title: "Upload your .gz file", description: "The file loads ready for decompression." },
    { title: "Decompression runs natively", description: "Your browser's built-in API handles it, no library needed." },
    { title: "Download the decompressed file", description: "Get back the original, uncompressed file." },
  ],
  examples: [
    { label: "Decompressing a downloaded .gz file", input: "logfile.txt.gz", output: "logfile.txt, fully decompressed" },
  ],
  faqs: [
    { question: "Is my file uploaded anywhere?", answer: "No — decompression uses your browser's native DecompressionStream API, running entirely on your device with no upload." },
    { question: "Why did I get a .tar file back instead of my original files?", answer: "GZIP compresses one file at a time — if that file was itself a TAR archive (the common .tar.gz combination), you'll need a second step: extract the resulting .tar with the TAR Extractor tool." },
    { question: "Does this need any library or plugin?", answer: "No — GZIP decompression is built directly into modern browsers via the DecompressionStream API, so no external code is needed at all." },
    { question: "Can this extract multiple files from one .gz?", answer: "No — GZIP only ever compresses a single file. For multiple files bundled together, look for a .zip or .tar.gz instead." },
    { question: "What if the file isn't actually GZIP-compressed?", answer: "You'll get an error — this tool specifically expects valid GZIP data and won't produce a meaningful result on a file that isn't actually GZIP." },
  ],
};
