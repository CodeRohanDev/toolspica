import type { ToolContent } from "./types";

export const archiveFormatConverterContent: ToolContent = {
  heroSubtitle: "Convert Between ZIP, 7Z, and TAR Formats",
  overview: [
    "Different tools and platforms expect different archive formats — a system that only accepts ZIP, a workflow built around TAR, or wanting 7Z's stronger compression instead of ZIP's simpler structure. This tool extracts a source archive and repacks its contents into whichever target format you choose, using a real 7-Zip build compiled to WebAssembly.",
    "The source archive can be ZIP, 7Z, TAR, RAR, or ISO — this tool auto-detects the format from the file's actual content (not just its extension) using 7-Zip's own format detection, the same reliable detection the desktop application uses.",
    "Target formats are ZIP, 7Z, or TAR — covering the three most commonly needed archive formats for repackaging. Converting to 7Z generally produces the smallest output thanks to its strong LZMA2 compression, while ZIP remains the most universally recognized format.",
    "Everything runs locally: extraction and repackaging both happen entirely inside your browser's WebAssembly sandbox, with the source archive never uploaded anywhere.",
  ],
  howItWorks: [
    { title: "Upload your source archive", description: "ZIP, 7Z, TAR, RAR, or ISO." },
    { title: "Choose your target format", description: "ZIP, 7Z, or TAR." },
    { title: "Download the converted archive", description: "Contents repackaged in your chosen format." },
  ],
  examples: [
    { label: "Converting a RAR to ZIP for wider compatibility", input: "archive.rar", output: "archive.zip with identical contents" },
  ],
  faqs: [
    { question: "What source formats can I convert from?", answer: "ZIP, 7Z, TAR, RAR, or ISO — auto-detected from the file's actual content, not just its extension." },
    { question: "Which target format should I choose?", answer: "ZIP for the most universal compatibility, 7Z for the strongest compression (smallest output), or TAR if a specific Linux/macOS workflow expects it." },
    { question: "Is my archive uploaded anywhere?", answer: "No — extraction and repackaging both happen entirely inside your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Does this preserve folder structure from the source archive?", answer: "Yes — the internal file and folder structure carries over into the converted archive." },
    { question: "Can I convert to GZIP with this tool?", answer: "No — GZIP compresses only a single file at a time, so it doesn't fit this tool's multi-file repackaging model. Use the TAR.GZ Creator tool if you specifically need a .tar.gz output." },
  ],
};
