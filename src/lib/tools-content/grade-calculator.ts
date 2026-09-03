import type { ToolContent } from "./types";

export const gradeCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate a Weighted Final Grade From Multiple Categories",
  overview: [
    "Most courses don't grade everything equally — homework might count for 20% of a final grade, quizzes for 15%, a midterm for 25%, and a final exam for 40%, with each category's own average feeding into that weighted total. Adding these up by hand means multiplying each score by its weight and dividing by the total weight, a calculation that's simple in principle but easy to make an arithmetic slip on with more than two or three categories.",
    "This tool lets you add as many graded categories as your course structure needs, enter your score percentage and weight percentage for each, and calculates the correct weighted final grade automatically. Categories can be added or removed freely, so it works whether a course has just two components or eight.",
    "The calculation normalizes automatically even if your entered weights don't sum to exactly 100% — useful for checking a running grade partway through a term, when not every category has a final weight assigned yet, or when double-checking a syllabus's stated weighting adds up correctly. The tool flags clearly when weights don't sum to 100 so you're aware the result is based on a normalized calculation.",
    "Alongside the final percentage, the tool shows a standard letter grade (A through F, using the common 90/80/70/60 percentage cutoffs) — a useful quick reference, though it's worth checking your specific course or institution's grading scale, since exact letter grade cutoffs and plus/minus grading do vary between schools and instructors.",
  ],
  howItWorks: [
    {
      title: "Add a row for each graded category",
      description: "Label it (homework, midterm, final exam, etc.) and use Add item for more.",
    },
    {
      title: "Enter each category's score and weight",
      description: "Score as a percentage, weight as a percentage of the total grade.",
    },
    {
      title: "View your weighted final grade",
      description: "Calculated instantly as you fill in each row, with a letter grade shown alongside.",
    },
  ],
  examples: [
    {
      label: "Two-category weighted grade",
      input: "Homework: 90% (weight 30%), Exam: 78% (weight 70%)",
      output: "Final grade: 81.6% — B",
    },
    {
      label: "Three-category weighted grade",
      input: "Quizzes: 85% (20%), Midterm: 76% (30%), Final: 88% (50%)",
      output: "Final grade: 83.8% — B",
    },
  ],
  faqs: [
    {
      question: "What happens if my weights don't add up to 100%?",
      answer:
        "The tool normalizes the calculation automatically, dividing the weighted sum by the total weight actually entered rather than assuming it should be 100 — with a note shown so you're aware the result reflects that adjustment, useful for checking a running grade before every category has a final weight assigned.",
    },
    {
      question: "Are the letter grade cutoffs the same at every school?",
      answer:
        "No — this tool uses the common 90/80/70/60 percentage cutoffs for A/B/C/D as a general reference, but many schools use different cutoffs, plus/minus grading, or entirely different scales. Check your specific course syllabus for the exact scale that applies to your grade.",
    },
    {
      question: "Can I use this to figure out what I need on a final exam to get a target grade?",
      answer:
        "Not directly — this calculator works forward from known scores to a final grade. To solve for a needed final exam score, you'd enter your known category scores and experiment with different values in the remaining category until the final grade matches your target.",
    },
    {
      question: "How many categories can I add?",
      answer:
        "As many as your course structure needs — use the Add item button to add more rows, and the remove button on each row to delete one you don't need, matching any grading breakdown from two categories up to a dozen or more.",
    },
    {
      question: "Does the order I enter categories in matter?",
      answer:
        "No — the weighted average calculation is the same regardless of what order the categories are entered in, since each category's contribution depends only on its own score and weight, not its position in the list.",
    },
  ],
};
