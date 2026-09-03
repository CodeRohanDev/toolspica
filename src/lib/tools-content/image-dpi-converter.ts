import type { ToolContent } from "./types";

export const imageDpiConverterContent: ToolContent = {
  heroSubtitle: "Change an Image's DPI Metadata for Print",
  overview: [
    "DPI (dots per inch) is metadata that tells a printer or design program how large to physically print an image — it doesn't change the actual pixel dimensions, only how those pixels map to physical size on paper. Many design and print workflows expect a specific DPI value (commonly 300 for print) even though the file's pixel content is identical either way.",
    "This tool sets the DPI metadata on a JPEG or PNG file by patching the file's density fields directly — the JFIF header for JPEG, or a pHYs chunk for PNG — without resampling or altering any pixel data. Common presets (72, 96, 150, 300, 600) are available, or enter any custom value.",
    "The byte-patching logic was verified against real files using Python's Pillow imaging library as an independent reader, confirming the exact DPI value set is read back correctly for both JPEG and PNG output.",
    "This is useful for meeting a print shop's required DPI setting before submitting artwork, satisfying a design program's DPI expectation without changing pixel dimensions, correcting an image's DPI metadata that was set incorrectly, and general print-preparation workflows.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "JPEG or PNG.",
    },
    {
      title: "Choose a DPI value",
      description: "Common presets, or enter any custom number.",
    },
    {
      title: "Download the updated file",
      description: "Same pixel dimensions, new DPI metadata.",
    },
  ],
  examples: [
    {
      label: "Setting an image to 300 DPI for print",
      input: "A photo at default 72 DPI",
      output: "The identical image with DPI metadata set to 300",
    },
  ],
  faqs: [
    {
      question: "Does changing DPI make my image sharper or higher resolution?",
      answer:
        "No — DPI is purely metadata describing intended print size; it doesn't add, remove, or change any actual pixel data. An image's real resolution is determined by its pixel dimensions (width × height in pixels), which this tool leaves completely unchanged.",
    },
    {
      question: "What DPI should I use for print?",
      answer:
        "300 DPI is the standard target for high-quality print output. Lower values like 72 or 96 DPI are typically used for screen display, where DPI is largely irrelevant since screens render at their own pixel density regardless of an image's embedded DPI value.",
    },
    {
      question: "Why does my design software show a specific 'print size' that changes with DPI?",
      answer:
        "Print size is calculated as pixel dimensions divided by DPI — a 3000×2000px image at 300 DPI prints at 10×6.67 inches, while the same pixels at 150 DPI would print at double that physical size (and correspondingly less sharp per inch), even though the file content is unchanged.",
    },
    {
      question: "Will this work on any JPEG or PNG file?",
      answer:
        "The tool re-encodes your image through canvas first (guaranteeing a standard file structure), then patches the DPI metadata onto that fresh output — this approach works reliably regardless of your original file's specific internal structure.",
    },
    {
      question: "Is my image uploaded anywhere to change its DPI?",
      answer:
        "No — the entire process happens locally in your browser, from re-encoding to metadata patching. The image is never uploaded to a server.",
    },
  ],
};
