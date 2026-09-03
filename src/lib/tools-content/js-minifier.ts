import type { ToolContent } from "./types";

export const jsMinifierContent: ToolContent = {
  heroSubtitle: "Strip Comments and Whitespace From JavaScript Safely",
  overview: [
    "JavaScript written for readability has comments, indentation, and line breaks that all add bytes without changing behavior — this tool strips them out to shrink the file, while being careful not to touch anything inside string or template literals, where a `//` or `/* */` sequence is actual content, not a comment.",
    "The minifier walks through the code character by character, correctly tracking when it's inside a single-quoted, double-quoted, or backtick template string, so comment-stripping never accidentally corrupts a URL or regex pattern that happens to contain `//`. Once comments are removed, remaining whitespace and line breaks collapse down to a compact single-line result.",
    "This is a safe, textual minifier rather than a full AST-based minifier like Terser or UglifyJS — it won't rename variables to shorter names or perform dead-code elimination, but it removes comments and whitespace without any risk of breaking string content, which is the failure mode naive minifiers hit most often.",
  ],
  howItWorks: [
    { title: "Paste your JavaScript", description: "Any readable, commented source code." },
    { title: "Comments and whitespace strip automatically", description: "String content is correctly preserved untouched." },
    { title: "Copy the minified result", description: "See the size reduction percentage live." },
  ],
  examples: [
    { label: "Minifying a small function", input: "function greet(name) {\\n  // say hello\\n  console.log('Hi ' + name);\\n}", output: "function greet(name){console.log('Hi '+name);}" },
  ],
  faqs: [
    { question: "Will this break URLs or regex patterns containing //?", answer: "No — the minifier tracks string and template literal boundaries carefully, so // inside actual string content is never mistaken for a comment." },
    { question: "Does this rename variables to shorter names?", answer: "No — this is a textual minifier that removes comments and whitespace only; variable/function renaming requires full AST-based tools like Terser." },
    { question: "Is this as effective as a production build minifier?", answer: "It achieves meaningful size reduction from comments/whitespace, but production-grade minifiers achieve significantly more through renaming and dead-code elimination — use this for quick manual minification, not a build pipeline." },
    { question: "Is my code uploaded anywhere?", answer: "No — minification runs entirely in your browser." },
    { question: "Will this change my code's behavior?", answer: "No — only comments and non-meaningful whitespace are removed; all actual logic and tokens remain unchanged." },
  ],
};
