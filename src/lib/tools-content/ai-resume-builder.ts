import type { ToolContent } from "./types";

export const aiResumeBuilderContent: ToolContent = {
  heroSubtitle: "Fill In a Form, Get a Clean Single-Column Resume PDF",
  overview: [
    "Most resume builders either lock the good templates behind a paywall or require an account before you can download anything. This one skips both: fill in your name, summary, experience, education, and skills, and get a clean, professionally formatted PDF back immediately — generated locally with pdf-lib, with automatic text wrapping and page breaks so long entries never get cut off.",
    "The layout is a single-column format that's friendly to both human recruiters and the automated applicant tracking systems (ATS) many companies use to scan resumes before a person ever sees them — no tables, columns, or graphics that can confuse a parser. Section headings, spacing, and font sizing are handled automatically, so you can focus purely on the content.",
    "It's honestly a smart formatting algorithm, not a generative AI model — it doesn't write your bullet points for you or invent experience. You provide the real content; the tool handles typography, wrapping, and page layout so the result looks considered rather than dashed off in a word processor.",
  ],
  howItWorks: [
    { title: "Fill in your details", description: "Name, title, contact info, summary, experience, education, and skills." },
    { title: "Preview instantly", description: "The layout auto-wraps and paginates as you type." },
    { title: "Download the PDF", description: "A clean, ATS-friendly resume, ready to send." },
  ],
  examples: [
    { label: "Building a resume from scratch", input: "Name, 2 jobs, 1 degree, 6 skills", output: "A formatted single-page PDF resume" },
  ],
  faqs: [
    { question: "Does this use real AI to write my resume?", answer: "No — it's a formatting algorithm that lays out the content you provide. It doesn't generate or embellish your experience." },
    { question: "Is my personal information uploaded anywhere?", answer: "No — the PDF is generated entirely in your browser using pdf-lib, and nothing is sent to a server." },
    { question: "Is the output ATS-friendly?", answer: "Yes — it uses a single-column layout with real, selectable text and no tables or graphics, which parses cleanly in most applicant tracking systems." },
    { question: "Can I edit the resume after generating it?", answer: "The PDF itself isn't editable within this tool, but you can change any field and regenerate a fresh PDF as many times as you like." },
    { question: "What if my experience section is very long?", answer: "The layout automatically flows onto additional pages as needed, so nothing gets cut off." },
  ],
};
