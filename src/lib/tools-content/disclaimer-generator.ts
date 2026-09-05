import type { ToolContent } from "./types";

export const disclaimerGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Disclaimer for Your Website",
  overview: [
    "A disclaimer limits your legal exposure by clearly stating the boundaries of the information or advice your site provides — that it's for general informational purposes, that it isn't professional advice, and that you're not responsible for how third-party links or external content are used. It's especially important for blogs, review sites, and any site touching on health, finance, or legal topics without being written by a licensed professional in that field.",
    "This tool generates a standard disclaimer covering three of the most commonly needed sections: a no-professional-advice clause (making clear the content isn't a substitute for advice from a doctor, lawyer, financial advisor, or other qualified professional), an external-links disclaimer (limiting responsibility for third-party sites you link to), and a general limitation-of-liability clause — filled in automatically with your company name, website, and contact email.",
    "A disclaimer works best as a genuine, honest statement of what your site is and isn't — it doesn't eliminate legal risk on its own, but it does put visitors on clear notice of the boundaries of your content, which matters if a dispute ever comes up. If your site gives advice in a regulated field (medical, legal, or financial), pair this general disclaimer with field-specific language and have it reviewed by a professional in that field.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Fill in your company name, website, and contact email." },
    { title: "Review the generated disclaimer", description: "The full disclaimer text updates live as you type." },
    { title: "Copy and publish", description: "Add the disclaimer to a dedicated page, or at the bottom of relevant articles or pages." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Website: acme.com",
      output: "DISCLAIMER\n\nThe information provided by Acme Inc. on acme.com is for general informational purposes only...",
    },
  ],
  faqs: [
    {
      question: "Does a disclaimer protect me from all legal liability?",
      answer:
        "No — a disclaimer reduces risk by clearly setting expectations about what your content is and isn't, but it doesn't eliminate liability entirely, especially for negligent or false statements. It's one part of a broader risk-reduction approach, not a complete shield.",
    },
    {
      question: "Do I need a disclaimer if I write about health, finance, or legal topics?",
      answer:
        "Strongly recommended — content in these areas is more likely to be relied on as if it were professional advice, so a clear no-professional-advice disclaimer is standard practice, alongside field-specific language reviewed by a qualified professional.",
    },
    {
      question: "Where should the disclaimer be published?",
      answer:
        "Either as a standalone page (e.g. yoursite.com/disclaimer) linked from your footer, or repeated at the bottom of individual articles that touch on advice-adjacent topics.",
    },
    {
      question: "Is any of my information sent to a server when I use this tool?",
      answer:
        "No — the disclaimer text is generated entirely in your browser. Nothing you type is uploaded or stored.",
    },
  ],
};
