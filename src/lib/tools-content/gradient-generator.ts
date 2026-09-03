import type { ToolContent } from "./types";

export const gradientGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Two-Color CSS Gradient With Live Preview",
  overview: [
    "A simple two-color linear gradient is one of the most common visual effects in modern web design — a background, a button, a hero section — and getting the exact CSS syntax right (color order, angle direction) is easier with a live visual preview than by guessing and checking in a browser.",
    "This tool lets you pick a start color, an end color, and an angle in degrees, then shows a live preview of the resulting gradient alongside the exact CSS linear-gradient() syntax, ready to copy directly into a stylesheet.",
    "The angle determines the gradient's direction — 0deg points the gradient straight up (bottom to top), 90deg points right (left to right), 180deg points down, and 270deg points left, with any value in between producing a diagonal gradient at that specific angle. This matches exactly how CSS's linear-gradient() angle syntax works.",
    "This is useful for quickly designing a background gradient, a button hover effect, or any two-color blend, with the confidence that the copied CSS will render exactly as previewed since the tool uses the browser's own native gradient rendering.",
  ],
  howItWorks: [
    {
      title: "Pick a start and end color",
      description: "Using the color pickers or by entering HEX values directly.",
    },
    {
      title: "Set the angle",
      description: "Controls the gradient's direction, from 0 to 360 degrees.",
    },
    {
      title: "Copy the CSS",
      description: "The exact linear-gradient() syntax, ready to paste.",
    },
  ],
  examples: [
    {
      label: "Diagonal two-color gradient",
      input: "Start #4f46e5, end #ec4899, angle 135deg",
      output: "background: linear-gradient(135deg, #4f46e5, #ec4899);",
    },
  ],
  faqs: [
    {
      question: "What does the angle actually control?",
      answer:
        "The angle sets the direction the gradient flows — 0deg goes from bottom to top, 90deg goes from left to right, 180deg goes from top to bottom, and 270deg goes from right to left, matching CSS's standard linear-gradient() angle convention exactly.",
    },
    {
      question: "Why does the preview match exactly what I'll get in my actual CSS?",
      answer:
        "The preview is rendered using the browser's own native CSS gradient engine, applying the exact same linear-gradient() syntax that's shown in the copy box — there's no separate rendering logic, so what you see is precisely what you'll get when you paste the CSS into your own stylesheet.",
    },
    {
      question: "Can I use this for more than two colors?",
      answer:
        "This tool is scoped to a simple two-color gradient for quick, focused use. For a multi-stop gradient with any number of colors, plus radial and conic gradient types, the dedicated CSS Gradient Generator tool supports that fuller feature set.",
    },
    {
      question: "Does the gradient work in all modern browsers?",
      answer:
        "Yes — linear-gradient() has been supported in every modern browser for years and is a standard, well-established CSS feature, so the generated code will render consistently across browsers.",
    },
    {
      question: "Can I use named colors or rgba() instead of HEX?",
      answer:
        "This tool's color pickers work with HEX specifically, but you can manually edit the generated CSS afterward to swap in a named color or an rgba() value with transparency — the linear-gradient() syntax itself accepts any valid CSS color format.",
    },
  ],
};
