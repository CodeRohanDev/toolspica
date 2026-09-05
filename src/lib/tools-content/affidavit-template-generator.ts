import type { ToolContent } from "./types";

export const affidavitTemplateGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Sworn Affidavit Template",
  overview: [
    "An affidavit is a written statement of facts that the person making it swears, under penalty of perjury, to be true — used for court proceedings, identity verification, name-change processes, and many other situations where a formal, sworn statement is required rather than an ordinary letter. Because it's a sworn legal document, an affidavit follows a fairly rigid, standardized structure across most jurisdictions.",
    "This tool generates a standard affidavit template with the required structural elements: a declarant identification section, a statement of competence and personal knowledge, a placeholder for the specific facts being sworn to, a perjury declaration, and a notarization block for a notary public to complete — filled in automatically with your organization name and the date.",
    "Unlike most other document generators, an affidavit's core factual content — the actual statement being sworn to — can't be meaningfully templated, since it's inherently specific to your situation. This tool provides the correct surrounding legal structure and leaves the factual statement section for you to write directly, and it must be signed in front of an actual notary public (or other authorized official) to be legally valid — a generated, unsigned, unnotarized document has no legal effect on its own.",
  ],
  howItWorks: [
    { title: "Enter your organization details", description: "Fill in your organization name and the date." },
    { title: "Write the specific factual statement", description: "Replace the placeholder section with the actual facts you're swearing to." },
    { title: "Sign before a notary public", description: "The affidavit must be signed in the physical presence of a notary to become legally valid." },
  ],
  examples: [
    {
      label: "Structural header",
      input: "Organization: Acme Inc., Date: January 1, 2026",
      output: "AFFIDAVIT\n\nI, the undersigned, being duly sworn, depose and state as follows, in connection with Acme Inc., as of January 1, 2026...",
    },
  ],
  faqs: [
    {
      question: "Is a generated affidavit legally valid on its own?",
      answer:
        "No — an affidavit only becomes legally valid once it's signed in the physical presence of a notary public (or other authorized official) who verifies your identity and witnesses the signature. A generated, unsigned document has no legal effect by itself.",
    },
    {
      question: "Can this tool write the actual factual statement for me?",
      answer:
        "No — the specific facts you're swearing to are inherently unique to your situation and can't be meaningfully templated. This tool provides the correct legal structure around that statement, which you write in directly.",
    },
    {
      question: "Do affidavit requirements vary by jurisdiction?",
      answer:
        "Yes — some jurisdictions have specific formatting or wording requirements for affidavits used in court. For anything beyond a routine, low-stakes affidavit, check with a lawyer or the specific institution requesting it.",
    },
    {
      question: "Is my information sent anywhere when I use this tool?",
      answer:
        "No — the template is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
