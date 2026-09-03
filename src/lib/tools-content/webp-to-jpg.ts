import type { ToolContent } from "./types";

export const webpToJpgContent: ToolContent = {
  overview: [
    "WebP is a modern image format developed by Google that generally achieves smaller file sizes than both JPEG and PNG at comparable visual quality, and virtually every modern browser supports it — which is exactly why so many websites now serve WebP images by default. The catch is that plenty of software outside the browser still doesn't handle WebP well: some older image editors, certain document and presentation tools, some social platforms' upload forms, and various legacy systems either reject WebP files outright or handle them unreliably.",
    "Converting WebP to JPG solves that compatibility gap directly. JPG remains the most universally supported photo format across virtually every piece of software, platform, and device ever made, which makes it the safe choice when you've downloaded a WebP image from a website and need to use it somewhere that specifically expects a JPG — uploading to an older system, inserting into a document, or sharing with someone whose software doesn't recognize the newer format.",
    "WebP supports transparency (an alpha channel), similar to PNG, which JPG cannot represent at all. This tool handles that exactly the way the PNG-to-JPG converter does: any transparent areas in your source WebP are filled with a background color you choose (white by default) before the JPEG is generated, so you get a predictable, clean result rather than an unexpected black background where transparency used to be.",
    "The quality slider controls the same fundamental tradeoff as any JPEG export: higher settings preserve more visual detail at a larger file size, lower settings shrink the file further at the cost of visible compression artifacts. Since you're converting from one already-compressed format to another, be aware that this is a second round of lossy compression stacked on the first — for the best possible quality, use a high quality setting here.",
  ],
  howItWorks: [
    { title: "Upload your WebP image", description: "Drop in the .webp file you want converted." },
    { title: "Set background color and quality", description: "Choose a fill for transparent areas and your preferred JPEG quality." },
    { title: "Download your JPG", description: "The converted, universally-compatible JPG is ready to save." },
  ],
  examples: [
    { label: "Converting a downloaded web image", input: "photo.webp", output: "photo.jpg, compatible with virtually any software" },
  ],
  faqs: [
    { question: "Why would I need to convert away from WebP at all, if it's a better format?", answer: "WebP is genuinely efficient and well-supported in browsers, but plenty of software outside the browser — older editors, some document tools, certain upload forms — still doesn't handle it reliably. Converting to JPG trades some of WebP's efficiency for near-universal compatibility." },
    { question: "Will the converted JPG be larger than the original WebP?", answer: "Often yes, at equivalent visual quality — WebP's compression algorithm is generally more efficient than JPEG's, so converting frequently results in a file that's somewhat larger for the same level of visual quality." },
    { question: "What happens to transparency in my WebP file?", answer: "Since JPG can't represent transparency at all, any transparent areas are filled with the background color you choose before conversion — pick white, black, or any color that matches where the image will be used." },
    { question: "Can all browsers create WebP files, or only read them?", answer: "Support for WebP encoding (creating WebP files, as the JPG to WebP tool does) varies slightly more across browsers and versions than support for simply displaying WebP images — for this conversion direction (reading WebP), support is broad and reliable across all current major browsers." },
    { question: "Is my image uploaded anywhere during this conversion?", answer: "No — everything happens locally in your browser using the canvas API. Your WebP file is never sent to a server." },
  ],
};
