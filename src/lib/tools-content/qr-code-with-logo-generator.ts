import type { ToolContent } from "./types";

export const qrCodeWithLogoGeneratorContent: ToolContent = {
  heroSubtitle: "Add a Logo to the Center of Your QR Code",
  overview: [
    "A plain black-and-white QR code works fine functionally, but a QR code with your own logo in the center immediately signals whose code it is before anyone even scans it — useful on business cards, product packaging, marketing materials, or event signage where brand recognition matters as much as the scan itself.",
    "This tool generates a standard QR code from any text or URL, then overlays an image you upload directly in the center, on a small white background box so the logo stays clearly visible against the black-and-white pattern around it. The QR code itself is generated locally using the same encoder as this site's plain QR Code Generator — your logo is composited onto it entirely in your browser.",
    "QR codes include built-in error correction specifically so a portion of the code can be obscured or damaged and still scan correctly — that's what makes placing a logo in the center possible at all. That said, a large logo covering more of the code than the error-correction margin can handle will make the code unreadable, so this tool keeps the logo to a modest size and it's worth testing the final result with your phone's camera before printing or publishing it anywhere.",
  ],
  howItWorks: [
    { title: "Enter your URL or text", description: "Type the content the QR code should encode." },
    { title: "Upload a logo", description: "Choose an image file to place in the center of the code." },
    { title: "Test and download", description: "Scan it with your phone camera to confirm it works, then download the PNG." },
  ],
  examples: [
    {
      label: "Business QR with logo",
      input: "URL: https://acme.com, Logo: company-icon.png",
      output: "A scannable QR code with the Acme logo centered on a white background.",
    },
  ],
  faqs: [
    {
      question: "Will adding a logo break the QR code's scannability?",
      answer:
        "Not if the logo stays reasonably small relative to the code — QR codes include error correction specifically to tolerate partial obstruction, but always test the final result with your phone's camera before using it anywhere important.",
    },
    {
      question: "What image formats can I use for the logo?",
      answer:
        "Any common image format your browser can display — PNG, JPG, or SVG (SVG will be rasterized). A logo with a transparent background (PNG) generally looks cleanest against the white box behind it.",
    },
    {
      question: "Can I control exactly how big the logo appears?",
      answer:
        "The logo size is fixed to a proportion of the overall code that keeps it comfortably within the code's error-correction tolerance — this avoids accidentally producing an unscannable code from an oversized logo.",
    },
    {
      question: "Is my logo image or the encoded content uploaded anywhere?",
      answer:
        "No — the QR code is generated and the logo composited entirely in your browser. Nothing is uploaded to a server.",
    },
  ],
};
