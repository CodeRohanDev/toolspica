import type { ToolContent } from "./types";

export const mp3ToWavContent: ToolContent = {
  heroSubtitle: "Convert MP3 to Uncompressed WAV",
  overview: [
    "Some audio editing software, voice analysis tools, and professional workflows specifically expect uncompressed WAV input rather than a compressed format like MP3. This tool decodes an MP3 file and re-exports it as standard 16-bit PCM WAV, entirely inside your browser.",
    "A real FFmpeg build compiled to WebAssembly performs the decode-and-re-encode locally, with no upload involved at any point — the MP3's compressed audio data is fully decoded back to raw PCM samples and written out in WAV's uncompressed format.",
    "It's worth understanding what this conversion can and can't do: MP3 is lossy, meaning some audio detail was permanently discarded when the file was originally encoded to MP3. Converting to WAV doesn't restore that lost detail — it simply avoids introducing any further compression loss from this point forward, since WAV itself applies no additional lossy processing.",
    "The resulting WAV file will be substantially larger than the source MP3, since uncompressed audio takes up far more space than compressed — this size increase is expected and inherent to the format, not a sign anything went wrong.",
  ],
  howItWorks: [
    { title: "Upload your MP3 file", description: "The file loads into the browser-based FFmpeg engine." },
    { title: "Conversion runs locally", description: "The MP3 is decoded and re-encoded as uncompressed WAV." },
    { title: "Download the WAV", description: "Lossless 16-bit PCM, ready for further processing." },
  ],
  examples: [
    { label: "Preparing an MP3 for lossless editing", input: "song.mp3", output: "song.wav, uncompressed and ready for an editor" },
  ],
  faqs: [
    { question: "Will converting to WAV restore quality lost when the file was originally made an MP3?", answer: "No — MP3 is lossy, and detail discarded during the original encoding can't be recovered. Converting to WAV simply avoids any further compression loss beyond that point." },
    { question: "Why is the WAV file so much bigger than the MP3?", answer: "WAV stores audio completely uncompressed, while MP3 applies significant compression to reduce file size — the size increase when converting is expected and inherent to the format difference." },
    { question: "Is my file uploaded to a server?", answer: "No — conversion runs entirely inside your browser using a real FFmpeg build compiled to WebAssembly." },
    { question: "What WAV format does this output?", answer: "Standard 16-bit PCM, the most broadly compatible WAV variant." },
    { question: "Why would I need WAV instead of just keeping the MP3?", answer: "Some editing software, voice analysis tools, and professional audio workflows specifically require or work best with uncompressed input rather than a compressed format like MP3." },
  ],
};
