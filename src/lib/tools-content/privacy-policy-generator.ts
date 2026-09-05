import type { ToolContent } from "./types";

export const privacyPolicyGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Privacy Policy for Your Website in Seconds",
  overview: [
    "A privacy policy is one of the few legal documents that most websites are actually required to have — not just a nice-to-have. If your site collects any personal information at all (an email signup, a contact form, even analytics cookies), laws like GDPR in the EU, CCPA in California, and similar regulations elsewhere generally require you to disclose what you collect and how you use it. Many ad networks and payment processors also refuse to work with sites that don't have one published.",
    "Writing one from scratch means either hiring a lawyer for a document that, for a small site, doesn't usually need to be custom-drafted, or piecing together sections from other sites' policies (which is both legally risky and often just copies someone else's inaccurate disclosures). This tool generates a complete, standard-structure privacy policy — covering what information is collected, how it's used, cookies, third-party services, data security, user rights, and a contact section — filled in automatically with your company name, website, contact email, and effective date as you type.",
    "The generated policy follows the section structure that most privacy regulations expect to see and that visitors are used to reading, so it reads as a normal, complete privacy policy rather than a bare-bones stub. That said, this is a general-purpose template: it doesn't know the specific data your site collects, what jurisdiction-specific disclosures apply to your business, or industry-specific rules (health data, children's data, and financial data all carry extra legal requirements this template doesn't cover). Treat the output as a strong starting draft to review and adapt, not a final legal document.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Fill in your company name, website, contact email, and effective date." },
    { title: "Review the generated policy", description: "The full privacy policy text updates live as you type." },
    { title: "Copy and publish", description: "Copy the text onto a dedicated /privacy-policy page on your site, and have it reviewed before relying on it." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Website: acme.com, Email: hello@acme.com",
      output: "PRIVACY POLICY\nEffective Date: January 1, 2026\n\nAcme Inc. (\"we\", \"us\", or \"our\") operates acme.com...",
    },
  ],
  faqs: [
    {
      question: "Is this privacy policy legally sufficient for my site?",
      answer:
        "It's a solid, standard-structure starting point, but it's a general template — it doesn't account for your specific jurisdiction, industry, or exactly what data your site collects. Have it reviewed by a qualified lawyer before publishing, especially if you handle sensitive data or operate under GDPR/CCPA.",
    },
    {
      question: "Do I need a privacy policy if my site is small or just a hobby project?",
      answer:
        "If you collect any personal information at all — even just via a contact form, comments, or analytics — most privacy laws still apply regardless of site size, and most ad networks and payment processors require a published policy as a condition of use.",
    },
    {
      question: "Where should I publish the generated policy?",
      answer:
        "Convention is a dedicated page at a URL like yoursite.com/privacy-policy, linked from your site's footer so it's easy to find from any page.",
    },
    {
      question: "Does this tool store or send my company information anywhere?",
      answer:
        "No — everything is generated locally in your browser as you type. Nothing you enter is uploaded, logged, or stored anywhere.",
    },
  ],
};
