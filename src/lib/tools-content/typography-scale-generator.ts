import type { ToolContent } from "./types";

export const typographyScaleGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Consistent Font-Size Scale From a Base Size and Ratio",
  overview: [
    "Picking font sizes for a design system by feel usually produces an inconsistent mess — an H2 that's barely bigger than an H3, or a jump from H1 to H2 that feels jarring. A modular type scale solves this by generating every size from one base value multiplied repeatedly by a fixed ratio, the same principle used in musical harmony and classical typography, producing sizes that feel proportionally related rather than arbitrary.",
    "Set your base font size and pick a ratio — from a subtle Minor Second (1.067) for tight, minimal interfaces up to the dramatic Golden Ratio (1.618) for bold editorial designs — and the tool generates eight steps from caption text up through H1, each shown live at its actual computed size so you can see the scale in action before committing to it.",
    "The output includes ready-to-use CSS custom properties in rem units, so you can drop the entire scale directly into your stylesheet's :root and reference consistent, proportional sizes throughout your project instead of hand-picking pixel values page by page.",
  ],
  howItWorks: [
    { title: "Set your base size and ratio", description: "Choose a starting point and a scale ratio." },
    { title: "Preview all 8 steps live", description: "See caption through H1 at their actual computed sizes." },
    { title: "Copy the CSS variables", description: "Drop the complete scale into your stylesheet." },
  ],
  examples: [
    { label: "Building a scale with Major Third ratio", input: "Base 16px, ratio 1.25", output: "Caption 12.8px, Body 16px, H1 61px" },
  ],
  faqs: [
    { question: "What ratio should I use?", answer: "Smaller ratios (1.067-1.2) suit dense UIs with many text levels; larger ratios (1.333-1.618) suit editorial or marketing pages with dramatic size contrast." },
    { question: "Why use rem units instead of pixels?", answer: "rem units scale with the user's browser font-size setting, which is important for accessibility — pixel values ignore user zoom/font preferences." },
    { question: "What's a typical base font size?", answer: "16px is the standard browser default and a common starting point for body text; some designs use 14px or 18px depending on density preference." },
    { question: "Does the scale account for line-height?", answer: "No — this generates font sizes only; line-height should be set separately, typically 1.4-1.6× the font size for body text." },
    { question: "Can I use a different number of steps than 8?", answer: "The generator currently produces a fixed 8-step scale from caption to H1, covering the most common typographic levels." },
  ],
};
