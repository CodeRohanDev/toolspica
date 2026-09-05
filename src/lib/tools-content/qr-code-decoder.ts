import type { ToolContent } from "./types";

export const qrCodeDecoderContent: ToolContent = {
  heroSubtitle: "Decode a QR Code from an Image, No Camera Needed",
  overview: [
    "Reading a QR code from an image someone sent you, a screenshot, or a downloaded file usually means printing it out and scanning it with a phone camera — which feels backward when the QR code is already sitting on your screen as a digital image.",
    "This tool decodes a QR code directly from an uploaded image file — a screenshot, a photo, or an exported QR code graphic — and shows the exact decoded content, whether that's a URL, plain text, WiFi credentials, or contact information, without needing a phone or camera at all.",
    "If the decoded content is a web link, a direct \"Open link\" button appears so you can go straight there — for any other content type (plain text, a WiFi password, contact details), the raw decoded text is shown for you to copy.",
  ],
  howItWorks: [
    { title: "Upload a QR code image", description: "Choose any image file containing a QR code." },
    { title: "View the decoded content", description: "The exact encoded text or link is extracted instantly." },
    { title: "Copy or open", description: "Copy the text, or open it directly if it's a URL." },
  ],
  examples: [
    {
      label: "Decoding a link",
      input: "A screenshot of a QR code encoding https://example.com",
      output: "Decoded content: https://example.com, with an \"Open link\" button shown.",
    },
  ],
  faqs: [
    {
      question: "Do I need a working camera to use this?",
      answer:
        "No — this decodes directly from an uploaded image file, so it works on any device, including a desktop computer with no camera at all.",
    },
    {
      question: "What happens if the image doesn't contain a readable QR code?",
      answer:
        "A clear message tells you no QR code was found — this can happen if the image is too blurry, too small, or doesn't actually contain a QR code.",
    },
    {
      question: "Can this decode QR codes with a logo in the center?",
      answer:
        "Often yes, thanks to QR codes' built-in error correction that tolerates partial obstruction — but a very large logo can sometimes push a code past what's recoverable, in which case decoding will fail.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — decoding happens entirely in your browser. Nothing is uploaded to a server.",
    },
  ],
};
