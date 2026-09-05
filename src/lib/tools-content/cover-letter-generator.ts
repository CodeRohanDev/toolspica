import type { ToolContent } from "./types";

export const coverLetterGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Cover Letter Draft from Your Key Points",
  overview: [
    "A cover letter has one real job: connect your specific background to the specific role you're applying for, in a format that doesn't just repeat the resume. Getting the opening and structure right — stating the role, naming the company, and leading with the strongest relevant points — takes more setup thought than the actual writing, especially when applying to multiple positions and starting from a blank page each time.",
    "This tool takes your name, the company, the position, and a list of key qualifying points, then assembles them into a properly structured cover letter draft — an opening paragraph naming the specific role and company, a body listing your key points, and a closing paragraph — available both as copyable plain text and as a downloadable .docx file.",
    "This produces a solid structural draft with your actual details filled in, not a fully polished, uniquely-voiced letter — the opening and closing language is intentionally standard and professional, and the real customization happens in your key points list, which should be genuinely tailored to each specific job rather than reused verbatim across applications.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Your name, the company, the position, and key qualifying points." },
    { title: "Review the draft", description: "See a properly structured cover letter assembled from your input." },
    { title: "Copy or download", description: "Copy as plain text, or download as a .docx file." },
  ],
  examples: [
    {
      label: "Basic letter",
      input: "Name: Jane Doe, Company: Acme Inc., Position: Marketing Manager",
      output: "Dear Hiring Manager,\n\nI am writing to express my interest in the Marketing Manager role at Acme Inc...",
    },
  ],
  faqs: [
    {
      question: "Should I use this letter exactly as generated?",
      answer:
        "Treat it as a strong structural draft — the opening and closing are intentionally standard professional language, but your key points should be genuinely tailored to each specific job rather than reused verbatim across every application.",
    },
    {
      question: "How many key points should I include?",
      answer:
        "Two to four strong, specific points tend to work better than a long list — pick your most relevant qualifications for the specific role rather than everything from your resume.",
    },
    {
      question: "Can I address it to a specific hiring manager instead of \"Dear Hiring Manager\"?",
      answer:
        "Yes — the generated text uses a generic greeting by default, but you can edit it directly in the output before copying or after downloading the .docx.",
    },
    {
      question: "Is my information sent anywhere?",
      answer:
        "No — the letter is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
