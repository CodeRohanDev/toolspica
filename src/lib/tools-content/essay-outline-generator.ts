import type { ToolContent } from "./types";

export const essayOutlineGeneratorContent: ToolContent = {
  heroSubtitle: "Turn a Topic and Key Points into a Structured Essay Outline",
  overview: [
    "Staring at a blank page before writing an essay is often the hardest part — not because the ideas aren't there, but because turning a topic and a few points into an actual structure (introduction, body paragraphs, conclusion) takes a different kind of thinking than the writing itself. An outline solves this by giving you the skeleton first, so the actual writing becomes filling in gaps rather than inventing structure from nothing.",
    "This tool takes your essay topic and a list of main points (one per line) and builds a standard five-paragraph-style outline: an introduction section with a hook, background, and thesis placeholder, one body section per point you listed (each with space for supporting evidence, analysis, and a transition), and a conclusion section that restates the thesis and closes with a broader thought.",
    "This produces a mechanical structural scaffold, not written content — it organizes where your ideas go, but you still write the actual sentences, evidence, and analysis. That's intentional: a genuinely useful outline should still leave the thinking and writing to you, since the whole point of an outline is to organize your own ideas, not replace them.",
  ],
  howItWorks: [
    { title: "Enter your topic", description: "Type the overall subject of your essay." },
    { title: "List your main points", description: "One point per line — each becomes its own body section in the outline." },
    { title: "Copy the outline", description: "Use the generated structure as a skeleton to write your full essay." },
  ],
  examples: [
    {
      label: "Three-point essay",
      input: "Topic: remote work productivity, Points: flexibility, communication challenges, work-life balance",
      output: "I. Introduction\n   A. Hook...\nII. Flexibility\n   A. Supporting evidence...",
    },
  ],
  faqs: [
    {
      question: "Does this write my essay for me?",
      answer:
        "No — it generates a structural outline (where your introduction, body points, and conclusion go), not written sentences or content. You still write the actual argument, evidence, and analysis.",
    },
    {
      question: "How many main points should I list?",
      answer:
        "A standard essay structure works well with 2-4 main points, each becoming its own body section — more than that can start to feel scattered rather than focused, depending on your essay's required length.",
    },
    {
      question: "Can I use this for something other than a five-paragraph essay?",
      answer:
        "Yes — the structure adapts to however many points you list, so it works for shorter or longer essays than the traditional five-paragraph format, though a very long list of points may work better broken into subheadings within fewer sections.",
    },
    {
      question: "Is my topic or outline content sent anywhere?",
      answer:
        "No — the outline is generated entirely in your browser from the text you type. Nothing is uploaded or stored.",
    },
  ],
};
