import type { ToolContent } from "./types";

export const colorPickerContent: ToolContent = {
  heroSubtitle: "Pick Any Color & Get HEX, RGB & HSL Instantly",
  overview: [
    "Picking a color and getting its exact code in every common format — HEX for CSS, RGB for canvas or design tools, HSL for intuitive lightness adjustments — is one of the most frequent small tasks in web design and development. This tool uses your browser's native color picker interface, then instantly shows the selected color in all three formats with one-click copying.",
    "On browsers that support it (most modern Chromium-based browsers like Chrome and Edge), an eyedropper tool lets you pick a color directly from anywhere on your screen — not just from the picker's own palette, but from any pixel in any open window, including images, other websites, or design mockups. This uses the browser's built-in EyeDropper API, running entirely locally with no screenshot or image upload involved.",
    "All three color format conversions (HEX to RGB to HSL) use precise, standard color space math — the same conversion formulas used across design tools and browsers, so the values shown match exactly what you'd see in a browser's own dev tools color picker.",
    "This is useful for quickly grabbing a color from a design reference, converting a picked color into the exact format your code needs, or just exploring how a color's HEX, RGB, and HSL representations relate to each other.",
  ],
  howItWorks: [
    {
      title: "Click the color swatch to open the picker",
      description: "Or use the eyedropper to sample a color from anywhere on screen.",
    },
    {
      title: "View the color in HEX, RGB, and HSL",
      description: "All three formats update instantly as you pick.",
    },
    {
      title: "Copy whichever format you need",
      description: "One click copies the exact code, ready to paste into your code.",
    },
  ],
  examples: [
    {
      label: "Picking a color",
      input: "Selected color: a medium indigo blue",
      output: "#4f46e5 — rgb(79, 70, 229) — hsl(244, 75%, 59%)",
    },
  ],
  faqs: [
    {
      question: "Why isn't the eyedropper (pick from screen) button showing up?",
      answer:
        "The screen eyedropper uses the browser's native EyeDropper API, currently supported in Chrome, Edge, and other Chromium-based browsers, but not yet in all browsers (including Safari and Firefox at the time of writing) — the button only appears when your browser supports it.",
    },
    {
      question: "Can the eyedropper pick a color from any window, not just this page?",
      answer:
        "Yes — the browser's native eyedropper tool lets you sample a pixel from anywhere on your screen, including other applications and windows, not just content within this page or even within the browser itself.",
    },
    {
      question: "Are the HEX, RGB, and HSL values always exactly equivalent?",
      answer:
        "Yes — they represent the identical underlying color, just in three different notations. HEX and RGB convert losslessly (they're the same values in different number bases), while HSL involves a real color-space transformation that's still mathematically exact, not an approximation.",
    },
    {
      question: "Is my picked color or screen content sent anywhere?",
      answer:
        "No — both the standard color picker and the screen eyedropper run entirely through your browser's native, local APIs. Nothing about what you pick or where on your screen you pick it from is transmitted anywhere.",
    },
    {
      question: "Which format should I use in my CSS?",
      answer:
        "All three are valid CSS color values — HEX is the most compact and commonly used, RGB is useful when you need to reference individual channels programmatically, and HSL is often easiest for making intuitive adjustments (like \"make this 10% lighter\") since lightness is a direct, isolated value in that format.",
    },
  ],
};
