import type { ToolContent } from "./types";

export const colorContrastCheckerContent: ToolContent = {
  heroSubtitle: "Check WCAG Color Contrast for Accessible Text",
  overview: [
    "Text that doesn't contrast enough against its background is difficult or impossible to read for people with low vision, color blindness, or simply anyone viewing a screen in bright sunlight — which is exactly why the Web Content Accessibility Guidelines (WCAG) define specific minimum contrast ratios that text and background color combinations need to meet.",
    "This tool calculates the exact WCAG contrast ratio between any two colors, using the same relative luminance formula defined in the WCAG 2.x specification — a precise mathematical calculation based on each color's perceived brightness, not just a visual approximation.",
    "The ratio is checked against four specific WCAG thresholds: AA level requires 4.5:1 for normal text and 3:1 for large text (defined as 18pt+ or 14pt+ bold); AAA level, a stricter standard, requires 7:1 for normal text and 4.5:1 for large text. Meeting AA is the widely accepted baseline for accessible web content; AAA is a higher bar many sites aim for but don't strictly require.",
    "This is useful for verifying a color scheme meets accessibility requirements before shipping a design, checking whether a specific text/background combination is legible enough, or understanding why a design review flagged a contrast issue — genuinely important for real users, not just a compliance checkbox.",
  ],
  howItWorks: [
    {
      title: "Enter a text color and background color",
      description: "Using the color pickers or by entering HEX values directly.",
    },
    {
      title: "View the exact contrast ratio",
      description: "Plus a live preview showing the actual text/background combination.",
    },
    {
      title: "Check pass/fail against WCAG levels",
      description: "AA and AAA, for both normal and large text sizes.",
    },
  ],
  examples: [
    {
      label: "High contrast (passes all levels)",
      input: "Dark gray text (#1f2937) on white background (#ffffff)",
      output: "Contrast ratio: ~14.68:1 — passes AA and AAA for all text sizes",
    },
    {
      label: "Borderline contrast",
      input: "Gray text (#767676) on white background (#ffffff)",
      output: "Contrast ratio: ~4.54:1 — passes AA normal text, fails AAA normal text",
    },
  ],
  faqs: [
    {
      question: "What's the difference between AA and AAA compliance?",
      answer:
        "AA is the widely adopted baseline accessibility standard (4.5:1 for normal text, 3:1 for large text) that most legal accessibility requirements reference. AAA is a stricter, higher standard (7:1 for normal text, 4.5:1 for large text) that provides better accessibility but is a genuinely higher bar to hit with color choices, especially for brand colors.",
    },
    {
      question: "Why does large text have a lower contrast requirement?",
      answer:
        "Larger text is inherently easier to read at lower contrast than small text, since the shapes of the letters are more distinguishable even with less color difference from the background — WCAG's guidelines reflect this by setting a more lenient threshold specifically for text at 18pt+ (or 14pt+ bold) and larger.",
    },
    {
      question: "Is contrast ratio calculated the same way regardless of which color is text vs. background?",
      answer:
        "Yes — the WCAG contrast ratio formula is symmetric, using the lighter and darker of the two colors' luminance values regardless of which one is technically the \"text\" or \"background\" — swapping which color is which doesn't change the calculated ratio.",
    },
    {
      question: "Does passing WCAG contrast guarantee my design is fully accessible?",
      answer:
        "No — contrast ratio is one important accessibility factor among many (others include font size, spacing, alternative text, keyboard navigation, and more), so passing this specific check is necessary but not sufficient for full accessibility compliance.",
    },
    {
      question: "Why is the ratio expressed as X:1 rather than a percentage?",
      answer:
        "The WCAG contrast ratio is defined as a ratio between the lighter and darker color's relative luminance — a 21:1 ratio (the maximum, black on white) means the lighter color is 21 times brighter than the darker one, which is why it's expressed as a ratio rather than a percentage.",
    },
  ],
};
