# Toolspica Build Checklist — Easy to Very Difficult

Ordering principle: client-side feasibility + implementation complexity. Build top-down.

- **Tier 1 — Trivial**: pure JS string/math/logic, zero libraries, instant. Build first, in bulk.
- **Tier 2 — Easy**: small client library or basic browser API (Canvas, Web Crypto, MediaRecorder, Web Speech).
- **Tier 3 — Medium**: heavier client libraries, multi-step logic, moderate wasm (pdf.js, tesseract.js, SheetJS, mathjs).
- **Tier 4 — Hard**: ffmpeg.wasm / large wasm binaries, Web Worker orchestration, complex binary formats.
- **Tier 5 — Hard + Server**: blocked by browser CORS/protocol limits or rate limits — needs a Cloudflare Worker proxy or paid/free 3rd-party API.
- **Tier 6 — Very Difficult**: needs a real AI/ML model, high-fidelity office-document rendering, or a 3rd-party index that's expensive/hard to replicate (backlinks, plagiarism, video-platform extraction).

---

## Tier 1 — Trivial (build first)

**Text Tools (all):** Word Counter, Character Counter, Case Converter, Remove Duplicate Lines, Sort Lines, Text Reverser, Slug Generator, Lorem Ipsum Generator, Random Text Generator, Find & Replace, Text Cleaner, Remove Extra Spaces, URL Encoder, URL Decoder, Word Frequency Counter, ROT13 Encoder, Morse Code Translator, Binary to Text, Text to Binary, Palindrome Checker, Anagram Solver, Line Counter, Paragraph Counter, Whitespace Remover, Title Case Converter, Sentence Case Converter, Text to Hashtags Converter, Fake Text Generator, Text Wrapper, Column to Comma Converter, Duplicate Word Remover, Text to Slug Bulk Converter

**Developer Tools:** JSON Formatter, JSON Validator, JSON Minifier, Base64 Encode, Base64 Decode, JWT Decoder, Regex Tester, UUID Generator, Hash Generator, Timestamp Converter, Epoch Converter, Color Code Converter, URL Parser, HTTP Status Code Lookup, MIME Type Lookup, Curl Command Generator, Base32 Encode/Decode, ASCII Table Reference, Unicode Converter, Slugify Tool, Git Ignore Generator, Open Source License Generator, API Response Formatter, Number Base Converter, .env to JSON Converter

**Image Tools (canvas trivial):** Rotate Image, Flip Image, PNG to JPG, JPG to PNG, WebP to JPG, JPG to WebP, Blur Image, Image Color Picker, Image to Base64, Base64 to Image, BMP to JPG, Image Grayscale Converter, Image Rounded Corners, Image Border Adder, Image Pixelator, Social Media Image Resizer, Image Rotator by Angle

**All Calculators, Finance & Business Calculators, Health & Fitness Calculators** (except Currency Converter → Tier 5)

**All Unit & Measurement Converters**

**Color Tools:** Color Picker, HEX to RGB, RGB to HEX, HEX to HSL, Gradient Generator, Color Contrast Checker, Color Name Finder, Random Color Generator, CSS Gradient Generator, Tailwind Color Shade Generator

**QR/Barcode:** QR Code Generator, WiFi QR Code Generator, vCard QR Code Generator, Barcode Generator, UPC/EAN Generator

**Random Generators (all):** Random Number Generator, Random Name Generator, Random Word Generator, Random Sentence Generator, Coin Flip, Dice Roller, Random Date Generator, Random Team Generator, Yes/No Decision Maker, Random Country Generator, Lottery Number Generator, Random Emoji Generator, Wheel of Names Spinner

**Security Tools:** Password Generator, SHA256 Generator, MD5 Generator, Two-Factor Backup Code Generator, CSRF Token Generator, Passphrase Generator

**Website & Network:** User Agent Detector, Subnet Calculator

**Math Tools:** Quadratic Equation Solver, Prime Number Checker, GCD & LCM Calculator, Factorial Calculator, Trigonometry Calculator, Percentage Change Calculator, Number Rounding Tool

**Crypto:** Bitcoin Address Validator (checksum algo), Crypto Wallet Address QR Generator

