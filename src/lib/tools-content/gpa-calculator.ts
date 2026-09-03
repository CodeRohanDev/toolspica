import type { ToolContent } from "./types";

export const gpaCalculatorContent: ToolContent = {
  heroSubtitle: "Calculate Your GPA on a Standard 4.0 Scale",
  overview: [
    "GPA (Grade Point Average) isn't a simple average of letter grades — it's a credit-weighted average, meaning a 4-credit course counts more toward your overall GPA than a 1-credit course with the same letter grade. Calculating it correctly by hand across a full semester's worth of courses, each with a different credit load, is exactly the kind of weighted arithmetic that's easy to get subtly wrong.",
    "This tool uses the standard US 4.0 GPA scale, where each letter grade maps to a specific point value: A is 4.0, A- is 3.7, B+ is 3.3, down through F at 0.0, following the common plus/minus grading convention used by most US colleges and universities. Add a row for each course, select its letter grade and enter its credit hours, and the tool calculates the correctly weighted overall GPA automatically.",
    "The calculation multiplies each course's grade points by its credit hours to get that course's \"quality points,\" sums the quality points across all courses, and divides by the total credit hours — the standard formula used by registrar's offices and academic transcript systems. This is the same method used to calculate both a single semester's GPA and a cumulative GPA across multiple semesters, as long as every course from the relevant period is entered.",
    "It's worth noting that exact GPA scales and grade-to-point mappings do vary somewhat between institutions — some don't use plus/minus grading at all, some use a slightly different point scale, and some weight honors or AP courses differently. This tool uses the most common standard 4.0 plus/minus scale, but always check your specific institution's official scale for your actual transcript GPA.",
  ],
  howItWorks: [
    {
      title: "Add a row for each course",
      description: "Use Add course for as many courses as you're calculating GPA for.",
    },
    {
      title: "Select each course's letter grade and credit hours",
      description: "The grade determines quality points; credits determine its weight.",
    },
    {
      title: "View your calculated GPA",
      description: "Updates instantly as you add courses, grades, or credit hours.",
    },
  ],
  examples: [
    {
      label: "Two-course GPA",
      input: "Course 1: A (3 credits), Course 2: B (4 credits)",
      output: "GPA: 3.43",
    },
    {
      label: "Three-course GPA with mixed grades",
      input: "A- (3 credits), B+ (3 credits), C (4 credits)",
      output: "GPA: 2.90",
    },
  ],
  faqs: [
    {
      question: "Why isn't GPA just the average of my letter grades?",
      answer:
        "GPA is weighted by credit hours, not a simple average — a 4-credit course with a B affects your GPA more than a 1-credit course with the same grade, because it represents more of your total coursework. Simply averaging the grade points without weighting by credits would give a misleading result whenever course credit loads differ.",
    },
    {
      question: "Does every school use the same 4.0 scale?",
      answer:
        "Most US institutions use a similar 4.0 scale with plus/minus grading, but the exact point values can vary slightly between schools, and some institutions don't use plus/minus grading at all (treating a B+ and B the same). Always check your school's official grading scale for your actual transcript GPA.",
    },
    {
      question: "Can I use this to calculate my cumulative GPA across multiple semesters?",
      answer:
        "Yes — enter every course from all the semesters you want included, each with its grade and credit hours, and the calculation weights and combines them exactly the same way whether they're from one semester or several.",
    },
    {
      question: "How is a plus or minus grade (like B+) different from a plain grade in the calculation?",
      answer:
        "Under standard plus/minus grading, a B+ is worth 3.3 points while a plain B is worth 3.0 and a B- is worth 2.7 — three genuinely different point values for what might otherwise look like similar performance, which is exactly why selecting the precise grade including its plus or minus matters for an accurate GPA.",
    },
    {
      question: "Does this account for weighted GPA for honors or AP classes?",
      answer:
        "No — this calculates a standard unweighted GPA on the 4.0 scale. Some high schools use a weighted scale that gives extra points for honors, AP, or IB courses (sometimes up to 5.0), which would require a different, school-specific point mapping than this tool provides.",
    },
  ],
};
