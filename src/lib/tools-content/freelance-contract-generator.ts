import type { ToolContent } from "./types";

export const freelanceContractGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Freelance Services Agreement Template",
  overview: [
    "Freelance work that starts on a handshake or a casual email thread often runs into trouble exactly when it matters most — scope creep, late payment, or disagreement over who owns the final deliverable. A short, clear freelance contract heads off most of these problems by putting scope, payment, ownership, and revision terms in writing before work begins, protecting both the client and the freelancer.",
    "This tool generates a freelance services agreement covering scope of work, payment terms, independent contractor status, ownership of deliverables upon payment, confidentiality, revisions, and termination — filled in automatically with the client's company name and contact email, with signature lines for both parties.",
    "Independent contractor classification rules vary by jurisdiction (misclassifying an employee as a contractor carries real legal and tax risk), so this template explicitly states contractor status as part of the agreement — but the specific tests for what legally qualifies as an independent contractor differ by country and even by US state. For ongoing or high-value freelance relationships, have this reviewed by a lawyer familiar with your local contractor classification rules.",
  ],
  howItWorks: [
    { title: "Enter client details", description: "Fill in the client's company name and contact email." },
    { title: "Review the generated contract", description: "The full freelance agreement text updates live as you type." },
    { title: "Fill in scope and fee, then sign", description: "Add the specific project scope, fee, and timeline before both parties sign." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Client: Acme Inc., Email: projects@acme.com",
      output: "FREELANCE SERVICES AGREEMENT\n\nThis Freelance Services Agreement (\"Agreement\") is entered into as of [date], between Acme Inc. (\"Client\")...",
    },
  ],
  faqs: [
    {
      question: "Who owns the work after it's delivered?",
      answer:
        "Under this template, ownership transfers to the client upon full payment, except for any pre-existing tools, templates, or assets the freelancer brought to the project, which the freelancer retains — adjust this clause if your project needs different ownership terms.",
    },
    {
      question: "Does this protect against being misclassified as an employee?",
      answer:
        "It explicitly states independent contractor status, but the legal test for correct classification varies by jurisdiction and depends on the actual working relationship, not just what the contract says — check your local contractor classification rules for higher-risk or long-term engagements.",
    },
    {
      question: "How do I handle revisions that go beyond what was agreed?",
      answer:
        "The template includes a revisions clause noting that work beyond the agreed scope may incur additional fees — specify the exact number of included revisions directly in your project scope before work begins.",
    },
    {
      question: "Is any of my information sent anywhere?",
      answer:
        "No — the contract is generated entirely in your browser as you type. Nothing is uploaded or stored.",
    },
  ],
};
