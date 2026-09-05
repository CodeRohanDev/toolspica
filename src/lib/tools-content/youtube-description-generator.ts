import type { ToolContent } from "./types";

export const youtubeDescriptionGeneratorContent: ToolContent = {
  heroSubtitle: "Generate a Structured YouTube Video Description",
  overview: [
    "A YouTube description does real work beyond just filling space under a video — it helps YouTube's search and recommendation systems understand what the video is about, gives viewers a quick summary before committing to watch, and is where your channel subscribe prompt and social links actually get seen. A blank or one-line description leaves all of that value on the table.",
    "This tool takes your video's topic, a list of key points covered, your channel name, and an optional social media link, then assembles them into a structured description: an opening summary sentence, a bulleted list of what's covered (when you provide key points), a subscribe call-to-action, your social links, and a relevant hashtag pulled from your topic.",
    "This produces a solid structural template filled with your actual content details — it's not a fully polished, hand-written description, but it covers the components that matter (a clear summary, a scannable list of contents, and a subscribe nudge) that many creators skip entirely when writing descriptions from scratch under time pressure.",
  ],
  howItWorks: [
    { title: "Enter your video's topic", description: "Type the overall subject of the video." },
    { title: "List key points and channel details", description: "Add what's covered, your channel name, and optional social links." },
    { title: "Copy the description", description: "Paste it directly into YouTube Studio's description field, and adjust as needed." },
  ],
  examples: [
    {
      label: "Basic generation",
      input: "Topic: beginner guitar chords, Points: how to hold the guitar, the four basic chords",
      output: "In this video, we dive into beginner guitar chords. Here's what's covered:\n\n- How to hold the guitar\n- The four basic chords\n\nIf you found this helpful...",
    },
  ],
  faqs: [
    {
      question: "Does a good description actually help with YouTube search?",
      answer:
        "Yes — YouTube's search and recommendation systems use the description text (along with title and captions) to understand what a video is about, so a clear, keyword-relevant description can genuinely help discoverability.",
    },
    {
      question: "Where should hashtags go in the description?",
      answer:
        "This tool places one relevant hashtag at the end, which is standard practice — YouTube displays the first few hashtags from a description above the video title, so keep them relevant rather than stuffing in unrelated tags.",
    },
    {
      question: "Can I edit the generated description afterward?",
      answer:
        "Yes — treat it as a strong structural starting point. Adding specific timestamps, links to related videos, or more detail is easy to do directly in the generated text before publishing.",
    },
    {
      question: "Is my video information sent anywhere?",
      answer:
        "No — the description is assembled entirely in your browser from what you type. Nothing is uploaded or stored.",
    },
  ],
};
