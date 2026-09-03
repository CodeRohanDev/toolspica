import type { ToolContent } from "./types";

export const heicToJpgContent: ToolContent = {
  heroSubtitle: "Convert iPhone HEIC Photos to Universally-Supported JPG",
  overview: [
    "HEIC (High Efficiency Image Container) has been the default photo format on iPhones since iOS 11, and while it compresses noticeably better than JPEG at the same quality, it causes a steady stream of small frustrations: many Windows programs, websites, and older devices simply can't open it, and neither Chrome nor Firefox can display a HEIC file directly. This tool decodes HEIC/HEIF files and re-exports them as JPG, the format virtually everything accepts.",
    "Since browsers have no native ability to decode HEIC, this works by running a real HEIC decoder (libheif, the same underlying library used by many desktop photo tools) compiled to WebAssembly and executed directly in your browser — the actual image data is decoded pixel-by-pixel on your device, not approximated or faked, then drawn to a canvas and re-encoded as a standard JPEG.",
    "A HEIC file from an iPhone typically contains more than one image internally — the full-resolution photo plus an embedded thumbnail — and this tool converts the primary, full-resolution image, so you get the actual photo at its original quality rather than a low-res preview.",
    "Because this is a genuine decode rather than a server-side conversion, nothing about your photo is uploaded anywhere — the entire process, from reading the HEIC bytes to producing the final JPG, happens locally using WebAssembly.",
  ],
  howItWorks: [
    { title: "Upload your HEIC/HEIF file", description: "Select a photo saved in Apple's HEIC format." },
    { title: "Automatic decoding", description: "The image is decoded locally via WebAssembly, no upload involved." },
    { title: "Download the JPG", description: "Get a standard JPG that opens anywhere." },
  ],
  examples: [
    { label: "Converting an iPhone photo", input: "IMG_4821.HEIC from an iPhone camera roll", output: "IMG_4821.jpg, openable on any device or website" },
  ],
  faqs: [
    { question: "Is my photo uploaded anywhere during conversion?", answer: "No — decoding happens entirely in your browser using WebAssembly. Your HEIC file and the resulting JPG never leave your device." },
    { question: "Why can't my browser just open a HEIC file directly?", answer: "HEIC uses HEVC-based image compression that neither Chrome nor Firefox implements natively for display, unlike JPEG or PNG — a dedicated decoder like the one this tool uses is required to read the actual pixel data." },
    { question: "Will I lose quality converting from HEIC to JPG?", answer: "Some quality loss is inherent to re-encoding into JPEG's lossy format, but at the 92% quality used here, the difference from the HEIC original is minimal and visually negligible for typical photos." },
    { question: "My HEIC file has multiple images inside it — which one gets converted?", answer: "The primary, full-resolution image is converted — HEIC files from cameras often bundle an embedded thumbnail alongside the main photo, and this tool uses the full-quality version, not the thumbnail." },
    { question: "Does this work on HEIF files that aren't from an iPhone?", answer: "Yes — HEIC is Apple's specific naming for HEIF-format photos, but the underlying decoder handles standard HEIF files from any source using compatible encoding." },
  ],
};
