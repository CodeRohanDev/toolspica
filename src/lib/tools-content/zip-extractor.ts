import type { ToolContent } from "./types";

export const zipExtractorContent: ToolContent = {
  heroSubtitle: "Browse and Download Files From a ZIP Archive",
  overview: [
    "Opening a ZIP file to grab just one or two files inside it usually means fully extracting the whole archive to disk first. This tool reads a ZIP's contents directly in your browser and lists every file inside it, letting you download individual files without extracting the entire archive anywhere.",
    "The ZIP format is parsed with a from-scratch reader supporting both stored (uncompressed) and DEFLATE-compressed entries — DEFLATE decompression uses your browser's own native decompression API, so no external library is needed for the actual decompression work.",
    "Each listed file shows its name and size, and clicking download saves just that one file — useful when you only need a specific document or image out of a larger archive rather than everything it contains.",
    "Everything happens locally: the ZIP file is read and its contents decompressed entirely in your browser, with nothing ever uploaded to a server.",
  ],
  howItWorks: [
    { title: "Upload your ZIP file", description: "Its contents are listed automatically." },
    { title: "Browse the file list", description: "See every file's name and size." },
    { title: "Download what you need", description: "Click any file to download it individually." },
  ],
  examples: [
    { label: "Grabbing one file from a large ZIP", input: "50-file ZIP archive", output: "download just the one file you actually need" },
  ],
  faqs: [
    { question: "Is my ZIP file uploaded anywhere?", answer: "No — the archive is read and decompressed entirely in your browser using a from-scratch ZIP reader and your browser's native decompression API." },
    { question: "Does this support password-protected ZIP files?", answer: "No — for an encrypted ZIP, use the ZIP Password Remover tool first if you know the password." },
    { question: "Can I download all files at once instead of one at a time?", answer: "This tool is built for browsing and downloading individual files — if you need everything extracted at once, most operating systems can extract a ZIP natively without any tool." },
    { question: "What ZIP compression methods are supported?", answer: "Both stored (uncompressed) and standard DEFLATE-compressed entries, covering the overwhelming majority of real-world ZIP files." },
    { question: "Does this work on nested folders inside the ZIP?", answer: "Yes — files inside folders are listed with their full path, so you can see the archive's structure." },
  ],
};
