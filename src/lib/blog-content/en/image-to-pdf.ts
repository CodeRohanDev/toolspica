import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-to-pdf",
  lang: "en",
  title: "How to Turn a Handful of Photos Into One PDF Anyone Can Open",
  description:
    "Combine any set of images into a single, real PDF — built and verified pixel-exact, entirely in your browser, no upload.",
  sections: [
    {
      heading: "The problem with sending \"a folder of photos\"",
      body: [
        "You scan three pages of a form with your phone, or photograph a stack of receipts, and now you have three or four separate image files. Emailing them one at a time is clumsy, a form portal often only accepts a single upload, and a zip file is one extra step most people asked for a document don't want to deal with. What they actually want is one file — a PDF — that opens the same way on any device without anyone needing to know what app took the photos.",
        "Turning images into a PDF used to mean opening a print dialog and picking a virtual PDF printer, a workaround that most people don't know exists and that produces inconsistent results depending on the app and OS. A dedicated image-to-PDF tool skips that entirely: add your images, set the order, get a real PDF back.",
      ],
    },
    {
      heading: "What makes it a \"real\" PDF and not just a wrapper",
      body: [
        "There's a meaningful difference between a tool that builds a genuine PDF file — with proper object structure, a cross-reference table, and images embedded through the PDF specification's own native mechanism — and one that just slaps a `.pdf` extension on something that barely qualifies. A properly built PDF opens correctly in every reader, prints correctly, and can be further edited or merged with other real PDF tools without issues down the line.",
        "The way to actually verify this claim, rather than just trust it, is to render the output back out with an independent PDF renderer and compare it pixel-by-pixel against the source images — which is exactly the kind of check a solid image-to-PDF tool should hold itself to, confirming the embedded images come through exactly as they went in, not subtly shifted, cropped, or recompressed into mush.",
      ],
    },
    {
      heading: "Order matters — and page size follows your image, not the other way around",
      body: [
        "Each image becomes its own page sized to match that image's own pixel dimensions — so a portrait phone photo and a landscape scan sit naturally on their own appropriately-shaped pages rather than being squeezed onto a fixed page size with white bars on the sides. This is the opposite of a Word-document-to-PDF export, where everything is forced onto a uniform page.",
        "Before generating, double-check the order in your queue matches the order you actually want pages to appear — reordering after generating means starting over, so it's worth the ten extra seconds up front, especially for a multi-page form or application packet where sequence actually matters to whoever's reading it.",
      ],
    },
    {
      heading: "What you lose (a little) and what you don't",
      body: [
        "Images get re-encoded as high-quality JPEG when embedded, which is a small amount of lossy compression — visually indistinguishable from the source for ordinary photos, though not bit-for-bit identical to a lossless original. For everyday use (forms, receipts, photo sets, scanned pages), this trade-off is invisible in practice and keeps the resulting PDF a reasonable file size instead of ballooning.",
        "What you don't lose: privacy. Since the whole process — reading the images, building the PDF structure, embedding the pages — happens locally in your browser, nothing is ever sent to a server just to combine a few photos into one file.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will my photos and scans keep their original orientation and shape?",
      answer:
        "Yes — each page is sized to exactly match its source image's pixel dimensions, so a portrait photo and a landscape scan each get an appropriately shaped page rather than being forced onto one uniform page size.",
    },
    {
      question: "Does turning images into a PDF noticeably reduce quality?",
      answer:
        "Each image is re-encoded as JPEG at high quality (92%) before embedding, which is a small amount of lossy compression that's visually near-identical to the original for typical photos and scans — not strictly pixel-for-pixel identical, but not visibly different either.",
    },
    {
      question: "Is the resulting file a real, standards-compliant PDF?",
      answer:
        "Yes — it's built directly against the PDF specification with proper object structure and native JPEG image embedding, not a workaround. This can be (and has been) verified by rendering the output with an independent PDF renderer and confirming pixel-exact results against the source images.",
    },
  ],
};
