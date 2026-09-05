import type { ToolContent } from "./types";

export const resumeBuilderContent: ToolContent = {
  heroSubtitle: "Build a Clean, ATS-Friendly Resume and Download as Word",
  overview: [
    "A resume needs to satisfy two very different readers at once: an Applicant Tracking System (ATS) that scans for structure and keywords before a human ever sees it, and the human hiring manager reading it afterward. Fancy templates with columns, graphics, and unusual fonts often break in ATS parsing, silently costing candidates interviews before a person even looks at their application.",
    "This tool builds a resume with a plain, standard structure — name and contact info at the top, followed by clearly labeled Summary, Experience, Education, and Skills sections — the format that both ATS systems and human reviewers reliably parse correctly. Fill in each section, and download the result as a real .docx file, ready to submit directly or open in Word for final polish.",
    "This intentionally avoids visual gimmicks (columns, icons, colored sidebars, unusual fonts) that look appealing but frequently cause ATS parsing failures — a plain, well-organized resume that a computer can read correctly is more likely to reach a human than a visually striking one that gets mangled or rejected by automated screening.",
  ],
  howItWorks: [
    { title: "Fill in your details", description: "Name, contact info, summary, experience, education, and skills." },
    { title: "Review the structure", description: "Each section uses clear, ATS-friendly formatting." },
    { title: "Download as .docx", description: "Get a real Word document, ready to submit or polish further." },
  ],
  examples: [
    {
      label: "Basic resume",
      input: "Name: Jane Doe, Summary: Marketing professional with 5 years experience...",
      output: "resume.docx — a structured resume with clearly labeled sections.",
    },
  ],
  faqs: [
    {
      question: "Why does this avoid columns, icons, and fancy templates?",
      answer:
        "Many Applicant Tracking Systems (ATS) that scan resumes before a human sees them struggle to correctly parse columns, text boxes, icons, and unusual fonts — a plain, linear structure is more reliably read correctly by both ATS software and human reviewers.",
    },
    {
      question: "Can I add or remove sections?",
      answer:
        "Leave any section blank to omit it from the final document — only sections with content are included, so you're not stuck with an empty \"Education\" heading if it doesn't apply.",
    },
    {
      question: "Does the downloaded file open correctly in Word and Google Docs?",
      answer:
        "Yes — it's a standard .docx file, opening correctly in Microsoft Word, Google Docs, LibreOffice Writer, and Apple Pages for any final formatting adjustments.",
    },
    {
      question: "Is my resume information sent anywhere?",
      answer:
        "No — the document is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
