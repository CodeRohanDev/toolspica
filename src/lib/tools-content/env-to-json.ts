import type { ToolContent } from "./types";

export const envToJsonContent: ToolContent = {
  overview: [
    "`.env` files are the standard way most modern applications store configuration and secrets outside of source code — one `KEY=value` pair per line, kept out of version control, and loaded into the application's environment at startup. That simple line-based format is great for editing by hand, but plenty of tools and workflows expect configuration as JSON instead: a deployment platform's environment variable import feature, a test fixture, a config object you want to paste directly into JavaScript, or a system integration that specifically requires a JSON payload.",
    "This tool parses standard `.env` syntax and converts it into a proper JSON object, one key-value pair at a time. It correctly handles the common real-world formatting variations you'll actually encounter in `.env` files: comment lines starting with `#` are skipped entirely (as they should be, since they're not configuration), blank lines are ignored, and values wrapped in either single or double quotes have those quotes stripped off before being placed into the JSON output, since the quotes are a `.env` file convention and shouldn't appear as literal characters in the resulting value.",
    "This is useful in a range of practical situations: converting a local `.env` file into JSON to paste into a platform's environment variable bulk-import feature, generating a JSON config object for a test or script that needs the same values your app already uses, or simply getting a clearer, more structured view of what variables and values a `.env` file actually contains — which can be harder to scan visually in raw `.env` format than in a properly formatted JSON object.",
    "As with every text tool here, conversion happens entirely in your browser — and this matters more than usual for this specific tool, since `.env` files routinely contain real secrets like API keys, database credentials, and tokens. Nothing you paste in is ever transmitted anywhere, which is an important property for a tool specifically designed to process files full of sensitive configuration values.",
  ],
  howItWorks: [
    {
      title: "Paste your .env content",
      description: "Enter the full contents of a .env file, including comments and blank lines.",
    },
    {
      title: "Comments and formatting are handled automatically",
      description: "Comment lines are skipped, and quoted values have their quotes removed.",
    },
    {
      title: "Copy the JSON output",
      description: "A clean JSON object with all your key-value pairs is ready to copy.",
    },
  ],
  examples: [
    {
      label: "Converting a .env file",
      input: '# Database\nDATABASE_URL=postgres://localhost:5432/db\nAPI_KEY="abc123"\nDEBUG=true',
      output: '{\n  "DATABASE_URL": "postgres://localhost:5432/db",\n  "API_KEY": "abc123",\n  "DEBUG": "true"\n}',
    },
  ],
  faqs: [
    {
      question: "Why is DEBUG=true converted to the string \"true\" instead of a boolean?",
      answer:
        "Environment variables are always plain text strings by nature — a `.env` file has no concept of a boolean or number type, only text. This tool preserves that accurately rather than guessing at intended types, since \"true\", \"false\", \"1\", and similar values could all reasonably mean different things depending on how your application parses them.",
    },
    {
      question: "Does this handle comments correctly?",
      answer:
        "Yes — any line starting with `#` (after trimming leading whitespace) is treated as a comment and excluded entirely from the JSON output, matching how `.env` parsing libraries like dotenv handle comments.",
    },
    {
      question: "What happens to a value with quotes around it?",
      answer:
        "Surrounding single or double quotes are automatically stripped before the value is placed in the JSON output, so `API_KEY=\"abc123\"` becomes `\"API_KEY\": \"abc123\"` — without the quotes appearing as literal characters inside the JSON string value.",
    },
    {
      question: "Is it safe to paste real secrets into this tool?",
      answer:
        "Yes — conversion happens entirely in your browser using plain JavaScript string parsing. Nothing you paste is sent to any server, which is an important property given that `.env` files routinely contain real API keys and credentials.",
    },
    {
      question: "Does this handle multi-line values in a .env file?",
      answer:
        "No — this tool expects the standard one-variable-per-line `.env` format. Multi-line values (which some `.env` implementations support using quotes spanning multiple lines) aren't correctly parsed and would need to be converted to a single line first.",
    },
  ],
};
