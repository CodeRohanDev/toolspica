import type { ToolContent } from "./types";

export const youtubeTitleGeneratorContent: ToolContent = {
  heroSubtitle: "Generate YouTube Video Title Ideas That Follow Proven Patterns",
  overview: [
    "A YouTube title has one job before anything else: get someone scrolling through a feed of thumbnails to actually click. Certain title structures — how-to framing, numbered lists, curiosity gaps, personal-experiment framing — consistently perform well across the platform precisely because they signal clearly what the viewer will get, which is what YouTube's own recommendation system and viewers both respond to.",
    "This tool takes your video's topic and runs it through eight well-established title patterns: how-to guides, comprehensive overviews (\"Everything You Need to Know\"), personal experiment framing (\"I Tried X for 30 Days\"), ultimate guides, quick-explainer framing, \"why it matters\" framing, curiosity-gap framing (\"What Nobody Tells You\"), and mistake-avoidance listicles.",
    "These are proven structural patterns, not titles written specifically for your video's actual content — the best use is picking the pattern that genuinely fits what your video delivers, then adjusting the wording so the title accurately represents the content. A title that promises something the video doesn't deliver hurts audience retention and trust, even if it gets an initial click.",
  ],
  howItWorks: [
    { title: "Enter your video's topic", description: "Type the subject or main focus of your video." },
    { title: "Browse the title patterns", description: "See eight proven title structures built around your topic." },
    { title: "Pick and adjust", description: "Choose the one that best fits your actual content, and tweak the wording." },
  ],
  examples: [
    {
      label: "Topic-based generation",
      input: "sourdough bread",
      output: "How to Sourdough Bread (Step by Step)\nSourdough Bread: Everything You Need to Know\nI Tried Sourdough Bread for 30 Days — Here's What Happened",
    },
  ],
  faqs: [
    {
      question: "Will these titles guarantee more views?",
      answer:
        "No tool can guarantee that — these are proven structural patterns that tend to perform well, but actual performance depends on your thumbnail, content quality, and whether the title accurately represents what the video delivers.",
    },
    {
      question: "Should I always pick the most dramatic-sounding title?",
      answer:
        "Not necessarily — a title that overpromises relative to the actual video hurts audience retention and channel trust over time, even if it gets more initial clicks. Pick the pattern that's both compelling and accurate.",
    },
    {
      question: "Is there a limit on how long a YouTube title can be?",
      answer:
        "YouTube allows up to 100 characters, but titles over roughly 60-70 characters often get truncated in search results and suggested video feeds, so shorter, punchier titles tend to display fully more often.",
    },
    {
      question: "Is my topic sent to a server?",
      answer:
        "No — titles are generated entirely in your browser from the topic you type. Nothing is uploaded or stored.",
    },
  ],
};
