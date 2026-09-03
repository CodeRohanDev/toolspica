import type { ToolContent } from "./types";

export const ringtoneMakerContent: ToolContent = {
  heroSubtitle: "Turn Any Song Into a Short, Fade-Polished Ringtone Clip",
  overview: [
    "Making a ringtone from a favorite song or sound clip means picking the right short section and giving it clean, professional-feeling fade transitions rather than an abrupt cut-in and cut-off. This tool combines trimming and fading into one step specifically tuned for ringtone-length output.",
    "You choose the exact start point and a length between 5 and 40 seconds — the practical range most ringtones fall into, long enough to be recognizable but short enough not to overstay on a repeating call alert. A short fade-in (0.5 seconds) and a slightly longer fade-out (1.5 seconds) are applied automatically, giving the clip smooth, polished edges without any extra configuration needed.",
    "A real FFmpeg build compiled to WebAssembly performs the trim and fade entirely inside your browser, exporting the result as .m4a (AAC audio) — the format Apple devices specifically expect for ringtones, since iPhone ringtones use the .m4r extension, which is simply an .m4a file renamed.",
    "To actually use the result as an iPhone ringtone, rename the downloaded file's extension from .m4a to .m4r and sync it to your device through Finder (or iTunes on older systems) — a manual step Apple requires outside of any web-based tool, since ringtone installation isn't something a browser can do directly.",
  ],
  howItWorks: [
    { title: "Upload your audio file", description: "Duration is detected automatically." },
    { title: "Set the start point and length", description: "Choose where the clip begins and how long it runs (5-40s)." },
    { title: "Create and download", description: "A fade-polished .m4a clip, ready to become a ringtone." },
  ],
  examples: [
    { label: "Making a ringtone from a favorite song", input: "song, starting at 0:45, 20 seconds long", output: "a 20-second .m4a clip with smooth fade-in/out" },
  ],
  faqs: [
    { question: "Why is the output .m4a instead of a ringtone format directly?", answer: "iPhone ringtones use the .m4r extension, which is just a renamed .m4a file — a browser-based tool can't directly install a ringtone on your device, so you rename the file and sync it through Finder or iTunes as a manual final step." },
    { question: "How long can my ringtone be?", answer: "Between 5 and 40 seconds — the practical range most ringtones fall into, recognizable without overstaying its welcome on a repeating call alert." },
    { question: "Is my audio uploaded anywhere?", answer: "No — trimming and fading run entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "Can I adjust the fade lengths?", answer: "The fade-in (0.5s) and fade-out (1.5s) are applied automatically at fixed lengths tuned for ringtone-style clips — for custom fade control on a clip, use the Audio Fade In/Out Editor tool instead." },
    { question: "Does this work for Android ringtones too?", answer: "Yes — Android accepts .m4a (or MP3) directly as a ringtone without needing the .m4r rename Apple devices require." },
  ],
};
