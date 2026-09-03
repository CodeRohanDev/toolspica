import type { ToolContent } from "./types";

export const curlCommandGeneratorContent: ToolContent = {
  overview: [
    "curl is the near-universal command-line tool for making HTTP requests, used constantly for testing APIs, debugging network issues, and scripting requests outside of a browser or full application code. Its syntax, while powerful, isn't especially memorable — remembering the exact flags for setting a request method, adding multiple headers, and including a JSON body correctly (with the right quoting so your shell doesn't mangle special characters) is a recurring small friction point even for experienced developers.",
    "This tool builds a correct curl command for you from a simple form: pick an HTTP method, enter a URL, add any headers you need (one per line, in the standard `Key: Value` format), and provide a request body if your method needs one. It handles the fiddly syntax details automatically — wrapping the URL and header values in quotes, adding the `-X` flag for the method, using `-H` for each header, and `-d` for the body — producing a command you can paste directly into a terminal and run immediately.",
    "This is especially useful for sharing a reproducible API request with a teammate (pasting a working curl command is often clearer and more portable than describing a request in prose), documenting exact API usage in a README or ticket, or just double-checking you have the right flag syntax before running something against a production API where a typo could have real consequences.",
    "The generated command uses standard curl syntax compatible with any modern terminal on macOS, Linux, or Windows (via PowerShell, WSL, or Git Bash) — curl ships built into macOS and most Linux distributions by default, and has been included in Windows 10 and 11 since 2018, making a generated command broadly usable regardless of what system you or a teammate is running.",
  ],
  howItWorks: [
    {
      title: "Choose a method and enter the URL",
      description: "Pick GET, POST, PUT, PATCH, or DELETE, and enter the endpoint URL.",
    },
    {
      title: "Add headers and a body if needed",
      description: "Enter headers one per line, and a request body for non-GET methods.",
    },
    {
      title: "Copy the generated command",
      description: "A ready-to-run curl command is built instantly and ready to paste into a terminal.",
    },
  ],
  examples: [
    {
      label: "Generating a POST request",
      input: "Method: POST, URL: https://api.example.com/users, Body: {\"name\":\"Jane\"}",
      output:
        "curl -X POST 'https://api.example.com/users' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Jane\"}'",
    },
  ],
  faqs: [
    {
      question: "Why doesn't the body field appear for GET requests?",
      answer:
        "GET requests conventionally don't include a request body — parameters for a GET request should be part of the URL's query string instead. The tool hides the body field for GET to reflect this standard convention.",
    },
    {
      question: "Does this escape special characters in my request body correctly?",
      answer:
        "Yes — single quotes within your body content are escaped so the generated command works correctly when pasted into a standard Unix-style shell (bash, zsh). If you're using PowerShell specifically, quoting rules differ slightly and you may need minor adjustments.",
    },
    {
      question: "Can I add multiple headers?",
      answer:
        "Yes — enter each header on its own line in the Headers field, in the format `Key: Value`. Each line becomes a separate `-H` flag in the generated command.",
    },
    {
      question: "Will this work on Windows?",
      answer:
        "curl has shipped built into Windows 10 and 11 since 2018, so the generated command works directly in PowerShell or Command Prompt in most cases, as well as in WSL or Git Bash — for complex bodies with special characters, PowerShell's quoting behavior can occasionally differ slightly from Unix shells.",
    },
    {
      question: "Does this send the actual request, or just generate the command?",
      answer:
        "It only generates the command text — nothing is actually sent anywhere from this tool. You copy the generated command and run it yourself in your own terminal when you're ready.",
    },
  ],
};
