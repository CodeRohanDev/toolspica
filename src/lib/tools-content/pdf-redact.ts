import type { ToolContent } from "./types";

export const pdfRedactContent: ToolContent = {
  heroSubtitle: "Permanently Black Out Sensitive Text — Not Just Cover It",
  overview: [
    "A huge number of \"redacted\" documents circulating online have been redacted incorrectly — a black box drawn on top of text in a PDF editor, which looks hidden visually but leaves the original text still fully present and extractable underneath, recoverable by anyone who selects the text, copies it, or opens the file's raw structure. This has caused real, embarrassing information leaks. This tool is built specifically to avoid that failure mode.",
    "You mark the areas to redact by dragging a box directly over the sensitive content on each page's preview — social security numbers, names, account details, or any other content that needs to disappear completely, not just visually. Multiple boxes can be marked per page, and boxes can be removed individually if you change your mind before finalizing.",
    "The critical difference from a fake redaction: pages you mark are rendered to a bitmap image first, the black boxes are drawn directly into those pixels, and only then is a new PDF built from that flattened image. Because the black box is baked into the same pixel layer as the text it covers — rather than drawn as a separate object on top of untouched vector text — there is no underlying text data left anywhere in the output for anyone to extract, select, or recover. What you see is genuinely all that's there.",
    "Pages with no marked redaction areas are copied through completely unchanged, preserving their original text-selectable, searchable content — only pages you actually mark get rasterized and lose text-selectability, which is the necessary and expected trade-off for those specific pages in exchange for a redaction that's actually secure.",
  ],
  howItWorks: [
    { title: "Upload your PDF", description: "Page previews are rendered for you to review." },
    { title: "Drag boxes over sensitive content", description: "Mark every area that needs to be permanently blacked out, per page." },
    { title: "Redact and download", description: "Marked areas are rasterized with black boxes baked into the pixels — permanently." },
  ],
  examples: [
    { label: "Redacting an account number", input: "1-page statement, account number boxed", output: "same page with that number permanently blacked out, unrecoverable" },
  ],
  faqs: [
    { question: "How is this different from just drawing a black box over text in a PDF editor?", answer: "A black box drawn as a separate object on top of vector text leaves the original text fully intact and extractable underneath — copy-pasting or inspecting the file's structure would reveal it. This tool rasterizes the page and bakes the black box directly into the same pixel data as the text, so there's genuinely nothing left to recover." },
    { question: "Will pages I don't mark lose their selectable text?", answer: "No — only pages where you actually drag a redaction box get rasterized. Every other page is copied through completely unchanged, keeping its original selectable, searchable text." },
    { question: "Can someone recover the redacted content from the file's metadata or hidden layers?", answer: "No — because the redacted page is a flattened image with the black box already baked into the same pixels as the covered content, there's no separate text layer, hidden object, or metadata trace of the original content on that page." },
    { question: "Can I preview exactly what will be redacted before finalizing?", answer: "Yes — each marked box is shown as a black overlay on the page preview immediately, and you can remove any box before running the final redaction if you need to adjust it." },
    { question: "Can I redact a password-protected PDF?", answer: "Not directly — remove the password first with PDF Unlock, then redact the resulting file." },
  ],
};
