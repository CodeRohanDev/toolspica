import type { ToolContent } from "./types";

export const htmlFormatterBeautifierContent: ToolContent = {
  heroSubtitle: "Turn Minified HTML Back Into Readable, Indented Markup",
  overview: [
    "Minified HTML — whether pulled from a production site's view-source, an API response, or a build tool's output — is nearly impossible to read as one dense line. This tool rebuilds proper indentation by tracking each tag's nesting depth, turning compressed markup back into a structure you can actually scan and understand.",
    "It correctly recognizes standard HTML void elements (like `<img>`, `<br>`, `<input>`, `<hr>`) that never get a closing tag, so it doesn't incorrectly increase indentation depth for them the way it would for a normal nested element. Opening tags increase indent depth, closing tags decrease it, and everything else lines up accordingly.",
    "This is a common step when reviewing someone else's minified markup, debugging a template's output structure, or just making a scraped or copied piece of HTML readable enough to actually work with in an editor.",
  ],
  howItWorks: [
    { title: "Paste minified or messy HTML", description: "Any single-line or inconsistently formatted markup." },
    { title: "Structure rebuilds automatically", description: "Nesting depth is tracked tag by tag." },
    { title: "Copy the beautified result", description: "Properly indented, readable HTML." },
  ],
  examples: [
    { label: "Beautifying a minified fragment", input: '<div class="card"><p>Hello</p><img src="a.png"></div>', output: "Properly indented multi-line HTML" },
  ],
  faqs: [
    { question: "Does this handle self-closing void tags like <img> and <br>?", answer: "Yes — standard HTML void elements are recognized correctly and don't cause incorrect indentation depth." },
    { question: "Will beautifying change how my page renders?", answer: "No — only whitespace and line breaks are added; the actual markup and attributes stay identical." },
    { question: "Can this fix broken or unclosed tags?", answer: "No — it assumes reasonably well-formed HTML; severely malformed markup may produce oddly indented output." },
    { question: "Is my HTML uploaded anywhere?", answer: "No — beautification runs entirely in your browser." },
    { question: "Can I minify the result back down afterward?", answer: "Yes — use our HTML Minifier tool to strip the added whitespace back out." },
  ],
};
