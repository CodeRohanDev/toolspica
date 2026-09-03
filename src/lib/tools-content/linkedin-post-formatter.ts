import type { ToolContent } from "./types";

export const linkedinPostFormatterContent: ToolContent = {
  heroSubtitle: "Bold and Italic Text for LinkedIn Posts, No Formatting Menu Needed",
  overview: [
    "LinkedIn's post editor has no bold or italic button — the only way to get styled text into a post is by using special Unicode characters that look bold or italic to the eye, even though they're technically just different letter symbols under the hood. This tool converts whatever you type into those Unicode look-alike characters, so you can paste genuinely styled text straight into your post.",
    "Write your post normally, then select Bold or Italic to convert the current text into the corresponding Unicode style. Because the conversion works on Unicode math alphanumeric characters rather than real formatting, the styled text will display consistently across LinkedIn, most other social platforms, and even plain text fields — it's just how the characters are, not a formatting instruction that might get stripped.",
    "This is genuinely useful for making a headline sentence, a key stat, or a call-to-action stand out in an otherwise plain-text post, which can meaningfully improve scroll-stopping engagement on a feed where everything else looks the same.",
  ],
  howItWorks: [
    { title: "Write your post", description: "Type normally in the text box." },
    { title: "Convert to bold or italic", description: "Click a button to transform the current text." },
    { title: "Copy and paste into LinkedIn", description: "Styled text pastes exactly as shown." },
  ],
  examples: [
    { label: "Making a headline stand out", input: "Big News", output: "𝐁𝐢𝐠 𝐍𝐞𝐰𝐬" },
  ],
  faqs: [
    { question: "Why doesn't LinkedIn have a real bold button?", answer: "LinkedIn's editor doesn't support rich text formatting in posts, so styled-looking text relies on Unicode character look-alikes instead." },
    { question: "Will this text look the same on mobile?", answer: "Yes — since it's just different Unicode characters, it renders consistently across devices and platforms that support Unicode." },
    { question: "Can I mix bold and italic in one post?", answer: "Yes — convert one section to bold, then select and convert a different section to italic before combining them." },
    { question: "Are numbers supported too?", answer: "Bold digits are supported; italic digits aren't part of the Unicode math alphanumeric block, so they display as regular numbers." },
    { question: "Will screen readers read styled text correctly?", answer: "Not always — some screen readers may read Unicode style characters oddly or skip them, so use sparingly for key phrases rather than entire posts." },
  ],
};
