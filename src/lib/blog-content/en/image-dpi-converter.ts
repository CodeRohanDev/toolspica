import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-dpi-converter",
  lang: "en",
  title: "Why a Print Shop Rejected Your Image Even Though It Looks Fine on Screen",
  description:
    "DPI has nothing to do with how sharp your image looks on a screen — here's what it actually controls and how to fix it for print.",
  sections: [
    {
      heading: "The rejection that doesn't make sense at first",
      body: [
        "You send a photo to a print shop, it looks perfectly sharp on your monitor, and you get a message back saying it doesn't meet their DPI requirement — usually 300 DPI for quality print work. This is confusing the first time it happens, because nothing about the image actually looks wrong. The image is fine; it's a metadata field, not the pixel content, that's failing the requirement.",
        "DPI (dots per inch) is a print-specific setting that tells a printer how large to physically render the image on paper — it has zero bearing on how the image looks on a screen, which is exactly why you never noticed anything wrong before submitting it.",
      ],
    },
    {
      heading: "What DPI actually controls, and what it doesn't",
      body: [
        "Print size is calculated as pixel dimensions divided by DPI. A 3000×2000 pixel image at 300 DPI prints at 10×6.67 inches. The exact same pixels at 72 DPI would print over four times larger — roughly 41.7×27.8 inches — and correspondingly much less sharp per inch, since you're spreading the same fixed number of pixels across a much bigger physical area.",
        "Crucially, changing the DPI value doesn't touch a single pixel of the actual image — it's pure metadata, a label describing intended print size, completely separate from the image's real resolution (its pixel dimensions). Setting DPI to 300 doesn't make a low-resolution image sharper any more than relabeling a small box as \"large\" makes it physically bigger.",
      ],
    },
    {
      heading: "So why does a print shop specifically ask for 300?",
      body: [
        "300 DPI is the print industry's standard threshold for output that looks properly sharp to the human eye at normal viewing distance — below that, printed detail starts to look visibly soft or pixelated, especially in fine text or intricate graphics. It's a real, meaningful requirement for the physical output quality, which is why print shops enforce it even though it's invisible on a screen.",
        "The practical implication: if your actual pixel dimensions are too small for the physical size you're printing at 300 DPI, setting the DPI metadata to 300 satisfies the label requirement but won't fix genuinely insufficient resolution — the math (pixels ÷ DPI = print size) still applies regardless of what the metadata says.",
      ],
    },
    {
      heading: "The actual fix, step by step",
      body: [
        "If your image's real pixel dimensions are already large enough for your intended print size at 300 DPI, this is a one-step metadata patch — no resampling, no quality loss, no visible change to the image at all. If the pixel dimensions genuinely aren't large enough, no DPI setting will fix that; you'd need a higher-resolution source image or would need to accept a smaller print size for that same source file.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does setting my image to 300 DPI make it print sharper?",
      answer:
        "Only if your pixel dimensions were already sufficient for your intended print size — DPI is metadata about print size, not a sharpness or resolution setting. If the actual pixel count is too low, changing DPI alone won't fix that.",
    },
    {
      question: "What DPI should I use for something viewed only on screen?",
      answer:
        "72 or 96 DPI are common defaults for screen display, though DPI is largely irrelevant there since screens render at their own fixed pixel density regardless of an image's embedded DPI value.",
    },
    {
      question: "Will changing DPI affect my image's actual file size or dimensions?",
      answer:
        "No — DPI is a metadata field only. Pixel dimensions, and therefore the underlying image content and quality, stay exactly the same before and after.",
    },
  ],
};
