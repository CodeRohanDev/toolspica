import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-markdown",
  lang: "en",
  title: "Turning a PDF Into Clean Markdown Without Retyping Everything",
  description:
    "How PDF-to-Markdown conversion actually figures out headings from a format that has no concept of them — and when it won't work well.",
  sections: [
    {
      heading: "The retyping problem nobody enjoys",
      body: [
        "You've got a PDF — a report, a spec, an old README exported years ago — and you need its content in Markdown for a docs site, a note-taking app, or a README file. Copy-pasting from a PDF viewer usually produces a wall of text with the formatting stripped and line breaks in strange places, leaving you to manually add back headings and structure by hand. For anything longer than a page, that's genuinely tedious work for something that should be automatic.",
        "A PDF-to-Markdown converter exists to skip that retyping entirely — it reads the text and rebuilds a reasonable structural approximation automatically.",
      ],
    },
    {
      heading: "PDF has no headings — so how does this guess where they are?",
      body: [
        "This is the part worth understanding, because it explains both what works well and what doesn't: a PDF file has no built-in concept of \"this is a heading\" or \"this is a paragraph\" — it only knows where each piece of text sits on the page and what font size it's drawn at. A converter has to infer structure from that alone, and the reliable signal available is font size: text noticeably larger than the page's median size gets treated as a heading, everything else becomes a plain paragraph.",
        "This is exactly how a human skims an unfamiliar document too — bigger text reads as \"more important,\" which is why the heuristic actually works reasonably well on documents that were designed with a normal visual hierarchy.",
      ],
    },
    {
      heading: "Where this genuinely struggles",
      body: [
        "A document where every line uses roughly the same font size — no visually distinct titles or section headers — gives the converter nothing to work with, so you'll get a Markdown file that's technically correct but flat: every line becomes a plain paragraph with no heading structure at all. Similarly, a scanned PDF (an image of text rather than actual embedded text data) produces nothing, since there's no text layer to extract in the first place — that needs OCR first, not this tool.",
        "Bold or italic emphasis within a paragraph also doesn't carry over — only the heading-versus-paragraph structure is inferred, so a document relying heavily on inline emphasis rather than heading hierarchy will lose that nuance in the conversion.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will this correctly identify every heading in my document?",
      answer:
        "It works best on documents with a clear visual hierarchy — titles and section headers noticeably larger than body text. A document with uniform font sizes throughout won't produce any heading structure, since font size is the only signal the tool has to work from.",
    },
    {
      question: "Can this convert a scanned PDF to Markdown?",
      answer:
        "No — it relies on the PDF's embedded text layer. A scanned image with no underlying text data will produce no output; run it through an OCR tool first to get an actual text layer to convert.",
    },
    {
      question: "Why is there a horizontal rule between sections in the output?",
      answer:
        "Markdown has no built-in concept of pages, so a horizontal rule marks where one PDF page ends and the next begins in the converted output, keeping the original page boundaries visible.",
    },
  ],
};
