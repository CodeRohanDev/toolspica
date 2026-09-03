import type { ToolContent } from "./types";

export const removeBackgroundContent: ToolContent = {
  heroSubtitle: "AI Background Removal — Cut Out the Subject Automatically",
  overview: [
    "Cutting a subject out of its background used to require either careful manual selection in an image editor or software good enough to recognize what's actually in the photo. This tool uses a real, pre-trained AI segmentation model — the same class of technology behind background-removal features in professional design tools — running entirely inside your browser via WebAssembly, no upload, no account, no per-image cost.",
    "The model analyzes the image and classifies each pixel into one of several everyday categories (people, animals, vehicles, and other common objects) plus a background category. Every pixel classified as background becomes transparent, while everything recognized as the subject is kept exactly as it was, producing a clean cutout ready to drop onto a new background or use in a design.",
    "This is meaningfully different from this site's other background tool, Transparent Background Maker, which works by picking a color and removing everything close to it — great for a flat-color studio background, but useless when the background is complex or textured. This tool instead recognizes the actual subject, so it works regardless of what's behind it, as long as the subject falls into a category the model recognizes.",
    "Like any AI segmentation model, results are best when the subject is clearly separated from its surroundings — a person, animal, or object reasonably in focus and not overlapping heavily with other similar content. Fine detail like individual strands of hair or semi-transparent edges (glass, smoke) won't be captured with pixel-perfect precision, since the output is a hard, binary cutout rather than a soft alpha matte. The first use downloads a small model file; after that, everything runs locally on your device.",
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
    { question: "Is my photo uploaded to a server for processing?", answer: "No — the AI model runs entirely in your browser via WebAssembly. Only a small model file is downloaded once; your actual photo and the result never leave your device." },
    { question: "What kinds of subjects does this recognize?", answer: "Common categories including people, animals, vehicles, and a range of everyday objects. Subjects outside these categories may not be recognized as foreground and could end up removed along with the background." },
    { question: "How is this different from the Transparent Background Maker tool?", answer: "That tool removes a specific color you click on — ideal for a flat studio backdrop. This tool uses AI to recognize the actual subject, so it works even against complex or textured backgrounds, regardless of color." },
    { question: "Will fine details like hair strands be perfectly preserved?", answer: "Not with pixel-perfect precision — the model produces a hard cutout rather than a soft alpha matte, so very fine detail like loose hair or semi-transparent edges may be simplified or slightly rough at the boundary." },
    { question: "Why does the first use take longer than later ones?", answer: "The first run downloads a small AI model file needed for recognition — after that initial download, processing happens instantly on your device without any further network activity." },
  ],
};
