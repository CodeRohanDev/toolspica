import type { ToolContent } from "./types";

export const markdownPreviewerContent: ToolContent = {
  heroSubtitle: "Write Markdown on the Left, See It Rendered Live on the Right",
  overview: [
    "Writing Markdown without seeing how it actually renders means guessing whether your heading levels, list nesting, and emphasis are coming out right until you paste it somewhere else to check. This tool splits the screen: write Markdown on the left, and watch it render as live, styled HTML on the right, updating with every keystroke.",
    "It uses the same Markdown-to-HTML conversion engine as our standalone converter tool, so what you see previewed here is exactly what you'd get pasting the converted HTML elsewhere. Headings, bold and italic text, links, images, blockquotes, code blocks, and lists all render live with proper styling in the preview pane.",
    "This is useful for drafting a README, writing documentation, or composing any Markdown content where you want to catch formatting mistakes — a heading that didn't nest right, a list that broke apart, an unclosed bold marker — before publishing rather than after.",
  ],
  howItWorks: [
    { title: "Write Markdown on the left", description: "Standard syntax: headings, lists, bold, links." },
    { title: "Watch the live preview on the right", description: "Rendered HTML updates on every keystroke." },
    { title: "Fix formatting issues as you write", description: "Catch mistakes before publishing elsewhere." },
  ],
  examples: [
    { label: "Drafting a README section", input: "## Installation\\n\\nRun `npm install`.", output: "A styled preview showing the heading and inline code" },
  ],
  faqs: [
    { question: "Does the preview match how GitHub or other platforms will render my Markdown?", answer: "It renders standard Markdown syntax accurately for common formatting, though platform-specific extensions (like GitHub's task lists or emoji shortcodes) aren't included." },
    { question: "Is my draft saved anywhere?", answer: "No — content stays local to your browser tab and isn't saved automatically; copy your work before closing the tab." },
    { question: "Can I export the rendered HTML directly?", answer: "This tool is focused on live preview; use our separate Markdown to HTML tool to get a copyable HTML output." },
    { question: "Does it support tables?", answer: "No — table syntax isn't currently rendered in the preview." },
    { question: "Is anything uploaded while I type?", answer: "No — both the editing and preview rendering happen entirely in your browser." },
  ],
};
