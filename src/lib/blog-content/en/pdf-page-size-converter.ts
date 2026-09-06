import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-page-size-converter",
  lang: "en",
  title: "A4 vs US Letter: Why Your PDF Looks Wrong When Printed Abroad",
  description:
    "Why documents made in one country often print badly in another, and how to convert a PDF between A4, Letter, and Legal without distorting it.",
  sections: [
    {
      heading: "A page size mismatch you don't notice until you print",
      body: [
        "Almost every country outside North America uses A4 as the standard page size; the US, Canada, and a handful of others use Letter (and Legal for longer documents). On screen, this difference is barely noticeable — both are roughly the same shape. But send an A4-formatted document to be printed on a US printer loaded with Letter paper, or vice versa, and you'll get either awkward extra margins or content that gets cut off at the edge, because the physical paper simply isn't the same size as what the document was designed for.",
        "This trips up international job applications, contracts sent between offices in different countries, and anyone printing a document from a source using a different regional standard than their local printer.",
      ],
    },
    {
      heading: "What a proper size conversion actually does",
      body: [
        "The right way to fix this isn't to stretch the content to fill the new page — that would distort everything's proportions, turning circles into ovals and making text look subtly warped. Instead, a proper converter scales every page's content proportionally (the same ratio applied to both width and height) to fit within the target size, then centers it with equal margins on all sides. The aspect ratio of everything on the page — text, images, diagrams — stays exactly as it was, just uniformly larger or smaller.",
        "Technically, this works by adjusting the PDF's own page-content scaling and positioning operators rather than rendering pages as flattened images, so vector text stays sharp and selectable, and embedded images keep their original resolution — nothing is degraded by the size change itself.",
      ],
    },
    {
      heading: "Why you'll sometimes see extra white space",
      body: [
        "A4 and Letter are close in aspect ratio, so converting between them usually looks nearly seamless with minimal extra margin. Legal is a different story — it's notably taller relative to its width than either A4 or Letter, so converting to or from Legal tends to add more visible white space on one axis. This isn't a flaw in the conversion; it's the honest, undistorted result of fitting one aspect ratio inside a meaningfully different one without stretching anything.",
        "If the extra margin bothers you for a specific document, the underlying content itself hasn't moved or changed — only the page boundary and centering — so it's a purely cosmetic side effect of geometry, not a sign anything went wrong.",
      ],
    },
    {
      heading: "When you actually need this vs when you don't",
      body: [
        "This matters most when a document is heading somewhere with a specific paper requirement — a US visa application that explicitly requires Letter-sized documents, an international submission requiring A4, or simply making sure something prints cleanly at a print shop using a different regional default than your own printer. If you're only ever viewing a document on screen and never printing it, page size differences are largely invisible and not worth worrying about.",
        "One thing this doesn't fix: if a document was actually designed with layout elements positioned assuming a specific page size (headers pinned to an exact corner position, for example), proportional scaling keeps everything relatively correct, but a page genuinely redesigned for the new size by hand will always look more intentional than any automated conversion.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will converting page size make my text blurry?",
      answer:
        "No — the conversion scales the PDF's own vector content and positioning, it doesn't rasterize pages into images, so text stays sharp, selectable, and searchable at the new size exactly as it was at the original size.",
    },
    {
      question: "Can I convert a scanned PDF's page size, or only text-based documents?",
      answer:
        "Yes — the scaling operation applies to whatever is on the page, whether that's vector text or a scanned image, since it works at the page transform level rather than depending on specific content types.",
    },
    {
      question: "Which size should I use if I'm not sure what the recipient expects?",
      answer:
        "A4 is the international default outside North America; US Letter is standard within the United States and Canada. When in doubt, match whatever the recipient's country typically uses, or simply ask them directly for anything formal like a legal or immigration document.",
    },
  ],
};
