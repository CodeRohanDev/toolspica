import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-grayscale-converter",
  lang: "en",
  title: "Why Your Colorful PDF Looks Wrong in Black-and-White Print",
  description:
    "The real reason a colorful PDF looks muddy on a black-and-white printer, and how converting it to grayscale first fixes that.",
  sections: [
    {
      heading: "Printer grayscale and \"actual\" grayscale aren't the same thing",
      body: [
        "Send a full-color PDF to a black-and-white printer and it'll print — but not always well. A printer driver does its own on-the-fly desaturation, and depending on the printer, that conversion can crush contrast, make similar colors turn into indistinguishable gray blobs, or produce toner-heavy results on pages that were mostly light color in the original. This shows up constantly on presentations with colored charts, where two chart colors that were obviously different suddenly look identical once printed.",
        "Converting to grayscale before you print — rather than letting the printer decide how — gives you a predictable, consistent result and lets you actually see what the black-and-white version will look like before committing paper and toner to it.",
      ],
    },
    {
      heading: "Why the exact grayscale formula matters",
      body: [
        "Not all grayscale conversions are equal. A naive approach averages the red, green, and blue values of each pixel equally — but the human eye doesn't perceive brightness that way. Green looks meaningfully brighter to us than blue at the same intensity, which is why professional tools use a weighted formula (roughly 30% red, 59% green, 11% blue) instead of a flat average, producing a result that actually matches how the colors looked in terms of relative brightness, not just a mathematical mix.",
        "This is the same formula broadcast television and standard image-editing software have used for decades — it's a well-established, deliberate choice, not an arbitrary one.",
      ],
    },
    {
      heading: "The trade-off worth knowing before you convert",
      body: [
        "Converting to grayscale this way works by rendering every page to an image and desaturating it, which means the output is no longer selectable, searchable text — it becomes a picture of the page. For a document you're printing and filing away, that trade-off doesn't matter. For a document someone else needs to search through or copy text from digitally, it does — keep the original color PDF around for that use case and only convert to grayscale for the specific printing task.",
        "One side benefit: grayscale images typically compress somewhat better than color ones, so the converted file is often a bit smaller too, though that's incidental rather than the tool's main purpose.",
      ],
    },
  ],
  faqs: [
    {
      question: "Will the text in my PDF still be selectable after converting to grayscale?",
      answer:
        "No — every page is rendered to an image and desaturated, so text becomes part of the picture rather than staying as live, selectable text. If you need the text to remain selectable, keep your original color file for that purpose.",
    },
    {
      question: "Why not just print in black-and-white mode instead of converting first?",
      answer:
        "Letting a printer driver decide how to desaturate colors on the fly can produce inconsistent, sometimes muddy results, especially with charts using similar-brightness colors. Converting first with a proper weighted formula gives you a predictable, previewable result before you print.",
    },
    {
      question: "Does this work on scanned PDFs too?",
      answer:
        "Yes — since the conversion works on the rendered pixels of each page, it applies identically whether the source is vector graphics, a scanned photo, or a mix of both.",
    },
  ],
};
