import type { ToolContent } from "./types";

export const businessCardDesignerContent: ToolContent = {
  heroSubtitle: "Design a Simple Business Card, Ready to Print",
  overview: [
    "Getting a business card designed professionally makes sense for an established brand, but a freelancer, a small side project, or someone who just needs cards for an upcoming event often just needs something clean and legible fast, without commissioning a designer or wrestling with a full design tool for a simple layout.",
    "This tool generates a standard-size business card (3.5 × 2 inches, the standard size in the US and many other countries) with your name, title, company, and contact details laid out in a clean, readable layout, with a choice of four color themes — dark with a blue accent, clean white with a red accent, teal with a gold accent, and a warm cream with a brown accent.",
    "The output renders at print-appropriate resolution (300 DPI equivalent for the standard 3.5 × 2 inch size) so the downloaded PNG is sharp enough for actual printing, not just screen viewing — upload it directly to any print-on-demand business card service that accepts image files.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Name, title, company, and a contact line." },
    { title: "Pick a color theme", description: "Choose from four ready-made color combinations." },
    { title: "Download and print", description: "Save the PNG and upload it to a print-on-demand card service, or print at home." },
  ],
  examples: [
    {
      label: "Basic card",
      input: "Name: Jane Doe, Title: Designer, Company: Acme Inc.",
      output: "business-card.png — a 3.5×2 inch card with Jane's details in the chosen theme.",
    },
  ],
  faqs: [
    {
      question: "What size is the generated business card?",
      answer:
        "3.5 × 2 inches, the standard business card size in the US and many other countries, rendered at print-appropriate resolution.",
    },
    {
      question: "Can I upload this directly to a print-on-demand service?",
      answer:
        "Yes — most print-on-demand business card services accept a high-resolution PNG or JPG upload, and this tool's output is sized and resolved appropriately for that standard card size.",
    },
    {
      question: "Can I add a logo image to the card?",
      answer:
        "Not currently — this tool focuses on a clean text-based layout. For a card with a custom logo, you'd need to composite this design with your logo in a separate image editor.",
    },
    {
      question: "Is my information sent anywhere?",
      answer:
        "No — the card is rendered entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
