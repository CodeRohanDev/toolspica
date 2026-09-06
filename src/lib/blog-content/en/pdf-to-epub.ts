import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-epub",
  lang: "en",
  title: "Why PDFs Are Terrible on E-Readers (and How to Fix It With EPUB)",
  description:
    "Why a PDF looks great on a laptop but terrible on a phone or e-reader, and how converting to EPUB fixes it.",
  sections: [
    {
      heading: "The fixed-layout problem nobody warns you about",
      body: [
        "Try reading a PDF report on your phone and you already know the pain: text too small to read at actual size, so you zoom in, and now you're constantly panning left and right across a page that was designed for a much wider screen. This isn't a bug — it's what PDF is designed to do. Every page is a fixed, exact layout, the same on every device, which is perfect for printing and terrible for reading on a screen that doesn't match the original page dimensions.",
        "E-readers and reading apps solve this with reflowable text — content that re-wraps itself to fit whatever screen size and font size you choose. PDF fundamentally can't do that; EPUB, the standard e-book format, is built specifically for it.",
      ],
    },
    {
      heading: "What actually changes when you convert",
      body: [
        "Converting a PDF to EPUB extracts the text content and rebuilds it as a proper e-book: each page of the source PDF becomes its own chapter, and heading levels get inferred automatically from font size — noticeably larger text becomes a heading, everything else becomes body text. The result includes a real, working table of contents, so you can jump straight to a chapter from your e-reader's navigation menu instead of scrolling.",
        "This is a genuine EPUB3 file built to the actual specification — not a renamed PDF or an approximation — so it opens correctly in any standard e-reader app or device, the same as an EPUB from any other source.",
      ],
    },
    {
      heading: "The honest trade-off: what doesn't come along",
      body: [
        "This only carries over text and basic heading structure — images, multi-column layouts, tables, and precise visual formatting from the original PDF are not preserved. For a plain-text report, article, or manuscript, that's exactly what you want. For something where the visual layout is the point — a photo-heavy magazine spread, an infographic, a document with complex tables — converting to EPUB will lose that entirely, because reflowable text and pixel-precise layout are fundamentally incompatible goals.",
        "Know which one you're dealing with before converting: if you'd describe the document as 'a bunch of pages of text,' EPUB conversion will genuinely improve your reading experience. If you'd describe it as 'a designed document,' keep it as a PDF and read it on a larger screen instead.",
      ],
    },
    {
      heading: "One requirement people miss",
      body: [
        "This conversion needs an actual text layer to extract from — a scanned document or a photographed page has no embedded text, just pixels, so there's nothing for the converter to pull out. Run a scanned PDF through an OCR tool first to generate real, extractable text, then convert the OCR'd result to EPUB.",
        "If you only need a specific section of a long document turned into an e-book rather than the whole thing, extracting just those pages first keeps the resulting EPUB focused instead of chaptered by the original document's full page count.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my EPUB have chapters that match the document's actual sections?",
      answer:
        "Not exactly — each source PDF page becomes one EPUB chapter, so chapter breaks follow the original page breaks rather than the document's logical section structure. For a document with one section spanning several pages, you'll see several chapters for that one topic.",
    },
    {
      question: "Can I convert a document with lots of images to EPUB and keep the pictures?",
      answer:
        "No — this conversion extracts and reflows text content only. Image-heavy or visually designed documents will lose their images and layout entirely, so this is best suited to text-centric documents.",
    },
    {
      question: "Does this work on a PDF I made by scanning a physical book?",
      answer:
        "Not directly — a scan has no embedded text to extract. Run it through OCR first to generate a text layer, then convert that result to EPUB.",
    },
  ],
};
