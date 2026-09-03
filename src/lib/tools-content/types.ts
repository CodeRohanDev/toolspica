export interface ToolHowItWorksStep {
  title: string;
  description: string;
}

export interface ToolExample {
  label: string;
  input: string;
  output: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolContent {
  /** 300+ words total across paragraphs, unique to this tool. */
  overview: string[];
  howItWorks: ToolHowItWorksStep[];
  examples: ToolExample[];
  /** Hand-written, tool-specific — never generic filler. */
  faqs: ToolFaq[];
  /**
   * Short, punchy capability line shown under the H1 (e.g. "Count Words,
   * Characters, Sentences & Reading Time"). Optional — falls back to an
   * auto-derived line from `overview[0]` when omitted, so every tool gets
   * a subtitle even before this is hand-written.
   */
  heroSubtitle?: string;
}
