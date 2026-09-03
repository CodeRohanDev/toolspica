import type { ToolContent } from "./types";

export const equationSolverContent: ToolContent = {
  heroSubtitle: "Solve Linear and Quadratic Equations for x",
  overview: [
    "Solving an equation for x is one of algebra's most fundamental tasks, but manually rearranging terms, expanding parentheses, and applying the quadratic formula is time-consuming and easy to get wrong — especially with equations that have terms on both sides.",
    "This tool takes any linear or quadratic equation written in standard notation (with x as the variable, parentheses, exponents like x^2, and functions like sqrt()) and solves it exactly. Rather than symbolically manipulating the equation the way a human would, it evaluates both sides at several sample points and mathematically reconstructs the underlying polynomial — a technique that works correctly no matter how the equation is written, since equivalent expressions always evaluate to the same results.",
    "Enter the left and right sides of the equation separately (everything before and after the equals sign), and the tool moves everything to one side, identifies whether the resulting equation is linear or quadratic, and solves accordingly — including handling equations with no real solution or that are true for every value of x.",
    "This is useful for checking homework answers, solving equations that come up in physics or engineering problems, verifying algebra done by hand, and quickly getting an answer when manual solving would take several steps.",
  ],
  howItWorks: [
    {
      title: "Enter both sides of the equation",
      description: "Everything before the equals sign, and everything after.",
    },
    {
      title: "Click Solve for x",
      description: "The equation is simplified and classified as linear or quadratic.",
    },
    {
      title: "Review the solution and steps",
      description: "The value(s) of x, along with the key steps taken.",
    },
  ],
  examples: [
    {
      label: "Solving a linear equation with terms on both sides",
      input: "3x + 5 = x + 13",
      output: "x = 4",
    },
    {
      label: "Solving a quadratic equation",
      input: "x^2 - 5x + 6 = 0",
      output: "x = 3 or x = 2",
    },
  ],
  faqs: [
    {
      question: "What kinds of equations can this solve?",
      answer:
        "Linear equations (where x appears only to the first power) and quadratic equations (where x appears up to the second power, x^2), including ones with parentheses, terms on both sides, and simple functions like sqrt(). It can't solve equations involving trigonometric or logarithmic functions of x, or higher-degree polynomials.",
    },
    {
      question: "How does this solve equations without doing algebra step by step like a person would?",
      answer:
        "It evaluates both sides of the equation at a few sample x values and mathematically reconstructs the equivalent polynomial from those results — a technique that works correctly regardless of how the equation happens to be written, since any two equivalent expressions produce identical results at every input.",
    },
    {
      question: "What does 'true for all values of x' mean?",
      answer:
        "It means both sides of the equation are actually the same expression written differently (like 2(x+1) = 2x+2) — there's no single value of x that makes it true, because it's already true universally.",
    },
    {
      question: "Why did I get 'no solution'?",
      answer:
        "For a linear equation, this means both sides simplify to a mathematically false statement (like 5 = 7) once x cancels out entirely. For a quadratic, it means the discriminant is negative, meaning no real number satisfies the equation (though complex solutions would exist).",
    },
    {
      question: "Can I use this for equations with fractions or division by x?",
      answer:
        "Simple numeric division works fine, but expressions with x in a denominator aren't polynomial and fall outside what this tool solves — it will report that the equation isn't a supported linear or quadratic form.",
    },
  ],
};
