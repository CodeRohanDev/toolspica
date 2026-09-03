import type { ToolContent } from "./types";

export const businessCardOcrContent: ToolContent = {
  heroSubtitle: "Scan a Business Card Into a Ready-to-Import Contact File",
  overview: [
    "A stack of business cards from a conference or meeting is only useful once the contact details are actually in your phone or contacts app — manually typing each one is tedious. This tool recognizes the card's text (via Tesseract, compiled to WebAssembly, entirely in your browser) and picks out an email address and phone number using pattern matching, then builds a standard .vcf contact file.",
    "Email detection matches the standard email address pattern anywhere in the recognized text; phone number detection matches a run of digits (with optional spacing, dashes, or a country code) long enough to plausibly be a phone number. The remaining text lines are used as a best-guess for name and organization.",
    "The resulting .vcf file uses the standard vCard format that every major contacts app (iPhone, Android, Outlook, Gmail) can import directly — no manual re-entry needed once you download it.",
    "Field detection here is genuinely heuristic, not a trained business-card-parsing model — always review the generated card before importing, since business card layouts vary enormously and the pattern matching can occasionally pick the wrong line for a name or miss a secondary phone number.",
  ],
  howItWorks: [
    { title: "Upload a photo of the business card", description: "A clear, well-lit, straight-on photo works best." },
    { title: "Text is recognized and parsed", description: "Email and phone are detected by pattern; the rest becomes name/org." },
    { title: "Download the .vcf contact file", description: "Import directly into any contacts app." },
  ],
  examples: [
    { label: "Digitizing a conference business card", input: "photo of a business card", output: "a .vcf file ready to import into Contacts" },
  ],
  faqs: [
    { question: "How accurate is the name/organization detection?", answer: "This is heuristic, not a trained model — it makes a best guess based on line position after removing lines matching email/phone patterns. Always review the generated card before importing." },
    { question: "Is my business card content uploaded anywhere?", answer: "No — recognition and parsing both run entirely in your browser via WebAssembly." },
    { question: "What if the card has two phone numbers?", answer: "Only the first matching phone number is captured — a second number (mobile vs. office, for example) won't be included automatically." },
    { question: "Can I edit the vCard before importing it?", answer: "The generated .vcf is plain text — you can open it in any text editor to correct fields before importing it into your contacts app." },
    { question: "Will this work on cards in languages other than English?", answer: "Recognition uses an English-trained model, so non-Latin scripts will recognize poorly — email and phone number patterns will still work since those use standard characters regardless." },
  ],
};
