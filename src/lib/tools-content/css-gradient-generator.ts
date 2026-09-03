import type { ToolContent } from "./types";

export const cssGradientGeneratorContent: ToolContent = {
  heroSubtitle: "Build Multi-Stop Linear, Radial & Conic Gradients",
  overview: [
    "Beyond a simple two-color blend, CSS supports three genuinely different gradient types — linear (flowing in a straight line at any angle), radial (expanding outward from a center point), and conic (sweeping around a center point like a color wheel) — each producing a visually distinct effect suited to different design needs.",
    "This tool builds all three gradient types with support for any number of color stops (not just two), letting you construct more complex, multi-color transitions rather than being limited to a simple start-to-end blend. Add or remove color stops freely, and the live preview and generated CSS update instantly.",
    "Linear and conic gradients both use an angle to control their direction or starting rotation, while radial gradients expand outward from the center regardless of angle, which is why the angle control is hidden specifically for radial gradients — it wouldn't have any effect on that gradient type.",
    "This is useful for building a more sophisticated multi-color background, a radial spotlight or glow effect, a conic gradient for a custom progress indicator or color wheel, or any CSS gradient beyond a basic two-color linear blend.",
  ],
  howItWorks: [
    {
      title: "Choose linear, radial, or conic",
      description: "Each produces a genuinely different visual effect.",
    },
    {
      title: "Add color stops and set the angle",
      description: "Any number of stops; angle applies to linear and conic types.",
    },
    {
      title: "Copy the generated CSS",
      description: "Ready to paste directly into a stylesheet.",
    },
  ],
  examples: [
    {
      label: "Three-stop linear gradient",
      input: "Linear, 90deg, stops: #4f46e5, #06b6d4, #ec4899",
      output: "background: linear-gradient(90deg, #4f46e5, #06b6d4, #ec4899);",
    },
    {
      label: "Radial gradient",
      input: "Radial, stops: #4f46e5, #06b6d4",
      output: "background: radial-gradient(circle, #4f46e5, #06b6d4);",
    },
  ],
  faqs: [
    {
      question: "What's the visual difference between linear, radial, and conic gradients?",
      answer:
        "Linear flows in a straight line across the element at a set angle. Radial expands outward in circles or ellipses from a center point, like a spotlight. Conic sweeps around a center point like a color wheel or pie chart, transitioning colors as it rotates rather than as it moves outward or across.",
    },
    {
      question: "Why doesn't the angle control appear for radial gradients?",
      answer:
        "Radial gradients expand outward from a center point in all directions simultaneously, so a rotational angle doesn't apply to them the way it does to linear (direction of flow) or conic (starting rotation point) gradients — the control is hidden since it would have no visual effect.",
    },
    {
      question: "How many color stops can I add?",
      answer:
        "There's no fixed limit — add as many color stops as your design needs, with a minimum of two required to form any gradient at all. Each additional stop adds another color transition point along the gradient.",
    },
    {
      question: "Are color stops evenly spaced, or can I control their position?",
      answer:
        "This tool spaces color stops evenly by default, matching CSS's default behavior when no explicit position is specified for each stop — for precise control over exactly where each color transition happens, you'd need to manually add percentage positions to the generated CSS.",
    },
    {
      question: "Will this gradient work in all modern browsers?",
      answer:
        "Linear and radial gradients have been supported in every modern browser for years. Conic gradients are a somewhat newer CSS feature but are well supported in all current versions of major browsers (Chrome, Firefox, Safari, Edge) as of recent years.",
    },
  ],
};
