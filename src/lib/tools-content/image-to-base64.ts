import type { ToolContent } from "./types";

export const imageToBase64Content: ToolContent = {
  overview: [
    "Converting an image to Base64 turns its binary data into a plain-text string that can be embedded directly inside HTML, CSS, or JSON, rather than existing as a separate file that needs its own network request to load. This is the same encoding technique behind the `data:image/png;base64,...` URIs you've likely seen inside a stylesheet's `background-image` property or an inline `<img src=\"data:...\">` tag.",
    "The main practical benefit is eliminating a separate HTTP request for small, frequently-used images — a small icon, a logo, or a tiny UI graphic embedded directly as Base64 in your CSS or HTML loads immediately as part of that file, with no additional round-trip to fetch a separate image file. This matters most for very small images used repeatedly across a site (icons, sprites) where the overhead of a separate network request can outweigh the image's actual download time.",
    "The tradeoff is real and worth understanding: Base64 encoding increases the data size by roughly 33%, and embedding a large image this way bloats the containing HTML, CSS, or JSON file itself, which can hurt initial page load performance if overused. Base64 embedding is a good fit for small, frequently-reused graphics; for larger photos and images, a normal separate image file (ideally with proper caching headers) almost always performs better overall.",
    "This tool reads your uploaded image file and generates its complete Base64 data URI, including the correct MIME type prefix (like `data:image/png;base64,`), ready to paste directly into your code. It also shows the resulting text length, so you can gauge exactly how much bigger the Base64 representation is compared to the original binary file before deciding whether embedding it is the right call for your specific use case.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Drop in the image file you want to convert." },
    { title: "The Base64 string generates instantly", description: "A complete data URI, including the MIME type, appears automatically." },
    { title: "Copy it into your code", description: "Paste the string directly into an HTML src, CSS background-image, or JSON field." },
  ],
  examples: [
    { label: "Encoding a small icon", input: "16×16 PNG icon (612 bytes)", output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... (816 characters)' },
  ],
  faqs: [
    { question: "Why is the Base64 output so much longer than my original file size?", answer: "Base64 encoding represents binary data using only text-safe characters, which inherently requires about 33% more space than the original binary — this overhead is the necessary cost of making the data safely embeddable as plain text." },
    { question: "Should I Base64-encode all my website's images?", answer: "No — this technique works best for small, frequently-reused graphics like icons, where avoiding an extra network request outweighs the size overhead. For larger photos, a normal separate image file with proper browser caching almost always loads faster overall." },
    { question: "Can I use this Base64 string directly as an <img> tag's src?", answer: "Yes — the generated string is a complete data URI including the correct MIME type prefix, so you can paste it directly into `<img src=\"...\">`, and the browser will render it exactly like a normally-loaded image." },
    { question: "Does Base64 encoding compress my image?", answer: "No — it's purely a format conversion for embedding purposes, not compression. The underlying image data (and its size) stays the same; Base64 just represents that same data using text characters instead of raw binary." },
    { question: "Is there a file size limit for encoding?", answer: "No hard limit is enforced by this tool, but very large images produce enormous Base64 strings that become impractical to embed usefully — this technique is best suited to smaller images by nature of its own tradeoffs." },
  ],
};
