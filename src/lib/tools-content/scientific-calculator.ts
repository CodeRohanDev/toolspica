import type { ToolContent } from "./types";

export const scientificCalculatorContent: ToolContent = {
  heroSubtitle: "Trig, Logs, Powers & More — Full Expression Support",
  overview: [
    "A basic calculator handles the four arithmetic operations, but real math and science problems regularly need trigonometric functions, logarithms, exponents, and square roots — all combined in a single expression with correct order of operations. This tool is a full scientific calculator that parses and evaluates complete expressions, including nested parentheses and function calls, rather than requiring one operation at a time.",
    "Functions supported include sin, cos, and tan (trigonometric functions), log (base-10 logarithm), ln (natural logarithm), and sqrt (square root), plus the mathematical constants π and e. Standard order of operations is respected — exponents before multiplication and division, multiplication and division before addition and subtraction, with parentheses overriding the default order wherever they're used, exactly like a real expression written on paper.",
    "A degrees/radians toggle controls how the trigonometric functions interpret their input — a genuinely important distinction, since sin(90) means something completely different depending on whether 90 is treated as degrees (giving 1) or radians (giving a small negative-adjacent value, since 90 radians is many full rotations around the circle). Getting this setting wrong is one of the most common scientific calculator mistakes, so it's shown clearly and toggled explicitly rather than buried in a settings menu.",
    "This runs entirely in your browser using a real expression parser — not a simple string-replace-and-evaluate trick — so it correctly handles complex nested expressions like sqrt(sin(45)^2 + cos(45)^2) with proper precedence and function scoping, the same way a dedicated scientific calculator app would.",
  ],
  howItWorks: [
    {
      title: "Build your expression",
      description: "Tap number, operator, and function buttons to build a complete expression.",
    },
    {
      title: "Set degrees or radians",
      description: "Controls how sin, cos, and tan interpret their input angle.",
    },
    {
      title: "Press equals to evaluate",
      description: "The full expression is calculated with correct order of operations.",
    },
  ],
  examples: [
    {
      label: "Trigonometric identity check",
      input: "sqrt(sin(45)^2 + cos(45)^2)",
      output: "1 (in degree mode)",
    },
    {
      label: "Combined expression with order of operations",
      input: "2 + 3 × 4 ^ 2",
      output: "50",
    },
  ],
  faqs: [
    {
      question: "Why does sin(90) give a different answer depending on the DEG/RAD setting?",
      answer:
        "In degree mode, sin(90) treats 90 as 90 degrees and returns 1. In radian mode, sin(90) treats 90 as 90 radians — a much larger angle after many full rotations around the circle — and returns a completely different value. Always check which mode is active before evaluating a trig function.",
    },
    {
      question: "What order of operations does this calculator follow?",
      answer:
        "Standard mathematical order: parentheses first, then exponents, then multiplication and division (left to right), then addition and subtraction (left to right) — the same PEMDAS/BODMAS convention taught in math education and used by every standard calculator.",
    },
    {
      question: "What's the difference between log and ln?",
      answer:
        "log calculates the base-10 logarithm (how many times you'd multiply 10 by itself to get the input value), while ln calculates the natural logarithm, using the mathematical constant e (approximately 2.71828) as its base instead of 10.",
    },
    {
      question: "Can I use nested functions and parentheses, like sqrt(sin(x)^2 + cos(x)^2)?",
      answer:
        "Yes — the calculator uses a real expression parser that correctly handles functions nested inside other functions, multiple levels of parentheses, and combined operations, evaluating the full expression exactly as written rather than requiring you to compute it in separate steps.",
    },
    {
      question: "What happens if I enter an invalid expression?",
      answer:
        "The calculator shows a clear \"Invalid expression\" message rather than a confusing wrong number or a silent failure — check for mismatched parentheses or an incomplete function call as the most common causes.",
    },
  ],
};
