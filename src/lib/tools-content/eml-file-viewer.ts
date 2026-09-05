import type { ToolContent } from "./types";

export const emlFileViewerContent: ToolContent = {
  heroSubtitle: "Read a .eml Email File Without an Email Client",
  overview: [
    "A .eml file — exported from Outlook, Apple Mail, Thunderbird, or downloaded from Gmail — is a plain-text MIME-formatted email that most systems can't open directly without launching a full email client just to read one message.",
    "This tool parses a .eml file's headers and body directly in your browser, showing the From, To, Subject, and Date fields clearly labeled, along with the readable plain-text body content — HTML formatting and tags in the message are stripped for a clean read.",
    "This handles both simple plain-text emails and multipart messages (the common case where an email includes both an HTML and plain-text version) — for multipart messages, the plain-text portion is extracted directly rather than showing raw MIME boundary markers.",
  ],
  howItWorks: [
    { title: "Upload a .eml file", description: "Choose an exported email file from your device." },
    { title: "Review the headers", description: "See From, To, Subject, and Date clearly labeled." },
    { title: "Read the body", description: "The message content is shown as clean, readable text." },
  ],
  examples: [
    {
      label: "Simple email",
      input: "A .eml file with a plain-text message",
      output: "From, To, Subject, and Date shown at the top, followed by the readable message body.",
    },
  ],
  faqs: [
    {
      question: "Does this show email attachments?",
      answer:
        "No — this focuses on displaying the message headers and body text. Attachments embedded in the .eml file aren't extracted or made downloadable.",
    },
    {
      question: "Does this handle HTML-formatted emails?",
      answer:
        "Yes — HTML tags are stripped from the body so you see the readable text content, rather than raw HTML markup or a fully rendered HTML layout.",
    },
    {
      question: "Where do I get a .eml file?",
      answer:
        "Most email clients (Outlook, Apple Mail, Thunderbird) support exporting or dragging an email out as a .eml file — Gmail requires a browser extension or the \"Show original\" + save-as workaround.",
    },
    {
      question: "Is my email file uploaded to a server?",
      answer:
        "No — parsing happens entirely in your browser. Nothing about the email's content is uploaded anywhere.",
    },
  ],
};
