import type { ToolContent } from "./types";

export const instagramCaptionGeneratorContent: ToolContent = {
  heroSubtitle: "Generate Instagram Caption Ideas from a Topic or Mood",
  overview: [
    "Staring at a great photo with no idea what to write underneath it is one of the most common small frictions in posting on Instagram — the picture is ready, but the caption holds the post up. Most captions don't need to be clever essays; they need to set a tone and give the post a bit of personality, which is exactly the kind of short, templated writing that's easy to automate a starting point for.",
    "This tool takes a topic, object, or mood word — a place, a food, an activity, a feeling — and runs it through a set of caption templates covering different common tones: reflective (\"Living my best life, one {topic} at a time\"), enthusiastic (\"{topic} hits different today\"), casual (\"Just here for the {topic} vibes\"), and a few others, each producing a distinct ready-to-use caption built around your word.",
    "These are intentionally template-based, not AI-generated from scratch — that means the output is instant, predictable, and free, but also that it's a starting point rather than a finished, highly personalized caption. The best use of this tool is picking the template whose tone fits your post, then tweaking a word or two to match your own voice, rather than posting the raw output verbatim every time.",
  ],
  howItWorks: [
    { title: "Enter a topic or mood", description: "Type a word or short phrase describing your photo's subject or vibe." },
    { title: "Browse the caption options", description: "See several caption variations built around your topic, each in a different tone." },
    { title: "Copy and personalize", description: "Copy the one that fits best, and tweak the wording to sound like you." },
  ],
  examples: [
    {
      label: "Topic-based generation",
      input: "sunset",
      output: "Living my best life, one sunset at a time. ✨\nSunset hits different today. 💛\nJust here for the sunset vibes. 🌿",
    },
  ],
  faqs: [
    {
      question: "Are these captions written by AI?",
      answer:
        "No — they're built from a fixed set of caption templates combined with your topic word, not generated fresh by a language model. That makes results instant and predictable, but also means they read as a starting point to personalize, not a final caption.",
    },
    {
      question: "Can I use the same caption idea for different photos?",
      answer:
        "Yes, though changing the topic word each time (or picking a different template tone) helps keep captions from feeling repetitive across your feed if you post often.",
    },
    {
      question: "Does this add hashtags to the caption automatically?",
      answer:
        "No — this focuses purely on caption text. Pair it with the Hashtag Generator tool if you also want relevant hashtag suggestions for the same post.",
    },
    {
      question: "Is my topic or photo uploaded anywhere?",
      answer:
        "No photo is ever involved — this tool only works with the text topic you type, generated entirely in your browser with nothing sent to a server.",
    },
  ],
};
