import type { ToolContent } from "./types";

export const upcEanGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a UPC-A or EAN-13 Product Barcode",
  overview: [
    "UPC-A and EAN-13 are the standard barcode formats printed on virtually every retail product worldwide — UPC-A (12 digits) is the standard in the US and Canada, while EAN-13 (13 digits) is the international standard used across most of the rest of the world. This tool generates a real, correctly encoded barcode in either format, entirely in your browser.",
    "The last digit of both formats is a check digit, calculated automatically from the preceding digits using the standard mod-10 checksum algorithm — this is what allows a scanner to detect a misread digit, since an incorrect check digit immediately signals a scanning or data error. You only need to enter the product digits; the check digit is computed correctly for you.",
    "UPC-A is technically encoded here as EAN-13 with a leading zero — this is the standard, universally compatible approach, since every EAN-13 scanner (which is virtually all modern point-of-sale hardware) correctly reads a leading-zero EAN-13 as the equivalent UPC-A code.",
    "The bar pattern itself follows the precise EAN/UPC encoding standard — each digit's specific bar-and-space pattern, plus the guard patterns marking the start, center, and end of the code — verified in this tool's implementation against real, independently known reference barcode values to confirm correctness.",
  ],
  howItWorks: [
    {
      title: "Choose EAN-13 or UPC-A",
      description: "13-digit international format, or 12-digit US/Canada format.",
    },
    {
      title: "Enter the product digits",
      description: "12 digits for EAN-13, 11 for UPC-A — the check digit is calculated for you.",
    },
    {
      title: "Download the barcode as PNG",
      description: "Ready to print on packaging or a product label.",
    },
  ],
  examples: [
    {
      label: "EAN-13 example",
      input: "400638133393 (12 digits entered)",
      output: "4006381333931 (check digit 1 calculated automatically)",
    },
    {
      label: "UPC-A example",
      input: "03600029145 (11 digits entered)",
      output: "036000291452 (check digit 2 calculated automatically)",
    },
  ],
  faqs: [
    {
      question: "What's the difference between UPC-A and EAN-13?",
      answer:
        "UPC-A uses 12 digits and is the standard in the US and Canada. EAN-13 uses 13 digits and is the international standard used across most of the rest of the world. A UPC-A code is technically a special case of EAN-13 with a leading zero, which is why EAN-13 scanners can read UPC-A codes without any special handling.",
    },
    {
      question: "How is the check digit calculated?",
      answer:
        "The standard mod-10 algorithm sums the digits with alternating weights (each digit in an even position multiplied by 1, each in an odd position multiplied by 3, using a specific 0-indexed convention), then calculates what final digit would make the total a multiple of 10 — this tool applies that exact standard algorithm automatically.",
    },
    {
      question: "Can I use any 12-digit number for EAN-13, or does it need to be officially assigned?",
      answer:
        "This tool generates a technically valid, correctly encoded barcode from any 12 digits you enter — but for an actual retail product sold through real point-of-sale systems, the leading digits need to come from an officially assigned GS1 manufacturer prefix, not an arbitrary number, to avoid colliding with another company's product code.",
    },
    {
      question: "Will this barcode scan correctly at a real checkout register?",
      answer:
        "The barcode follows the correct EAN-13/UPC-A encoding standard and includes a correctly calculated check digit, so it will scan and decode accurately as that exact numeric code — whether it's recognized as an actual product in a specific store's system depends on whether that code is registered in their inventory database, which is separate from the barcode's technical validity.",
    },
    {
      question: "Why does UPC-A require exactly 11 digits of input instead of 12?",
      answer:
        "UPC-A's full code is 12 digits total, with the last digit being the calculated check digit — so 11 digits of actual product data plus 1 calculated check digit makes the complete 12-digit code, matching how this tool asks for exactly the digits you need to supply.",
    },
  ],
};
