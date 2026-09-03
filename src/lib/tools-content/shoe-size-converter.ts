import type { ToolContent } from "./types";

export const shoeSizeConverterContent: ToolContent = {
  heroSubtitle: "Convert Shoe Sizes Between US, UK & EU",
  overview: [
    "Shoe sizing isn't a simple mathematical conversion the way length or weight is — US, UK, and EU shoe sizes each follow their own historical numbering system that doesn't translate through a clean formula, which is why an accurate shoe size converter needs to be based on published reference charts rather than a calculated approximation.",
    "This tool provides separate reference charts for men's and women's shoe sizes, since the two follow different numbering conventions even within the same country's system — a men's US size 9 and a women's US size 9 correspond to different actual foot lengths and different UK/EU equivalents, so selecting the correct category matters for an accurate result.",
    "The charts cover the common US size range (roughly 5 through 14 for men, 5 through 11 for women) mapped to their corresponding UK and EU sizes, based on widely published general shoe sizing reference tables used across the footwear industry.",
    "It's genuinely important to understand that shoe sizing isn't perfectly standardized across brands — actual fit varies meaningfully between manufacturers even at the \"same\" labeled size, due to differences in last shape, width, and sizing philosophy between brands. This tool provides a solid general starting reference, but a specific brand's own size chart (when available) is more reliable for that specific brand's products.",
  ],
  howItWorks: [
    {
      title: "Choose men's or women's sizing",
      description: "The two follow different numbering systems.",
    },
    {
      title: "Select a US size from the dropdown",
      description: "Sizes are matched to published reference chart values.",
    },
    {
      title: "View the equivalent UK and EU sizes",
      description: "Based on standard general shoe sizing conversion tables.",
    },
  ],
  examples: [
    {
      label: "Men's size conversion",
      input: "US Men's 9",
      output: "UK 8.5 — EU 42.5",
    },
    {
      label: "Women's size conversion",
      input: "US Women's 8",
      output: "UK 6 — EU 39",
    },
  ],
  faqs: [
    {
      question: "Why isn't shoe size conversion a simple formula?",
      answer:
        "US, UK, and EU shoe sizing each evolved as their own separate historical numbering systems with different starting points and increments, rather than all being derived from a common measurement through a consistent formula — which is why accurate conversion relies on published reference charts rather than a calculated conversion factor.",
    },
    {
      question: "Why do men's and women's sizes need separate charts?",
      answer:
        "Men's and women's shoe sizing use different numbering scales even within the same country — a women's US size and a men's US size of the same number correspond to different actual foot lengths, so converting a women's size using the men's chart (or vice versa) would give an inaccurate result.",
    },
    {
      question: "Is this chart accurate for every shoe brand?",
      answer:
        "It reflects widely published general sizing reference charts, but actual fit varies meaningfully between brands due to differences in last shape, width, and sizing philosophy — treat this as a solid starting reference, and check a specific brand's own size chart when precision matters, especially for an online purchase without trying the shoe on first.",
    },
    {
      question: "Why do EU sizes sometimes include half sizes and sometimes don't?",
      answer:
        "This reflects how EU sizing actually maps to US half-size increments in the underlying reference data — some US half sizes correspond to a clean EU whole number, while others fall at an EU half size, which is exactly why a chart-based approach (rather than a simple linear formula) is needed for accuracy.",
    },
    {
      question: "What if my US size isn't in the dropdown?",
      answer:
        "The chart covers the common range for each category — for a size outside that range, checking the specific shoe brand's own size chart directly is the more reliable approach, since sizing at the extreme ends of the range is more likely to vary between brands anyway.",
    },
  ],
};
