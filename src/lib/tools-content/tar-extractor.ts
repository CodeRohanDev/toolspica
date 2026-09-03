import type { ToolContent } from "./types";

export const tarExtractorContent: ToolContent = {
  heroSubtitle: "Extract Files From a TAR Archive",
  overview: [
    "TAR archives are common on Linux and macOS for bundling files together (often before GZIP compression, as .tar.gz), but Windows and many casual tools have no built-in way to open one. This tool extracts a TAR archive's contents entirely in your browser using a real 7-Zip build compiled to WebAssembly, the same engine behind the desktop 7-Zip application.",
    "Every file inside the archive is listed with its size once extraction completes, and all extracted files bundle together into a single ZIP for download — a more universally recognized format than leaving files loose, and convenient for grabbing everything in one file.",
    "This handles standard uncompressed TAR archives — for a compressed .tar.gz file, decompress it first with the GZIP Extractor tool (or the Archive Format Converter), then extract the resulting .tar here.",
    "Everything runs locally: the archive is read and extracted entirely inside your browser's WebAssembly sandbox, with nothing uploaded to a server.",
  ],
  howItWorks: [
    { title: "Upload your TAR file", description: "Its contents are extracted automatically." },
    { title: "Review the file list", description: "See every extracted file's name and size." },
    { title: "Download all as ZIP", description: "Every extracted file bundled into one download." },
  ],
  examples: [
    { label: "Opening a Linux TAR archive on Windows", input: "backup.tar", output: "every contained file, downloadable as a ZIP" },
  ],
  faqs: [
    { question: "Is my TAR file uploaded anywhere?", answer: "No — extraction runs entirely in your browser using a real 7-Zip build compiled to WebAssembly." },
    { question: "Does this handle .tar.gz files directly?", answer: "No — decompress the GZIP layer first with the GZIP Extractor tool, then extract the resulting plain .tar file here, or use Archive Format Converter to do both in one step." },
    { question: "Why does the download come as a ZIP instead of loose files?", answer: "Browsers can't save a folder structure directly to disk — bundling everything into one ZIP is the practical way to hand back multiple extracted files in a single download." },
    { question: "What's the difference between TAR and ZIP?", answer: "TAR simply concatenates files together with no compression of its own (compression is typically applied afterward, as with .tar.gz), while ZIP combines bundling and compression into one format." },
    { question: "Are file permissions or ownership preserved?", answer: "No — only file names, paths, and content are extracted; Unix file permissions and ownership metadata stored in the TAR aren't carried over to the ZIP output." },
  ],
};
