import type { ToolContent } from "./types";

export const employmentContractGeneratorContent: ToolContent = {
  heroSubtitle: "Generate an Employment Agreement Template",
  overview: [
    "Hiring even one employee usually calls for a written employment agreement — it sets clear expectations about role, pay, and how the relationship can end, which protects both employer and employee if a disagreement ever comes up later. Small businesses hiring for the first time often skip this step simply because drafting one from scratch feels like more legal work than the situation seems to warrant.",
    "This tool generates a standard employment agreement covering position and duties, compensation, at-will employment status, confidentiality, benefits eligibility, and termination — filled in automatically with your company name and contact email, with signature lines for both employer and employee.",
    "Employment law varies significantly by country and even by state or region — notice periods, at-will employment rules, and required benefits disclosures differ a lot depending on jurisdiction. This template covers the common structure most employment agreements share, but should be reviewed against your specific local labor laws before use, especially for anything beyond a simple, straightforward hire.",
  ],
  howItWorks: [
    { title: "Enter your company details", description: "Fill in your company name and contact email." },
    { title: "Review the generated agreement", description: "The full employment agreement text updates live as you type." },
    { title: "Adapt and have it signed", description: "Fill in role-specific details, review against local labor law, then have both parties sign." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Email: hr@acme.com",
      output: "EMPLOYMENT AGREEMENT\n\nThis Employment Agreement (\"Agreement\") is entered into as of [date], between Acme Inc. (\"Employer\")...",
    },
  ],
  faqs: [
    {
      question: "Does this cover employment law for my specific country or state?",
      answer:
        "No — employment law varies significantly by jurisdiction (notice periods, at-will rules, required benefits). This is a general-structure template; have it reviewed against your local labor law before relying on it.",
    },
    {
      question: "What does \"at-will employment\" mean in this template?",
      answer:
        "It means either party can generally end the employment relationship without a fixed-term commitment, subject to whatever notice period or restrictions your local law requires — this varies a lot between countries and even between US states.",
    },
    {
      question: "Can I add specific compensation numbers or benefits details?",
      answer:
        "Yes — the template leaves compensation, benefits, and role-specific details as agreed-upon placeholders for you to fill in directly, since those vary per hire.",
    },
    {
      question: "Is any of my company information sent anywhere?",
      answer:
        "No — the agreement is generated entirely in your browser as you type. Nothing is uploaded or stored.",
    },
  ],
};
