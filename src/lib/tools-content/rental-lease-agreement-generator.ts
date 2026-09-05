import type { ToolContent } from "./types";

export const rentalLeaseAgreementGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Residential Lease Agreement Template",
  overview: [
    "Renting out a property without a written lease leaves both landlord and tenant without a clear, documented reference for rent amount, deposit terms, and responsibilities — which matters most exactly when a dispute comes up, like a damage claim at move-out or disagreement about who's responsible for a repair. A written lease doesn't prevent disputes, but it gives both sides a clear document to point back to.",
    "This tool generates a standard residential lease agreement covering the property, lease term, rent payment terms, security deposit handling, permitted use of the property, maintenance responsibilities, and termination — filled in automatically with the landlord's name and contact email, with signature lines for both parties.",
    "Landlord-tenant law is heavily regulated and varies significantly by country, state, and even city — security deposit limits, required disclosures, and eviction notice periods all differ by jurisdiction. This template covers the standard structure most residential leases share, but should be reviewed against your specific local landlord-tenant law before use, since getting deposit or notice terms wrong can carry real legal consequences for a landlord.",
  ],
  howItWorks: [
    { title: "Enter landlord details", description: "Fill in your name (or company) and contact email." },
    { title: "Review the generated lease", description: "The full lease text updates live as you type." },
    { title: "Fill in property specifics and have it reviewed", description: "Add property address, rent amount, and term, then check against local law before signing." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Landlord: Acme Property LLC, Email: leasing@acme.com",
      output: "RESIDENTIAL LEASE AGREEMENT\n\nThis Lease Agreement (\"Agreement\") is entered into as of [date], between Acme Property LLC (\"Landlord\")...",
    },
  ],
  faqs: [
    {
      question: "Does this comply with my local landlord-tenant law?",
      answer:
        "Not automatically — landlord-tenant law (security deposit limits, notice periods, required disclosures) varies significantly by jurisdiction. Review this template against your specific local law before using it, since deposit and notice terms carry real legal weight.",
    },
    {
      question: "How much can I charge for a security deposit?",
      answer:
        "This varies widely by jurisdiction — many US states, for example, cap deposits at one or two months' rent. Check your local rules and fill in a compliant amount rather than assuming any default.",
    },
    {
      question: "Can I add specific rules like a no-pets or no-smoking clause?",
      answer:
        "Yes — add any property-specific rules directly to the generated text before finalizing; this template covers the core structural clauses every lease needs, not every possible house rule.",
    },
    {
      question: "Is any of my information sent anywhere?",
      answer:
        "No — the lease is generated entirely in your browser as you type. Nothing is uploaded or stored.",
    },
  ],
};
