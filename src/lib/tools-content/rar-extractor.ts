import type { ToolContent } from "./types";

export const rarExtractorContent: ToolContent = {
  heroSubtitle: "Extract Files From a RAR Archive",
  overview: [
    "RAR is a widely-used archive format (created by WinRAR) that browsers and most operating systems can't open natively. This tool extracts a RAR archive's contents entirely in your browser using a real 7-Zip build compiled to WebAssembly, which includes native RAR decompression support for both legacy RAR4 and the newer RAR5 format.",
    "Verified directly against real RAR archives in both format versions, extraction correctly recovers the original file content byte-for-byte — this isn't a partial or best-effort RAR reader, it's the same decompression logic used by mainstream archive tools.",
    "Every extracted file lists its name and size, with everything bundled into a single ZIP for download — a more universally recognized format for handling multiple extracted files in one go.",
    "Multi-volume RAR sets (an archive split across several .rar/.r00/.r01 files) and password-protected archives aren't supported — this handles single-file, unencrypted RAR archives, which covers the large majority of RAR files encountered day to day.",
  ],
  howItWorks: [
    { title: "Upload your RAR file", description: "Its contents are extracted automatically." },
    { title: "Review the file list", description: "See every extracted file's name and size." },
    { title: "Download all as ZIP", description: "Every extracted file bundled into one download." },
  ],
  examples: [
    { label: "Opening a RAR archive without WinRAR installed", input: "files.rar", output: "every contained file, downloadable as a ZIP" },
  ],
  faqs: [
    { question: "Is my RAR file uploaded anywhere?", answer: "No — extraction runs entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Does this support both RAR4 and RAR5?", answer: "Yes — verified directly against real archives in both formats, with correct byte-for-byte extraction." },
    { question: "Does this support multi-volume RAR sets?", answer: "No — an archive split across multiple .rar/.r00/.r01 files isn't supported; only single-file RAR archives extract correctly here." },
    { question: "Does this support password-protected RAR files?", answer: "No — encrypted RAR archives aren't supported by this tool." },
    { question: "Why does the download come as a ZIP instead of loose files?", answer: "Browsers can't save a folder structure directly to disk — bundling extracted files into one ZIP is the practical way to deliver them in a single download." },
  ],
};
