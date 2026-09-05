import type { ToolContent } from "./types";

export const ndaGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Mutual Non-Disclosure Agreement",
  overview: [
    "A Non-Disclosure Agreement (NDA) is what you sign before sharing sensitive information with another party — a potential business partner, a contractor, an investor, or anyone else you need to discuss confidential plans with before a formal deal is in place. Without one, there's no clear legal obligation stopping the other party from sharing or using what you tell them, which is exactly the risk an NDA is designed to close.",
    "This tool generates a mutual NDA — meaning both parties agree to protect each other's confidential information, which is the most common form used for business discussions where information might flow in both directions (as opposed to a one-way NDA, where only one party is disclosing). The generated document defines what counts as confidential information, sets out the receiving party's obligations, lists standard exclusions (information that's already public, already known, or independently developed), sets a two-year term, and includes signature lines for both parties.",
    "An NDA is a genuinely simple, standardized legal document by design — the value is in having clear, unambiguous terms both sides sign, not in creative legal language. That said, high-stakes deals (large investments, sensitive IP, employment relationships) often warrant a lawyer-reviewed NDA tailored to the specific relationship rather than a generic template, since the exact definition of \"confidential information\" and the term length can matter a lot in a dispute.",
  ],
  howItWorks: [
    { title: "Enter your company details", description: "Fill in your company name, contact email, and the effective date." },
    { title: "Review the generated NDA", description: "The full mutual NDA text updates live as you type." },
    { title: "Print, sign, and exchange", description: "Both parties fill in their names and sign before any confidential information is shared." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Email: legal@acme.com, Date: January 1, 2026",
      output: "MUTUAL NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement (\"Agreement\") is entered into as of January 1, 2026, between Acme Inc. (\"Disclosing Party\")...",
    },
  ],
  faqs: [
    {
      question: "What's the difference between a mutual and a one-way NDA?",
      answer:
        "A mutual NDA protects both parties' confidential information — used when discussions could involve either side sharing sensitive details. A one-way NDA only protects one party's information, typically used when only one side is disclosing (like an inventor pitching to a manufacturer).",
    },
    {
      question: "Is a generic NDA template legally binding?",
      answer:
        "Yes, once both parties sign it, a clear, standard NDA like this one is a legally binding contract. For high-value or highly sensitive deals, however, it's worth having a lawyer review or tailor the specific terms.",
    },
    {
      question: "How long does the confidentiality obligation last?",
      answer:
        "This template sets a two-year term from the date the agreement is signed. You can adjust this in the generated text before signing if your situation calls for a longer or shorter period.",
    },
    {
      question: "What information does this tool store?",
      answer:
        "None — the NDA text is generated entirely in your browser as you type. Nothing you enter is uploaded or saved anywhere.",
    },
  ],
};