**Time & Productivity (all):** World Clock, Pomodoro Timer, Online Stopwatch, Countdown to Date Widget, Work Days Calculator

**Writing:** Readability Score Checker

**Email:** Email Validator, Email Address Extractor

**Social:** Instagram Story Size Guide, LinkedIn Post Formatter, Twitter/X Character Counter, Emoji Picker & Copy Tool, Social Media Image Size Guide

**Spreadsheet:** CSV Viewer, VLOOKUP Formula Generator

**Font:** Fancy Text Generator, Typography Scale Generator

**SEO:** Meta Tag Generator, Robots.txt Generator, Keyword Density Checker, Open Graph Generator, SERP Snippet Preview Tool

**Audio:** Voice Recorder Online

---

## Tier 2 — Easy

**Image Tools:** Image Compressor, Image Resizer, Crop Image, AVIF to JPG, SVG to PNG, Image Watermark, Image Metadata Viewer (exif-js), Image DPI Converter, Universal Image Converter, GIF to PNG, PNG to GIF, ICO Converter, Image to PDF, Image Splitter, Image Sharpener, Meme Generator, Photo Filters, Favicon Generator, Image EXIF Remover, Batch Image Resizer

**PDF Tools (pdf-lib basics):** JPG to PDF, PDF Rotate, PDF Extract Pages, PDF Delete Pages, PDF Reorder Pages, PDF Add Watermark, PDF Metadata Editor, PDF Page Numbering, PDF to Text, PNG to PDF, PDF Header & Footer Adder, PDF Reader Online

**Developer Tools:** JSON to CSV, CSV to JSON, XML Formatter, XML to JSON, YAML Formatter, YAML to JSON, JSON to YAML, JWT Generator, HTML Minifier, CSS Minifier, SQL Formatter, SQL Minifier, Cron Expression Generator, HTML Formatter, HTML to Markdown, Markdown to HTML, Markdown Previewer, Code Diff Checker, JSON Diff Checker, JSON Path Tester, GraphQL Query Formatter, User Agent Parser

**Text Tools:** Text Diff Checker, Text to Speech, Speech to Text, Text Encryptor/Decryptor (Web Crypto)

**Audio:** WAV Converter, Audio Cutter, Audio Volume Booster, Audio Fade In/Out Editor, Ringtone Maker, Podcast Trimmer

**Video:** Screen Recorder, Video Thumbnail Generator

**Archive:** ZIP Extractor, ZIP Creator, GZIP Extractor

**Security:** Password Strength Checker, HMAC Generator, File Hash Checker, AES Encryption Tool, AES Decryption Tool, File Encryptor/Decryptor

**Document & Office:** Excel to CSV, TXT to DOCX, Resume Builder, Cover Letter Generator, Invoice Template Generator, Certificate Generator, Letterhead Generator

**Spreadsheet:** CSV Merger, CSV Splitter, Excel to JSON, JSON to Excel, Duplicate Row Remover, Chart Generator from CSV, Excel Formula Generator

**Color:** Color Palette Generator, Color Blindness Simulator, Image Color Palette Extractor

**QR/Barcode:** QR Code Scanner, Barcode Scanner, QR Code with Logo Generator, Bulk QR Code Generator

**Website & Network:** IP Address Lookup, My IP Address Finder, MAC Address Lookup Tool

**Font:** Font Pairing Generator, Google Fonts Previewer

**Writing:** Citation Generator, Bibliography Generator

**Email:** Mail Header Analyzer, Email Signature Generator, Email Subject Line Tester

**Legal & Business Documents (all — template/form generators):** Privacy Policy Generator, Terms & Conditions Generator, NDA Generator, Disclaimer Generator, Refund Policy Generator, Cookie Policy Generator, Employment Contract Generator, Rental Agreement Generator, Freelance Contract Generator, Affidavit Template Generator

**Math:** Matrix Calculator

**Crypto:** (none — see Tier 3)

**Signature Tools (all):** Digital Signature Maker, Handwritten Signature Generator, Signature to Transparent PNG Converter, Initials Logo Generator

**Time & Productivity:** Meeting Time Planner, Habit Tracker Sheet Generator

**Education:** Flashcard Maker, Quiz Generator, Multiple Choice Test Generator, Graph Paper Generator, Timetable/Schedule Generator

