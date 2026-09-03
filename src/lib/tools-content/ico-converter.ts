import type { ToolContent } from "./types";

export const icoConverterContent: ToolContent = {
  heroSubtitle: "Convert Any Image to a Multi-Size .ico File",
  overview: [
    "The .ico format is what browsers and Windows expect for favicons and application icons, and unlike a normal image file, a single .ico can bundle multiple sizes together — letting the browser or operating system automatically pick whichever size best fits its current context, from a tiny browser tab to a large desktop shortcut.",
    "This tool converts any image into a proper multi-size .ico file, generating 16, 32, 48, 64, 128, and 256 pixel versions and packaging them all into one file using the modern PNG-embedded ICO format supported since Windows Vista — simpler and more broadly compatible than the older raw bitmap-based ICO format.",
    "The ICO file writer was verified against Pillow (Python's imaging library) as an independent reader: a multi-size test file correctly reported all embedded sizes and decoded exact pixel colors at each one.",
    "This is useful for creating a favicon.ico file for a website, generating a Windows application icon, converting a logo or image into the standard multi-size icon format, and any situation needing a proper .ico file rather than a single flat image.",
  ],
  howItWorks: [
    {
      title: "Upload an image",
      description: "Ideally square, for the cleanest results at every size.",
    },
    {
      title: "Multiple sizes render automatically",
      description: "16 through 256 pixels, generated from your source image.",
    },
    {
      title: "Download the .ico file",
      description: "One file containing every size, ready for use as a favicon or app icon.",
    },
  ],
  examples: [
    {
      label: "Creating a favicon.ico from a logo",
      input: "logo.png (a square logo image)",
      output: "favicon.ico containing 16, 32, 48, 64, 128, and 256px versions",
    },
  ],
  faqs: [
    {
      question: "Why does an .ico file need multiple sizes bundled together?",
      answer:
        "Different contexts need different sizes — a browser tab shows a tiny 16px icon, while a desktop shortcut or app icon needs something much larger. Bundling multiple sizes in one file lets the browser or OS automatically pick whichever fits its current display context, rather than upscaling a single small image and looking blurry.",
    },
    {
      question: "Should my source image be square?",
      answer:
        "Yes, ideally — each generated size is a square render of your image, so a non-square source gets stretched to fit. Starting with a square image (or one with a centered subject) produces the cleanest result across every generated size.",
    },
    {
      question: "What's the difference between this and the Favicon Generator tool?",
      answer:
        "This tool produces just the single .ico file. The Favicon Generator produces a complete modern favicon package — the .ico plus every standard PNG size, an apple-touch-icon, and a web manifest file — for sites wanting full favicon coverage across all platforms.",
    },
    {
      question: "Does this use the old or new .ico format?",
      answer:
        "The modern PNG-embedded format, supported since Windows Vista and universally by web browsers — each size is stored as a plain PNG image within the .ico container, rather than the older raw bitmap format that's more complex and has more compatibility quirks.",
    },
    {
      question: "Is my image uploaded anywhere to create the .ico file?",
      answer:
        "No — every size is rendered and packaged entirely in your browser. The image is never uploaded to a server.",
    },
  ],
};
