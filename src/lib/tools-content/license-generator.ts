import type { ToolContent } from "./types";

export const licenseGeneratorContent: ToolContent = {
  overview: [
    "An open source license is a legal document that tells anyone who finds your code exactly what they're allowed to do with it — use it, modify it, redistribute it, sell products built on it — and under what conditions. Publishing code without any license attached is a common and important mistake to avoid: under default copyright law in most countries, code with no explicit license is technically \"all rights reserved,\" meaning others have no clear legal permission to use it at all, regardless of your intent in making the repository public.",
    "This tool generates the full, correct text for four of the most widely used permissive open source licenses, each filled in automatically with your name and the current year: MIT (by far the most popular license on GitHub — extremely short, extremely permissive, requiring only that the license and copyright notice be preserved), ISC (functionally almost identical to MIT with slightly simpler wording, used by Node.js core and many npm packages), and BSD 2-Clause and 3-Clause (similar permissive terms to MIT, with the 3-Clause variant adding a restriction against using the project's name to endorse derived products without permission).",
    "All four licenses generated here share a common philosophy: permissive licensing, meaning they impose minimal restrictions on what others can do with your code, in contrast to copyleft licenses (like the GPL family) which require derivative works to also be open-sourced under the same terms. This tool intentionally doesn't attempt to generate GPL, LGPL, or Apache 2.0 license text — those licenses are considerably longer with more legally significant clauses, and getting even small wording details wrong in a legal document carries more risk than it's worth; for those licenses, copy the exact, official text directly from the Free Software Foundation or Apache Software Foundation.",
    "Once generated, save the output as a file named exactly `LICENSE` (no file extension) in your repository's root directory — this is the convention GitHub, GitLab, and virtually every package registry look for to automatically detect and display your project's license.",
  ],
  howItWorks: [
    {
      title: "Pick a license",
      description: "Choose MIT, ISC, BSD 2-Clause, or BSD 3-Clause.",
    },
    {
      title: "Enter your name and year",
      description: "Fill in the copyright holder's name and the current year.",
    },
    {
      title: "Copy the full license text",
      description: "Save the result as a LICENSE file in your project's root directory.",
    },
  ],
  examples: [
    {
      label: "Generating an MIT license",
      input: "License: MIT, Author: Jane Doe, Year: 2026",
      output: "MIT License\n\nCopyright (c) 2026 Jane Doe\n\nPermission is hereby granted...",
    },
  ],
  faqs: [
    {
      question: "What happens if I don't add any license to my public repository?",
      answer:
        "Under default copyright law, your code is technically \"all rights reserved\" even if it's publicly visible on GitHub — others have no explicit legal permission to use, modify, or redistribute it, which can discourage adoption and creates real legal ambiguity for anyone who wants to build on your work.",
    },
    {
      question: "What's the difference between MIT and ISC?",
      answer:
        "They're functionally nearly identical in what they permit and require — ISC uses slightly simpler, more modern legal wording while achieving essentially the same permissive terms as MIT. The choice between them is largely a matter of preference or ecosystem convention (ISC is the default for many npm packages).",
    },
    {
      question: "Why doesn't this tool generate Apache 2.0 or GPL licenses?",
      answer:
        "Those licenses are considerably longer and more legally detailed than MIT, ISC, or BSD, and the risk of an inaccuracy in reproducing that much legal text outweighs the convenience. For those licenses, copy the exact official text from apache.org or gnu.org directly.",
    },
    {
      question: "Does a permissive license mean anyone can do literally anything with my code?",
      answer:
        "Nearly, but not quite — all four licenses generated here still require that the original copyright notice and license text be included in any copy or substantial portion of the software that's redistributed. Beyond that requirement, usage, modification, and redistribution (including commercially) are broadly permitted.",
    },
    {
      question: "Where should I save the generated license text?",
      answer:
        "As a file named exactly `LICENSE` (with no file extension) in the root directory of your repository — this is the standard filename GitHub, GitLab, and package registries look for to automatically detect and display your project's license.",
    },
  ],
};
