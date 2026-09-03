import type { ToolContent } from "./types";

export const emailValidatorContent: ToolContent = {
  heroSubtitle: "Check Email Address Syntax and Catch Common Typos",
  overview: [
    "Before adding an email address to a mailing list or a form submission, it's worth a quick syntax check — a missing @ symbol, a stray space, or a malformed domain will bounce every time. This tool validates one or many email addresses at once against standard email format rules, and flags them clearly as valid or invalid.",
    "Beyond basic syntax checking, it also catches a set of the most common domain typos — gmial.com instead of gmail.com, yaho.com instead of yahoo.com, and similar near-misses — and suggests the likely correct spelling. These typos are surprisingly common in manually entered email addresses and are exactly the kind of mistake that silently breaks email delivery.",
    "It's important to be clear about what this tool doesn't do: it checks format only, not whether the mailbox actually exists or accepts mail. True mailbox verification requires an SMTP handshake with the receiving mail server, which isn't something a browser-based tool can perform. For a genuine deliverability check on a large list, pair this format check with our Bulk Email List Verifier, which checks domain MX records.",
  ],
  howItWorks: [
    { title: "Paste one or more emails", description: "Separated by commas, spaces, or newlines." },
    { title: "Review the results", description: "Each email is marked valid or invalid format." },
    { title: "Fix flagged typos", description: "Common domain typos are automatically suggested." },
  ],
  examples: [
    { label: "Checking a signup list", input: "jane@gmial.com, valid@example.com", output: "jane@gmial.com — did you mean gmail.com?; valid@example.com — valid format" },
  ],
  faqs: [
    { question: "Does this confirm the email address actually exists?", answer: "No — it checks syntax only. Use the Bulk Email List Verifier for an additional domain MX record check, which gets closer to real deliverability confirmation." },
    { question: "Can I check multiple emails at once?", answer: "Yes — paste as many as you like, separated by commas, spaces, or newlines, and each gets validated individually." },
    { question: "What typos does it catch?", answer: "A set of the most common domain misspellings (gmial.com, yaho.com, hotmial.com, outlok.com, and similar), suggesting the likely correct domain." },
    { question: "Is my email list uploaded anywhere?", answer: "No — validation runs entirely in your browser." },
    { question: "Why did a valid-looking email get flagged as invalid?", answer: "Check for stray spaces, missing @ symbols, or a domain missing its top-level extension (like .com) — these are the most common causes." },
  ],
};
