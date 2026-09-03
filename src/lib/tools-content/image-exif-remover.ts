import type { ToolContent } from "./types";

export const imageExifRemoverContent: ToolContent = {
  heroSubtitle: "Strip All Metadata from Photos Before Sharing",
  overview: [
    "Photos taken with a phone or digital camera routinely carry embedded EXIF metadata — the exact device model, timestamp, camera settings, and often precise GPS coordinates of where the photo was taken. Sharing a photo publicly without removing this data can reveal far more about you and your location than most people realize.",
    "This tool strips all embedded metadata by re-rendering the image through a canvas and re-exporting it — canvas only ever stores raw pixel data, with no mechanism to carry along the original file's metadata, so the technique inherently and completely removes it, rather than attempting to selectively edit specific fields.",
    "Because this uses actual re-rendering rather than a metadata-editing library that might miss certain fields, there's no risk of a specific tag slipping through — the output file has no metadata capability to leak in the first place.",
    "This is useful for removing GPS location data before posting photos publicly, stripping camera and device information before sharing images professionally, general privacy hygiene before uploading personal photos anywhere, and any situation where you want a clean image file with no hidden metadata attached.",
  ],
  howItWorks: [
    {
      title: "Upload a photo",
      description: "JPEG or PNG, with or without embedded metadata.",
    },
    {
      title: "Metadata is stripped automatically",
      description: "By re-rendering the image through canvas, which carries no metadata by design.",
    },
    {
      title: "Download the clean file",
      description: "With confirmation showing the size before and after.",
    },
  ],
  examples: [
    {
      label: "Removing GPS data before posting a vacation photo",
      input: "A phone photo with embedded GPS coordinates and camera info",
      output: "The identical-looking photo with zero embedded metadata",
    },
  ],
  faqs: [
    {
      question: "What kind of metadata does this remove?",
      answer:
        "Everything — camera make and model, exact date and time taken, GPS coordinates (if location services were on when the photo was captured), camera settings like aperture and ISO, software used to edit it, and any other EXIF fields the original file carried.",
    },
    {
      question: "Why is GPS metadata in photos a privacy concern?",
      answer:
        "Many phones automatically embed the exact latitude and longitude of where a photo was taken — sharing that photo publicly without stripping this data can reveal your home address, workplace, or other locations you'd rather not broadcast, often without realizing the information is even there.",
    },
    {
      question: "Does removing metadata change how the image looks?",
      answer:
        "No — only the invisible metadata is removed. The visible image content (every pixel) stays exactly the same; only the hidden data embedded alongside it is stripped.",
    },
    {
      question: "Is there any metadata this technique might miss?",
      answer:
        "No — because the technique works by re-rendering the image through canvas rather than editing specific metadata fields, there's nothing left for any metadata to survive in, regardless of what specific tags the original file happened to contain.",
    },
    {
      question: "Is the photo uploaded anywhere during this process?",
      answer:
        "No — the entire process happens locally in your browser. The photo, including whatever sensitive metadata it carries, is never uploaded to a server.",
    },
  ],
};
