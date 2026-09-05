import type { ToolContent } from "./types";

export const barcodeDecoderContent: ToolContent = {
  heroSubtitle: "Decode a Barcode from an Image, No Scanner Needed",
  overview: [
    "Reading a barcode from a photo, a screenshot, or a product image usually means having a physical barcode scanner or a phone's camera app — not much help when the barcode is already a digital image sitting on your screen or in a file you were sent.",
    "This tool decodes common 1D barcode formats — UPC, EAN, Code 128, Code 39, ITF, and others — directly from an uploaded image, showing both the decoded text content and the detected barcode format, without needing a camera or physical scanner.",
    "This is a genuinely different tool from a camera-based barcode scanner — it works from any static image you already have, which is more convenient when the barcode is in a screenshot, a downloaded product photo, or an email attachment rather than something in front of a live camera.",
  ],
  howItWorks: [
    { title: "Upload a barcode image", description: "Choose any image containing a barcode." },
    { title: "View the decoded content", description: "The exact encoded text and detected format are shown." },
    { title: "Copy the result", description: "Copy the decoded value for use elsewhere." },
  ],
  examples: [
    {
      label: "Product barcode",
      input: "A photo of a product's UPC barcode",
      output: "Format: UPC_A, Decoded content: 012345678905",
    },
  ],
  faqs: [
    {
      question: "Which barcode formats does this support?",
      answer:
        "Common 1D formats including UPC-A, UPC-E, EAN-8, EAN-13, Code 128, Code 39, and ITF — covering the vast majority of retail product barcodes and shipping labels.",
    },
    {
      question: "Does this also decode QR codes?",
      answer:
        "This tool focuses on 1D barcode formats. For QR codes specifically, use this site's dedicated QR Code Decoder tool.",
    },
    {
      question: "Why did decoding fail on my image?",
      answer:
        "Barcode decoding needs reasonable image quality and contrast — a blurry photo, extreme angle, or very low resolution can prevent successful decoding even when a barcode is visible.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — decoding happens entirely in your browser. Nothing is uploaded to a server.",
    },
  ],
};
