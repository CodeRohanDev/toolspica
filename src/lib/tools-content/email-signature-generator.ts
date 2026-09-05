import type { ToolContent } from "./types";

export const emailSignatureGeneratorContent: ToolContent = {
  heroSubtitle: "Create a Professional Email Signature — Plain Text or HTML",
  overview: [
    "An email signature is one of the most repeated small pieces of writing in professional life — it appears on every single email you send, yet most people either skip it, leave it at just a name, or hand-build one inconsistently across different devices and email clients. A clean, consistent signature is a small but real professionalism signal, and it's genuinely useful for recipients who need your phone number or title without digging through a thread.",
    "This tool builds a complete signature from your name, title, company, phone, email, and website, and generates it in two formats at once: a plain-text version (safe to paste anywhere, including plain-text email clients) and an HTML version with basic styling (bold name, muted secondary details, a clickable website link) for email clients that support rich formatting like Gmail and Outlook.",
    "A live preview shows exactly how the HTML version will look before you copy anything, so there are no surprises after pasting it into your email client's signature settings. Both the plain-text and HTML output are generated directly from the fields you fill in — leave any field blank and it's simply omitted from the output rather than showing an empty placeholder line.",
  ],
  howItWorks: [
    { title: "Fill in your details", description: "Name, title, company, phone, email, and website — any field can be left blank." },
    { title: "Preview the result", description: "See exactly how the styled HTML signature will look." },
    { title: "Copy plain text or HTML", description: "Paste the plain-text version anywhere, or the HTML version into email clients that support rich signatures." },
  ],
  examples: [
    {
      label: "Filled-in signature",
      input: "Name: Jane Doe, Title: Marketing Manager, Company: Acme Inc.",
      output: "Jane Doe\nMarketing Manager at Acme Inc.\n[phone] | [email]",
    },
  ],
  faqs: [
    {
      question: "Which email clients support the HTML version?",
      answer:
        "Most modern email clients with signature settings — Gmail, Outlook, and Apple Mail all support pasting HTML-formatted signatures into their signature editor. Purely plain-text clients should use the plain-text version instead.",
    },
    {
      question: "How do I actually install this as my signature?",
      answer:
        "Copy the HTML (or plain-text) version, then paste it into your email client's signature settings — usually found under Settings > Signature in Gmail, or File > Options > Mail > Signatures in Outlook.",
    },
    {
      question: "Can I leave out fields I don't want to include?",
      answer:
        "Yes — every field is optional. Leaving a field blank simply omits that line from both the plain-text and HTML output, rather than showing an empty placeholder.",
    },
    {
      question: "Is my personal information sent anywhere?",
      answer:
        "No — the signature is generated entirely in your browser from what you type. Nothing is uploaded or stored.",
    },
  ],
};
