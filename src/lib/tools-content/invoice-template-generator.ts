import type { ToolContent } from "./types";

export const invoiceTemplateGeneratorContent: ToolContent = {
  heroSubtitle: "Create a Simple Invoice with Line Items and a Total",
  overview: [
    "Sending an invoice for freelance work, a small business sale, or a one-off service usually doesn't need full accounting software — it needs a clean, professional-looking document with the business and client names, itemized charges, and a clear total, ready to send as an attachment.",
    "This tool builds exactly that: enter your business name, the client's name, an invoice number and date, then add as many line items as needed — each with a description, quantity, and price — and the total is calculated automatically as you go. The result renders as a clean, single-page invoice layout, downloadable as a PNG image ready to attach to an email or upload to a payment request.",
    "This produces a straightforward, static invoice image — it doesn't track payment status, send reminders, or integrate with accounting software, since that's genuinely a different category of tool (invoicing/accounting platforms). This covers the common one-off need: a professional-looking invoice document, generated in seconds, for a specific client and job.",
  ],
  howItWorks: [
    { title: "Enter business and client details", description: "Your business name, client name, invoice number, and date." },
    { title: "Add line items", description: "Description, quantity, and price for each item — the total updates automatically." },
    { title: "Download the invoice", description: "Save as a PNG image, ready to send." },
  ],
  examples: [
    {
      label: "Simple invoice",
      input: "1 item: \"Web design\", Qty 1, Price $500",
      output: "invoice.png — a one-page invoice showing the item and a $500.00 total.",
    },
  ],
  faqs: [
    {
      question: "Does this track whether an invoice has been paid?",
      answer:
        "No — this generates a static invoice document for a single transaction. For tracking payment status across multiple invoices, a dedicated invoicing or accounting platform is the right tool.",
    },
    {
      question: "Can I add as many line items as I need?",
      answer:
        "Yes — click \"Add line item\" for as many rows as your invoice needs, and the total automatically recalculates to include every item.",
    },
    {
      question: "What file format does this download as?",
      answer:
        "A PNG image — suitable for attaching to an email or uploading wherever an invoice document is needed, though it's not an editable format like a spreadsheet or Word document.",
    },
    {
      question: "Is my invoice data sent anywhere?",
      answer:
        "No — the invoice is generated entirely in your browser using canvas. Nothing is uploaded or stored.",
    },
  ],
};
