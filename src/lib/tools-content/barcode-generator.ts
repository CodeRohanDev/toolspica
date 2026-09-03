import type { ToolContent } from "./types";

export const barcodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Code 39 Barcode From Text",
  overview: [
    "Barcodes encode text into a pattern of parallel bars and spaces of varying widths, readable instantly by a barcode scanner. This tool generates a real Code 39 barcode — one of the most widely supported general-purpose barcode formats — entirely in your browser, from any text made up of letters, numbers, and a handful of common symbols.",
    "Code 39 gets its name from encoding each character as 9 elements (5 bars, 4 spaces), where exactly 3 of the 9 are \"wide\" and the rest \"narrow\" — a self-checking structural pattern that's part of why the format remains so reliably readable across decades of barcode scanner hardware, from dedicated retail scanners to modern phone camera apps.",
    "Every Code 39 barcode is automatically wrapped with a start and stop character (an asterisk, rendered as part of the barcode pattern itself, not literal text) — this is a required part of the standard that tells a scanner exactly where the encoded data begins and ends.",
    "This is useful for inventory labeling, asset tracking tags, internal tracking codes, or any general-purpose barcode need where the encoded content is alphanumeric text rather than a formal product identifier — for scannable retail product barcodes specifically, the dedicated UPC/EAN Generator uses the correct product barcode standard instead.",
  ],
  howItWorks: [
    {
      title: "Enter the text to encode",
      description: "Letters, numbers, spaces, and $ / + % are supported.",
    },
    {
      title: "The barcode generates instantly",
      description: "Built as a standard Code 39 pattern, readable by virtually any scanner.",
    },
    {
      title: "Download as PNG",
      description: "Ready to print or embed in a label.",
    },
  ],
  examples: [
    {
      label: "Encoding an inventory code",
      input: "ITEM-4521",
      output: "A scannable Code 39 barcode representing that exact text",
    },
  ],
  faqs: [
    {
      question: "Why can't I encode lowercase letters or every symbol?",
      answer:
        "Code 39's standard character set is deliberately limited to uppercase letters, digits, space, and a small set of symbols ($ / + %) — lowercase input is automatically converted to uppercase, and characters outside the supported set aren't part of the Code 39 standard.",
    },
    {
      question: "What does the asterisk at each end of the barcode mean?",
      answer:
        "The asterisk is Code 39's required start/stop character, marking exactly where the encoded data begins and ends — it's part of every valid Code 39 barcode and is rendered as part of the bar pattern itself, not as literal encoded text content.",
    },
    {
      question: "Will this barcode work with a standard barcode scanner?",
      answer:
        "Yes — Code 39 is one of the most widely supported barcode formats, readable by virtually every dedicated barcode scanner and most phone-camera-based scanning apps, having been a de facto standard since the 1970s.",
    },
    {
      question: "Is Code 39 the same as the barcode on retail products?",
      answer:
        "No — retail product barcodes use UPC-A or EAN-13, a numeric-only format with a specific check-digit structure recognized by point-of-sale systems. Code 39 is a general-purpose alphanumeric format, better suited for internal tracking than formal retail product identification — use the dedicated UPC/EAN Generator for retail product barcodes.",
    },
    {
      question: "Why is each character encoded with exactly 3 wide elements?",
      answer:
        "This is a defining structural rule of the Code 39 standard — every valid character's 9-element pattern has exactly 3 wide and 6 narrow elements, a self-checking property that helps a scanner reliably distinguish valid characters from scanning errors or noise.",
    },
  ],
};
