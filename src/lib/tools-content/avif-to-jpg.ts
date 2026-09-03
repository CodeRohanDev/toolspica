import type { ToolContent } from "./types";

export const avifToJpgContent: ToolContent = {
  heroSubtitle: "Convert AVIF Images to Universally Compatible JPG",
  overview: [
    "AVIF is a modern image format that achieves excellent compression, but its relative newness means some software, older devices, and certain platforms still don't support it — while JPEG remains the one format virtually every device, browser, and application can open without issue.",
    "This tool converts AVIF images to JPG directly using your browser's own image decoder — modern versions of Chrome, Firefox, and Edge all support decoding AVIF natively, which this tool relies on to read the file before re-encoding it as a universally compatible JPEG.",
    "Since AVIF supports transparency and JPEG doesn't, any transparent areas in the source image are filled with a background color you choose (white by default) during conversion, exactly like converting any other transparency-supporting format to JPEG.",
    "This is useful for converting AVIF images for use in software or platforms that don't yet support the format, sharing an AVIF image with someone whose device can't display it, and general format compatibility conversion.",
  ],
  howItWorks: [
    {
      title: "Upload an AVIF image",
      description: "Decoded using your browser's native AVIF support.",
    },
    {
      title: "Choose a background color",
      description: "Used to fill any transparent areas, since JPEG doesn't support transparency.",
    },
    {
      title: "Download as JPG",
      description: "With an adjustable quality setting.",
    },
  ],
  examples: [
    {
      label: "Converting an AVIF photo for wider compatibility",
      input: "photo.avif",
      output: "photo.jpg, viewable on virtually any device or software",
    },
  ],
  faqs: [
    {
      question: "Why would I need to convert AVIF at all — isn't it a better format?",
      answer:
        "AVIF generally compresses better than JPEG at equivalent quality, but 'better' doesn't help if the software or platform you need to use doesn't support it yet. This conversion trades some of AVIF's efficiency for JPEG's near-universal compatibility.",
    },
    {
      question: "Does my browser need special support to convert AVIF files?",
      answer:
        "Yes — this relies on your browser's built-in ability to decode AVIF images. Current versions of Chrome, Firefox, Edge, and Safari all support this natively; a very outdated browser might not be able to open the AVIF file in the first place.",
    },
    {
      question: "What happens to transparent areas in the AVIF file?",
      answer:
        "They're filled with a solid background color (white by default, adjustable) since JPEG doesn't support any form of transparency — this is the same handling any transparency-to-JPEG conversion requires.",
    },
    {
      question: "Will the converted JPG be a larger file than the original AVIF?",
      answer:
        "Often yes, at least at comparable quality — AVIF's compression is generally more efficient than JPEG's for the same visual quality, so trading formats for compatibility usually costs some file size efficiency.",
    },
    {
      question: "Is the image uploaded anywhere to convert it?",
      answer:
        "No — the AVIF file is decoded and re-encoded entirely in your browser. It's never uploaded to a server.",
    },
  ],
};
