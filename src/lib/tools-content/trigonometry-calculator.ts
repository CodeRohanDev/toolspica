import type { ToolContent } from "./types";

export const trigonometryCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Sin, Cos, Tan & Their Reciprocals for Any Angle",
  overview: [
    "The six trigonometric functions — sine, cosine, tangent, and their reciprocals cosecant, secant, and cotangent — describe the relationships between angles and side ratios in right triangles, and extend to describe periodic wave behavior far beyond geometry, from sound waves to electrical signals to orbital mechanics.",
    "This tool computes all six trig functions for any angle, accepting input in either degrees (the everyday unit, where a full circle is 360°) or radians (the mathematical standard, where a full circle is 2π) — a common source of calculation errors when the wrong unit is assumed.",
    "The reciprocal functions are computed directly from sine, cosine, and tangent: cosecant is 1/sine, secant is 1/cosine, and cotangent is cosine/sine (equivalently 1/tangent). When an angle causes a reciprocal function to divide by zero (like cosecant at 0°, where sine is 0), the tool reports it as undefined rather than an error or an incorrect number.",
    "This is useful for trigonometry and precalculus homework, physics problems involving angles and forces, engineering calculations, and quickly checking a trig value without reaching for a scientific calculator or worrying about degree/radian mode.",
  ],
  howItWorks: [
    {
      title: "Enter an angle",
      description: "Any numeric value.",
    },
    {
      title: "Choose degrees or radians",
      description: "Whichever unit your angle is measured in.",
    },
    {
      title: "View all six trig function values",
      description: "Computed instantly, with reciprocals flagged as undefined where relevant.",
    },
  ],
  examples: [
    {
      label: "Computing trig values for a common angle",
      input: "30 degrees",
      output: "sin: 0.5, cos: 0.866025, tan: 0.57735",
    },
  ],
  faqs: [
    {
      question: "What's the difference between degrees and radians?",
      answer:
        "Degrees divide a full circle into 360 equal parts (the everyday unit from geometry class), while radians measure angle by arc length relative to the radius, making a full circle equal to 2π radians. Most higher mathematics and physics use radians, while everyday and geometry contexts typically use degrees.",
    },
    {
      question: "Why does tangent sometimes show as undefined?",
      answer:
        "Tangent is sine divided by cosine, so it's undefined wherever cosine equals zero — at 90°, 270°, and their equivalents. Geometrically, this corresponds to a right triangle where one side would have to be infinitely long, which isn't a valid triangle.",
    },
    {
      question: "What are cosecant, secant, and cotangent used for?",
      answer:
        "They're simply the reciprocals of sine, cosine, and tangent, and appear less often in basic trigonometry but come up regularly in calculus (their derivatives and integrals have distinct, useful forms) and in certain physics and engineering formulas where working with a reciprocal is more natural.",
    },
    {
      question: "Why do sin(30°) and cos(60°) give the same value?",
      answer:
        "This reflects the co-function identity: sine and cosine are complementary functions, meaning sin(θ) always equals cos(90° − θ). Since 30° and 60° are complementary angles (they sum to 90°), their sine and cosine values mirror each other exactly.",
    },
    {
      question: "Can I enter negative angles or angles greater than 360°?",
      answer:
        "Yes — trigonometric functions are periodic and well-defined for any real number input, including negative angles and angles that wrap around the circle multiple times. The tool computes them correctly using the same underlying periodic functions.",
    },
  ],
};
