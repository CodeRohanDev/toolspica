import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-ocr",
  lang: "en",
  title: "How to Extract Text From a Scanned PDF (When Copy-Paste Doesn't Work)",
  description:
    "Why regular text extraction fails on scanned PDFs, and how OCR reads text out of a document that's technically just a picture.",
  sections: [
    {
      heading: "The trap: a PDF that looks like text but isn't",
      body: [
        "This catches people constantly: you open a scanned document in a PDF viewer, the text looks perfectly normal, so you try to select a paragraph to copy it — and nothing happens, or your whole cursor just drags a rectangle across the page. That's the tell. A scanned page, or a photo of a document saved as PDF, has no actual text data inside it at all. As far as the file format is concerned, it's a picture, indistinguishable from a photo of a mountain. Regular copy-paste and text-extraction tools have nothing to extract, because there's no text layer to read from.",
        "This is also why a Ctrl+F search across a scanned PDF finds nothing, even when you can clearly see the word on the page with your own eyes — the computer isn't reading letters, it's just displaying pixels arranged to look like letters to a human.",
      ],
    },
    {
      heading: "What OCR actually does differently",
      body: [
        "Optical character recognition solves this by looking at the page the way a person does — visually — rather than reading embedded text data that doesn't exist. Each page gets rendered to a high-resolution image, and a recognition engine analyzes the shapes on it, comparing patterns of pixels against what it knows about how letters and words are typically formed, to reconstruct an actual, computer-readable text string from what was previously just a picture.",
        "This is genuinely more computationally demanding than reading a text layer, which is why OCR takes visibly longer than a normal PDF-to-text conversion — it's not extracting data that already exists, it's inferring it from pixels, page by page.",
      ],
    },
    {
      heading: "Getting good results out of OCR",
      body: [
        "Scan quality matters more than almost anything else here. A clean, well-lit, high-resolution scan of printed text will recognize with very high accuracy — this is mature, well-established technology for that use case. A blurry photo taken at an angle, a low-resolution fax scan, or handwritten content will produce noticeably more mistakes, because the underlying shapes the engine is trying to match against clean letterforms are themselves distorted or ambiguous.",
        "If you have any control over the source (re-scanning a physical document, for example), scanning straight-on at a higher DPI setting will meaningfully improve the recognized text's accuracy compared to a quick phone photo at an angle.",
      ],
    },
    {
      heading: "What OCR is for, and what it isn't",
      body: [
        "Use OCR specifically when your PDF has no usable text layer — scanned documents, photographed pages, old files that were never digitally typed. If you're not sure, try the regular PDF to Text tool first; if it comes back empty or garbled, that confirms you need OCR instead. Don't reach for OCR on a normal, digitally-created PDF (an exported report, a Word-to-PDF conversion) — those already have a proper embedded text layer and regular extraction will be both faster and more accurate.",
        "Also worth knowing upfront: recognition here works on English text. Documents in other languages need a recognition engine configured with that language's character set, which is a different tool.",
      ],
    },
  ],
  faqs: [
    {
      question: "How can I tell if my PDF needs OCR or just regular text extraction?",
      answer:
        "Try selecting text in your PDF viewer — if you can highlight and copy words normally, it already has a text layer and regular extraction will work. If clicking and dragging just draws a selection box with nothing to copy, it's image-only and needs OCR.",
    },
    {
      question: "Does OCR work on handwriting?",
      answer:
        "Poorly, if at all — OCR engines are trained to recognize printed typefaces with consistent letterforms. Handwriting varies too much between people (and even within one person's writing) for standard OCR to reliably interpret it.",
    },
    {
      question: "Is my scanned document uploaded anywhere during OCR?",
      answer:
        "No — the recognition engine runs locally in your browser via WebAssembly. The only network request is a one-time download of the language recognition model itself, not your document's content.",
    },
  ],
};
