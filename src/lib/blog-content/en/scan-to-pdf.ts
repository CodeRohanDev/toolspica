import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "scan-to-pdf",
  lang: "en",
  title: "Your Phone Is Already a Scanner — Here's How to Use It Properly",
  description:
    "How to turn phone photos of documents into a clean, single PDF, and a few habits that make the result look genuinely professional.",
  sections: [
    {
      heading: "You don't need a scanner app to get a scanner result",
      body: [
        "Most people still think of \"scanning\" as something that requires a dedicated app or a physical scanner sitting on a desk. In practice, a phone camera plus a tool that combines the photos into one PDF gets you the same practical result for almost every situation you actually run into — signing and returning a form, sharing a receipt, digitizing a handwritten note, or sending a photo ID. The output people actually want at the end is one PDF file, not a folder of loose photos, and that's the entire point of a scan-to-PDF workflow.",
        "The advantage over a dedicated scanner app isn't just convenience — it's that you're not locked into a specific format or app ecosystem. Any photo you can take or already have on your device becomes a page, regardless of what format your phone saved it in.",
      ],
    },
    {
      heading: "Why the file format of your photo doesn't matter here",
      body: [
        "iPhones commonly save photos as HEIC, Android phones typically use JPG, and screenshots or downloaded images might be PNG or WebP. A tool built specifically for scanning documents should accept all of them without you having to think about which format you're working with, because it normalizes every photo internally before combining them — drawing each one onto a canvas with a white background and re-encoding it as a high-quality JPEG before it goes into the final PDF.",
        "That white-background step matters more than it sounds: without it, a PNG or HEIC photo with any transparency could turn into a black or checkered patch in the final document instead of a clean white page background, which looks obviously wrong in a document meant to look scanned.",
      ],
    },
    {
      heading: "Getting a genuinely clean result from your camera",
      body: [
        "A few habits make a real difference in how professional the final PDF looks, even though the tool itself can't fix bad source photos. Shoot on a flat, well-lit surface with the document filling as much of the frame as reasonably possible — a photo taken at an angle or with heavy shadow across half the page will still convert fine, but it'll look like exactly what it is: an angled photo, not a scan.",
        "If you're photographing multiple pages of the same document, take all the photos before assembling them, then double-check the order in the queue before generating the final file — page order can't be fixed after the PDF is downloaded without starting the process again.",
      ],
    },
    {
      heading: "When this beats a real scanner, and when it doesn't",
      body: [
        "For anything you need digitized right now, from wherever you are, a phone camera wins easily — no walking to a scanner, no software install, and it works identically on any device with a camera and a browser. For sensitive documents (IDs, signed contracts, medical forms), doing this entirely in your browser without uploading anything to a server is a meaningful privacy advantage over a random scanning app of unknown origin.",
        "Where a dedicated scanner still wins is bulk, unattended digitization — scanning a hundred-page archive is genuinely faster with a document feeder than photographing each page by hand. For the one-off or occasional case most people actually deal with, though, your phone is more than good enough.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does it matter if my photos are HEIC, JPG, or PNG?",
      answer:
        "No — every photo is normalized internally to a consistent format before being combined, regardless of what format it started as, so you can mix photos from different sources or devices without any issue.",
    },
    {
      question: "Can I take the photos directly instead of picking existing files?",
      answer:
        "On mobile, the upload button typically opens your camera directly so you can photograph a document and add it to the queue immediately, without saving it to your gallery first.",
    },
    {
      question: "Will this noticeably reduce my photo quality?",
      answer:
        "Photos are re-encoded at high JPEG quality during normalization, which is visually very close to the original for typical document photos — some minor quality loss is inherent to that process, but it's not something you'd notice in normal use.",
    },
  ],
};
