import type { ToolContent } from "./types";

export const htmlToMarkdownContent: ToolContent = {
  heroSubtitle: "Convert HTML Into Clean Markdown Syntax",
  overview: [
    "Content that lives as HTML — a scraped webpage, an exported CMS article, a copied email — often needs to become Markdown for a README, a static site generator, or a note-taking app. Converting by hand means manually swapping every `<h1>` for a `#`, every `<strong>` for `**`, and so on. This tool walks the HTML's DOM tree and rebuilds it as equivalent Markdown automatically.",
    "It handles the common structural elements that make up the vast majority of real content: headings (h1-h6), paragraphs, bold and italic text, inline code and code blocks, links, images, blockquotes, horizontal rules, and both ordered and unordered lists — using the browser's own DOMParser to correctly interpret the HTML structure first.",
    "This is genuinely useful for migrating content between platforms, converting a webpage's article body into Markdown for a personal knowledge base, or preparing HTML content for a Markdown-based static site generator without manually retyping formatted text.",
  ],
  howItWorks: [
    { title: "Paste your HTML", description: "Any standard HTML markup with common formatting." },
    { title: "Review the Markdown output", description: "Headings, bold, links, and lists convert automatically." },
    { title: "Copy the result", description: "Ready to paste into any Markdown-based tool." },
  ],
  examples: [
    { label: "Converting a formatted article snippet", input: "<h1>Title</h1><p>Some <strong>bold</strong> text.</p>", output: "# Title\\n\\nSome **bold** text." },
  ],
  faqs: [
    { question: "What HTML elements are supported?", answer: "Headings, paragraphs, bold/italic, inline code, code blocks, links, images, blockquotes, horizontal rules, and ordered/unordered lists — the most common content-formatting elements." },
    { question: "Does it handle tables or complex nested layouts?", answer: "No — tables and other complex layout elements aren't currently converted; this focuses on standard article-style content formatting." },
    { question: "Is my HTML uploaded anywhere?", answer: "No — conversion runs entirely in your browser using the native DOMParser." },
    { question: "Will inline styles or classes carry over?", answer: "No — Markdown has no concept of styling, so visual styling (colors, fonts, custom CSS) is intentionally dropped, keeping only structural formatting." },
    { question: "Can I convert Markdown back to HTML?", answer: "Yes — use our Markdown to HTML tool for the reverse conversion." },
  ],
};
