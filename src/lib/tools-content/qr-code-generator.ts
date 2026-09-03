import type { ToolContent } from "./types";

export const qrCodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a QR Code From Any Text or URL",
  overview: [
    "A QR code encodes text data into a scannable square pattern of black and white modules, readable instantly by any modern smartphone camera. This tool generates a real, standards-compliant QR code entirely in your browser — from a URL, a message, or any text — using a from-scratch implementation of the QR code specification (ISO/IEC 18004), including proper Reed-Solomon error correction.",
    "Reed-Solomon error correction is what makes a QR code scannable even when partially damaged, dirty, or printed at an angle — a portion of the encoded data can be reconstructed mathematically even if some modules are misread. This tool builds that error correction into every generated code, at error correction level M (roughly 15% of the code can be damaged and still scan correctly).",
    "The tool automatically selects the smallest QR version (module grid size) that fits your text, since a shorter message produces a smaller, simpler code that's easier and faster to scan, while a longer message requires a larger grid to hold the additional data plus its error correction.",
    "This is useful for sharing a link without typing it out, adding a scannable code to a printed flyer or business card, or generating a code for any short message that's more convenient to scan than to type. Everything happens locally — the text you enter is never sent anywhere.",
  ],
  howItWorks: [
    {
      title: "Enter your text or URL",
      description: "Any message, link, or short text.",
    },
    {
      title: "The QR code generates instantly",
      description: "Built entirely in your browser with real error correction.",
    },
    {
      title: "Download as PNG",
      description: "Ready to print, embed, or share.",
    },
  ],
  examples: [
    {
      label: "Encoding a URL",
      input: "https://toolspica.cloud",
      output: "A scannable QR code linking directly to that URL",
    },
  ],
  faqs: [
    {
      question: "How much text can this QR code generator handle?",
      answer:
        "This tool supports QR versions 1 through 6, comfortably handling typical URLs, short messages, and structured data like WiFi credentials or contact details — roughly up to 100 characters of mixed-case text. Longer text will show a clear error rather than producing an invalid code.",
    },
    {
      question: "Is my text sent to a server to generate the QR code?",
      answer:
        "No — the entire QR code, including the Reed-Solomon error correction and module layout, is calculated and rendered locally in your browser using JavaScript. Nothing you enter is ever transmitted anywhere.",
    },
    {
      question: "What is error correction level M?",
      answer:
        "QR codes support four error correction levels (L, M, Q, H), trading off code capacity against damage tolerance. Level M (used here) allows roughly 15% of the code to be unreadable or damaged while still scanning correctly — a solid middle-ground balance for general use.",
    },
    {
      question: "Can I put a logo in the middle of this QR code?",
      answer:
        "Not with this tool — adding a logo overlay requires additional design work and a higher error correction level to compensate for the obscured area. A dedicated QR Code with Logo tool handles that specific use case.",
    },
    {
      question: "Will this QR code work when printed small?",
      answer:
        "Yes, as long as the printed size maintains enough resolution for a scanner to distinguish individual modules — a good rule of thumb is keeping each module at least 2-3mm when printed, which for most short-text codes means a minimum printed size of roughly 2x2cm.",
    },
  ],
};
