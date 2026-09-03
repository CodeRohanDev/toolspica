import type { ToolContent } from "./types";

export const quadraticEquationSolverContent: ToolContent = {
  heroSubtitle: "Solve ax² + bx + c = 0 Using the Quadratic Formula",
  overview: [
    "The quadratic formula solves any equation in the standard form ax² + bx + c = 0, and it's one of the most memorized formulas in algebra for good reason — it works for every quadratic, unlike factoring, which only works cleanly when the roots happen to be nice numbers.",
    "This tool takes the three coefficients (a, b, and c) directly and computes the discriminant (b² − 4ac), then applies the quadratic formula to find the roots. The discriminant's sign tells the whole story before even computing the roots: positive means two distinct real roots, zero means one repeated real root, and negative means the equation has no real solutions (only complex ones).",
    "When the discriminant is negative, this tool still computes and displays the complex roots (in the form p + qi), since a negative discriminant doesn't mean there's no answer — it just means the answer isn't a real number, which is a completely valid and common result in more advanced algebra.",
    "This is useful for solving quadratic equations directly from known coefficients, checking factoring or completing-the-square work, understanding how the discriminant predicts the number and type of roots, and any physics or engineering problem that reduces to a quadratic equation.",
  ],
  howItWorks: [
    {
      title: "Enter coefficients a, b, and c",
      description: "From the equation ax² + bx + c = 0, with a not equal to 0.",
    },
    {
      title: "The discriminant computes automatically",
      description: "b² − 4ac, which determines the nature of the roots.",
    },
    {
      title: "View the roots",
      description: "Two real roots, one repeated root, or a complex conjugate pair.",
    },
  ],
  examples: [
    {
      label: "Solving a quadratic with two real roots",
      input: "a=1, b=-3, c=2",
      output: "x = 2 or x = 1",
    },
    {
      label: "Solving a quadratic with complex roots",
      input: "a=1, b=2, c=5",
      output: "x = -1 + 2i or x = -1 - 2i",
    },
  ],
  faqs: [
    {
      question: "What does the discriminant tell me before solving?",
      answer:
        "A positive discriminant means two distinct real roots, zero means exactly one repeated real root (the parabola just touches the x-axis), and a negative discriminant means no real roots — the parabola never crosses the x-axis, and the roots are a complex conjugate pair instead.",
    },
    {
      question: "Why does a is required to not equal 0?",
      answer:
        "If a is 0, there's no x² term at all, which means the equation is actually linear (bx + c = 0), not quadratic — a different, simpler equation type that this tool's Equation Solver counterpart handles directly.",
    },
    {
      question: "What do the complex roots actually mean?",
      answer:
        "They mean the parabola described by the equation never intersects the real x-axis — there's no real number that makes the equation true. Complex roots always come in conjugate pairs (p + qi and p − qi) for equations with real coefficients, which is exactly the pattern this tool displays.",
    },
    {
      question: "Is this the same formula taught in algebra class?",
      answer:
        "Yes — this applies the standard quadratic formula, x = (−b ± √(b² − 4ac)) / 2a, exactly as taught, just automating the arithmetic so you get the exact result instantly.",
    },
    {
      question: "Can I use decimal or negative coefficients?",
      answer:
        "Yes — a, b, and c can be any real numbers, positive, negative, or decimal, and the tool computes the discriminant and roots correctly for any valid combination.",
    },
  ],
};