**Presentation:** Slide Text Extractor

**Social:** YouTube Thumbnail Downloader (URL construction only), Hashtag Generator, Instagram Caption Generator (template)

**AI-labeled but non-AI heuristic:** AI Keyword Extractor (TF-IDF), AI Business Name Generator (combinatorial)

---

## Tier 3 — Medium

**PDF Tools:** PDF Merge, PDF Split, PDF Compress, PDF to JPG, PDF Unlock (known password), PDF to PNG, HTML to PDF (html2canvas+jsPDF), PDF Page Size Converter, PDF Crop, PDF Flatten, PDF Bookmark Editor, PDF Splitter by File Size, Scan to PDF, PDF Grayscale Converter, PDF Page Extractor to Images

**Image Tools:** TIFF to JPG, Image Collage Maker, Image Compare (Diff Tool), Passport Photo Maker, Image Noise Reducer

**Developer Tools:** JS Minifier, Code Beautifier (universal, prettier wasm)

**Video:** Video Trimmer, Mute Video, Video Rotator, Video Frame Extractor, Loop Video Maker

**Audio:** Audio Joiner, Change Audio Speed, Audio Metadata Editor, MP3 to WAV, Audio Merger, Audio Normalizer, Text to Speech (Audio Export)

**OCR:** Image to Text, Screenshot OCR, Multi-language OCR

**Archive:** TAR Extractor, ZIP Password Remover (known password), ZIP Password Protector, Universal File Compressor, TAR.GZ Creator, Split Archive by Size

**Document & Office:** CSV to Excel, DOCX to TXT (mammoth.js), Business Card Designer

**Spreadsheet:** Data Cleaner

**Security:** PGP Key Pair Generator, SSL Certificate Decoder

**Website & Network:** DNS Lookup (DNS-over-HTTPS), MX Record Lookup

**GIF:** GIF Maker from Images, GIF Resizer, GIF Splitter

**Writing:** Essay Outline Generator (template), Thesis Statement Generator

**Math:** Equation Solver, Graphing Calculator, Algebra Calculator

**Language:** Language Detector (franc.js), Dictionary Lookup, Thesaurus/Synonym Finder, Text Pronunciation Guide, Word Definition Lookup

**Crypto:** Cryptocurrency Price Converter, Mining Profitability Calculator, Live Currency Exchange Rate Checker

**Education:** Handwriting Practice Sheet Generator

**Presentation:** Presentation Template Generator (pptxgenjs)

**Social:** YouTube Title Generator, YouTube Description Generator

**SEO:** Sitemap Generator, Schema Markup Generator, XML Sitemap Validator, Readability Checker

---

## Tier 4 — Hard

**Video Tools (ffmpeg.wasm — build the wasm pipeline once, reuse everywhere):** MP4 to WebM, WebM to MP4, Video Compressor, Extract Audio from Video, Video to GIF, GIF to MP4, Change Video Speed, Merge Videos, MP4 to MP3, Video to Audio Converter, Video Cropper, Video Resizer, Video Watermark, AVI to MP4, MOV to MP4, MKV to MP4, FLV to MP4, Video Aspect Ratio Converter

**Audio (ffmpeg.wasm / lamejs):** MP3 Converter, Audio Compressor, WAV to MP3, OGG Converter, FLAC Converter, AAC Converter, Audio Pitch Changer, Universal Audio Format Converter, Silence Remover

**GIF:** GIF Maker from Video, GIF Compressor, GIF to Video Converter, GIF Speed Changer, Reverse GIF Maker

**PDF:** PDF Protect (encryption), PDF Signer (eSign), PDF Form Filler, PDF Compare, PDF OCR, PDF Redact (true content removal), PDF Annotator

**Image:** HEIC to JPG, JPG to HEIC, PNG to SVG (vectorize/potrace)

**OCR:** PDF to Text OCR, OCR to Word, OCR to PDF (searchable), Batch OCR Processor

**Archive:** 7Z Extractor, Archive Format Converter, ISO Extractor

**Document:** Document Merger (docx)

**Spreadsheet:** Pivot Table Generator

**SEO:** Canonical Tag Checker, Alt Text Checker, Header Tag Analyzer, Redirect Checker

