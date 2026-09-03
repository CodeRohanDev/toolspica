import type { ToolContent } from "./types";

export const pngToJpgContent: ToolContent = {
  overview: [
    "PNG and JPG solve different problems, and converting between them means trading off different strengths. PNG uses lossless compression and supports full transparency (an alpha channel), which makes it the right choice for screenshots, logos, icons, and graphics with sharp edges or text — but that lossless quality comes at the cost of much larger file sizes for photographic images. JPG uses lossy compression tuned specifically for photographs, achieving dramatically smaller files for photo-like content, at the cost of not supporting transparency at all and introducing some compression artifacts.",
    "Converting a PNG to JPG is exactly the right move when a PNG is being used to store an actual photograph rather than graphics with sharp edges or transparency — a huge number of PNGs floating around the web are photos saved in the wrong format, taking up far more space than necessary. This tool draws your PNG onto a canvas and re-exports it as JPEG at a quality level you control, typically shrinking photographic images significantly.",
    "Because JPG has no concept of transparency, any transparent areas in your source PNG need to be filled with a solid color before conversion — otherwise they'd default to black, which usually isn't what you want. This tool lets you pick that background fill color (white by default, the most common choice), applied underneath your image before the JPEG is generated, so transparent regions come out as your chosen color instead of an unexpected black or white you didn't choose.",
    "The quality slider directly controls the tradeoff between file size and visual fidelity — higher quality preserves more detail at a larger file size, while lower quality shrinks the file further at the cost of visible compression artifacts (blockiness, especially around sharp edges or text, which is exactly why JPG is a poor choice for graphics with hard edges in the first place).",
  ],
  howItWorks: [
    { title: "Upload your PNG", description: "Drop in the PNG file you want converted." },
    { title: "Choose a background color and quality", description: "Pick a fill color for any transparent areas, and set the JPEG quality." },
    { title: "Download your JPG", description: "The converted file, with a before/after size comparison, is ready to save." },
  ],
  examples: [
    { label: "Converting a photo saved as PNG", input: "2.4 MB PNG photo", output: "310 KB JPG at 90% quality — same visual quality, ~87% smaller" },
  ],
  faqs: [
    { question: "Why did my transparent background turn into a solid color?", answer: "JPG doesn't support transparency at all, so any transparent pixels have to become some solid color during conversion. Use the background color picker to choose exactly what that color should be, rather than leaving it to an unexpected default." },
    { question: "Will converting to JPG make my image blurry?", answer: "At high quality settings (85% and above), the difference is usually imperceptible for photographs. Lower quality settings trade visible detail for smaller file size — for graphics with sharp edges or text, this tradeoff is much more noticeable than for photos, which is part of why PNG remains the better choice for that kind of content." },
    { question: "Should I convert a screenshot or logo to JPG?", answer: "Generally no — screenshots, logos, and graphics with sharp edges or text compress poorly with JPG's lossy algorithm and often end up both larger and blurrier than the original PNG. JPG conversion is best reserved for actual photographs." },
    { question: "What quality setting should I use?", answer: "85-92% is a reasonable default that balances file size and visual quality for most photos. Go higher (95%+) for images you'll edit further or print, and lower (60-75%) when file size matters more than perfect fidelity, like web thumbnails." },
    { question: "Does this upload my image to a server?", answer: "No — the entire conversion happens locally in your browser using the canvas API. Your image is never uploaded anywhere." },
  ],
};
