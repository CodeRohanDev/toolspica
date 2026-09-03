import type { ToolContent } from "./types";

export const romanNumeralConverterContent: ToolContent = {
  heroSubtitle: "Convert Numbers to Roman Numerals & Back",
  overview: [
    "Roman numerals use a system of letter combinations (I, V, X, L, C, D, M) rather than positional digits, and converting between Roman numerals and regular numbers requires understanding both the additive rule (values generally combine by addition, like VI = 5+1 = 6) and the subtractive rule (a smaller value placed before a larger one is subtracted, like IV = 5-1 = 4) that together determine how a given number is correctly represented.",
    "This tool converts in both directions. Number to Roman takes any whole number from 1 to 3999 (the standard range representable with the basic Roman numeral system without special notation for larger numbers) and builds the correct Roman numeral using a greedy algorithm that always produces the standard, conventionally correct representation — not just any valid combination, but the specific one universally recognized as correct.",
    "Roman to Number parses an entered Roman numeral, correctly handling the subtractive notation (recognizing that IV means 4, not \"I\" and \"V\" separately), and validates that the input is actually a well-formed Roman numeral — not just any random combination of the seven letters, since not every letter combination represents a valid Roman numeral under the standard rules.",
    "This is useful for reading dates on buildings, clock faces, movie copyright years, book chapter numbering, or Super Bowl and Olympic numbering — all common places Roman numerals still appear in everyday life — or the reverse, converting a familiar number into Roman numeral form for a design, tattoo, or personalized use.",
  ],
  howItWorks: [
    {
      title: "Choose your conversion direction",
      description: "Number to Roman, or Roman to Number.",
    },
    {
      title: "Enter your number or Roman numeral",
      description: "Numbers accepted 1-3999; Roman input validated for correct form.",
    },
    {
      title: "View the converted result",
      description: "Instantly, using the standard conventional Roman numeral rules.",
    },
  ],
  examples: [
    {
      label: "Number to Roman",
      input: "1994",
      output: "MCMXCIV",
    },
    {
      label: "Roman to number",
      input: "MCMXCIV",
      output: "1994",
    },
  ],
  faqs: [
    {
      question: "Why is 1994 written as MCMXCIV instead of a simpler combination?",
      answer:
        "Roman numerals use subtractive notation to avoid repeating a symbol more than three times in a row — 1994 breaks down as 1000 (M) + 900 (CM, meaning 1000-100) + 90 (XC, meaning 100-10) + 4 (IV, meaning 5-1), following the standard rule that a smaller value placed immediately before a larger one is subtracted rather than added.",
    },
    {
      question: "Why is the range limited to 1-3999?",
      answer:
        "The basic Roman numeral system (using I, V, X, L, C, D, M without any special extended notation) can represent numbers up to 3999 (MMMCMXCIX) — going higher requires special notation like an overline to indicate multiplication by 1,000, which isn't part of the standard system this tool implements.",
    },
    {
      question: "Can Roman numerals represent zero?",
      answer:
        "No — the standard Roman numeral system has no symbol for zero at all, reflecting that the concept of zero as a number wasn't part of Roman mathematics. This is exactly why the number-to-Roman conversion requires an input of at least 1.",
    },
    {
      question: "How does the tool know if an entered Roman numeral is valid?",
      answer:
        "It converts the entered Roman numeral to its numeric value, then converts that number back to Roman numeral form using the standard rules, and checks whether the result matches the original input exactly — if it doesn't match, the original wasn't a validly formed Roman numeral, even if it used only valid letters.",
    },
    {
      question: "Why do Roman numerals still appear on clock faces and in movie credits?",
      answer:
        "This is largely a stylistic and traditional convention rather than a practical necessity — Roman numerals convey a formal or classical aesthetic, which is why they persist in contexts like clock faces, building cornerstones, movie copyright years, and formal numbering (Super Bowl, Olympic Games) long after Arabic numerals became the practical standard for everyday counting.",
    },
  ],
};
