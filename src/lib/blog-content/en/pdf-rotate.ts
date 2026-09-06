import type { BlogPost } from "@/lib/blog/types";

export const pdfRotatePost: BlogPost = {
  toolSlug: "pdf-rotate",
  lang: "en",
  title: "How to Fix a Sideways PDF Page (Properly, Not Just in Your Viewer)",
  description:
    "Why rotating a page in your PDF viewer doesn't actually fix it, and how to permanently correct sideways or upside-down pages.",
  sections: [
    {
      heading: "The rotation that doesn't actually stick",
      body: [
        "A lot of PDF viewers let you rotate the on-screen view of a page with a toolbar button — and it's an easy trap to fall into thinking that fixed the problem. It didn't. That rotation is a display setting for your current viewing session; save, close, and reopen the file (or send it to someone else) and it's back to sideways, because the underlying file was never actually changed.",
        "Fixing it for good means changing the PDF's own page rotation property, which is a small piece of metadata stored inside the file itself and respected by every PDF viewer, not just the one you happened to be using when you rotated the view.",
      ],
    },
    {
      heading: "Why this fix is instant and lossless",
      body: [
        "Rotating a page this way doesn't touch a single pixel or character of the actual content — it just updates an instruction that says \"display this page rotated by this many degrees.\" Because nothing is being redrawn or re-rendered, the operation is essentially instant regardless of file size, and there's zero quality loss, unlike operations that rasterize a page.",
        "This also explains why rotation is cumulative: a page already rotated 90° that gets rotated another 90° lands at 180°, not back to 0° — each click adds to whatever rotation the page already had.",
      ],
    },
    {
      heading: "Scanner batches usually rotate the same way every time",
      body: [
        "If a scanned document came out sideways, it's very likely every page came out sideways the same way — the scanner fed the whole stack in one consistent orientation. Rather than clicking through page by page, look for a \"rotate all\" option that applies one rotation to the entire document in a single action; it's the faster path for the far more common scenario.",
        "Save the per-page clicking for the mixed case — a document assembled from multiple sources where only a handful of pages, not the whole thing, came out in the wrong orientation.",
      ],
    },
    {
      heading: "What rotation won't fix",
      body: [
        "Rotation only changes orientation — it can't fix a page that's genuinely upside-down text baked into a scanned image at an odd angle (as opposed to a clean 90/180/270° rotation), since it works in fixed 90° steps, not arbitrary angles. For that kind of skewed scan, you'd need an image-editing step before or after, which is outside what a rotation tool does.",
        "And as with most page-level PDF operations, an encrypted file needs its password removed first — run it through a PDF unlock tool before attempting to rotate it.",
      ],
    },
  ],
  faqs: [
    {
      question: "If I rotate a page and save, will it still be sideways for the person I send it to?",
      answer:
        "No — once you've actually rotated it through a tool that updates the file's page rotation property (not just your viewer's display), the correct orientation is saved into the file and will display correctly for anyone who opens it.",
    },
    {
      question: "Does rotating affect the file size at all?",
      answer:
        "No — rotation only changes a small metadata property per page, not the actual content, so the file size stays essentially the same before and after.",
    },
    {
      question: "Can I rotate a scanned image-based PDF the same way as a text PDF?",
      answer:
        "Yes — rotation works on the page level and is completely independent of whether the page contains vector text or a scanned image, so both types rotate identically.",
    },
  ],
};
