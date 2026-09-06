import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-png",
  lang: "en",
  title: "PDF to PNG: When Lossless Actually Matters (and When It's Overkill)",
  description:
    "How to convert PDF pages to sharp, lossless PNG images, and how to tell when PNG is the wrong choice for the job.",
  sections: [
    {
      heading: "The one question that decides your file format",
      body: [
        "Before converting a single page, ask what's actually on it. Sharp text, a technical diagram, a screenshot, a chart with thin lines — that's PNG territory, because JPEG's lossy compression puts visible fuzzy artifacts right around hard edges and small text, exactly where you'd notice them most. A photo, a scanned magazine page, anything with smooth gradients and no crisp lines — JPG will look just as good at a fraction of the file size.",
        "Getting this backwards is the single most common mistake with PDF-to-image conversion: converting a 40-page photo-heavy report to PNG and ending up with a folder ten times larger than it needed to be, or converting a diagram-heavy spec sheet to JPG and noticing the fine lines have gone slightly blurry.",
      ],
    },
    {
      heading: "What \"lossless\" actually buys you",
      body: [
        "Each page is rendered at 2x scale using the same engine that renders PDFs inside your browser (Mozilla's pdf.js), then PNG's compression is applied — a method that shrinks the file without discarding a single pixel's exact value, unlike JPEG which intentionally throws away detail humans are less likely to notice. The practical result: zoom into a converted diagram at 400% and the lines stay crisp, whereas the same zoom on a JPG version would reveal blocky compression artifacts around every edge.",
        "This matters most when the image is going somewhere it'll be scrutinized closely — a diagram embedded in another document that readers might zoom into, a screenshot used as evidence or documentation, anything where a reviewer might squint at fine detail.",
      ],
    },
    {
      heading: "Handling multi-page PDFs without losing track of order",
      body: [
        "Converting anything beyond a single page gives you a ZIP file rather than individual downloads, with pages named sequentially (page-1.png, page-2.png, and so on) — this naming is what keeps a 20-page conversion usable instead of a folder of ambiguously-named images you have to open one by one to sort. When you extract the ZIP, sort the folder by name (not by date modified) to guarantee the pages land back in their original reading order.",
        "One thing to plan for: PNG's larger file size compounds fast across many pages. A 30-page diagram-heavy document that's 5MB as a PDF can easily become a 60-80MB folder of PNGs — fine for local use, but worth compressing into a ZIP (which most extraction already gives you) before emailing it anywhere with attachment size limits.",
      ],
    },
    {
      heading: "What you lose that people sometimes forget about",
      body: [
        "Once a page becomes an image — PNG or JPG, doesn't matter — the underlying text is gone. No more selecting a sentence to copy, no more Ctrl+F to find a word, no more screen-reader accessibility for anyone relying on one. If the actual goal is getting text out of a PDF rather than a picture of it, this conversion is the wrong tool entirely — PDF to Text or PDF to Word will serve that need instead.",
        "If you only need a handful of pages from a longer document rather than the whole thing, running PDF Extract Pages first to isolate just what you need, then converting that smaller file, avoids ending up with dozens of PNGs you'll immediately delete.",
      ],
    },
  ],
  faqs: [
    {
      question: "My PNG folder is huge compared to the original PDF — is that normal?",
      answer:
        "Yes, this is expected. PNG's lossless compression preserves every pixel exactly, which produces noticeably larger files than the original PDF or an equivalent JPG, especially for pages with photographic content — it's the direct trade-off for zero quality loss.",
    },
    {
      question: "Can I convert just one page instead of the whole document?",
      answer:
        "Use PDF Extract Pages first to pull out only the page(s) you need, then run that smaller file through this converter — it avoids generating a full ZIP of pages you don't want.",
    },
    {
      question: "Will text on the page still be selectable in the PNG?",
      answer:
        "No — converting to any image format flattens the page into pixels, permanently removing the underlying selectable text layer. If you need the text itself, use PDF to Text or PDF to Word instead.",
    },
  ],
};
