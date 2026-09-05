import type { ToolContent } from "./types";

export const colorBlindnessSimulatorContent: ToolContent = {
  heroSubtitle: "Preview How an Image Looks to Colorblind Viewers",
  overview: [
    "Roughly 1 in 12 men and 1 in 200 women have some form of color vision deficiency, most commonly red-green color blindness — meaning a design that relies heavily on color alone to convey information (a red/green status indicator, a chart with similar-hued lines) can be genuinely unusable for a meaningful share of any audience, often without the designer ever realizing it.",
    "This tool simulates how an uploaded image would appear to someone with three common types of color vision deficiency: protanopia (red-weak), deuteranopia (green-weak, the most common form), and tritanopia (blue-weak) — showing all three simulations side by side with the original, using standard color-transformation matrices that approximate how each condition shifts perceived color.",
    "This is a simulation, not a substitute for actually testing with colorblind users — the transformation matrices used are well-established approximations, but individual variation in color vision deficiency exists, and full color blindness (achromatopsia, seeing no color at all) is much rarer than these three partial forms. Use this as a quick, practical design check: if two elements that need to be distinguished become hard to tell apart in any of the three simulations, consider adding a non-color cue (an icon, a pattern, a label) alongside the color.",
  ],
  howItWorks: [
    { title: "Upload an image", description: "Choose a screenshot, chart, or design mockup to check." },
    { title: "Compare the simulations", description: "See the original alongside protanopia, deuteranopia, and tritanopia versions." },
    { title: "Fix any lost distinctions", description: "Add non-color cues anywhere two elements become hard to tell apart." },
  ],
  examples: [
    {
      label: "Typical use",
      input: "A chart with a red line and a green line",
      output: "In the deuteranopia simulation, both lines may appear a similar muted yellow-brown, hard to distinguish.",
    },
  ],
  faqs: [
    {
      question: "How common is color blindness?",
      answer:
        "Roughly 1 in 12 men and 1 in 200 women have some form of color vision deficiency, most commonly a red-green type — a real, sizeable share of any general audience, which is why color-only distinctions in design are a genuine accessibility risk.",
    },
    {
      question: "What's the difference between the three types simulated here?",
      answer:
        "Protanopia and deuteranopia both affect red-green distinction (protanopia is red-weak, deuteranopia — the most common form — is green-weak), while tritanopia affects blue-yellow distinction and is considerably rarer.",
    },
    {
      question: "What should I do if two colors become indistinguishable in a simulation?",
      answer:
        "Add a non-color way to tell them apart — different patterns, icons, labels, or shapes alongside the color — rather than relying on color alone to convey the distinction.",
    },
    {
      question: "Is my uploaded image sent anywhere?",
      answer:
        "No — all simulation happens locally in your browser using canvas pixel processing. Nothing is uploaded to a server.",
    },
  ],
};
