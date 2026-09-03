import type { ToolContent } from "./types";

export const htmlMinifierContent: ToolContent = {
  heroSubtitle: "Strip Comments and Whitespace From HTML to Reduce File Size",
  overview: [
    "HTML written with readable indentation is great for editing but adds unnecessary bytes to every page load — comments, extra whitespace between tags, and multiple consecutive spaces all get sent to every visitor for no functional benefit. This tool strips all of that out, producing a smaller HTML payload that renders identically.",
    "The minifier removes HTML comments entirely, collapses whitespace between tags down to nothing, and reduces runs of multiple spaces to a single space — safe transformations that don't change how the page actually renders, since HTML doesn't treat whitespace between block-level tags as meaningful content.",
    "This is a lightweight, safe minifier rather than a full HTML-aware minifier like html-minifier-terser — it won't minify inline JavaScript or CSS within `<script>`/`<style>` tags, and it doesn't remove optional closing tags or attribute quotes. For most static pages, it still meaningfully reduces file size with zero risk of breaking rendering.",
  ],
  howItWorks: [
    { title: "Paste your HTML", description: "Any formatted or partially formatted HTML document." },
    { title: "Comments and whitespace strip automatically", description: "See the size reduction percentage live." },
    { title: "Copy the minified result", description: "Ready to deploy as a smaller HTML payload." },
  ],
  examples: [
    { label: "Minifying a formatted page fragment", input: "<div>\\n  <p>Hello   world</p>\\n  <!-- comment -->\\n</div>", output: "<div><p>Hello world</p></div>" },
  ],
  faqs: [
    { question: "Will this break my page's rendering?", answer: "No — it only removes comments and collapses whitespace between tags, transformations that don't affect how HTML actually renders." },
    { question: "Does it minify inline CSS or JavaScript?", answer: "No — content inside <style> and <script> tags is left as-is; use our dedicated CSS Minifier and JS Minifier tools for those separately." },
    { question: "How much size reduction should I expect?", answer: "It varies by how much whitespace and commenting your source has — commonly 10-30% for well-formatted, comment-heavy source HTML." },
    { question: "Is my HTML uploaded anywhere?", answer: "No — minification runs entirely in your browser." },
    { question: "Can I un-minify the result later?", answer: "Use our HTML Formatter / Beautifier tool to re-indent minified HTML back into a readable format." },
  ],
};
