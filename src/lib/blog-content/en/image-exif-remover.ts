import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-exif-remover",
  lang: "en",
  title: "The Hidden Data in Your Photos You Should Strip Before Posting Online",
  description: "Phones quietly embed GPS coordinates and device info in every photo. Here's how to strip it before sharing anywhere.",
  sections: [
    {
      heading: "That vacation photo might be broadcasting your exact address",
      body: [
        "Most phones have location services on by default, and every photo they take can carry the exact latitude and longitude of where it was shot, buried in a metadata block called EXIF. Post a photo from your living room and, without realizing it, you may have attached your home address to the image file. Post it from a hotel on a trip, and you've told anyone who checks exactly where you're staying — and that you're not home.",
        "Most people never see this data because normal photo apps don't show it in the interface — it's invisible unless something specifically extracts it, which is exactly what a lot of automated scraping and some social platforms quietly do.",
      ],
    },
    {
      heading: "Why re-rendering beats \"editing out\" the metadata",
      body: [
        "There are two approaches to removing this kind of data: selectively delete known metadata fields one by one, or rebuild the image from scratch in a way that never carries metadata at all. The first approach is fragile — miss one obscure tag and it survives. This tool uses the second: it draws the image onto a canvas and re-exports it, and canvas has no mechanism for storing metadata in the first place. Nothing to selectively strip means nothing can slip through.",
        "The visual result is pixel-for-pixel identical to your original. Only the invisible data attached alongside it disappears.",
      ],
    },
    {
      heading: "It's not just GPS — the full list is longer than people expect",
      body: [
        "Beyond location, EXIF data typically includes the exact make and model of the device that took the photo, the precise timestamp down to the second, camera settings like aperture and ISO, and sometimes the name of any software used to edit it afterward. None of this is usually a problem for a casual photo shared with friends — but for anything going out publicly, professionally, or to someone you don't fully trust, it's worth stripping as a default habit rather than something you only think about after the fact.",
      ],
    },
    {
      heading: "When this actually matters vs. when it's overkill",
      body: [
        "For a private family photo shared in a group chat, none of this usually matters. It starts mattering the moment a photo goes somewhere public — a marketplace listing, a public social post, a photo attached to a public-facing profile, or anything sent to a stranger. A simple habit that costs nothing: run outgoing photos through metadata stripping before posting anywhere you don't fully control who sees it, the same reflex as double-checking who's in the background of a photo before sending it.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does stripping metadata make my photo look any different?",
      answer: "No — only the invisible metadata is removed. Every pixel stays exactly as it was; the visible image is unchanged.",
    },
    {
      question: "Can any EXIF field survive this process?",
      answer: "No — because the technique rebuilds the image via canvas rather than editing individual metadata tags, there's no metadata capability left in the output file for anything to survive in.",
    },
    {
      question: "Is my photo uploaded anywhere to strip its metadata?",
      answer: "No — the entire process runs locally in your browser, so the original file (and whatever sensitive data it carries) never leaves your device.",
    },
  ],
};
