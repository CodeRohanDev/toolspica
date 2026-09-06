import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-header-and-footer-adder",
  lang: "en",
  title: "Add a Confidentiality Notice or Company Header to a PDF You Can't Edit",
  description:
    "How to add a consistent header or footer line to every page of an existing PDF when the original source file isn't available.",
  sections: [
    {
      heading: "The problem with a PDF you can only read",
      body: [
        "You've got a finished PDF — maybe someone else made it, maybe the original source document is gone, maybe it's a scan — and now you need every page to carry something consistent: a confidentiality notice, a company name, a document title, a version label, a copyright line. Normally you'd add that in whatever software created the original document and re-export, but that's not an option here. Recreating a multi-page document from scratch in a word processor just to add one line of running text is a wildly disproportionate amount of work for what should be a small addition.",
        "This comes up constantly with contracts being redistributed, reports being repackaged under a different department's letterhead, and any document where the content is finished but the finishing touches — labeling, branding, disclaimers — still need to be applied.",
      ],
    },
    {
      heading: "How adding text to an existing PDF actually works",
      body: [
        "This works by drawing new vector text directly onto each existing page, on top of whatever content is already there, without touching or altering anything underneath. Because it's real vector text (not a rendered image), it stays sharp at any zoom level and barely adds to the file size — a stark contrast to any approach that would rasterize pages just to stamp text onto them.",
        "The header and footer text you provide is centered horizontally and measured using its actual rendered width before being positioned, so it lands centered regardless of how long the text is — a short footer like a page date and a long one like a full confidentiality clause both center correctly without any manual positioning.",
      ],
    },
    {
      heading: "What this is (and isn't) built for",
      body: [
        "This is meant for exactly one thing done well: the same static text repeated identically across every page. If you need different text on different pages, running chapter titles that change per section, or an automatically incrementing page number, this straightforward approach isn't the right fit — page numbering specifically has its own dedicated tool built for exactly that, supporting position presets and an auto-incrementing '{n} of {total}' style format.",
        "Keep the actual header and footer text reasonably short. Since it's centered as a single line near the page edge, a very long line risks running close to or past the page margins on narrower page sizes — a concise notice reads better and is less likely to look cramped than a full paragraph squeezed into a footer.",
      ],
    },
    {
      heading: "One thing worth checking before you commit",
      body: [
        "Since the text is placed with a fixed margin near the top and bottom edges of every page, it's worth glancing at a page or two of your specific document first if the existing content already runs close to those edges — a document with a tight, edge-to-edge layout has a higher chance of the new header or footer visually crowding existing content than one with generous existing margins.",
        "If the result doesn't look right on a specific document, there's no harm in trying again — this operates on your original file each time rather than modifying it in place, so a first attempt that needs adjusting costs you nothing but re-running the tool.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I add only a header without a footer, or the other way around?",
      answer:
        "Yes — both fields are independent, and leaving either one blank simply skips it. Fill in only the one you actually need.",
    },
    {
      question: "Will the header and footer text be identical on every single page?",
      answer:
        "Yes — this applies the same text uniformly across the whole document in one pass. There's no support for varying the text by page or section within a single run.",
    },
    {
      question: "Does this add automatic page numbers?",
      answer:
        "No — this tool is for static, unchanging text. For automatically incrementing page numbers with position and format control, use the dedicated PDF Page Numbering tool instead.",
    },
  ],
};
