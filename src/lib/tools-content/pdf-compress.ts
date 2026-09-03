import type { ToolContent } from "./types";

export const pdfCompressContent: ToolContent = {
  heroSubtitle: "Shrink a Large PDF for Email or Upload Limits",
  overview: [
    "A PDF full of high-resolution scans or images can quickly balloon to a size that's awkward to email, slow to upload, or over a hard limit set by whatever service you're sending it to. This tool shrinks a PDF's file size by re-rendering every page as a compressed image at a resolution and quality level you control, trading some fidelity for a dramatically smaller file — most effective on image-heavy or scanned documents where there's real compression headroom to reclaim.",
    "Two sliders control the trade-off: image quality (how aggressively JPEG compression discards detail, from 20% for maximum shrinkage to 95% for near-original fidelity) and resolution (a scale multiplier from 0.75x to 2.5x controlling how many pixels each rendered page contains). Lower values on either produce smaller files at the cost of visual fidelity, and the two interact — a document only needs enough resolution to look good at its intended viewing size, so dropping resolution before dropping quality percentage is often the more effective lever.",
    "Under the hood, every page is rendered to a canvas at the chosen scale, exported as a JPEG at the chosen quality, and re-embedded as a full-page image in a freshly built PDF — this is fundamentally different from optimizing an existing PDF's internal image streams (which some server-side compressors do), and it's why this approach works even on PDFs with vector text or graphics, not just ones already full of images.",
    "The size before and after is shown once compression completes, so you can judge whether the result meets your target size before committing to the download. Because every page becomes a rendered image, the output's text is no longer selectable or searchable — a real trade-off inherent to this approach, and one worth knowing about if the document's text needs to remain searchable after compressing.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "The file loads ready for compression." },
    { title: "Adjust quality and resolution", description: "Lower values shrink the file more; higher values preserve more detail." },
    { title: "Compress and download", description: "See the before/after size, then download the smaller PDF." },
  ],
  examples: [
    { label: "Shrinking a scanned document for email", input: "18 MB scanned PDF, 60% quality, 1.5x resolution", output: "~4 MB PDF, dramatically smaller and still readable" },
  ],
  faqs: [
    { question: "Will my PDF's text still be selectable after compressing?", answer: "No — every page is re-rendered as a compressed image, so text becomes part of the picture rather than selectable text. This is the trade-off that makes such large size reductions possible, especially on scanned documents." },
    { question: "What settings should I use for the smallest possible file?", answer: "Lower resolution first (0.75x-1x) since it has the biggest impact on file size, then lower quality if you need to shrink further — very low quality settings can introduce visible JPEG artifacts, so it's worth checking the result before relying on the smallest setting." },
    { question: "Does this work well on PDFs that are mostly text, not images?", answer: "Less dramatically — text-based PDFs are already compact since vector text takes very little space, so compressing them this way mostly just converts efficient text into a less efficient image, sometimes resulting in a similar or even larger file. This tool is most effective on image-heavy or scanned PDFs." },
    { question: "Can I compress a password-protected PDF?", answer: "Not directly — remove the password first with PDF Unlock, then compress the resulting file." },
    { question: "Is there a way to compress without losing text selectability?", answer: "Not with this approach, since compressing by re-rendering pages is what enables such large size reductions — if keeping selectable text is essential, reducing embedded image resolution in the original source document (before exporting to PDF) is a better route." },
  ],
};
