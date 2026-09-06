import type { BlogPost } from "@/lib/blog/types";

export const pdfCompressPost: BlogPost = {
  toolSlug: "pdf-compress",
  lang: "en",
  title: "How to Compress a PDF to Get Under Email or Upload Size Limits",
  description:
    "A practical guide to shrinking a large PDF for email attachments or upload limits, including which settings to change first.",
  sections: [
    {
      heading: "The size limit you're actually fighting",
      body: [
        "Most \"compress my PDF\" moments happen right at the moment of sending it: Gmail caps attachments around 25MB, a job portal caps resumes at 2MB, a college admission form won't take anything over 5MB. You don't find out your file is too big until the send button refuses to work, which is exactly the wrong time to be figuring out compression settings from scratch.",
        "The good news is that most oversized PDFs got that way from high-resolution scanned pages or embedded photos, not from text — and that's exactly the kind of bloat a compressor can reclaim dramatically, often shrinking a file to a fifth of its original size without it looking noticeably different on screen.",
      ],
    },
    {
      heading: "Resolution first, quality second",
      body: [
        "There are two sliders worth understanding, not just dragging randomly: resolution (how many pixels each page is rendered at) and quality (how aggressively those pixels get JPEG-compressed). Resolution has the bigger effect on file size for most documents, because it directly controls pixel count — dropping from 2x to 1x scale can roughly quarter the raw image data before quality compression is even applied.",
        "A practical approach: drop resolution first to somewhere around 1x-1.25x, check if the result still looks sharp enough for its purpose (screen viewing needs far less resolution than printing), and only then start lowering quality if you need to shrink further. Going straight for very low quality settings first tends to introduce visible blotchy artifacts before you've gained much size benefit.",
      ],
    },
    {
      heading: "When compression doesn't help — and can even hurt",
      body: [
        "If your PDF is mostly text — a contract, an essay, a spreadsheet export — it's probably already small, because vector text is extremely space-efficient. Running it through an image-based compressor converts that efficient text into a rendered picture, which can end up the same size or even larger than the original, while also making the text no longer selectable or searchable.",
        "This trade-off is worth knowing before you compress something you'll need to search or copy text from later. If searchable text matters, compress the source document differently (reducing embedded image resolution before exporting to PDF) rather than running the finished PDF through this kind of tool.",
      ],
    },
    {
      heading: "Checking your result before you send it",
      body: [
        "Always glance at the before/after file size and open the compressed result before attaching it to something important — a compression setting that looked fine in your head can occasionally be too aggressive for a document with fine print or small diagrams. It costs ten seconds and saves you from sending an accidentally illegible file to someone whose response you're waiting on.",
        "If a locked, password-protected PDF won't compress, that's expected — remove the password with a PDF unlock tool first, then compress the unlocked result.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will compressing make my PDF's text unreadable?",
      answer:
        "It shouldn't at reasonable settings — text becomes part of a rendered image rather than selectable text, but it stays visually legible unless you push quality and resolution very low. Preview the result before sending anything important.",
    },
    {
      question: "How much smaller can I realistically expect my file to get?",
      answer:
        "For scanned or image-heavy PDFs, a reduction to a fifth or even a tenth of the original size is common. For text-based PDFs, expect little change or even a slight increase, since there's less compressible bloat to begin with.",
    },
    {
      question: "Is there a setting that works for every situation?",
      answer:
        "Not really — a document meant for screen viewing can tolerate much lower resolution than one meant to be printed. Start moderate, check the result, and adjust from there rather than assuming one preset fits every file.",
    },
  ],
};
