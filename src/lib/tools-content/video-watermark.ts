import type { ToolContent } from "./types";

export const videoWatermarkContent: ToolContent = {
  heroSubtitle: "Add a Permanent Text or Logo Watermark to a Video",
  overview: [
    "Marking a video as yours before sharing it publicly — a text label, a small logo in the corner — is standard practice for protecting creative work or reinforcing branding. This tool supports both approaches: a text watermark drawn directly onto the frame, or an image logo overlaid at a chosen corner, both baked permanently into the video pixels.",
    "For text watermarks, a real FFmpeg build compiled to WebAssembly uses the drawtext filter with a self-hosted font (Liberation Sans, since the browser sandbox has no system fonts by default), rendering your text with a semi-transparent background box for legibility against any video content behind it. For image logos, the overlay filter composites your uploaded PNG or JPG onto every frame at the position you choose.",
    "Four corner positions are available for either watermark type — bottom-right, bottom-left, top-right, top-left — covering the placements most commonly used in practice, positioned with a consistent margin from the frame edge.",
    "Because the watermark is drawn directly into the video's pixel data during re-encoding, it becomes a permanent, inseparable part of the footage — this is the entire point of a watermark: it can't be cropped, filtered, or edited away without visibly damaging the underlying video content.",
  ],
  howItWorks: [
    { title: "Upload your video", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Choose text or a logo image", description: "Set the content and pick a corner position." },
    { title: "Apply and download", description: "The watermark is burned permanently into every frame." },
  ],
  examples: [
    { label: "Adding a brand name to shared footage", input: "video + \"MyBrand\" text watermark, bottom-right", output: "the same video with the watermark permanently visible" },
  ],
  faqs: [
    { question: "Can the watermark be removed afterward?", answer: "Not without visibly damaging the video — it's drawn directly into the pixel data during re-encoding, which is the entire point of a watermark: it can't be simply cropped or edited away." },
    { question: "Can I use my own logo image instead of text?", answer: "Yes — switch to image mode and upload a PNG or JPG; a PNG with transparency works best so the logo doesn't have an unwanted background box around it." },
    { question: "Is my video uploaded anywhere?", answer: "No — the entire process runs inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What positions are available for the watermark?", answer: "Four corners — bottom-right, bottom-left, top-right, top-left — each positioned with a consistent margin from the frame's edge." },
    { question: "Why does text watermarking need a special font file?", answer: "The WebAssembly sandbox this tool runs in has no system fonts of its own — a font (Liberation Sans, freely licensed) is self-hosted and loaded specifically to make text rendering possible." },
  ],
};
