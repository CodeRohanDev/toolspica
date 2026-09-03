import type { ToolContent } from "./types";

export const oneRepMaxCalculatorContent: ToolContent = {
  heroSubtitle: "Estimate Your One-Rep Max & Training Percentages",
  overview: [
    "One-rep max (1RM) — the maximum weight you could lift for a single repetition — is a foundational reference number for strength training program design, since most structured lifting programs prescribe weights as a percentage of 1RM rather than an absolute number. Testing an actual 1RM directly carries injury risk and requires careful warm-up, which is why estimating it from a lighter, higher-rep set is the standard practical approach.",
    "This tool uses the Epley formula, one of the most widely used 1RM estimation formulas: 1RM = weight × (1 + reps/30). It's derived from the observed relationship between how much weight can be lifted and how many reps that weight allows before failure — as reps increase, the percentage of true 1RM that weight represents decreases in a fairly predictable pattern.",
    "The estimate is most accurate for sets in the lower rep range (roughly 10 reps or fewer) — the relationship between reps and percentage of 1RM becomes less reliable and more individually variable at higher rep counts, which is why very high-rep sets (15+ reps) produce a much less trustworthy 1RM estimate than a heavier, lower-rep set.",
    "Alongside the estimated 1RM, the tool shows a percentage table (50% through 100%) — genuinely useful for programming, since many strength programs prescribe specific training weights as \"80% of 1RM\" or similar, and this table converts that percentage directly into an actual weight to load on the bar.",
  ],
  howItWorks: [
    {
      title: "Enter the weight you lifted",
      description: "For a set performed close to failure.",
    },
    {
      title: "Enter the number of reps completed",
      description: "Most accurate for 10 reps or fewer.",
    },
    {
      title: "View your estimated 1RM and percentage table",
      description: "Training weights at 50-100% of your estimated max.",
    },
  ],
  examples: [
    {
      label: "One-rep max estimate",
      input: "100 kg for 5 reps",
      output: "Estimated 1RM: 116.7 kg",
    },
  ],
  faqs: [
    {
      question: "Why use a formula instead of just testing my actual 1RM?",
      answer:
        "Testing a true 1RM directly requires careful warm-up and carries meaningful injury risk, especially for lifters without a spotter or extensive experience with maximal lifts. Estimating from a safer, higher-rep set gives a useful reference number without that risk.",
    },
    {
      question: "How accurate is the Epley formula?",
      answer:
        "It's one of several validated estimation formulas and works reasonably well for most lifters in the 1-10 rep range, though individual variation exists — some people's true 1RM will be somewhat higher or lower than the formula predicts, and different formulas (like Brzycki) can give slightly different estimates for the same input.",
    },
    {
      question: "Why is the estimate less accurate for high-rep sets?",
      answer:
        "The relationship between reps and percentage of 1RM becomes less consistent and more affected by individual muscular endurance at higher rep ranges — a formula calibrated primarily on lower-rep data extrapolates less reliably out to 15+ reps, which is why this tool caps input at 15 reps.",
    },
    {
      question: "How is the percentage table useful for training?",
      answer:
        "Many strength programs prescribe specific sets as a percentage of 1RM (like \"work up to 3 sets of 5 at 80%\") — having the actual weight for each common percentage precalculated saves doing that math manually before every session.",
    },
    {
      question: "Should beginners test or estimate their 1RM?",
      answer:
        "Estimating from a moderate-rep set is generally safer and sufficient for programming purposes, especially for newer lifters who haven't yet developed the technique consistency needed to safely attempt a true maximal single lift — actual 1RM testing is more common among experienced lifters with proper coaching and spotting.",
    },
  ],
};
