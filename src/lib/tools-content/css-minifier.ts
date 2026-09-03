import type { ToolContent } from "./types";

export const cssMinifierContent: ToolContent = {
  heroSubtitle: "Strip Comments and Whitespace From CSS to Reduce File Size",
  overview: [
    "Well-formatted CSS with comments and consistent indentation is great for maintaining a stylesheet, but every one of those bytes gets downloaded by every visitor on every page load. This tool strips comments and collapses unnecessary whitespace around selectors, braces, colons, and semicolons, shrinking the file without changing any actual styling behavior.",
    "The minifier removes CSS comments entirely, tightens spacing around punctuation (`{`, `}`, `:`, `;`, `,`) down to the minimum needed, and removes the final semicolon before a closing brace where it's redundant. These are purely textual transformations that preserve the exact same computed styles.",
    "This is a lightweight, safe minifier — it doesn't merge duplicate selectors, shorten color values, or perform other more aggressive optimizations a build-tool-level minifier like cssnano would. For quick manual minification of a stylesheet before deployment, it still delivers a meaningful size reduction with zero risk to how your styles render.",
  ],
  howItWorks: [
    { title: "Paste your CSS", description: "Any formatted stylesheet." },
    { title: "Comments and whitespace strip automatically", description: "See the size reduction percentage live." },
    { title: "Copy the minified result", description: "Ready to deploy as a smaller stylesheet." },
  ],
  examples: [
    { label: "Minifying a formatted stylesheet", input: ".card {\\n  padding: 16px;\\n  color: #333;\\n}", output: ".card{padding:16px;color:#333}" },
  ],
  faqs: [
    { question: "Will minifying break my styles?", answer: "No — only comments and non-meaningful whitespace are removed; the actual selector and property values stay unchanged." },
    { question: "Does this merge duplicate selectors or shorten colors?", answer: "No — this is a lightweight textual minifier, not a full optimizing minifier. Duplicate rules and color format shortening aren't performed." },
    { question: "How much size reduction should I expect?", answer: "Typically 15-30% for well-commented, indented source CSS, though results vary by how verbose your original formatting is." },
    { question: "Is my CSS uploaded anywhere?", answer: "No — minification runs entirely in your browser." },
    { question: "Does this handle CSS custom properties (variables)?", answer: "Yes — custom property declarations and usage (--variable-name) pass through unaffected by minification." },
  ],
};
