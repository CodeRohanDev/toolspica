import type { ToolContent } from "./types";

export const schemaMarkupGeneratorContent: ToolContent = {
  heroSubtitle: "Generate JSON-LD Structured Data for Your Pages",
  overview: [
    "Structured data (also called schema markup) is a standardized way of describing what's on a page in a format search engines can parse directly — it's how a recipe gets a star rating shown right in search results, how a product listing shows its price, and how an FAQ page gets its questions expanded directly under the search result. Google's own documentation confirms structured data is used to power these rich result features, though it's not a direct ranking factor on its own.",
    "This tool generates JSON-LD (the format Google explicitly recommends over the older microdata and RDFa formats) for four of the most commonly needed schema types: Article, Product, LocalBusiness, and FAQPage. Fill in the relevant fields for your page — name, description, URL, and a type-specific field like price for products or a phone number for a local business — and get a ready-to-paste `<script type=\"application/ld+json\">` tag.",
    "Structured data only helps if it accurately reflects what's actually visible on the page — Google's guidelines explicitly warn against marking up content that isn't genuinely present, and can penalize pages for structured data that misrepresents the page content. Paste the generated script into your page's `<head>` (or anywhere in the body, both work), then verify it with Google's Rich Results Test before relying on it.",
  ],
  howItWorks: [
    { title: "Pick a schema type", description: "Choose Article, Product, LocalBusiness, or FAQPage." },
    { title: "Fill in the fields", description: "Enter name, description, URL, and the type-specific detail." },
    { title: "Copy the script tag", description: "Paste the generated JSON-LD script into your page's HTML, then validate it." },
  ],
  examples: [
    {
      label: "Product schema",
      input: "Type: Product, Name: Wireless Mouse, Price: 29.99",
      output: "{\"@context\":\"https://schema.org\",\"@type\":\"Product\",\"name\":\"Wireless Mouse\",\"offers\":{\"@type\":\"Offer\",\"price\":\"29.99\",\"priceCurrency\":\"USD\"}}",
    },
  ],
  faqs: [
    {
      question: "Does adding structured data directly improve my search ranking?",
      answer:
        "Not directly — structured data isn't a ranking factor by itself, but it enables rich result features (star ratings, expanded FAQs, product pricing) that can improve click-through rate from search results, which indirectly benefits traffic.",
    },
    {
      question: "Where should I paste the generated script tag?",
      answer:
        "Anywhere in your page's HTML, most commonly the `<head>` section — JSON-LD doesn't need to be positioned near the content it describes, unlike older microdata formats.",
    },
    {
      question: "How do I check that my structured data is valid?",
      answer:
        "Paste your page URL or the raw JSON-LD into Google's Rich Results Test tool, which checks for errors and shows a preview of which rich result features your markup qualifies for.",
    },
    {
      question: "Do I need to include every field, or can I leave some blank?",
      answer:
        "The more accurate, complete fields you provide, the better — but leaving optional fields blank won't break the generated JSON-LD, it will just include a placeholder you should replace before publishing.",
    },
  ],
};
