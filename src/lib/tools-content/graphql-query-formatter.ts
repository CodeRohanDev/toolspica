import type { ToolContent } from "./types";

export const graphqlQueryFormatterContent: ToolContent = {
  heroSubtitle: "Format a GraphQL Query Using the Real graphql-js Parser",
  overview: [
    "A GraphQL query copied from a network tab or a minified client bundle is often crammed onto one line, making its actual field selection structure hard to follow. This tool formats it using the genuine `graphql-js` reference library — the same parser that powers GraphQL.js servers and most JavaScript GraphQL tooling — rather than a naive text reindenter.",
    "Because it's a real parser, your query gets validated as proper GraphQL syntax in the process: invalid queries are caught with a clear error rather than being silently reformatted into something that looks plausible but wouldn't actually execute. Valid queries, mutations, subscriptions, fragments, and variable definitions all format correctly with standard GraphQL indentation conventions.",
    "This is useful for reviewing a query pulled from browser dev tools, debugging a GraphQL request before pasting it into a bug report, or reformatting a query pasted from documentation or a colleague's message into a consistent, readable style.",
  ],
  howItWorks: [
    { title: "Paste your GraphQL query", description: "A query, mutation, subscription, or fragment." },
    { title: "Parsing and validation run automatically", description: "Uses the genuine graphql-js parser." },
    { title: "Copy the formatted result", description: "Standard, readable GraphQL indentation." },
  ],
  examples: [
    { label: "Formatting a one-line query", input: "query GetUser($id: ID!) { user(id: $id) { name email } }", output: "A multi-line, properly indented GraphQL query" },
  ],
  faqs: [
    { question: "Does this validate my GraphQL syntax?", answer: "Yes — it uses the real graphql-js parser, so syntactically invalid queries are caught and reported rather than silently reformatted." },
    { question: "Does it work with mutations and subscriptions too?", answer: "Yes — any valid GraphQL operation type (query, mutation, subscription) and fragments format correctly." },
    { question: "Does this check my query against a specific schema?", answer: "No — it validates general GraphQL syntax correctness, not that the fields actually exist in your specific API's schema." },
    { question: "Is my query uploaded anywhere?", answer: "No — parsing and formatting run entirely in your browser." },
    { question: "Does it support GraphQL variables and directives?", answer: "Yes — variable definitions, directives (like @include or @skip), and fragment spreads all format correctly since it uses a genuine parser." },
  ],
};
