import type { ToolContent } from "./types";

export const sevenZExtractorContent: ToolContent = {
  heroSubtitle: "Extract Files From a 7Z Archive",
  overview: [
    "7Z is a popular archive format prized for its strong compression ratio, produced by the 7-Zip application, but it has no native support in Windows Explorer, macOS Finder, or most browsers. This tool extracts a 7Z archive's contents entirely in your browser using a real 7-Zip build (version 24.09) compiled to WebAssembly — the actual 7-Zip engine, not a reimplementation.",
    "Because this runs the genuine 7-Zip codebase, it correctly handles 7Z's LZMA and LZMA2 compression methods (the format's standard, high-ratio compression algorithms) exactly as the desktop application would, with no compatibility gaps.",
    "Every extracted file lists its name and size, and everything bundles into a single ZIP for download — a more universally recognized format than leaving files loose in your downloads folder.",
    "Everything runs locally inside your browser's WebAssembly sandbox — the archive is never uploaded to a server, and extraction happens entirely on your device.",
  ],
  howItWorks: [
    { title: "Upload your 7Z file", description: "Its contents are extracted automatically." },
    { title: "Review the file list", description: "See every extracted file's name and size." },
    { title: "Download all as ZIP", description: "Every extracted file bundled into one download." },
  ],
  examples: [
    { label: "Opening a 7Z archive without 7-Zip installed", input: "archive.7z", output: "every contained file, downloadable as a ZIP" },
  ],
  faqs: [
    { question: "Is my 7Z file uploaded anywhere?", answer: "No — extraction runs entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Does this support password-protected 7Z files?", answer: "No — encrypted 7Z archives aren't supported by this tool." },
    { question: "How is this different from a fake or partial 7z reader?", answer: "This runs the actual 7-Zip 24.09 codebase compiled to WebAssembly, not a reimplementation — it handles 7Z's LZMA/LZMA2 compression exactly as the real desktop application would." },
    { question: "Why does the download come as a ZIP instead of loose files?", answer: "Browsers can't save a folder structure directly to disk — bundling everything into one ZIP is the practical way to deliver multiple extracted files in one download." },
    { question: "Can I convert the 7Z to a different archive format instead?", answer: "Yes — use the Archive Format Converter tool if you want to repackage the contents as ZIP or TAR instead of just extracting them." },
  ],
};
