import type { ToolContent } from "./types";

export const serpSnippetPreviewToolContent: ToolContent = {
  heroSubtitle: "See How Your Page Will Actually Look in Google Search Results",
  overview: [
    "Google truncates page titles and meta descriptions at specific pixel widths, not fixed character counts — but character limits (roughly 60 for titles, 160 for descriptions) are a reliable practical approximation most SEO tools use, including this one. Writing your title and description without checking how they'll actually render risks an awkward mid-word cutoff right in the search results your visitors see first.",
    "This tool renders a live, styled preview that mimics Google's actual search result formatting — blue title link, green URL, gray description text — updating in real time as you type. Character counters under each field warn you the moment you've gone past the safe length, so you can trim before publishing rather than discovering the truncation after the fact.",
    "This is a quick final check worth running on any page's title and meta description before it goes live, especially for pages you're actively trying to rank — a well-crafted, un-truncated snippet meaningfully affects whether someone actually clicks through from the search results.",
  ],
  howItWorks: [
    { title: "Enter your title and URL", description: "The page title and its full URL." },
    { title: "Write your meta description", description: "See the character count against the ~160 char limit." },
    { title: "Check the live preview", description: "See exactly how it renders in Google-style search results." },
  ],
  examples: [
    { label: "Checking a 70-character title", input: "A title exceeding the ~60 character safe length", output: "Preview shows the title truncated with an ellipsis" },
  ],
  faqs: [
    { question: "Is the 60/160 character limit exact?", answer: "No — Google actually truncates by pixel width, which varies by character. 60 and 160 characters are reliable practical approximations used industry-wide." },
    { question: "Does a good snippet guarantee a higher ranking?", answer: "No — snippet quality affects click-through rate, not ranking position directly, though a higher CTR can indirectly support performance over time." },
    { question: "Can I control the description Google actually shows?", answer: "Not always — Google sometimes pulls a different snippet from page content if it judges that more relevant to the search query." },
    { question: "Does this preview match mobile search results too?", answer: "It approximates the desktop layout; mobile search results use a similar but slightly different visual format." },
    { question: "Is my title/description sent anywhere?", answer: "No — the preview renders entirely in your browser." },
  ],
};
