import type { ToolContent } from "./types";

export const pdfHeaderAndFooterAdderContent: ToolContent = {
  heroSubtitle: "Add a Consistent Header and Footer Line Across Every Page",
  overview: [
    "Company names, document titles, confidentiality notices, and version labels often need to appear consistently across every page of a document — a running header identifying the source, a footer noting the current year or a legal disclaimer. When the original source file isn't editable or available, adding this after the fact usually means recreating the whole document in a word processor. This tool adds a header and/or footer line directly to an existing PDF instead.",
    "You provide the header text, the footer text, or both — either field can be left blank if you only need one — and the same text is applied consistently across every page of the document. Both lines are centered horizontally near the top and bottom edges of each page respectively, matching the conventional placement expected in printed and shared documents.",
    "The text is drawn as real vector Helvetica text, measured and centered using its actual rendered width, and placed on top of the existing page content without altering anything underneath. Because it's vector text rather than a rasterized addition, it stays sharp at any zoom level and adds negligible file size.",
    "This is a simple, uniform addition — the same header and footer text on every page, with no support for page-specific variation, running chapter titles, or automatic date insertion. For anything requiring page numbers specifically, the dedicated PDF Page Numbering tool supports position presets and a {n}/{total} format string.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for headers and footers to be added." },
    { title: "Type your header and/or footer text", description: "Fill in either or both fields — blank fields are skipped." },
    { title: "Apply and download", description: "Every page gets the text added at the top and/or bottom." },
  ],
  examples: [
    { label: "Adding a confidentiality footer", input: "Footer: \"Confidential — Internal Use Only\"", output: "every page shows the footer centered at the bottom" },
  ],
  faqs: [
    { question: "Can I add just a header without a footer, or vice versa?", answer: "Yes — leave either field blank. Only the fields you fill in are added to the document." },
    { question: "Is the header/footer text the same on every page, or can it vary?", answer: "The same text is applied uniformly to every page in a single pass — there's no support for page-specific or alternating header/footer text." },
    { question: "Does this add page numbers automatically?", answer: "No — this tool is for static text only. For automatically incrementing page numbers with position and format control, use the dedicated PDF Page Numbering tool instead." },
    { question: "Will the added text overlap with existing page content?", answer: "Text is placed with a fixed margin near the top and bottom edges — if your document already has content very close to those edges, check the result before relying on it for tightly-margined pages." },
    { question: "Can I add a header/footer to a password-protected PDF?", answer: "Not directly — remove the password first using PDF Unlock, then add the header/footer to the resulting file." },
  ],
};
