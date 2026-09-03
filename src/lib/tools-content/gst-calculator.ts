import type { ToolContent } from "./types";

export const gstCalculatorContent: ToolContent = {
  heroSubtitle: "Add or Remove GST & Split Into CGST/SGST",
  overview: [
    "GST (Goods and Services Tax) calculations come up in two directions that are easy to mix up: adding GST to a base price to find the final amount a customer pays, and the reverse — extracting the base price and tax amount from a GST-inclusive total, which isn't as simple as just subtracting the tax rate percentage directly from the total.",
    "This tool handles both directions correctly. \"Add GST\" takes a base amount (excluding tax) and calculates the GST amount and final total by applying the rate directly. \"Remove GST\" takes a GST-inclusive total and works backward — dividing by (1 + rate/100) to correctly extract the original base amount, since a common mistake is subtracting the percentage directly from the inclusive total, which produces a wrong answer.",
    "For intra-state transactions in India's GST system, the total GST is typically split evenly between CGST (Central GST) and SGST (State GST), each collected by a different level of government but summing to the same total tax rate. This tool shows that even split automatically alongside the total GST amount, since many invoices and accounting records need that breakdown separately rather than as one combined figure.",
    "Rate presets are included for the most common GST slabs used in India (5%, 12%, 18%, 28%), alongside a custom field for any other rate — useful for quickly checking a specific slab without needing to remember or look up the exact percentage.",
  ],
  howItWorks: [
    {
      title: "Choose Add GST or Remove GST",
      description: "Add calculates from a base price; Remove extracts the base from a GST-inclusive total.",
    },
    {
      title: "Enter the amount and GST rate",
      description: "Pick a common preset rate or enter a custom percentage.",
    },
    {
      title: "View the breakdown",
      description: "Base amount, GST amount, total, and the CGST/SGST split, all instantly.",
    },
  ],
  examples: [
    {
      label: "Adding GST to a base price",
      input: "₹1,000 base amount, 18% GST",
      output: "GST: ₹180 — Total: ₹1,180 (CGST ₹90 + SGST ₹90)",
    },
    {
      label: "Removing GST from an inclusive total",
      input: "₹1,180 GST-inclusive total, 18% GST",
      output: "Base amount: ₹1,000 — GST: ₹180",
    },
  ],
  faqs: [
    {
      question: "Why can't I just subtract the GST percentage directly from a GST-inclusive total?",
      answer:
        "Subtracting 18% directly from ₹1,180 would give the wrong base amount, because the 18% needs to be calculated relative to the original base price, not the inclusive total. The correct method divides the inclusive total by (1 + rate/100) to work backward to the accurate base amount — this tool applies that correct formula automatically.",
    },
    {
      question: "What's the difference between CGST and SGST?",
      answer:
        "For a transaction within the same state, India's GST is split evenly between CGST (collected by the central government) and SGST (collected by the state government), together summing to the full GST rate. A transaction between different states instead uses IGST, a single combined tax rather than the CGST/SGST split.",
    },
    {
      question: "Does this tool handle IGST for interstate transactions?",
      answer:
        "This tool shows the CGST/SGST even split relevant to intra-state transactions. For an interstate transaction using IGST, the full GST amount calculated here would apply as a single IGST figure rather than being split in half.",
    },
    {
      question: "Which GST rate should I use?",
      answer:
        "GST rates vary by the type of goods or service — the common slabs are 5%, 12%, 18%, and 28%, though some items fall outside these standard rates entirely. Check the applicable rate for your specific goods or service category, since this tool calculates the math but doesn't determine which rate applies.",
    },
    {
      question: "Can I use this for tax calculations outside India, like VAT?",
      answer:
        "The add/remove tax math itself is the same underlying calculation used for VAT and other similar consumption taxes elsewhere — but the CGST/SGST split is specific to India's GST system, so for a VAT calculation elsewhere, the dedicated VAT Calculator (without the India-specific split) is a better fit.",
    },
  ],
};
