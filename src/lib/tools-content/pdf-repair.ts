import type { ToolContent } from "./types";

export const pdfRepairContent: ToolContent = {
  heroSubtitle: "Recover a Readable PDF From a Corrupted or Broken File",
  overview: [
    "A PDF that won't open — from an interrupted download, a bug in whatever software generated it, or file corruption from transfer or storage issues — is a frustrating dead end, especially when it's the only copy of something you need. Most PDF tools simply fail on a broken file the same way a viewer would. This tool takes a different approach: it leverages a deliberately fault-tolerant PDF parser, built specifically to keep working on real-world damaged files, and uses whatever it can still successfully read to rebuild a clean, viewable document.",
    "The underlying parsing engine (Mozilla's pdf.js, the same one that renders PDFs inside Firefox) is intentionally lenient about malformed structure, missing cross-reference tables, and other common forms of PDF corruption — where a strict parser would simply reject the file outright, this one does its best to recover as much of the document as it can still make sense of, which is exactly the behavior this repair tool relies on.",
    "Each page that can still be parsed is rendered to an image and used to build a brand-new, structurally sound PDF from scratch — this sidesteps whatever broken internal structure was causing the original file to fail, since the new file has clean, valid structure by construction rather than inheriting any of the original's problems.",
    "This has real limits: if a page's content is corrupted badly enough that even the lenient parser can't extract anything meaningful from it, that page can't be recovered — no repair tool can reconstruct data that no longer exists in a readable form anywhere in the file. And because every recovered page becomes a rendered image, the output's text is no longer selectable or searchable, a direct trade-off of the rebuild-from-render approach that makes recovery possible in the first place.",
  ],
  howItWorks: [
    { title: "Upload the damaged PDF", description: "Select the file that won't open normally." },
    { title: "Attempt repair", description: "Every page that can still be parsed is rendered and used to rebuild a fresh PDF." },
    { title: "Download the recovered file", description: "A new, structurally valid PDF is produced from whatever could be salvaged." },
  ],
  examples: [
    { label: "Recovering a corrupted download", input: "PDF that fails to open in standard viewers", output: "new, valid PDF rebuilt from whatever pages could still be parsed" },
  ],
  faqs: [
    { question: "Will this recover every page from a badly damaged file?", answer: "Only pages the lenient parser can still make some sense of — if a page's content is corrupted beyond what any parser can interpret, it can't be recovered, since there's no readable data left to rebuild from." },
    { question: "Why is the recovered PDF's text no longer selectable?", answer: "Recovery works by rendering each salvageable page to an image and rebuilding a fresh PDF from those images — this sidesteps the original file's broken structure entirely, but the trade-off is that recovered pages become pictures rather than keeping selectable text." },
    { question: "What kinds of corruption can this fix?", answer: "Issues like malformed cross-reference tables, incomplete downloads, or structural damage that a strict PDF parser would reject outright — cases where the lenient rendering engine can still successfully interpret the page content despite the surrounding structure being broken." },
    { question: "What if the tool says it couldn't recover anything?", answer: "This means even the fault-tolerant parser couldn't extract any readable content — at that point the file's damage is severe enough that no software-based repair approach is likely to succeed, and the original source of the file may need to be re-obtained." },
    { question: "Is this the same as PDF Unlock?", answer: "No — PDF Unlock removes password protection from an encrypted-but-otherwise-valid file; PDF Repair is for files with structural damage or corruption, whether or not they're encrypted. They use a similar render-and-rebuild technique but solve different problems." },
  ],
};
