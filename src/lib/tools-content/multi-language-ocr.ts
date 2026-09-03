import type { ToolContent } from "./types";

export const multiLanguageOcrContent: ToolContent = {
  heroSubtitle: "Recognize Text in Ten Languages, Not Just English",
  overview: [
    "Most OCR tools default to English and struggle badly with other languages' distinct characters and scripts. This tool lets you pick the language before recognizing, loading the appropriate trained model for that specific language rather than forcing everything through an English-only model.",
    "Ten languages are supported — English, Spanish, French, German, Hindi, Simplified Chinese, Arabic, Russian, Portuguese, and Japanese — covering scripts as different as Latin, Devanagari, Cyrillic, Arabic, and Chinese/Japanese characters, each with its own dedicated Tesseract-trained language model.",
    "The engine (Tesseract, compiled to WebAssembly) downloads the specific language model you select the first time you use it for that language, then runs recognition entirely on your device — subsequent uses of the same language are faster since the model is already cached.",
    "Choosing the correct language matters significantly for accuracy: running Arabic text through an English model (or vice versa) produces poor results, since each model is trained on that specific script and character set.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Any photo or scan with text in a supported language." },
    { title: "Choose the language", description: "Select from ten supported languages before recognizing." },
    { title: "Recognition runs locally", description: "The matching language model analyzes the image on your device." },
  ],
  examples: [
    { label: "Recognizing Spanish text", input: "photo of Spanish text, Spanish selected", output: "accurately recognized Spanish text" },
  ],
  faqs: [
    { question: "Which languages are supported?", answer: "English, Spanish, French, German, Hindi, Simplified Chinese, Arabic, Russian, Portuguese, and Japanese." },
    { question: "What happens if I pick the wrong language?", answer: "Accuracy drops significantly — each language model is trained on that specific script and character set, so an English model applied to Arabic text (or vice versa) produces poor results." },
    { question: "Is my image uploaded anywhere?", answer: "No — recognition runs entirely in your browser via WebAssembly; only the language model itself downloads once per language." },
    { question: "Does the first use of a new language take longer?", answer: "Yes — each language's model downloads the first time you use it, then stays cached in your browser for faster subsequent use." },
    { question: "Can I recognize a document with two languages mixed together?", answer: "Not reliably — this tool applies one language model per run, so mixed-language documents will have reduced accuracy on whichever language wasn't selected." },
  ],
};
