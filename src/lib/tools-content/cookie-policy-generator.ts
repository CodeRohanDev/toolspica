import type { ToolContent } from "./types";

export const cookiePolicyGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Cookie Policy for Your Website",
  overview: [
    "A cookie policy explains what cookies and similar tracking technologies your website uses, why, and how visitors can control them — a disclosure required under laws like the EU's ePrivacy Directive and GDPR, and expected practice almost everywhere else. It's usually published as its own page, separate from (but often linked from) the main privacy policy, since cookie behavior is specific and technical enough to warrant its own explanation.",
    "This tool generates a cookie policy covering what cookies are in plain terms, the three categories most sites actually use (essential cookies required for the site to function, analytics cookies that measure usage, and advertising cookies used for ad targeting and measurement), a note about third-party cookies placed by embedded services, and instructions for how visitors can manage or disable cookies through their browser — filled in automatically with your company name, website, and contact email.",
    "If your site uses a cookie consent banner (increasingly required for EU and UK visitors), this generated policy is the detailed reference page that banner typically links to for \"learn more\" or \"manage preferences.\" The category breakdown here (essential / analytics / advertising) covers the common case for most sites running standard analytics and ad tools; if you use more specialized tracking, add a specific line item for it.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Fill in your company name, website, and contact email." },
    { title: "Review the generated policy", description: "The full cookie policy text updates live as you type." },
    { title: "Link it from your consent banner", description: "Publish the policy and link to it from any cookie consent banner or privacy policy on your site." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Website: acme.com",
      output: "COOKIE POLICY\n\nThis Cookie Policy explains how Acme Inc. uses cookies and similar technologies on acme.com...",
    },
  ],
  faqs: [
    {
      question: "Do I need a separate cookie policy if I already have a privacy policy?",
      answer:
        "It's common and recommended to have both — a privacy policy covers personal data broadly, while a dedicated cookie policy gives visitors a focused, detailed explanation of exactly which cookies you use and why, which many cookie consent banners link to directly.",
    },
    {
      question: "What are the three cookie categories in this template?",
      answer:
        "Essential cookies (required for basic site function, can't be disabled), analytics cookies (used to understand traffic and usage patterns), and advertising cookies (used to serve and measure ads) — the three categories that cover how most sites actually use cookies.",
    },
    {
      question: "Does this tool set up a cookie consent banner for me?",
      answer:
        "No — this generates the reference policy page. If you need a consent banner for EU/UK visitors, you'll need a separate consent management tool; this policy is what that banner would typically link to.",
    },
    {
      question: "Is my information sent anywhere when I use this tool?",
      answer:
        "No — the policy text is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
