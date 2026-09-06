import type { BlogPost } from "@/lib/blog/types";

export const jpgToPdfPost: BlogPost = {
  toolSlug: "jpg-to-pdf",
  lang: "en",
  title: "How to Turn Phone Photos Into a PDF (JPG, PNG, or Any Image)",
  description:
    "The fastest way to turn photos taken on your phone into a proper, ordered PDF — no scanner, no app install required.",
  sections: [
    {
      heading: "The phone-camera-as-scanner workflow",
      body: [
        "Most people don't own a scanner anymore, but they need to \"scan\" something constantly — a signed form, a handwritten assignment, a set of receipts for reimbursement. The actual workflow is: take a photo with your phone for each page, and you end up with a camera roll full of JPGs that need to become one properly ordered document before anyone will accept them.",
        "This is exactly the gap a JPG-to-PDF tool fills: select the photos in the order they should appear, and get back a single PDF with each photo as its own full page — no scanner hardware, no dedicated scanning app, just the camera you already used.",
      ],
    },
    {
      heading: "It's not actually limited to JPG",
      body: [
        "Despite the name, a well-built version of this tool accepts whatever image format you throw at it — PNG screenshots, WEBP images saved from a website, even GIF or BMP files — and treats them all the same way. That matters because phone cameras, screenshot tools, and different apps don't all save in JPG by default, and you shouldn't have to check or convert formats before combining them.",
        "This also means you can mix formats freely in one batch — three JPG photos and one PNG screenshot combine into a single PDF without any extra step, since each image gets processed the same way regardless of where it came from.",
      ],
    },
    {
      heading: "Getting page order right the first time",
      body: [
        "The order you add or arrange your images in becomes the exact page order of the final PDF, with no automatic reordering based on filename or date. If you're photographing pages of a multi-page form, take the photos in reading order to begin with — it saves the extra step of reordering afterward, especially on a phone screen where dragging a long list around is fiddly.",
        "If the order does end up wrong, look for up/down controls on each thumbnail before generating — fixing it before the PDF is built is far easier than trying to reorder pages inside an already-finished PDF afterward.",
      ],
    },
    {
      heading: "Why this matters for anything you'd rather not upload",
      body: [
        "A lot of what gets turned into PDF this way is exactly the kind of thing you don't want passing through a random server — signed agreements, ID documents, medical forms, financial paperwork photographed for a claim. A tool that builds the PDF entirely inside your browser, without uploading the photos anywhere first, avoids that risk entirely.",
        "It's worth explicitly checking for that guarantee before using an unfamiliar image-to-PDF site, since not every free tool online actually processes files locally — some upload first and process on a server, which is a meaningfully different privacy posture for anything sensitive.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do all my photos need to be the same size or orientation?",
      answer:
        "No — each page is sized to match its own source image exactly, so a portrait photo next to a landscape one is completely fine; the PDF will just have pages of mixed dimensions, which is normal.",
    },
    {
      question: "Will combining photos into a PDF make them blurry?",
      answer:
        "No noticeable difference for typical phone photos — images are re-encoded at high quality when the PDF is built, which looks visually identical to the source for regular photos.",
    },
    {
      question: "Can I do this entirely on my phone, without a computer?",
      answer:
        "Yes — since it's a browser-based tool, your phone's own browser can select photos directly from your camera roll and generate the PDF the same way a computer would.",
    },
  ],
};
