import type { BlogPost } from "@/lib/blog/types";

export const pdfToJpgPost: BlogPost = {
  toolSlug: "pdf-to-jpg",
  lang: "en",
  title: "How to Convert a PDF Page Into a JPG Image (Free, In Your Browser)",
  description:
    "When and how to turn PDF pages into JPG images, why the result isn't editable text anymore, and PNG vs JPG for this job.",
  sections: [
    {
      heading: "Why you'd want a PDF as an image at all",
      body: [
        "PDFs are great documents but a lot of platforms simply don't accept them — an Instagram post, a WhatsApp status, a slide you're pasting into a PowerPoint deck, or a website's image upload field that flatly rejects anything that isn't a JPG or PNG. In every one of these cases, you don't want the document, you want a picture of the document.",
        "Converting a PDF page to JPG solves exactly that mismatch: the page's visual content — text, diagrams, images — gets flattened into a single picture file that any image-only platform will happily accept.",
      ],
    },
    {
      heading: "Why the output looks sharp even zoomed in",
      body: [
        "A common disappointment with PDF-to-image conversions is a blurry, screenshot-quality result. That happens when a page is rendered at plain screen resolution — fine for viewing, terrible once you zoom in or print it. Rendering at a higher scale (roughly double typical screen density) before exporting avoids that entirely, producing a JPG that stays crisp even pasted larger than the original page size.",
        "This matters most for anything with small text or fine diagram lines — a low-resolution render turns those into mush, while a properly scaled one keeps them legible.",
      ],
    },
    {
      heading: "The one-way trade-off nobody mentions upfront",
      body: [
        "Once a page becomes a JPG, it's a picture — there's no text underneath to select, search, or copy anymore, and no way to edit the content short of editing the image pixel by pixel. This is completely expected and unavoidable any time you convert a document format into an image format, but it's worth knowing before you convert something you might later need to search through.",
        "If you think you'll need to search or extract text from the document later, keep the original PDF as well — don't treat the JPG as a replacement, treat it as a picture derived from it.",
      ],
    },
    {
      heading: "JPG or PNG — which one do you actually want",
      body: [
        "JPG uses lossy compression that shrinks file size dramatically, which is exactly right for photographic content or a page you're posting online where file size matters. PNG is lossless and better suited to pages that are mostly flat colors, sharp lines, or text-heavy screenshots, where JPG's compression can introduce visible artifacts around hard edges.",
        "If you're not sure, JPG is the safer default for general documents and photos; reach for PNG specifically when you notice fuzzy edges around text or diagrams in a JPG export.",
      ],
    },
  ],
  faqs: [
    {
      question: "What happens if my PDF has more than one page?",
      answer:
        "Every page gets converted and the whole set is bundled into a single ZIP file, with each image sequentially named (page-1.jpg, page-2.jpg, and so on) so the order is always clear.",
    },
    {
      question: "Can I get the text back out of the JPG afterward?",
      answer:
        "Not directly — a JPG has no underlying text data. If you need the text later, an OCR tool can read text out of an image, though it won't be as reliable as text that was never rasterized in the first place.",
    },
    {
      question: "Will a single-page PDF also download as a ZIP?",
      answer:
        "No — a single-page PDF converts straight to one JPG file, downloaded directly. ZIP bundling only kicks in for multi-page documents where there's more than one image to deliver together.",
    },
  ],
};
