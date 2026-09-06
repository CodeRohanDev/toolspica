import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-page-numbering",
  lang: "en",
  title: "Adding Page Numbers to a PDF That Didn't Come With Any",
  description:
    "How to add clean, correctly positioned page numbers to a scanned or merged PDF, including the one formatting trick most people never use.",
  sections: [
    {
      heading: "Why some PDFs end up with no page numbers at all",
      body: [
        "Page numbers usually come for free when you write something in a word processor — they're a checkbox, not a task. The problem shows up in documents that never went through that pipeline: a stack of scanned pages, a PDF exported from a tool with no numbering option, or several separate files merged into one packet where none of the originals were numbered to begin with. The result is a document that's awkward to reference in a meeting or a printed copy — \"turn to page 7\" doesn't work when there's no page 7 printed anywhere.",
        "This is a purely cosmetic-but-functional fix: a numbering tool adds a text layer to an existing PDF without needing the original source file that created it, which matters because for a scanned document, there usually isn't one.",
      ],
    },
    {
      heading: "The format trick almost nobody uses: {n} of {total}",
      body: [
        "Most numbering tools let you pick a position, but the more useful setting is the format string itself. A bare page number (\"7\") tells you where you are; \"Page 7 of 42\" tells you where you are and how much is left, which is meaningfully more useful in a printed handout, a contract, or anything someone will read start to finish without a screen's scroll bar to orient them.",
        "The placeholders that make this work are simple: {n} for the current page and {total} for the total count, combinable however you like — \"{n}/{total}\" for something compact, or a fuller \"Page {n} of {total}\" for something formal. It's a small change that noticeably improves how a printed document feels to read.",
      ],
    },
    {
      heading: "The one setting people forget: the starting number",
      body: [
        "If a document is a continuation of something else — Volume 2 of a report where Volume 1 ended on page 200 — restarting at page 1 is technically correct but practically confusing for anyone flipping between the two. Setting the start number to 201 keeps the numbering continuous across both volumes, which is exactly the kind of detail that makes a multi-part document feel properly put together instead of assembled from parts.",
        "This same setting is useful for a document with an unnumbered cover page or title page you want excluded from the count — number the rest of the document starting from 1 and add the cover separately, or accept the cover as page 1 depending on the convention you're following.",
      ],
    },
    {
      heading: "Where a printed page actually needs its number",
      body: [
        "A PDF you only ever read on a screen barely needs page numbers — scrolling and search cover most of what a number would do. Print changes that completely: a stapled or spiral-bound handout, a legal document with pages that could physically fall out of order, or a printed exam paper all depend on a visible number to stay coherent once they leave the screen. If a document's fate is print or binding, adding numbers before that step is worth the thirty seconds it takes.",
        "It also matters for anything referenced out loud — a facilitator saying \"everyone turn to page 12\" only works if page 12 is actually printed on page 12, which is easy to take for granted until you're holding a document that skips straight from a cover page to unnumbered content.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will adding page numbers cover up any of my existing content?",
      answer:
        "Numbers are placed with a margin near the page edge, which is clear of content on a normal document — but if your PDF already has text or images running very close to that edge, it's worth checking a page or two of the result before relying on it.",
    },
    {
      question: "Can different sections of one PDF use different number formats?",
      answer:
        "Not in a single pass — one format and position applies across the whole document. For a document that genuinely needs different numbering per section, split it first, number each part separately, then merge the results back together.",
    },
    {
      question: "Do I need the original file that created the PDF to add numbers?",
      answer:
        "No — numbering works directly on the PDF itself as a new text layer, which is exactly what makes it useful for scanned documents or merged files that have no single original source anymore.",
    },
  ],
};
