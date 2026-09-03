import type { ToolContent } from "./types";

export const pdfRotateContent: ToolContent = {
  heroSubtitle: "Fix Sideways or Upside-Down Pages, One Click Per Page",
  overview: [
    "Scanned documents come out rotated more often than not — a stack fed through a scanner sideways, a phone photo taken in the wrong orientation, or a PDF exported from a program that got the page geometry wrong. Fixing this properly (not just viewing it rotated in your PDF reader, which doesn't change the underlying file) usually means finding software that can actually rewrite the page orientation and save it back out. This tool does exactly that, page by page or all at once.",
    "Each page is shown as a thumbnail you can click to rotate 90° clockwise, cycling through 90/180/270/0 with repeated clicks, so you can fix just the handful of sideways pages in an otherwise-correct document without touching the rest. A \"Rotate all 90°\" shortcut is also available for documents where every page came out rotated the same way, which is the more common case with scanner output.",
    "Under the hood, this doesn't touch the page content at all — it updates the PDF's page rotation property, which is a standard, lightweight instruction telling any PDF viewer or printer how many degrees to rotate the page before displaying it. That means the operation is instant and lossless: no re-rendering, no quality loss, and the change is respected by every standards-compliant PDF viewer, not just this tool.",
    "Because rotation is applied per-page and stacks with whatever rotation the page already had, a page that's already rotated 90° and gets another 90° click ends up at 180° — the thumbnail preview updates live so you can always see exactly what the final orientation will look like before downloading.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page thumbnails are rendered so you can see current orientation." },
    { title: "Click pages to rotate", description: "Each click rotates that page 90° clockwise, or use \"Rotate all\" for the whole document." },
    { title: "Download the fixed PDF", description: "Only pages you rotated are changed — everything else stays untouched." },
  ],
  examples: [
    { label: "Fixing a sideways scan", input: "12-page scanned contract, pages 3 and 7 landscape-rotated", output: "same 12-page PDF with pages 3 and 7 rotated upright" },
  ],
  faqs: [
    { question: "Does rotating change the actual page content or just how it displays?", answer: "It sets the PDF's page rotation property, a standard instruction every PDF viewer respects — the underlying content isn't redrawn or altered, so there's zero quality loss and the change is instant." },
    { question: "Can I rotate just some pages and leave others alone?", answer: "Yes — click each page's thumbnail individually. Only pages you click are changed; every other page keeps its original orientation." },
    { question: "What if a page is already rotated and I click it again?", answer: "Rotation is cumulative in 90° steps — clicking a page that's already at 90° moves it to 180°, then 270°, then back to 0°, cycling through all four orientations." },
    { question: "Will this work on a scanned PDF made of images?", answer: "Yes — rotation is a page-level property independent of whether the page contains vector text or a scanned image, so it works identically either way." },
    { question: "Can I rotate a password-protected PDF?", answer: "No — an encrypted PDF needs its password removed first. Run it through the PDF Unlock tool, then rotate the result." },
  ],
};
