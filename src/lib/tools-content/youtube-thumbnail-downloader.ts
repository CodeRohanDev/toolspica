import type { ToolContent } from "./types";

export const youtubeThumbnailDownloaderContent: ToolContent = {
  heroSubtitle: "Download Any YouTube Video's Thumbnail in Full Resolution",
  overview: [
    "Every YouTube video's thumbnail is actually hosted as a plain, publicly accessible image file at a predictable URL based on the video's ID — but most people don't know that URL pattern, so grabbing a thumbnail usually means an awkward screenshot-and-crop instead of the original, full-quality image. This is useful for a wide range of reasons: referencing a video's thumbnail in a blog post or article, checking what a thumbnail looks like at different sizes before publishing your own video, or archiving a reference image.",
    "This tool takes any YouTube video URL (including youtu.be short links and Shorts links) or a bare 11-character video ID, and constructs direct links to that video's thumbnail at four resolutions: max resolution (1280×720, when the uploader provided one), standard (640×480), high quality (480×360), and medium quality (320×180) — pulled straight from YouTube's own public image CDN, the exact same images YouTube itself displays.",
    "Because these are YouTube's own hosted images accessed via their public, unauthenticated CDN URLs, no video is downloaded or re-processed by this tool — you're linking directly to the same static image file YouTube serves everywhere else. Not every video has a maxresdefault (1280×720) thumbnail available; if the uploader didn't provide a high-resolution custom thumbnail, that specific size may return a small placeholder image, in which case the lower resolutions are the reliable options.",
  ],
  howItWorks: [
    { title: "Paste a YouTube URL or ID", description: "Paste a full video link, a youtu.be link, a Shorts link, or a bare video ID." },
    { title: "Preview the thumbnails", description: "See the thumbnail at four available resolutions." },
    { title: "Save the one you need", description: "Right-click and \"Save image as\", or open the full-size link directly." },
  ],
  examples: [
    {
      label: "Standard watch URL",
      input: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      output: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
  ],
  faqs: [
    {
      question: "Why is the max resolution thumbnail sometimes blank or low quality?",
      answer:
        "The 1280×720 \"maxresdefault\" thumbnail only exists if the video was uploaded with one — older or lower-resolution videos may not have it, in which case YouTube's CDN returns a small placeholder for that specific size. The other three sizes are generated for essentially every video and are reliable fallbacks.",
    },
    {
      question: "Does this download the video itself, not just the thumbnail?",
      answer:
        "No — this only links to the static thumbnail image YouTube hosts publicly for every video. It does not download, convert, or process any video content.",
    },
    {
      question: "Can I use a downloaded thumbnail in my own content?",
      answer:
        "YouTube thumbnails are typically owned by the video's uploader (or contain copyrighted imagery), so reusing one commercially or publicly generally requires permission — this tool is best used for reference, archiving, or previewing, not republishing someone else's thumbnail as your own.",
    },
    {
      question: "Is the video URL I paste sent to any server?",
      answer:
        "No — the video ID is extracted and the thumbnail URLs are constructed entirely in your browser. Your browser then loads the images directly from YouTube's own CDN, the same as visiting the video page itself would.",
    },
  ],
};
