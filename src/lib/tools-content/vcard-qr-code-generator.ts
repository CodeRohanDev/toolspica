import type { ToolContent } from "./types";

export const vcardQrCodeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Scannable Contact Card QR Code",
  overview: [
    "Exchanging contact details still often means one person reading their phone number aloud while the other carefully types it in — a vCard QR code replaces that entirely, letting a scan add a complete contact directly to a phone's address book with name, phone, email, and organization all included.",
    "This tool builds a standard vCard 3.0 formatted text block — the same contact-card format used by email clients, address books, and business card apps — and encodes it into a QR code. Scanning it with a modern phone's camera app recognizes the vCard format and offers to save it as a new contact immediately.",
    "Name is the only required field; phone, email, and organization are all optional, so the generated vCard includes exactly the fields you actually want to share. This keeps the encoded data compact, which also keeps the resulting QR code smaller and easier to scan.",
    "This is useful for a printed business card with a scannable contact code, a conference badge or networking event, an email signature, or any situation where sharing contact details as a quick scan beats manual entry. Everything is generated locally in your browser — your contact details are never sent anywhere.",
  ],
  howItWorks: [
    {
      title: "Enter your name and any contact details",
      description: "Phone, email, and organization are all optional.",
    },
    {
      title: "The vCard QR code generates instantly",
      description: "Built in the standard vCard 3.0 format phones recognize.",
    },
    {
      title: "Scan to save the contact, or download and print",
      description: "A phone's camera app offers to add it directly to contacts.",
    },
  ],
  examples: [
    {
      label: "Business contact example",
      input: "Name: Jane Doe, Organization: Acme Inc., Phone: +1 555 123 4567, Email: jane@example.com",
      output: "A scannable code that adds Jane's full contact card to a phone's address book",
    },
  ],
  faqs: [
    {
      question: "What happens when someone scans this code?",
      answer:
        "On most modern phones, scanning a vCard-formatted QR code with the native camera app recognizes it as contact information and offers to add it directly to the address book — no manual typing of any field required.",
    },
    {
      question: "Do I need to fill in every field?",
      answer:
        "No — only the name field is required. Phone, email, and organization are all optional, and the generated vCard includes only the fields you actually fill in, keeping the QR code as compact as possible.",
    },
    {
      question: "Is this the same vCard format used by email programs?",
      answer:
        "Yes — vCard 3.0 is a widely supported standard contact-card format used across email clients, phone address books, and business networking apps, which is exactly why scanning it produces a recognized \"add contact\" prompt rather than just showing raw text.",
    },
    {
      question: "Is my contact information sent to a server?",
      answer:
        "No — the vCard text and QR code are both generated entirely in your browser using local JavaScript. Your name, phone number, and email are never transmitted anywhere; they exist only as data encoded into the QR pattern on your own device.",
    },
    {
      question: "Can I add a home address or website to the vCard?",
      answer:
        "Not with this tool's current fields — it covers the most commonly shared details (name, organization, phone, email). For additional vCard fields, a full contact management tool would be needed instead.",
    },
  ],
};
