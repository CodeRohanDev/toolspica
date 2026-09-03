import type { ToolContent } from "./types";

export const invoiceGeneratorContent: ToolContent = {
  heroSubtitle: "Create a Clean, Printable Invoice in Your Browser",
  overview: [
    "A freelancer, small business owner, or contractor issuing an invoice needs a clean, professional document with the right structure — sender and client details, an invoice number and date, itemized line items with quantities and rates, and a clear subtotal, tax, and total — without necessarily needing a full paid invoicing platform for occasional use.",
    "This tool builds exactly that: enter your business details and your client's details, add as many line items as needed (each with a description, quantity, and rate), and set a tax rate if applicable. The subtotal, tax amount, and final total are calculated automatically as you fill in each line item, so the math is always correct without manual addition.",
    "Once the invoice looks right, the print function opens your browser's native print dialog, where you can print a physical copy or save it as a PDF (every modern browser's print dialog includes a \"Save as PDF\" destination option) — a genuinely practical, dependency-free way to produce a shareable invoice document without installing separate software.",
    "This is useful for freelancers and small businesses that need to issue occasional invoices without subscribing to a dedicated invoicing platform, or for quickly generating a one-off invoice for a specific client or project where the overhead of a full accounting system isn't warranted.",
  ],
  howItWorks: [
    {
      title: "Enter your details and your client's details",
      description: "Business name, address, and contact info for both sides.",
    },
    {
      title: "Add line items",
      description: "Description, quantity, and rate for each item or service — add as many as needed.",
    },
    {
      title: "Set a tax rate and print or save as PDF",
      description: "Totals calculate automatically; print opens your browser's save-as-PDF option.",
    },
  ],
  examples: [
    {
      label: "Simple invoice calculation",
      input: "2 items: 'Design work' × 10 hrs × $75/hr, 'Consulting' × 2 hrs × $100/hr, 8% tax",
      output: "Subtotal: $950 — Tax: $76 — Total: $1,026",
    },
  ],
  faqs: [
    {
      question: "How do I save the invoice as a PDF?",
      answer:
        "Click \"Print / save as PDF\" to open your browser's native print dialog, then choose \"Save as PDF\" (or a similarly named option) as the destination instead of a physical printer — this is built into every modern browser and produces a clean PDF copy of the invoice.",
    },
    {
      question: "Is my invoice data saved or sent anywhere?",
      answer:
        "No — everything you enter stays in your browser and is used only to calculate totals and generate the printable view. Nothing is saved after you close or refresh the page, and nothing is ever sent to a server.",
    },
    {
      question: "Can I add as many line items as I need?",
      answer:
        "Yes — use \"Add line item\" for as many items or services as your invoice needs, and remove any you don't need with the remove button next to each row.",
    },
    {
      question: "Does this handle multiple tax rates on different line items?",
      answer:
        "No — this applies a single tax rate to the full subtotal, which covers the most common invoicing case. For an invoice needing different tax treatment per line item, you'd need to calculate those items' totals separately before entering them.",
    },
    {
      question: "Can I reuse this for recurring invoices to the same client?",
      answer:
        "Since nothing is saved between sessions, you'd need to re-enter the details each time — for genuinely recurring invoicing needs with saved client and item templates, a dedicated invoicing platform would be a better long-term fit than a one-off calculator like this.",
    },
  ],
};
