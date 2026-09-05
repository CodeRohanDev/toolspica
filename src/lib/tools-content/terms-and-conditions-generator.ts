import type { ToolContent } from "./types";

export const termsAndConditionsGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Terms & Conditions for Your Website",
  overview: [
    "Terms and Conditions (also called Terms of Service or Terms of Use) is the contract between your website and the people who use it — it sets the rules for acceptable use, spells out who owns the content, limits your liability if something goes wrong, and gives you a documented basis to suspend or terminate access for users who misuse the site. Unlike a privacy policy, publishing Terms and Conditions usually isn't a strict legal requirement, but it's standard practice for any site with user accounts, user-generated content, e-commerce, or paid services — without one, you have far less legal footing if a dispute arises.",
    "This tool generates a complete, standard-structure Terms and Conditions document covering acceptable use, intellectual property, user conduct, limitation of liability, third-party links, termination rights, governing law, and a change-notice clause — filled in automatically with your company name, website, and contact email. The structure mirrors what visitors expect to see and what most template checklists (including ad network and payment processor requirements) look for.",
    "Because \"terms and conditions\" needs vary a lot by business type — a SaaS product needs subscription and refund clauses, a marketplace needs seller/buyer responsibility clauses, a site with user comments needs content-moderation language — this generated document covers the common core that applies broadly, not every possible clause. Review it against what your specific site actually does, add any clauses specific to your business model, and have it checked by a lawyer before treating it as final.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Fill in your company name, website, and contact email." },
    { title: "Review the generated terms", description: "The full Terms and Conditions text updates live as you type." },
    { title: "Copy, adapt, and publish", description: "Add any clauses specific to your business, then publish on a dedicated /terms page." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Website: acme.com",
      output: "TERMS AND CONDITIONS\n\nWelcome to acme.com, operated by Acme Inc. By accessing or using this website, you agree...",
    },
  ],
  faqs: [
    {
      question: "What's the difference between this and a Privacy Policy?",
      answer:
        "A Privacy Policy discloses what personal data you collect and how you use it. Terms and Conditions govern how people are allowed to use your site or service — acceptable use, ownership of content, and liability. Most sites publish both, as separate pages.",
    },
    {
      question: "Am I legally required to have Terms and Conditions?",
      answer:
        "Usually not a strict legal requirement the way a privacy policy can be, but it's strongly recommended for any site with user accounts, e-commerce, or user-generated content — it's your main legal protection if a user dispute or misuse issue comes up.",
    },
    {
      question: "Does this cover subscription billing or refund terms?",
      answer:
        "Not specifically — this generates the common core clauses (acceptable use, IP, liability, termination). If you sell subscriptions or physical/digital products, add billing and refund-specific clauses, or pair this with a dedicated Refund Policy.",
    },
    {
      question: "Is my information sent anywhere when I use this tool?",
      answer:
        "No — the document is generated entirely in your browser as you type. Nothing is uploaded or stored.",
    },
  ],
};
