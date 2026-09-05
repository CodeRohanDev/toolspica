import type { ToolContent } from "./types";

export const signatureToTransparentPngConverterContent: ToolContent = {
  heroSubtitle: "Remove the White Background from a Photographed Signature",
  overview: [
    "A signature signed on paper and photographed or scanned always comes with a white (or off-white) background baked into the image — which looks fine printed on paper, but shows as an ugly white box the moment you paste it into a PDF, a colored document template, or over any background that isn't pure white. What you actually need is the ink strokes alone, with a transparent background.",
    "This tool takes a photographed or scanned signature image and makes every pixel above a brightness threshold transparent, leaving just the darker ink strokes visible — effectively a simple chroma-key operation tuned for white backgrounds rather than the green screens video editors use. A slider lets you adjust exactly how aggressive the white removal is, since lighting and scan quality vary a lot between photos.",
    "This works best on a signature photographed with reasonably even lighting on a plain white or light background — shadows, creases in the paper, or a background that isn't actually white can cause spots that don't get properly removed, or ink that fades out if the threshold is set too aggressively. The live preview with a checkerboard background lets you see exactly how transparent the result is before downloading.",
  ],
  howItWorks: [
    { title: "Upload a signature photo", description: "A signature photographed or scanned on a plain white background works best." },
    { title: "Adjust the threshold", description: "Fine-tune how aggressively white pixels are removed until the result looks clean." },
    { title: "Download the transparent PNG", description: "Save the result, ready to paste over any background." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A signature photographed on white paper",
      output: "signature-transparent.png — same ink strokes, transparent background.",
    },
  ],
  faqs: [
    {
      question: "Why does my signature still show a faint white halo after conversion?",
      answer:
        "This usually means the threshold is set too low, or the original photo has uneven lighting causing some near-white pixels to fall just below the cutoff — try raising the threshold slider, or retake the photo with more even, brighter lighting.",
    },
    {
      question: "Can this remove a colored background instead of white?",
      answer:
        "No — this specifically targets brightness (light pixels), so it works for white or very light backgrounds. A colored or patterned background would need a different removal approach.",
    },
    {
      question: "Why does part of my signature disappear at a high threshold?",
      answer:
        "A very light or thin pen stroke can fall above the brightness threshold along with the background, making it transparent too — lower the threshold slightly to preserve lighter strokes while still removing the background.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — the entire conversion happens in your browser using canvas pixel processing. Nothing is uploaded to a server.",
    },
  ],
};
