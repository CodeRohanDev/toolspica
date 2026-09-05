import type { ToolContent } from "./types";

export const digitalSignatureMakerContent: ToolContent = {
  heroSubtitle: "Draw a Signature and Download It as an Image",
  overview: [
    "Signing a PDF, adding a personal touch to an email sign-off, or dropping a signature into a document template usually starts the same way: you need a clean image of your actual signature, drawn once, saved, and reused. Photographing a paper signature tends to produce a shadowed, off-white, badly-cropped result — drawing it directly produces a clean image on the first try.",
    "This tool gives you a drawing canvas you can sign on using a mouse, trackpad, or a finger on a touchscreen — the stroke is smooth and continuous, matching how signing on paper feels rather than a jagged pixel-by-pixel line. Once you're happy with it, download the result as a PNG image ready to insert into a document, PDF, or email signature.",
    "Signing digitally this way produces a genuine drawn image of your signature, not a cryptographically verified electronic signature (the kind used in legally binding e-signature platforms like DocuSign, which include audit trails and identity verification). Use this for visually signing documents, personalizing a template, or any case where an image of your signature is what's actually needed — not for signatures that require legal e-signature compliance.",
  ],
  howItWorks: [
    { title: "Draw your signature", description: "Sign in the box using your mouse, trackpad, or finger on a touch screen." },
    { title: "Clear and retry if needed", description: "Use the Clear button to start over as many times as you like." },
    { title: "Download as PNG", description: "Save the signature as an image file, ready to insert anywhere." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "Draw a signature, click Download PNG",
      output: "signature.png — a transparent-edged image of your drawn signature.",
    },
  ],
  faqs: [
    {
      question: "Is this a legally binding electronic signature?",
      answer:
        "No — this produces a plain image of a hand-drawn signature, not a cryptographically verified e-signature with identity checks and an audit trail. For legally binding document signing, use a dedicated e-signature service like DocuSign or HelloSign.",
    },
    {
      question: "Can I sign using my finger on a phone or tablet?",
      answer:
        "Yes — the canvas supports touch input, so you can draw your signature directly with a finger or stylus on a touchscreen device, not just a mouse or trackpad.",
    },
    {
      question: "What if I make a mistake while signing?",
      answer:
        "Click Clear to wipe the canvas and start over — there's no limit to how many times you can redraw before downloading.",
    },
    {
      question: "Is my signature image ever uploaded or stored?",
      answer:
        "No — the signature is drawn and saved entirely on your own device using your browser's canvas. Nothing is sent to a server at any point.",
    },
  ],
};
