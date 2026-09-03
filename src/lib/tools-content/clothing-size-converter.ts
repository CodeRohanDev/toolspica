import type { ToolContent } from "./types";

export const clothingSizeConverterContent: ToolContent = {
  heroSubtitle: "Convert Clothing Sizes Between US, UK & EU",
  overview: [
    "Clothing sizing, like shoe sizing, isn't a mathematical conversion — US, UK, and EU sizes each follow their own numbering conventions that have to be looked up against a reference chart rather than calculated, which is exactly what this tool provides for both women's and men's clothing.",
    "For women's clothing, the tool covers the common US numeric size range (0 through 16) mapped to UK and EU equivalents, based on widely referenced general sizing charts used across the fashion industry. For men's clothing, sizing is instead organized around the common letter sizes (XS through XXL), since men's tops are more commonly labeled this way than with a numeric size, mapped to their approximate chest measurement range and EU equivalent.",
    "Clothing sizing is notoriously less standardized than shoe sizing — \"vanity sizing\" (where the same labeled size has grown larger over time, or varies significantly between brands trying to flatter customers) means the same numeric or letter size can fit noticeably differently between two different clothing brands, even within the same country's sizing system. This chart reflects general industry reference conventions, not any specific brand's actual measurements.",
    "This is useful for a rough starting size estimate when shopping from an international retailer, understanding a clothing size mentioned in a different region's sizing convention, or converting a known size into the equivalent range in another system before ordering.",
  ],
  howItWorks: [
    {
      title: "Choose women's or men's sizing",
      description: "The two use genuinely different sizing conventions.",
    },
    {
      title: "Select a size from the dropdown",
      description: "US numeric sizes for women's, letter sizes for men's.",
    },
    {
      title: "View the equivalent sizes in other systems",
      description: "Based on general published sizing reference charts.",
    },
  ],
  examples: [
    {
      label: "Women's size conversion",
      input: "US 6",
      output: "UK 10 — EU 38",
    },
    {
      label: "Men's size conversion",
      input: "Letter size M",
      output: "Chest 39-41in — EU 48",
    },
  ],
  faqs: [
    {
      question: "Why are women's and men's clothing sizes organized so differently here?",
      answer:
        "Women's clothing is conventionally labeled with numeric sizes in the US (0, 2, 4, and so on), while men's tops are more commonly labeled with letter sizes (XS through XXL) tied to chest measurement ranges — this tool reflects each category's actual real-world labeling convention rather than forcing both into the same format.",
    },
    {
      question: "Why is clothing sizing described as less standardized than shoe sizing?",
      answer:
        "\"Vanity sizing\" — where brands label garments with a smaller size number than the actual measurements would traditionally suggest, to flatter customers — has caused significant size drift over time and inconsistency between brands, even within the same country's system. Two different brands' \"size 8,\" for instance, can correspond to noticeably different actual measurements.",
    },
    {
      question: "Should I trust this chart over a specific brand's own size guide?",
      answer:
        "No — when a specific brand provides its own size chart with actual body measurements, that's more reliable than this general reference chart, since it reflects that brand's actual garment measurements rather than an industry-general approximation.",
    },
    {
      question: "Why does the men's chart show a measurement range instead of a single number?",
      answer:
        "Letter sizes (like Medium) conventionally cover a range of chest measurements rather than one exact number, since a single letter size needs to fit a range of actual body sizes — this tool shows that full range alongside the letter size for more useful context than a single midpoint number would provide.",
    },
    {
      question: "Does this account for different garment types, like pants versus tops?",
      answer:
        "No — this reflects general top/dress sizing conventions. Pants sizing (often using waist measurement directly, like \"32\") and other garment types follow their own separate conventions not covered by this general chart.",
    },
  ],
};
