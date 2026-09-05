import type { ToolContent } from "./types";

export const letterheadGeneratorContent: ToolContent = {
  heroSubtitle: "Design a Simple Company Letterhead",
  overview: [
    "A letterhead — company name, a subtle brand accent, address and contact details at the top of a page — turns a plain document into something that looks like it came from an actual business, useful for formal letters, official notices, or any printed correspondence that benefits from looking established rather than typed in a blank text editor.",
    "This tool generates a clean, minimal letterhead template: your company name prominently at the top, an optional tagline, contact and address details, and a colored accent bar you can customize to match your brand color — rendered as a full-page, print-ready image ready to use as a background for a printed or digital letter.",
    "This creates a static image template, not an editable Word or Google Docs letterhead with a live text-editing area for the letter body — the intended workflow is printing this as your letterhead paper stock, or placing it as a background image behind your actual letter content in a word processor or design tool.",
  ],
  howItWorks: [
    { title: "Enter your company details", description: "Company name, tagline, address, and contact info." },
    { title: "Pick an accent color", description: "Choose a color that matches your brand." },
    { title: "Download and use", description: "Print as letterhead paper, or use as a background in your document." },
  ],
  examples: [
    {
      label: "Simple letterhead",
      input: "Company: Acme Inc., Accent color: blue",
      output: "letterhead.png — a full-page template with Acme Inc. at the top and blue accent bars.",
    },
  ],
  faqs: [
    {
      question: "Can I type my letter directly onto this template?",
      answer:
        "Not within this tool — this generates a static image template. Use it as printed letterhead paper stock, or import it as a background image in Word, Google Docs, or a design tool where you can then type your letter content.",
    },
    {
      question: "Can I use my own logo instead of just text?",
      answer:
        "Not currently — this tool generates a text-based letterhead. For a version with a custom logo image, you'd need to composite this template with your logo in a separate image editor.",
    },
    {
      question: "What size is the letterhead designed for?",
      answer:
        "Standard US Letter proportions (8.5 × 11 inches), matching typical printed letter paper.",
    },
    {
      question: "Is my company information sent anywhere?",
      answer:
        "No — the letterhead is generated entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
