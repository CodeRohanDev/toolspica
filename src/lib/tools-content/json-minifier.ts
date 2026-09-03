import type { ToolContent } from "./types";

export const jsonMinifierContent: ToolContent = {
  overview: [
    "Minifying JSON strips out every character that doesn't carry actual data — indentation spaces, line breaks, and the extra space after colons and commas that a formatter adds for human readability. None of that whitespace has any meaning to a JSON parser, so removing it produces functionally identical data in a smaller payload, which matters whenever JSON is being transmitted over a network or stored where size has a real cost.",
    "This shows up constantly in real infrastructure work: shrinking a configuration file or API response fixture before committing it to a repository, reducing the payload size of data embedded directly in an HTML page (like initial state passed to a JavaScript framework), or preparing JSON for a system with a strict size limit, like a URL query parameter or certain webhook payloads. It's also just useful for anyone who wants to see, concretely, how much of a formatted JSON file's size is actually just whitespace versus real data.",
    "This tool uses the same parse-then-serialize approach as the JSON Formatter, just with no indentation argument passed to the serializer, which produces the most compact valid representation possible: no spaces, no line breaks, minimal punctuation. Because minifying requires successfully parsing the input first, it also validates your JSON as a side effect — invalid JSON will show a clear parser error instead of a partial or broken minified result.",
    "The tool also reports the exact size difference in bytes and as a percentage, so you get a concrete, quantified sense of the savings rather than just an visually smaller-looking block of text — useful for justifying whether minification is even worth doing for a given file, since the savings scale with how much whitespace and nesting the original had.",
  ],
  howItWorks: [
    {
      title: "Paste your formatted JSON",
      description: "Enter JSON with any amount of indentation or line breaks.",
    },
    {
      title: "See the minified result",
      description: "A single-line, whitespace-free version is generated instantly.",
    },
    {
      title: "Check the size savings",
      description: "The exact byte reduction and percentage are shown for reference.",
    },
  ],
  examples: [
    {
      label: "Minifying formatted JSON",
      input: '{\n  "name": "Toolspica",\n  "free": true\n}',
      output: '{"name":"Toolspica","free":true}',
    },
  ],
  faqs: [
    {
      question: "Does minifying change the actual data in my JSON?",
      answer:
        "No — minification only removes whitespace that has no semantic meaning in JSON. The keys, values, structure, and data types are exactly preserved; a minified JSON parses back into the identical data as its formatted version.",
    },
    {
      question: "How much size reduction should I expect?",
      answer:
        "It depends entirely on how much whitespace and nesting the original has — deeply nested, heavily indented JSON can shrink significantly (often 20-40% smaller), while already-compact JSON with little formatting will see a smaller reduction.",
    },
    {
      question: "Should I minify JSON I'm committing to a Git repository?",
      answer:
        "Generally no for config files and fixtures meant to be human-edited — the small size savings usually aren't worth losing readability and clean diffs. Minification is more valuable for JSON being transmitted over a network or embedded in a page, where every byte affects load time.",
    },
    {
      question: "Is minified JSON harder to debug?",
      answer:
        "Yes, significantly — a minified JSON blob is a single unreadable line. If you need to inspect or debug minified JSON, run it back through the JSON Formatter tool to expand it into a readable structure first.",
    },
    {
      question: "Does this remove comments from my JSON?",
      answer:
        "Standard JSON doesn't support comments at all (unlike JSON5 or JSONC), so if your input contains comments, it isn't valid standard JSON and will fail to parse — this tool works only with strictly valid JSON.",
    },
  ],
};
