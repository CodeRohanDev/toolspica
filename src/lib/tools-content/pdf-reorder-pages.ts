import type { ToolContent } from "./types";

export const pdfReorderPagesContent: ToolContent = {
  heroSubtitle: "Drag Pages Into the Right Order Before Sharing",
  overview: [
    "Pages end up in the wrong order more often than you'd expect: a scanner that fed sheets out of sequence, a document assembled from multiple exports, or a set of slides that needs to be resequenced before a presentation. Fixing this in most PDF viewers means extracting individual pages and re-merging them by hand — tedious for anything beyond a couple of pages. This tool shows every page as a thumbnail and lets you move them into the right order directly.",
    "Each thumbnail has up and down arrows that swap it with its neighbor, and the current position alongside its original page number is shown underneath, so it's always clear both where a page is now and where it came from. This makes it easy to spot-check that a reordering was done correctly before committing to the download.",
    "The reordered output is built by copying pages as PDF objects in their new sequence, not by re-rendering anything — so vector text stays selectable, embedded fonts and images stay untouched, and there's no quality loss from the reordering itself. The download button only activates once the order actually differs from the original, so there's no risk of accidentally re-downloading an unchanged file.",
    "Because reordering is a pure rearrangement, the output always has the same number of pages as the input — it's a companion tool to Extract Pages and Delete Pages, which change the page count, while this one only changes the sequence.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page thumbnails are rendered in their current order." },
    { title: "Move pages with the arrows", description: "Use ↑ and ↓ on each thumbnail to shift it earlier or later." },
    { title: "Download the reordered PDF", description: "A new PDF with pages in your chosen sequence is created." },
  ],
  examples: [
    { label: "Fixing scanner order", input: "10-page scan output in reverse order", output: "same 10 pages reordered front-to-back" },
  ],
  faqs: [
    { question: "Does reordering change how many pages are in the file?", answer: "No — reordering only changes the sequence; every page from the original document is present in the output, just possibly in a different position." },
    { question: "Can I move a page more than one position at a time?", answer: "Each click moves a page one position up or down — for a large jump, click repeatedly. This keeps the interaction predictable and avoids accidental large jumps." },
    { question: "Does reordering affect page quality or text selectability?", answer: "No — pages are copied as PDF objects in their new order, not re-rendered as images, so vector text, fonts, and image quality are all preserved exactly." },
    { question: "How can I tell which original page is now in which position?", answer: "Each thumbnail shows both its new position and its original page number (e.g. \"3 (was 7)\"), so you can verify the reordering is correct before downloading." },
    { question: "Can I reorder pages in a password-protected PDF?", answer: "Not directly — remove the password first with PDF Unlock, then reorder the resulting file." },
  ],
};