**Font:** Font Format Converter (TTF/WOFF/OTF)

---

## Tier 5 — Hard + Server (Cloudflare Worker / 3rd-party API needed)

**Website & Network:** Ping Test, WHOIS Lookup, Website Speed Test, HTTP Header Checker, SSL Certificate Checker, Website Screenshot Tool, Website Uptime Checker

**SEO:** Page Speed Checker, Broken Link Checker, Google Cache Checker, SSL Checker, Mobile-Friendly Test, Domain Age Checker

**Security:** IP Blacklist Checker, Data Breach Email Checker, Self-Destructing Secure Note Generator (needs Cloudflare KV + TTL)

**Social:** YouTube Tags Extractor, YouTube Channel ID Finder, Pinterest Image Downloader, Bio Link Page Generator (needs hosting)

**Finance:** Currency Converter (live rates)

**Language:** Language Translator (3rd-party translation API)

**Email:** Bulk Email List Verifier (SMTP checks)

**Document:** ODT Converter, EPUB Converter, PDF to HTML, PDF to Markdown, PDF Repair, PDF to CSV, Word to PDF, Excel to PDF, PowerPoint to PDF, PPT to Images, Slide Background Remover, PDF Editor (full)

**Reverse Video** (ffmpeg reverse is too resource-heavy for most client devices — route to Worker for large files)

**Video Compressor to Target Size, Video Joiner by Timeline, Add Subtitles to Video (subtitle burn-in)**

**Webhook Tester** (needs a receiving endpoint)

---

## Tier 6 — Very Difficult (AI/ML model or infeasible-to-replicate index)

**AI Tools (needs real LLM via AI Gateway or ML model):** AI Text Generator, AI Cover Letter Generator, AI Blog Idea Generator, AI Email Writer, AI Chatbot Reply Generator, AI Story Generator, AI Code Explainer, AI SQL Query Generator, AI Product Description Generator, AI Headline Generator, AI Title Generator, AI Slogan Generator, AI PDF Summarizer, AI Resume Reviewer, AI Text Summarizer, AI Grammar Fixer, AI Paraphraser, AI OCR Enhancer, AI Content Detector, AI Voice Generator, AI Image Generator

**Image ML:** AI Image Upscaler, AI Background Remover, Transparent Background Maker, Remove Background, AI Image Caption Generator

**OCR (structured extraction / handwriting):** Handwriting OCR, Table OCR (Image to Excel), Receipt OCR, ID Card OCR, License Plate OCR, Business Card OCR

**Font:** Font Identifier (Image to Font — needs trained model)

**Writing:** Plagiarism Checker (needs web-scale index), Grammar Checker (needs NLP model/API)

**High-fidelity office conversion (needs real rendering engine, not achievable client-side):** PDF to Word, PDF to Excel, PDF to PowerPoint, PPT to Video Converter

**SEO (needs paid backlink/rank index, effectively unbuildable without licensing Ahrefs/Moz/Semrush data):** Backlink Checker, Keyword Position Tracker, Domain Authority Checker

**Video-platform downloaders (legal/ToS risk + server extraction infra):** YouTube Video Downloader, YouTube Shorts Downloader, Instagram Reels Downloader, TikTok Video Downloader, Facebook Video Downloader, Twitter/X Video Downloader

---

## Suggested build order

1. Tier 1 in bulk — hundreds of tools, one afternoon of scaffolding, builds momentum and SEO page count fast.
2. Tier 2 — introduces canvas/crypto/small-lib patterns reused everywhere later.
3. Tier 3 — stand up pdf.js, tesseract.js, SheetJS, mathjs pipelines (each pipeline unlocks 10-20 tools at once).
4. Tier 4 — stand up the ffmpeg.wasm pipeline once (this is the single biggest lift in the whole project); it then unlocks nearly all Video/Audio/GIF tools together.
5. Tier 5 — stand up one Cloudflare Worker + KV pattern (with strict auto-delete per instruction.md), reuse for every server-needed tool.
6. Tier 6 — wire AI Gateway for the AI-tools category; treat office-fidelity conversion and video downloaders as stretch/last, and reconsider scope on downloaders given ToS/legal exposure.
