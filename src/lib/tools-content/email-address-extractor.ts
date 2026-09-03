import type { ToolContent } from "./types";

export const emailAddressExtractorContent: ToolContent = {
  heroSubtitle: "Pull Every Email Address Out of Any Block of Text",
  overview: [
    "Whether you've got an exported email thread, a scraped webpage, a PDF's copied text, or a long list of contacts pasted from somewhere else, manually hunting through it for every email address is tedious and error-prone. This tool scans any pasted text and instantly pulls out every valid-looking email address it finds, automatically deduplicated and lowercased.",
    "The extraction uses a standard email-matching pattern that catches the vast majority of real-world addresses, including ones buried in the middle of sentences, separated by commas, or mixed in with other text and punctuation. Results are deduplicated automatically, so if the same address appears five times in a document, it shows up once in your list.",
    "This is genuinely useful for quickly building a contact list from a document, auditing what email addresses appear on a page's source, or extracting recipients from a forwarded thread without manually copying each one individually.",
  ],
  howItWorks: [
    { title: "Paste your text", description: "Any document, webpage content, or email thread." },
    { title: "Review extracted emails", description: "Every unique address found, automatically deduplicated." },
    { title: "Copy the list", description: "One click copies all extracted addresses." },
  ],
  examples: [
    { label: "Extracting from a forwarded thread", input: "An email chain with 12 people cc'd", output: "12 unique email addresses, deduplicated and listed" },
  ],
  faqs: [
    { question: "Does this catch every possible email format?", answer: "It catches the vast majority of standard email formats; extremely unusual or non-standard addresses may occasionally be missed." },
    { question: "Are duplicate addresses removed automatically?", answer: "Yes — the same address appearing multiple times in your text is deduplicated and shown only once." },
    { question: "Is the extracted list sorted?", answer: "No — addresses appear in the order they were found in your text." },
    { question: "Is my pasted text uploaded anywhere?", answer: "No — extraction happens entirely in your browser." },
    { question: "Can I extract emails from a PDF?", answer: "Yes — copy the text out of your PDF viewer first, then paste it here; this tool works on any plain text." },
  ],
};
