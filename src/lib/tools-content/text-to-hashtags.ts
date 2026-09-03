import type { ToolContent } from "./types";

export const textToHashtagsContent: ToolContent = {
  overview: [
    "A hashtag turns a word or phrase into a clickable, searchable label on nearly every social platform — Instagram, X (Twitter), TikTok, LinkedIn — by prefixing it with a # symbol. The formatting rule is strict and unforgiving: a hashtag can't contain spaces, since a space ends the tag entirely, and most platforms strip out punctuation within it too. That means turning a normal phrase like \"digital marketing tips\" into usable hashtags requires either splitting it into separate single-word tags or squashing it into one continuous word — exactly the two approaches this tool automates.",
    "\"One hashtag per word\" is the far more common approach and the one most creators actually use: each word in your input becomes its own separate, lowercase hashtag, so \"digital marketing tips for small business\" becomes six individual tags: #digital #marketing #tips #for #small #business. This maximizes discoverability, since each individual word becomes independently searchable, and lets you selectively delete the less useful ones (like \"for\") before posting.",
    "\"Combine into one #CamelCase tag\" takes the opposite approach, joining every word together into a single hashtag with each word capitalized for readability — the same phrase becomes #DigitalMarketingTipsForSmallBusiness. This style, sometimes called \"CamelCase hashtags,\" is specifically recommended by accessibility guidance for platforms like X and Instagram, because screen readers and assistive technology can correctly announce each capitalized word separately, while a fully lowercase run-together hashtag reads as one incomprehensible string to both humans and screen readers. It's the right choice for campaign-specific or branded hashtags meant to be read as a single memorable phrase (like a product launch tag), rather than for general topical discoverability.",
    "Either way, the tool strips out punctuation, apostrophes, and other symbols that aren't valid inside a hashtag, since most platforms only support letters and numbers (no spaces, hyphens, or special characters) within a single tag — protecting you from generating a tag that would actually break or get cut off when posted.",
  ],
  howItWorks: [
    {
      title: "Type your phrase",
      description: "Enter the words or topic you want turned into hashtags.",
    },
    {
      title: "Pick a format",
      description: "Choose separate hashtags per word, or one combined CamelCase tag.",
    },
    {
      title: "Copy and post",
      description: "The generated hashtags are ready to copy directly into your post.",
    },
  ],
  examples: [
    {
      label: "One hashtag per word",
      input: "digital marketing tips for small business",
      output: "#digital #marketing #tips #for #small #business",
    },
    {
      label: "Combined CamelCase tag",
      input: "digital marketing tips",
      output: "#DigitalMarketingTips",
    },
  ],
  faqs: [
    {
      question: "Why does CamelCase matter for a combined hashtag?",
      answer:
        "Capitalizing each word inside a combined hashtag (like #DigitalMarketingTips instead of #digitalmarketingtips) makes it readable at a glance and lets screen readers correctly announce it as separate words instead of one unpronounceable run-together string — a genuine accessibility best practice, not just a style preference.",
    },
    {
      question: "Does this remove punctuation from my words?",
      answer:
        "Yes — apostrophes, hyphens, and other symbols are stripped from each word, since most platforms don't allow them inside a hashtag and including them could cause the tag to break or truncate unexpectedly when posted.",
    },
    {
      question: "How many hashtags should I actually use in a post?",
      answer:
        "This varies significantly by platform and has changed over time — Instagram technically allows up to 30, but many current best-practice guides suggest fewer, more targeted tags perform better than maxing out the limit. This tool generates the tags; how many you use is a platform-specific judgment call.",
    },
    {
      question: "Can I generate hashtags from a full sentence with stop words like 'the' and 'and'?",
      answer:
        "Yes, but the tool includes every word as-is without filtering out common words — for cleaner results, consider removing filler words like \"the\", \"a\", or \"and\" from your input before generating, since they rarely make useful standalone hashtags.",
    },
    {
      question: "Are hashtags case-sensitive?",
      answer:
        "No — #MarketingTips and #marketingtips are treated as the identical tag by every major platform's search and indexing, so capitalization is purely a readability choice, not a functional difference in what the tag matches.",
    },
  ],
};
