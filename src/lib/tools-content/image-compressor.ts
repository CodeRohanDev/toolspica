import type { ToolContent } from "./types";

export const imageCompressorContent: ToolContent = {
  heroSubtitle: "Shrink Image File Size Without Losing Much Quality",
  overview: [
    "Large image files slow down websites, eat up storage, and make emails and uploads frustrating — often with no visible quality difference between the original and a properly compressed version. Most images, especially photos, carry far more data than the eye can actually distinguish, which is exactly the gap compression exploits.",
    "This tool re-encodes any image as JPEG or WebP with an adjustable quality slider, letting you directly trade off file size against visual fidelity. WebP generally achieves smaller files than JPEG at equivalent visual quality, making it worth trying first if your use case supports it (nearly all modern browsers do).",
    "The before-and-after file size comparison updates instantly as you adjust quality, so you can find the point where file size drops significantly while the image still looks essentially identical — usually somewhere in the 60-80% quality range for photos, though it varies by image content.",
    "This is useful for shrinking images before uploading to a website (faster page loads, better SEO), reducing attachment size for email, saving storage space across large photo collections, and any situation where a smaller file size matters more than pixel-perfect fidelity.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Any common image format.",
    },
    {
      title: "Choose output format and quality",
      description: "JPEG or WebP, with a quality slider from 10% to 100%.",
    },
    {
      title: "Compare and download",
      description: "See the exact before/after size difference, then download the result.",
    },
  ],
  examples: [
    {
      label: "Compressing a photo for web use",
      input: "A 4.2 MB photo at 70% JPEG quality",
      output: "A visually similar 480 KB file — roughly 89% smaller",
    },
  ],
  faqs: [
    {
      question: "What quality setting should I use?",
      answer:
        "70-80% is a strong starting point for photos — it typically cuts file size dramatically with minimal visible quality loss. Go lower (40-60%) for thumbnails or background images where quality matters less, and stay higher (85%+) for images where fine detail is important.",
    },
    {
      question: "Should I choose JPEG or WebP?",
      answer:
        "WebP generally produces smaller files than JPEG at the same visual quality and is supported by all modern browsers, making it the better default for web use. Choose JPEG specifically if you need maximum compatibility with older software or systems that don't support WebP.",
    },
    {
      question: "Why does compression work so well on photos specifically?",
      answer:
        "Photos contain a lot of visual information the human eye can't actually distinguish — subtle color gradations and fine texture detail that compression algorithms are specifically designed to discard first, since removing it has the least visible impact relative to the file size saved.",
    },
    {
      question: "Will compressing an image multiple times keep degrading it?",
      answer:
        "Yes — JPEG and WebP are lossy formats, so each re-compression discards more information, causing cumulative quality loss. Always compress from the original, highest-quality source rather than re-compressing an already-compressed file repeatedly.",
    },
    {
      question: "Is my image uploaded anywhere during compression?",
      answer:
        "No — compression happens entirely in your browser using the Canvas API. The image never leaves your device, which matters for both speed and privacy.",
    },
  ],
};
