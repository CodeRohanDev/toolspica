import type { ToolContent } from "./types";

export const handwrittenSignatureGeneratorContent: ToolContent = {
  heroSubtitle: "Turn Your Typed Name Into a Signature-Style Image",
  overview: [
    "Not everyone can draw a convincing signature with a mouse or trackpad — hand-drawing tends to look shaky and inconsistent unless you have an actual pen tablet. Typing your name and rendering it in a cursive or handwriting-style font produces a cleaner, more consistent-looking signature image without needing any drawing skill at all.",
    "This tool takes your typed name and renders it in one of several signature-style fonts — elegant script, casual script, bold italic, and classic italic — so you can compare a few looks and pick whichever reads most like an actual signature to you. The result renders directly onto a canvas and downloads as a PNG image.",
    "Because this uses standard system fonts rendered through the browser's canvas API, the exact appearance can vary slightly by operating system if a specific script font isn't installed — browsers substitute a similar cursive font automatically in that case, so the general style is preserved even if the fallback font shown differs from device to device.",
  ],
  howItWorks: [
    { title: "Type your name", description: "Enter the name you want rendered as a signature." },
    { title: "Pick a style", description: "Choose from elegant, casual, bold, or classic signature styles." },
    { title: "Download as PNG", description: "Save the rendered signature as an image file." },
  ],
  examples: [
    {
      label: "Typed name",
      input: "Jane Doe, Elegant style",
      output: "signature.png — Jane Doe rendered in a cursive script font.",
    },
  ],
  faqs: [
    {
      question: "How is this different from the Digital Signature Maker tool?",
      answer:
        "Digital Signature Maker lets you hand-draw a signature with your mouse, trackpad, or finger. This tool instead renders your typed name in a signature-style font — a better option if you don't have a way to draw smoothly, or just prefer a more consistent, repeatable result.",
    },
    {
      question: "Will the font look exactly the same on every device?",
      answer:
        "Not necessarily — this uses fonts available on your operating system, and browsers substitute a similar cursive or script font automatically if the exact one isn't installed, so the general style is preserved even if the specific font differs.",
    },
    {
      question: "Is this a legally binding electronic signature?",
      answer:
        "No — like a hand-drawn signature image, this produces a visual signature graphic, not a cryptographically verified e-signature with identity checks. For legally binding document signing, use a dedicated e-signature service.",
    },
    {
      question: "Is my name sent anywhere?",
      answer:
        "No — the signature is rendered entirely in your browser using canvas. Nothing you type is uploaded or stored.",
    },
  ],
};
