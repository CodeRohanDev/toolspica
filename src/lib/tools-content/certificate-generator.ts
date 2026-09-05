import type { ToolContent } from "./types";

export const certificateGeneratorContent: ToolContent = {
  heroSubtitle: "Design a Certificate of Achievement or Completion",
  overview: [
    "A certificate marks a real accomplishment — finishing a course, completing training, winning a competition, volunteering — and the classic ornate-border, formal-serif-font certificate design signals \"this is worth printing and keeping\" in a way a plain congratulations email doesn't, even for something informal like an internal team recognition.",
    "This tool generates a classic certificate design — a decorative double border, a formal serif heading, the recipient's name in large ornamental text, a customizable achievement description, and issuer and date fields — filled in with your specific details and rendered as a downloadable, print-ready image.",
    "This uses one classic, formal certificate style rather than multiple design options — the ornate border and serif typography are deliberately traditional, matching what people expect a certificate to look like, since a certificate's whole visual purpose is to feel officially recognized rather than experimentally designed.",
  ],
  howItWorks: [
    { title: "Enter recipient and details", description: "Recipient name, the achievement or reason, issuer, and date." },
    { title: "Preview the certificate", description: "See the classic bordered design update live with your details." },
    { title: "Download and print", description: "Save as a PNG image, ready to print or share digitally." },
  ],
  examples: [
    {
      label: "Course completion",
      input: "Recipient: Jane Doe, Reason: Completion of the Web Development Course",
      output: "certificate.png — a formal certificate with Jane's name and the course name.",
    },
  ],
  faqs: [
    {
      question: "Can I use this for something informal, like a team award?",
      answer:
        "Yes — while the design is formal, the content is entirely up to you. It works equally well for a course completion, a workplace recognition, a competition award, or any achievement worth marking with a certificate.",
    },
    {
      question: "What size is the certificate designed for printing?",
      answer:
        "The output is sized for standard landscape printing — download it and print at your preferred paper size, or frame it digitally without printing at all.",
    },
    {
      question: "Can I change the border style or color scheme?",
      answer:
        "This tool uses one classic gold-and-cream certificate style rather than multiple design variants, matching the traditional look most people associate with a formal certificate.",
    },
    {
      question: "Is my information sent anywhere?",
      answer:
        "No — the certificate is generated entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
