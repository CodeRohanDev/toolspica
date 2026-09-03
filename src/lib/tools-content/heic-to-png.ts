import type { ToolContent } from "./types";

export const heicToPngContent: ToolContent = {
  heroSubtitle: "Convert iPhone HEIC Photos to Lossless PNG",
  overview: [
    "Most HEIC-to-something conversions default to JPG, but PNG is the better target when you need a lossless result — preparing an image for further editing, working with graphics or screenshots saved in HEIC by mistake, or simply wanting zero additional compression applied on top of what the camera already did. This tool decodes a HEIC/HEIF file and re-exports it as a genuine, lossless PNG.",
    "Since browsers can't natively decode HEIC, this runs a real HEIC decoder (libheif, compiled to WebAssembly) directly in your browser to read the actual pixel data — not an approximation — then draws it to a canvas and exports as PNG, which preserves every decoded pixel exactly with no further lossy compression.",
    "A HEIC file typically contains more than one embedded image (a full photo plus a thumbnail); this converts the primary, full-resolution image, giving you the actual photo rather than a low-quality preview.",
    "The trade-off for PNG's lossless output is file size — a PNG will typically be noticeably larger than the equivalent JPG, since HEIC's efficient compression is being replaced with a format that doesn't discard any data. For everyday sharing where file size matters more than pixel-perfect fidelity, HEIC to JPG is usually the better choice; use this one when lossless output specifically matters.",
  ],
  howItWorks: [
    { title: "Upload your HEIC/HEIF file", description: "Select a photo saved in Apple's HEIC format." },
    { title: "Automatic decoding", description: "The image is decoded locally via WebAssembly, no upload involved." },
    { title: "Download the PNG", description: "Get a lossless PNG with every decoded pixel preserved exactly." },
  ],
  examples: [
    { label: "Converting for further editing", input: "IMG_5502.HEIC needing lossless input for an image editor", output: "IMG_5502.png, ready to edit without extra compression loss" },
  ],
  faqs: [
    { question: "Is my photo uploaded anywhere during conversion?", answer: "No — decoding happens entirely in your browser using WebAssembly. Nothing is sent to a server at any point." },
    { question: "Why choose PNG over JPG for this conversion?", answer: "PNG applies no further lossy compression once the HEIC is decoded, making it the better choice when you need pixel-perfect output for further editing — JPG is smaller but discards some detail in the re-encoding." },
    { question: "Why is the resulting PNG so much larger than the original HEIC?", answer: "HEIC uses highly efficient HEVC-based compression; PNG's lossless approach preserves every pixel exactly but doesn't compress nearly as aggressively, so the file size increase is expected, not a bug." },
    { question: "Does this work on HEIF files that aren't from an iPhone?", answer: "Yes — the decoder handles standard HEIF-format files from any compatible source, not just Apple's HEIC-branded photos." },
    { question: "Which embedded image gets converted if my HEIC has more than one?", answer: "The primary, full-resolution photo — not any embedded thumbnail also stored inside the file." },
  ],
};
