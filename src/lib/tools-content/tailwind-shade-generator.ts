import type { ToolContent } from "./types";

export const tailwindShadeGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Full 50-950 Shade Scale From One Color",
  overview: [
    "Tailwind CSS's color system uses a consistent scale from 50 (lightest tint) through 950 (darkest shade) for every color in its default palette, and building a custom color into that same shade structure means generating lighter tints and darker shades around a single base color consistently.",
    "This tool takes any HEX color as your base — treated as the 500 shade, matching Tailwind's convention where 500 typically represents the color's most saturated, \"pure\" form — and generates the full 50 through 950 scale around it by blending the base color toward white for the lighter shades and toward black for the darker ones, in increasing proportions.",
    "This is an approximation of Tailwind's actual shade generation approach, not an exact reproduction of any specific official Tailwind color's precise values — Tailwind's own palette was hand-tuned by designers for perceptual consistency across colors, while this tool applies a consistent mathematical blend formula. The results are usable and visually coherent, but won't be pixel-identical to an official Tailwind color even if you pick the same base hue.",
    "This is useful for extending a custom brand color into a full Tailwind-compatible shade scale for use in a `tailwind.config` file, building a consistent set of tints and shades for any design system (Tailwind-based or not), or quickly generating hover/active state variations of a specific color.",
  ],
  howItWorks: [
    {
      title: "Enter your base color",
      description: "Treated as the 500 shade in the generated scale.",
    },
    {
      title: "View the full 50-950 scale",
      description: "Lighter tints above, darker shades below, generated automatically.",
    },
    {
      title: "Copy any shade you need",
      description: "Each shade has its own copy button for its exact HEX code.",
    },
  ],
  examples: [
    {
      label: "Generating a shade scale",
      input: "Base color #4f46e5",
      output: "50 through 950 shade scale, with #4f46e5 as the 500 shade",
    },
  ],
  faqs: [
    {
      question: "Will these exactly match an official Tailwind color if I pick the same hue?",
      answer:
        "Not precisely — this tool uses a consistent mathematical blend (toward white for lighter shades, toward black for darker ones) applied uniformly to any base color, while Tailwind's official palette was individually hand-tuned by designers for each color, so exact values will differ even for a similar starting hue.",
    },
    {
      question: "Why is my input color treated as the 500 shade specifically?",
      answer:
        "500 is conventionally the most saturated, central shade in Tailwind's numbering system, roughly the midpoint of the light-to-dark scale — treating your input as this reference point matches how most Tailwind-based color scales are conventionally structured.",
    },
    {
      question: "Can I use this output directly in a tailwind.config file?",
      answer:
        "Yes — the generated HEX values for each shade (50 through 950) can be copied directly into a custom color definition in your Tailwind configuration, structured the same way Tailwind's own built-in colors are defined.",
    },
    {
      question: "Why do some generated shades look less vivid than the base color?",
      answer:
        "Blending toward white or black (rather than adjusting only lightness in HSL space) naturally desaturates a color somewhat as it moves toward either extreme — this is a normal characteristic of this blending approach and is part of why the results are an approximation rather than an exact match to hand-tuned palettes.",
    },
    {
      question: "Can I generate a scale from a very light or very dark base color?",
      answer:
        "Yes, though the results become less useful at the extremes — a base color that's already very close to white or black leaves little room for the lighter or darker shades respectively to look meaningfully different from the base, which is an inherent limitation of generating a scale from an already-extreme starting point.",
    },
  ],
};
