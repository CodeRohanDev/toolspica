import type { ToolContent } from "./types";

export const textWrapperContent: ToolContent = {
  overview: [
    "Text Wrapper reshapes how a block of text is broken into lines, in one of two genuinely different ways depending on what you actually need. \"Wrap to line width\" performs classic word wrapping: it re-breaks your text so that no line exceeds a character limit you set, breaking only at word boundaries so words are never split apart mid-way. This is exactly the logic a terminal, a fixed-width code comment block, or an old-school plain-text email needs, since none of those environments wrap long lines automatically the way a modern web page or word processor does.",
    "This matters more than it might seem for specific technical contexts: writing a comment block in source code where a style guide caps line length at 80 characters, formatting plain-text content for a system that displays monospace text without wrapping (like some terminal output, fixed-width reports, or legacy plain-text email clients), or preparing a block of text for a physical medium like a label or receipt printer with a known character-per-line limit. Manually inserting line breaks at the right character position by counting characters is exactly the kind of tedious, error-prone task worth automating.",
    "\"Add prefix/suffix per line\" solves a completely different problem: wrapping every line of existing text with a consistent string before and after it, without changing where the line breaks fall. Common uses include wrapping each line of a list in quotation marks to prepare it for pasting into code as an array of string literals, wrapping each line in a specific HTML tag (like `<li>` and `</li>` to quickly turn a plain list into HTML list items), or adding a consistent bullet character or comment marker (like `// `) to the start of every line in a block of code or notes.",
    "Both modes work on the entire block of text at once, respecting existing line breaks as the unit being processed, and update instantly as you adjust the width or the prefix/suffix text, so you can see the effect immediately rather than guessing and re-copying.",
  ],
  howItWorks: [
    {
      title: "Paste your text",
      description: "Enter the text or list you want to reformat.",
    },
    {
      title: "Choose a wrapping mode",
      description: "Wrap to a fixed line width, or add a consistent prefix/suffix to every line.",
    },
    {
      title: "Set your options",
      description: "Enter your character width, or your prefix and suffix strings.",
    },
    {
      title: "Copy the result",
      description: "The reformatted text updates instantly and is ready to copy.",
    },
  ],
  examples: [
    {
      label: "Wrapping each line in quotes (for code)",
      input: "apple\nbanana\ncherry",
      output: '"apple"\n"banana"\n"cherry"',
    },
    {
      label: "Wrapping to a 20-character width",
      input: "This is a longer sentence that needs to be wrapped to fit a narrow column.",
      output:
        "This is a longer\nsentence that needs\nto be wrapped to fit\na narrow column.",
    },
  ],
  faqs: [
    {
      question: "Will \"Wrap to line width\" ever split a word in half?",
      answer:
        "No — it only breaks lines at spaces between words, moving a whole word to the next line rather than cutting it apart. A single word longer than your specified width will exceed that width on its own line rather than being split.",
    },
    {
      question: "Can I use this to turn a plain list into HTML list items?",
      answer:
        "Yes — use \"Add prefix/suffix per line\" with `<li>` as the prefix and `</li>` as the suffix, and each line of your list becomes a properly wrapped HTML list item, ready to paste inside a `<ul>` or `<ol>` tag.",
    },
    {
      question: "Does the prefix/suffix mode change my line breaks at all?",
      answer:
        "No — it only adds the prefix and suffix text around each existing line exactly where it already is, without re-wrapping or changing where any line break falls.",
    },
    {
      question: "What's a good line width for source code comments?",
      answer:
        "Common style guides typically recommend 72, 80, or 100 characters per line, though the right choice depends on your specific project's style guide or team convention — this tool lets you set any width you need.",
    },
    {
      question: "Can I combine both modes — wrap to a width AND add a prefix?",
      answer:
        "Not in a single pass — the two modes are separate operations. Run \"Wrap to line width\" first, copy the result back into the input, then switch to \"Add prefix/suffix per line\" to apply the second transformation on top.",
    },
  ],
};
