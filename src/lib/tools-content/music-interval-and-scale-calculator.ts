import type { ToolContent } from "./types";

export const musicIntervalAndScaleCalculatorContent: ToolContent = {
  heroSubtitle: "Find the Notes in Any Scale from Any Root Note",
  overview: [
    "Building a scale from any root note requires applying the correct pattern of semitone intervals for that scale type — major, minor, pentatonic, and modal scales each use a distinct interval pattern — and working this out manually means counting up the chromatic scale by hand for every note.",
    "This calculator takes any root note and scale type — major, natural minor, harmonic minor, major and minor pentatonic, blues, or the Dorian and Mixolydian modes — and instantly lists every note in that scale along with the interval name (like 'Major 3rd' or 'Perfect 5th') from the root to each note.",
    "A full reference table below also shows all twelve possible intervals from your chosen root note, useful for music theory study, songwriting, or quickly checking what note lies a specific interval away from any starting pitch.",
  ],
  howItWorks: [
    { title: "Select a root note", description: "Choose any of the twelve chromatic notes as your starting point." },
    { title: "Select a scale type", description: "Pick from major, minor, pentatonic, blues, or modal scales." },
    { title: "Read the scale notes", description: "See every note in the scale along with its interval name from the root." },
  ],
  examples: [
    {
      label: "C Major scale",
      input: "Root: C, Scale: Major",
      output: "C, D, E, F, G, A, B",
    },
  ],
  faqs: [
    {
      question: "What's the difference between a scale and an interval?",
      answer: "An interval is the distance between any two notes (measured in semitones), while a scale is a specific ordered set of intervals from a root note that together define a musical key or mode.",
    },
    {
      question: "Why do major and minor scales sound so different?",
      answer: "They use different interval patterns — most notably, the third note (a Major 3rd in major scales versus a Minor 3rd in minor scales) is the single biggest contributor to a scale's characteristic 'happy' or 'sad' quality.",
    },
    {
      question: "What are modes like Dorian and Mixolydian?",
      answer: "Modes are scales built using the same seven notes as a major scale but starting from a different note in that sequence, giving each mode its own distinct interval pattern and characteristic sound.",
    },
    {
      question: "Is this calculated using any external music theory service?",
      answer: "No — every scale and interval is computed locally using standard music theory interval patterns, with nothing sent to any server.",
    },
  ],
};
