import type { ToolContent } from "./types";

export const jsonFormatterContent: ToolContent = {
  overview: [
    "JSON (JavaScript Object Notation) is the standard data format for APIs, configuration files, and countless developer tools — but raw JSON, especially minified JSON returned by an API or squeezed into a single line in a log file, is nearly unreadable to a human. A JSON formatter (sometimes called a JSON beautifier) takes that compact or inconsistently-formatted JSON and reformats it with consistent indentation and line breaks, turning a wall of `{\"a\":1,\"b\":{\"c\":2}}` into a properly nested, readable structure.",
    "This tool parses your JSON using the browser's native JSON parser (the same engine that powers every JSON.parse() call in JavaScript), which means it validates the structure as a side effect of formatting it — if your JSON has a syntax error, a trailing comma, a missing quote, or a mismatched bracket, you'll see the exact parser error message rather than a silently broken or partial output. This makes it useful not just for formatting valid JSON, but as a first diagnostic step when JSON from an API or config file isn't parsing the way you expect.",
    "You can choose between 2-space and 4-space indentation, the two overwhelmingly common conventions in developer tooling and style guides — 2 spaces is the default in most JavaScript/TypeScript projects and matches what tools like Prettier and ESLint typically enforce, while 4 spaces is more common in Python and some enterprise Java/C# codebases. Whichever you choose, nested objects and arrays are indented consistently at every level, making the data's structure immediately visible at a glance.",
    "Common uses include making a minified API response readable while debugging, cleaning up a config file that's been edited by different tools with inconsistent formatting, or just quickly inspecting the shape of a JSON payload before writing code against it. Everything runs instantly in your browser — no data is ever sent anywhere, which matters when the JSON you're formatting contains real API keys, tokens, or user data from a production system.",
  ],
  howItWorks: [
    {
      title: "Paste your JSON",
      description: "Drop in minified, compact, or inconsistently formatted JSON.",
    },
    {
      title: "Choose indentation",
      description: "Pick 2 or 4 spaces to match your project's style.",
    },
    {
      title: "Copy the formatted result",
      description: "Cleanly indented, readable JSON appears instantly — or a clear error if it's invalid.",
    },
  ],
  examples: [
    {
      label: "Formatting minified JSON",
      input: '{"name":"Toolspica","tools":573,"free":true}',
      output: '{\n  "name": "Toolspica",\n  "tools": 573,\n  "free": true\n}',
    },
  ],
  faqs: [
    {
      question: "Why does it show a parser error instead of formatting my JSON?",
      answer:
        "The JSON you pasted has a syntax error — a common cause is a trailing comma after the last item in an object or array (valid in JavaScript object literals, but not valid JSON), a missing quote around a key, or a mismatched bracket. The error message shown comes directly from the browser's JSON parser and usually points to roughly where the problem is.",
    },
    {
      question: "Does this validate my JSON or just format it?",
      answer:
        "Both — formatting requires successfully parsing the JSON first, so if your input is invalid, you'll get a clear parse error instead of formatted output rather than a silently broken result.",
    },
    {
      question: "Is my data safe to paste here if it contains API keys or tokens?",
      answer:
        "Yes — formatting happens entirely in your browser using JavaScript's built-in JSON parser. Nothing you paste is uploaded to any server, which is exactly why this is safe to use even with real, sensitive API responses.",
    },
    {
      question: "Does the order of keys change after formatting?",
      answer:
        "No — object keys are preserved in their original order (which is also how JavaScript's JSON.stringify works), so formatting only affects whitespace and indentation, never the structure or ordering of your data.",
    },
    {
      question: "Can I format an extremely large JSON file?",
      answer:
        "There's no artificial limit imposed by the tool, but very large JSON (tens of megabytes) may feel slower since formatting happens on your device's CPU rather than a server — for typical API responses and config files, formatting is instant.",
    },
  ],
};
