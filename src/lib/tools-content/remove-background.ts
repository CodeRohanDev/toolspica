import type { ToolContent } from "./types";

export const removeBackgroundContent: ToolContent = {
  heroSubtitle: "AI Background Removal — Cut Out the Subject Automatically",
  overview: [
    "Cutting a subject out of its background used to require either careful manual selection in an image editor or software good enough to recognize what's actually in the photo. This tool uses a real, pre-trained AI saliency model — the same class of technology behind background-removal features in professional design tools — running entirely inside your browser via WebAssembly, no upload, no account, no per-image cost.",
    "The model analyzes the whole image and predicts, pixel by pixel, how likely each one is to belong to the main subject rather than the background — it isn't limited to a fixed list of object categories, so it works on people, animals, products, vehicles, and general objects alike. Every pixel classified as background becomes transparent, while everything recognized as the subject is kept, producing a clean cutout ready to drop onto a new background or use in a design.",
    "This is meaningfully different from this site's other background tool, Transparent Background Maker, which works by picking a color and removing everything close to it — great for a flat-color studio background, but useless when the background is complex or textured. This tool instead recognizes the actual subject, so it works regardless of what's behind it.",
    "Like any AI segmentation model, results are best when the subject is clearly separated from its surroundings — a person, animal, or object reasonably in focus and not overlapping heavily with other similar content. Fine detail like individual strands of hair or semi-transparent edges (glass, smoke) may not be captured with complete precision. The first use downloads the AI model; after that, everything runs locally on your device.",
  ],
  howItWorks: [
    { title: "Upload your image", description: "Any photo with a reasonably distinct subject works best." },
    { title: "Click Remove Background", description: "An AI model analyzes the image and identifies the subject locally in your browser." },
    { title: "Download the cutout", description: "Get a PNG with the background made transparent." },
  ],
  examples: [
    { label: "Cutting out a product photo", input: "photo of a bicycle against a cluttered background", output: "same bicycle, background made fully transparent" },
  ],
  faqs: [
    { question: "Is my photo uploaded to a server for processing?", answer: "No — the AI model runs entirely in your browser via WebAssembly. Only the model file is downloaded once; your actual photo and the result never leave your device." },
    { question: "What kinds of subjects does this recognize?", answer: "It isn't limited to a fixed list — the model estimates which pixels belong to the main subject versus the background for any photo, so it works on people, animals, vehicles, products, and general everyday objects." },
    { question: "How is this different from the Transparent Background Maker tool?", answer: "That tool removes a specific color you click on — ideal for a flat studio backdrop. This tool uses AI to recognize the actual subject, so it works even against complex or textured backgrounds, regardless of color." },
    { question: "Will fine details like hair strands be perfectly preserved?", answer: "Not always with complete precision — very fine detail like loose hair or semi-transparent edges may be simplified or slightly rough at the boundary, especially on busy or low-contrast backgrounds." },
    { question: "Why does the first use take longer than later ones?", answer: "The first run downloads the AI model needed for recognition (roughly 45MB) — after that initial download, the browser caches it and processing happens locally on your device without further network activity." },
  ],
};
