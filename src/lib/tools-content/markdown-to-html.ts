import type { ToolContent } from "./types";

export const markdownToHtmlContent: ToolContent = {
  heroSubtitle: "Convert Markdown Into Clean, Ready-to-Use HTML",
  overview: [
    "Markdown is fast to write, but eventually most content needs to become actual HTML — for a blog CMS that doesn't natively render Markdown, an email template, or embedding into an existing webpage. This tool converts Markdown text into correctly structured HTML instantly, covering the syntax that makes up the vast majority of everyday Markdown content.",
    "Headings, bold and italic text, inline code and fenced code blocks, links, images, blockquotes, horizontal rules, and both ordered and unordered lists all convert to their semantically correct HTML equivalents (`<h1>`-`<h6>`, `<strong>`, `<em>`, `<code>`, `<pre>`, `<a>`, `<img>`, `<blockquote>`, `<hr>`, `<ul>`/`<ol>`/`<li>`), with consecutive list items correctly grouped into a single list rather than separate ones.",
    "This is a straightforward hand-written converter rather than a full CommonMark-spec implementation — it covers standard, everyday Markdown reliably, but edge cases from the full specification (like nested blockquotes or complex table syntax) aren't supported. For typical README, note, or article-style content, it converts cleanly.",
  ],
  howItWorks: [
    { title: "Write or paste Markdown", description: "Headings, lists, bold, links, and more." },
    { title: "Review the HTML output", description: "Correctly structured, semantic HTML tags." },
    { title: "Copy the result", description: "Ready to embed or paste into a CMS." },
  ],
  examples: [
    { label: "Converting a heading and list", input: "# Title\\n\\n- item one\\n- item two", output: "<h1>Title</h1>\\n<ul><li>item one</li><li>item two</li></ul>" },
  ],
  faqs: [
    { question: "Does this support tables?", answer: "No — table syntax isn't currently supported; this covers standard headings, text formatting, lists, links, images, and code blocks." },
    { question: "Does it handle nested lists?", answer: "Currently lists are handled as flat structures; deeply nested lists may not indent as expected." },
    { question: "Is my Markdown uploaded anywhere?", answer: "No — conversion happens entirely in your browser." },
    { question: "Can I convert HTML back to Markdown?", answer: "Yes — use our HTML to Markdown tool for the reverse conversion." },
    { question: "Is the output safe to insert directly into a page?", answer: "The converter escapes HTML special characters in your source text before applying formatting, reducing the risk of unintended markup injection from plain text content." },
  ],
};
