import type { ToolContent } from "./types";

export const audioMetadataEditorContent: ToolContent = {
  heroSubtitle: "Edit Title, Artist, Album & Year Tags on an Audio File",
  overview: [
    "Audio files carry metadata tags separately from the actual sound data — title, artist, album, and year fields that music players and file managers display, often filled in incorrectly, left blank, or inherited from a generic default when a file is exported from somewhere. This tool reads and lets you rewrite these tags directly.",
    "A real FFmpeg build compiled to WebAssembly writes the tags entirely inside your browser using FFmpeg's metadata options, and critically, does this with stream copy (-c copy) rather than re-encoding the audio — only the metadata block changes, so quality and file size stay exactly the same as the original.",
    "Only the fields you actually fill in get written — leaving a field blank means it simply isn't set on the output, rather than being forced to an empty explicit value, giving you control over exactly which tags to touch.",
    "This works on whatever audio format you upload, since the metadata tagging conventions vary by container format but FFmpeg handles the appropriate tag format automatically for the file type involved, whether that's ID3 tags for MP3 or the equivalent metadata structure for other formats.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Fill in the tag fields", description: "Title, artist, album, and year — leave any blank to skip it." },
    { title: "Save and download", description: "Tags update with zero change to audio quality or file size." },
  ],
  examples: [
    { label: "Fixing missing song information", input: "audio file with no title/artist tags", output: "the same file with proper metadata filled in" },
  ],
  faqs: [
    { question: "Does editing metadata reduce audio quality?", answer: "No — this uses stream copy rather than re-encoding, so only the metadata tags change; the actual audio data is copied through byte-for-byte unchanged." },
    { question: "What happens if I leave a field blank?", answer: "That field simply isn't set on the output rather than being explicitly cleared — only the fields you actually fill in get written into the file's metadata." },
    { question: "Is my audio uploaded anywhere?", answer: "No — tag writing runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Does this work on any audio format?", answer: "Yes — FFmpeg automatically handles the appropriate metadata tag format for whatever container you upload, whether that's ID3 tags for MP3 or the equivalent structure for other formats." },
    { question: "Can I clear existing tags without setting new values?", answer: "This tool is built for setting new tag values rather than explicitly clearing existing ones — leaving a field blank skips setting it, but doesn't actively remove a pre-existing tag of that type." },
  ],
};
