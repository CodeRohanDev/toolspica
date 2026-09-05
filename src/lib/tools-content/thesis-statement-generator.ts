import type { ToolContent } from "./types";

export const thesisStatementGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Clear Thesis Statement from Your Topic and Reasons",
  overview: [
    "A thesis statement has a specific job: state your paper's central argument in one clear sentence that also previews the reasoning behind it. Many first drafts of a thesis either state a topic without an actual argument (\"This essay will discuss social media\") or bury the argument in vague language — a good thesis states a clear position and the main reasons supporting it, in one sentence.",
    "This tool takes your topic, your specific stance or claim on that topic, and up to three supporting reasons, then combines them into a single, properly connected thesis sentence using standard academic thesis structure: claim + \"because\" + reasons, correctly joined with commas and \"and\" whether you provide one, two, or three reasons.",
    "A strong thesis is specific and arguable — something a reasonable person could disagree with — rather than a statement of obvious fact. This tool handles the sentence construction and connecting logic correctly, but the quality of the actual claim and reasons you provide is what determines whether the resulting thesis is genuinely strong; a vague stance produces a vague thesis no matter how well it's grammatically assembled.",
  ],
  howItWorks: [
    { title: "Enter your topic and stance", description: "State the topic and your specific argument or position on it." },
    { title: "Add your supporting reasons", description: "List up to three reasons that support your stance." },
    { title: "Copy the combined thesis", description: "Get one properly connected thesis sentence, ready to open your essay." },
  ],
  examples: [
    {
      label: "Two-reason thesis",
      input: "Stance: Schools should reduce homework, Reasons: it increases stress, it doesn't improve test scores",
      output: "Schools should reduce homework because it increases stress and it doesn't improve test scores.",
    },
  ],
  faqs: [
    {
      question: "What makes a thesis statement strong versus weak?",
      answer:
        "A strong thesis takes a specific, arguable position (something a reasonable person could disagree with) and previews the reasoning behind it. A weak thesis just states a topic or an obvious fact without an actual argument.",
    },
    {
      question: "How many reasons should a thesis include?",
      answer:
        "One to three is standard for most essays — enough to preview your argument's structure without cramming the entire paper's content into a single sentence.",
    },
    {
      question: "Can I edit the generated thesis afterward?",
      answer:
        "Yes — treat the output as a strong first draft. Refining the exact wording to sound like your own voice, and tightening the specific claim, usually improves it further.",
    },
    {
      question: "Is my topic or stance sent anywhere?",
      answer:
        "No — the thesis is assembled entirely in your browser from what you type. Nothing is uploaded or stored.",
    },
  ],
};
