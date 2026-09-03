import type { ToolContent } from "./types";

export const jsonValidatorContent: ToolContent = {
  overview: [
    "JSON has strict, unforgiving syntax rules: every key must be wrapped in double quotes (not single quotes), no trailing commas are allowed after the last item in an object or array, and every opening brace or bracket needs its matching close. A JSON validator checks a piece of text against those rules and tells you definitively whether it's valid JSON — and if it isn't, exactly what's wrong and roughly where the problem is, rather than leaving you to scan line by line looking for a stray comma.",
    "This matters constantly in real development work: an API is returning a 500 error and you suspect the request body you're sending isn't valid JSON, a config file mysteriously isn't loading and you want to rule out a syntax error before debugging deeper, or you're hand-editing a JSON file and want a quick sanity check before saving. A validator answers the single most basic but most important question — \"is this even parseable?\" — before you invest time debugging something further downstream.",
    "This tool uses the browser's native JSON parser to check validity, which means it enforces exactly the same rules any JavaScript environment, most APIs, and virtually every JSON-consuming system in the world will enforce — there's no risk of a validator being looser or stricter than the systems that will actually consume your JSON. On success, it also reports the top-level data type (object, array, string, number, or boolean) and, for objects, how many top-level keys it has — useful confirmation that you're looking at the structure you expect.",
    "On failure, the exact parser error message is shown, which typically identifies the type of problem (unexpected token, unexpected end of input, etc.) and its approximate position in the text — enough information in the overwhelming majority of cases to go straight to the specific character or line causing the issue, rather than needing to guess.",
  ],
  howItWorks: [
    {
      title: "Paste your JSON",
      description: "Enter the JSON text you want to check.",
    },
    {
      title: "See the instant result",
      description: "A clear valid/invalid status appears immediately, with details on either side.",
    },
    {
      title: "Fix and re-check",
      description: "Adjust your JSON based on the error message and watch the status update live.",
    },
  ],
  examples: [
    {
      label: "Invalid JSON (trailing comma)",
      input: '{"name": "Toolspica", "free": true,}',
      output: "Invalid JSON — Unexpected token } in JSON at position 36",
    },
  ],
  faqs: [
    {
      question: "Why is a trailing comma invalid in JSON, when it's fine in JavaScript?",
      answer:
        "JSON's specification is deliberately stricter than JavaScript object literal syntax — trailing commas were never included in the JSON standard, even though modern JavaScript allows them in actual code. This trips up a lot of people copying a JavaScript object literal and expecting it to also be valid JSON.",
    },
    {
      question: "Does this tell me the exact line and column of the error?",
      answer:
        "It shows the character position reported by the underlying JSON parser, which you can use to count into your text and find the exact spot — it doesn't display a separate line/column breakdown, but the position is precise.",
    },
    {
      question: "Can valid JSON still cause problems in my application?",
      answer:
        "Yes — this tool only checks JSON syntax validity, not whether the data matches a specific structure, schema, or the fields your application expects. Syntactically valid JSON can still be missing required fields or have unexpected types for your specific use case.",
    },
    {
      question: "Does single-quoted JSON count as valid?",
      answer:
        "No — the JSON specification requires double quotes for both keys and string values. Single quotes, even though valid in JavaScript and Python string literals, will cause this validator (and any standards-compliant JSON parser) to reject the input.",
    },
    {
      question: "Is this the same check my code's JSON.parse() would perform?",
      answer:
        "Yes — this tool uses the exact same built-in JSON parser your browser's JavaScript engine uses, so if this validator says your JSON is valid, `JSON.parse()` in your own code will successfully parse it too.",
    },
  ],
};
