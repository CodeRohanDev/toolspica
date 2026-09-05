import type { ToolContent } from "./types";

export const emailSubjectLineTesterContent: ToolContent = {
  heroSubtitle: "Test Your Email Subject Line for Spam Triggers and Length Issues",
  overview: [
    "A subject line has an outsized effect on whether a marketing or outreach email even gets opened — but it's also the single biggest factor spam filters weigh when deciding whether an email lands in the inbox or gets routed to junk. Certain words and patterns (\"free,\" \"act now,\" excessive exclamation marks, ALL CAPS) are strongly correlated with spam in filter training data, regardless of how legitimate the actual email is.",
    "This tool scores a subject line against several concrete signals: overall length (subject lines over 60 characters often get truncated in inbox previews, especially on mobile), the presence of common spam-trigger words and phrases, the number of all-caps words, excessive exclamation marks, and emoji usage. Each issue reduces the score from a starting 100, giving you a quick numeric read on deliverability risk.",
    "This checks structural, well-documented spam-filter signals — it doesn't guarantee inbox placement, since actual spam filtering also considers sender reputation, domain authentication (SPF/DKIM/DMARC), and recipient engagement history, none of which a subject-line checker can evaluate. Use this as a quick sanity check before sending, not a guarantee of deliverability.",
  ],
  howItWorks: [
    { title: "Enter your subject line", description: "Type the exact subject line you're planning to send." },
    { title: "Review the score and flags", description: "See a 0-100 score with specific issues called out." },
    { title: "Revise and re-check", description: "Adjust the subject line and watch the score update instantly." },
  ],
  examples: [
    {
      label: "High-risk subject",
      input: "FREE!!! Act Now — Limited Time Offer!!!",
      output: "Low score — multiple spam-trigger words, excessive exclamation marks, all-caps words flagged.",
    },
  ],
  faqs: [
    {
      question: "Does a perfect score guarantee my email won't be marked as spam?",
      answer:
        "No — this checks well-documented subject-line-level spam signals, but actual inbox placement also depends on sender reputation, domain authentication (SPF/DKIM/DMARC), and how recipients have engaged with your previous emails, none of which this tool can evaluate.",
    },
    {
      question: "Why is \"free\" flagged as a spam trigger?",
      answer:
        "Words like \"free,\" \"guarantee,\" and \"act now\" appear disproportionately often in spam training data that email providers use to build their filters, so they're statistically correlated with a higher spam score even in legitimate emails.",
    },
    {
      question: "What's the ideal subject line length?",
      answer:
        "Roughly 20-60 characters tends to display fully across most inbox previews, especially on mobile devices where longer subject lines get truncated mid-word.",
    },
    {
      question: "Is my subject line sent anywhere to be analyzed?",
      answer:
        "No — the scoring happens entirely in your browser using JavaScript. Nothing you type is uploaded or stored.",
    },
  ],
};
