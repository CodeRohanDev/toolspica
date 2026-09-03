import type { ToolContent } from "./types";

export const vatCalculatorContent: ToolContent = {
  heroSubtitle: "Add or Remove VAT From Any Price Instantly",
  overview: [
    "VAT (Value Added Tax) calculations run in two directions that are easy to mix up: adding VAT to a net price to find the final amount a customer pays, and the reverse — extracting the net price and VAT amount from a VAT-inclusive total, which isn't as simple as subtracting the tax percentage directly from the total.",
    "This tool handles both directions correctly. \"Add VAT\" takes a net amount (excluding tax) and applies the rate directly to calculate the VAT amount and gross total. \"Remove VAT\" takes a VAT-inclusive total and works backward — dividing by (1 + rate/100) to correctly extract the original net amount, avoiding the common mistake of subtracting the percentage straight from the inclusive total, which produces a wrong result.",
    "Rate presets cover common VAT structures — 20% (the UK's standard rate, also common across much of the EU), 5% (a typical reduced rate for certain goods and services), and 0% (zero-rated items) — alongside a custom field for any other rate, since VAT rates and which goods/services fall into which bracket vary significantly by country.",
    "This is useful for quoting VAT-inclusive prices to customers, checking a receipt or invoice's VAT breakdown, or reconciling accounting records where the net amount and VAT need to be separated out from a total that only shows the combined figure.",
  ],
  howItWorks: [
    {
      title: "Choose Add VAT or Remove VAT",
      description: "Add calculates from a net price; Remove extracts the net from a VAT-inclusive total.",
    },
    {
      title: "Enter the amount and VAT rate",
      description: "Pick a common preset rate or enter a custom percentage.",
    },
    {
      title: "View the breakdown",
      description: "Net amount, VAT amount, and gross total, all instantly.",
    },
  ],
  examples: [
    {
      label: "Adding VAT to a net price",
      input: "£500 net amount, 20% VAT",
      output: "VAT: £100 — Gross total: £600",
    },
    {
      label: "Removing VAT from an inclusive total",
      input: "£600 VAT-inclusive total, 20% VAT",
      output: "Net amount: £500 — VAT: £100",
    },
  ],
  faqs: [
    {
      question: "Why can't I just subtract the VAT percentage directly from an inclusive total?",
      answer:
        "Subtracting 20% directly from £600 would give the wrong net amount, because the 20% needs to be calculated relative to the original net price, not the inclusive total. The correct method divides the inclusive total by (1 + rate/100) to work backward to the accurate net amount — this tool applies that correct formula automatically.",
    },
    {
      question: "What VAT rate should I use?",
      answer:
        "VAT rates vary by country and by the type of goods or service — the presets here (20%, 5%, 0%) reflect common UK rate bands, but other countries use different standard and reduced rates entirely. Check the applicable rate for your specific jurisdiction and item category.",
    },
    {
      question: "What does zero-rated (0%) VAT mean?",
      answer:
        "A zero-rated item is technically still within the VAT system but taxed at 0%, which is different from being VAT-exempt entirely — the distinction matters for businesses when it comes to reclaiming VAT on their own purchases, even though the customer-facing price effect looks the same.",
    },
    {
      question: "How is this different from the GST Calculator?",
      answer:
        "The core add/remove tax math is the same underlying calculation, but GST (used in India and several other countries) typically splits the tax into CGST and SGST components for domestic transactions — a distinction VAT systems don't use. This tool is built for VAT's simpler single-tax-line structure.",
    },
    {
      question: "Does this tool file or report VAT to a tax authority?",
      answer:
        "No — this is a calculation tool only, for quoting prices, checking figures, or reconciling records. Actual VAT filing and reporting requires proper accounting records and, in most jurisdictions, registered VAT software or a tax professional.",
    },
  ],
};
