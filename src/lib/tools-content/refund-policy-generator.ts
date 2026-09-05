import type { ToolContent } from "./types";

export const refundPolicyGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Refund Policy for Your Store or Service",
  overview: [
    "A refund policy tells customers exactly what to expect if they're not satisfied with a purchase — how long they have to request a refund, what's eligible, how to actually request one, and how long processing takes. Beyond keeping customers informed, a clear refund policy is often a requirement from payment processors (Stripe, PayPal, and others frequently ask for one during account review) and helps reduce chargebacks, since customers who know how to request a legitimate refund are less likely to dispute a charge with their bank instead.",
    "This tool generates a complete refund policy covering eligibility windows, non-refundable item categories (useful for digital products that have already been delivered or accessed), how to submit a request, processing timelines, and what to do if a refund is delayed — filled in automatically with your company name, website, and contact email.",
    "Refund terms vary a lot by business type: a SaaS subscription typically needs prorated or no-refund language for partial billing periods, a physical goods store needs return-shipping terms, and digital downloads usually need stricter no-refund-after-access language. The generated policy uses a common, reasonable default (30-day window, standard processing times) — adjust the specific numbers and exclusions to match your actual business terms before publishing.",
  ],
  howItWorks: [
    { title: "Enter your details", description: "Fill in your company name, website, and contact email." },
    { title: "Review the generated policy", description: "The full refund policy text updates live as you type." },
    { title: "Adjust and publish", description: "Update the refund window and exclusions to match your actual terms, then publish on a dedicated page." },
  ],
  examples: [
    {
      label: "Filled-in header",
      input: "Company: Acme Inc., Website: acme.com, Email: support@acme.com",
      output: "REFUND POLICY\n\nThank you for purchasing from Acme Inc. via acme.com. This Refund Policy outlines...",
    },
  ],
  faqs: [
    {
      question: "Do payment processors require a refund policy?",
      answer:
        "Many do, or strongly recommend one — Stripe, PayPal, and similar processors often review a merchant's refund policy during account setup or dispute review, and having a clear one published can help with chargeback disputes.",
    },
    {
      question: "Can I change the 30-day refund window?",
      answer:
        "Yes — the generated text uses 30 days as a common default. Edit the number directly in the output to match whatever window your business actually offers, whether that's shorter, longer, or tiered by product type.",
    },
    {
      question: "How should I handle refunds for digital products?",
      answer:
        "Most digital sellers mark downloadable or already-accessed digital goods as non-refundable once delivered, since the product can't be \"returned\" the way a physical item can — this template includes a non-refundable-items section you can adapt for that.",
    },
    {
      question: "Is my business information sent anywhere when using this tool?",
      answer:
        "No — the policy is generated entirely in your browser as you type, with nothing uploaded or stored.",
    },
  ],
};
