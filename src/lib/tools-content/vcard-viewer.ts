import type { ToolContent } from "./types";

export const vcardViewerContent: ToolContent = {
  heroSubtitle: "View vCard (.vcf) Contact File Details",
  overview: [
    "A .vcf contact file's raw content is structured but not exactly pleasant to read directly — a flat list of prefixed lines like FN:, TEL:, and EMAIL: that require knowing the vCard format's field abbreviations to understand at a glance.",
    "This tool parses one or more vCards from a .vcf file and displays each contact as a readable card — name, job title and organization, phone numbers, and email addresses laid out clearly, the way a contacts app would show them rather than raw field codes.",
    "Multiple contacts in a single .vcf file (a common export format when sharing several contacts at once) are all parsed and displayed as separate cards, so you can review an entire exported contact list at once rather than one file per person.",
  ],
  howItWorks: [
    { title: "Paste or upload a .vcf file", description: "Paste the vCard content directly, or upload the file." },
    { title: "Review the contact cards", description: "See name, title, organization, phone, and email clearly laid out." },
    { title: "Check multiple contacts at once", description: "A .vcf file with several vCards shows every contact as its own card." },
  ],
  examples: [
    {
      label: "Simple vCard",
      input: "BEGIN:VCARD\nFN:Jane Doe\nEMAIL:jane@example.com\nEND:VCARD",
      output: "A contact card showing \"Jane Doe\" with jane@example.com listed.",
    },
  ],
  faqs: [
    {
      question: "Can this view a .vcf file with multiple contacts?",
      answer:
        "Yes — every vCard block found in the file (each starting with BEGIN:VCARD) is parsed and shown as its own separate contact card.",
    },
    {
      question: "What vCard fields does this display?",
      answer:
        "Full name, title, organization, phone numbers, and email addresses — the most commonly used fields across standard vCard exports from contact apps and email clients.",
    },
    {
      question: "Does this let me edit or export the contacts?",
      answer:
        "No — this is a read-only viewer for inspecting vCard contents. Use your contacts app to import or edit the actual .vcf file.",
    },
    {
      question: "Is my contact data sent anywhere?",
      answer:
        "No — parsing happens entirely in your browser. Nothing you paste or upload is sent to a server.",
    },
  ],
};
