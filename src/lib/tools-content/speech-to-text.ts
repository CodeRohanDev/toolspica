import type { ToolContent } from "./types";

export const speechToTextContent: ToolContent = {
  heroSubtitle: "Turn Spoken Words into Text, Live in Your Browser",
  overview: [
    "Typing out a quick note, a paragraph of dictated thought, or a rough transcript is often slower than just speaking it — but most speech-to-text services require signing up, installing software, or uploading an audio file and waiting for it to process. Modern browsers already include live speech recognition that converts your voice to text as you speak, with no upload step at all.",
    "This tool uses the Web Speech API's speech recognition feature, built into Chrome and Edge. Press Start, allow microphone access when your browser asks, and speak naturally — recognized text appears in the transcript box as you talk, and you can keep talking across multiple sentences without needing to restart. Press Stop when you're done, then copy the transcript or keep editing it directly in the text box.",
    "Because recognition runs through your browser's own speech engine, accuracy depends on your microphone quality, background noise, and how clearly you speak — short pauses between sentences generally produce more reliable results than speaking in one continuous rush. Safari and Firefox don't currently support this API the way Chrome and Edge do, so results will vary by browser.",
  ],
  howItWorks: [
    { title: "Press Start", description: "Allow microphone access when your browser prompts you." },
    { title: "Speak naturally", description: "Recognized speech appears as text in real time." },
    { title: "Press Stop, then copy", description: "Stop recording and copy the transcript, or edit it directly." },
  ],
  examples: [
    {
      label: "Spoken input",
      input: "\"Remember to send the invoice by Friday.\"",
      output: "Remember to send the invoice by Friday.",
    },
  ],
  faqs: [
    {
      question: "Which browsers support this tool?",
      answer:
        "Chrome and Edge have solid support for the Web Speech API's recognition feature. Safari and Firefox have limited or no support, so this tool may show an unsupported message on those browsers.",
    },
    {
      question: "Does my audio get uploaded anywhere?",
      answer:
        "Your browser's speech recognition engine processes audio to produce the transcript — this tool itself never uploads, stores, or has access to a recording of your voice; it only reads the text result your browser provides.",
    },
    {
      question: "Why does it sometimes mishear words?",
      answer:
        "Accuracy depends on microphone quality, background noise, accent, and speaking pace — speaking clearly with brief pauses between sentences generally improves results noticeably over a continuous fast rush of speech.",
    },
    {
      question: "Can I edit the transcript after it's generated?",
      answer:
        "Yes — the transcript box is a regular editable text field, so you can fix any misheard words or clean up formatting directly before copying it.",
    },
  ],
};
