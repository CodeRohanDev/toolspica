import type { ToolContent } from "./types";

export const fakeTextGeneratorContent: ToolContent = {
  overview: [
    "When you're designing or building a mockup of a real interface — a landing page, an app screen, a marketing email — you constantly need short, realistic-sounding UI copy to fill in the blanks before actual content is written: a headline, a supporting subheading, a paragraph of body text, a handful of button labels, or a short bulleted list. This tool generates exactly that kind of placeholder content, pulled from a bank of genuinely realistic, commonly-seen UI phrasing, rather than generic Lorem Ipsum text or random sentence filler.",
    "That distinction is the entire point of this tool. Lorem Ipsum deliberately looks like meaningless placeholder text, which is perfect for body copy in a print layout but looks obviously wrong sitting inside a call-to-action button or a landing page headline — nobody expects a real button to say \"Lorem ipsum dolor.\" This generator instead produces the kind of short, punchy, genuinely plausible copy real products actually use: headlines like \"Build Something Great Today,\" button labels like \"Get Started\" and \"Try It Now,\" and list items like \"No credit card required\" — content that looks and feels like it belongs in a finished interface, which makes for a much more realistic and useful design mockup or prototype review.",
    "Five categories are covered, matching the most common UI copy slots: Heading (a short, punchy page or section title), Subheading (a single supporting sentence under a heading), Paragraph (a slightly longer block for body copy areas), Button labels (a batch of common call-to-action phrases you can pick from), and List items (a short set of feature-style bullet points). Each click of Generate pulls a fresh option from that category's bank, so you can quickly try a few variations to see what fits your layout's tone and length best.",
    "This is aimed squarely at design and prototyping work — wireframes, Figma mockups, HTML/CSS prototypes, or presentation decks — where the goal is to make a layout feel real enough to evaluate honestly, without needing final, approved copy in place yet.",
  ],
  howItWorks: [
    {
      title: "Pick a content type",
      description: "Choose Heading, Subheading, Paragraph, Button labels, or List items.",
    },
    {
      title: "Click Generate",
      description: "A realistic placeholder matching that content type appears instantly.",
    },
    {
      title: "Copy it into your mockup",
      description: "Use the result directly in your design tool, prototype, or document.",
    },
  ],
  examples: [
    {
      label: "Generating a heading",
      input: "Content type: Heading",
      output: "Build Something Great Today",
    },
  ],
  faqs: [
    {
      question: "How is this different from the Lorem Ipsum Generator?",
      answer:
        "Lorem Ipsum produces Latin-derived placeholder text specifically meant to look like non-language filler, which is fine for body copy but looks obviously wrong in a headline or button. This tool produces short, realistic English UI copy — headlines, button labels, list items — that actually looks like it belongs in a finished interface.",
    },
    {
      question: "Will clicking Generate again give me something different?",
      answer:
        "Yes — each click picks a fresh option from that category's bank of phrases, so you can quickly cycle through a few variations to find one that fits your layout's length and tone.",
    },
    {
      question: "Can I get a longer block of paragraph text?",
      answer:
        "The Paragraph option generates a moderate-length placeholder paragraph suited to typical body-copy areas. For much longer filler text, the Lorem Ipsum Generator or Random Text Generator, which support a custom word or paragraph count, are a better fit.",
    },
    {
      question: "Is this content safe to leave in a live, published page?",
      answer:
        "No — like any placeholder text, it's meant to be replaced with real, final copy before anything goes live. Leaving generic placeholder text on a published page provides no real value to users and can hurt how the page is perceived by both visitors and search engines.",
    },
    {
      question: "Why does the Button labels option return several options at once?",
      answer:
        "Button copy is short enough that seeing several options side by side (Get Started, Learn More, Try It Now, and similar) is more useful than generating just one at a time — you can quickly pick whichever fits your specific call-to-action best.",
    },
  ],
};
