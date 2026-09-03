import type { ToolContent } from "./types";

export const pdfSignerContent: ToolContent = {
  heroSubtitle: "Draw a Signature and Place It Anywhere on a PDF Page",
  overview: [
    "Signing a printed document just to scan it back in is an unnecessary round trip for anything that doesn't require a legally certified digital signature — an internal approval, an informal agreement, or any document where a visual signature is all that's actually needed. This tool lets you draw your signature directly with a mouse or touchscreen and place it precisely wherever you want on any page.",
    "The signature pad captures your freehand drawing as you move your pointer across it, and can be cleared and redrawn as many times as needed before you're happy with it. Once drawn, click anywhere on the page preview to set exactly where the signature should land — a small marker shows your selected position before you commit, so you can adjust placement before finalizing.",
    "Technically, the drawn signature is captured as a small PNG image and embedded onto the chosen page at roughly a quarter of the page's width, scaled proportionally to the signature pad's own aspect ratio so it doesn't appear stretched or distorted. This is placed as a genuine image element on the PDF page, positioned precisely at the coordinates you clicked.",
    "It's important to understand what this tool does and doesn't do: it places a visual signature image — the same as pasting in a picture of your handwriting — not a cryptographic, certificate-based digital signature backed by PKI infrastructure that some legal and financial contexts specifically require. For documents needing that level of verifiable, legally-binding digital signing, dedicated certificate-based e-signature software is the correct tool, not this one.",
  ],
  howItWorks: [
    { title: "Draw your signature", description: "Sketch it with your mouse or finger on the signature pad." },
    { title: "Click where it should go", description: "Choose the page and click the exact spot for your signature." },
    { title: "Place and download", description: "The signature image is embedded onto the page at that position." },
  ],
  examples: [
    { label: "Signing an internal approval form", input: "1-page approval form", output: "same PDF with a drawn signature placed in the signature box" },
  ],
  faqs: [
    { question: "Is this a legally binding digital signature?", answer: "No — this places a visual signature image onto the page, similar to pasting in a picture of your handwriting. It's not a cryptographic, certificate-based digital signature backed by PKI, which is what many legal and financial contexts specifically require." },
    { question: "Can I sign multiple pages in one pass?", answer: "This tool places one signature on one chosen page per use — for multiple pages, repeat the process on the resulting file for each additional page that needs a signature." },
    { question: "Can I resize the signature after placing it?", answer: "The signature is sized automatically to about a quarter of the page's width, proportional to your drawing — there's no separate resize control, so redraw at a different size on the pad if you want a different final size." },
    { question: "What if my drawn signature looks messy or I make a mistake?", answer: "Use the eraser button next to the signature pad to clear it completely and redraw as many times as you need before placing it on the page." },
    { question: "Can I sign a password-protected PDF?", answer: "Not directly — remove the password first with PDF Unlock, then sign the resulting file." },
  ],
};
