import type { ToolContent } from "./types";

export const onlineMetronomeContent: ToolContent = {
  heroSubtitle: "A Free, Adjustable Online Metronome for Practice",
  overview: [
    "Practicing an instrument at a steady, controlled tempo is one of the most effective ways to build accuracy and timing, but it requires a reliable click track — a metronome — that most people don't carry with them separately from whatever device they're already practicing near.",
    "This tool is a fully functional browser-based metronome using the Web Audio API to generate precisely timed click sounds, with an adjustable tempo from 40 to 240 BPM and support for different time signatures, accenting the first beat of each measure with a higher-pitched click so you can always hear where the downbeat falls.",
    "Because it runs on the Web Audio API rather than pre-recorded audio files, the timing is sample-accurate and won't drift out of sync the way JavaScript timer-based clicks sometimes can over longer practice sessions.",
  ],
  howItWorks: [
    { title: "Set your tempo", description: "Drag the slider to your desired BPM, from 40 to 240." },
    { title: "Choose beats per measure", description: "Select how many beats make up each measure, from 2 to 6." },
    { title: "Press Start", description: "The metronome clicks steadily, accenting the first beat of each measure." },
  ],
  examples: [
    {
      label: "Practicing at 90 BPM in 4/4 time",
      input: "BPM: 90, Beats per measure: 4",
      output: "Steady click every ~667ms, with an accented click every 4th beat",
    },
  ],
  faqs: [
    {
      question: "Why does the first beat sound different?",
      answer: "The first beat of each measure (the downbeat) plays at a higher pitch to help you keep track of where you are within the measure, matching how most physical and digital metronomes work.",
    },
    {
      question: "Does the tempo stay perfectly accurate over long sessions?",
      answer: "Yes — clicks are generated using the Web Audio API's oscillator nodes, which use the audio hardware's own precise clock rather than JavaScript's less precise timer functions, keeping timing accurate over extended practice.",
    },
    {
      question: "Can I use this for any time signature?",
      answer: "It supports 2, 3, 4, 5, or 6 beats per measure, covering common time signatures like 2/4, 3/4, 4/4, 5/4, and 6/8 in terms of beat grouping.",
    },
    {
      question: "Does this require downloading an app?",
      answer: "No — it runs entirely in your browser using the Web Audio API, with no installation, account, or audio files needed.",
    },
  ],
};
