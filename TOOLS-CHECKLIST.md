# Toolspica — Master Tool Checklist

Mark `- [x]` when a tool is fully built (UI + logic + content blocks + SEO metadata) and shipped.
Ordered Tier 1 (easiest) → Tier 6 (hardest). See `BUILD-CHECKLIST.md` for tier definitions and build-order rationale.

## ⚠️ REQUIRED for every single tool page before marking `[x]` (AdSense + SEO target)

A tool is **not done** just because the interactive logic works. Every tool page must ship with
ALL of the following, every time, no exceptions — this is what gets the site AdSense-approved
and ranking, not the tool logic alone:

1. **Real, working interactive tool UI** — the actual client-side logic, not a placeholder.
2. **300+ words of unique, genuinely informative on-page content** (not thin, not boilerplate
   reworded per tool). Covers what the tool does, why/when you'd use it, and relevant detail
   specific to that exact tool.
3. **"How it works"** — a clear step-by-step explanation of the process.
4. **Examples** — at least one real before/after or input/output example.
5. **FAQ — hand-written, tool-specific, real questions a user would actually ask.** Never
   auto-generated generic filler ("Is X free?", "Will my file be uploaded?" repeated verbatim
   across every tool). Each FAQ must say something specific to *this* tool.
6. **Other tools / related tools suggestions** — internal links to relevant tools (category
   related-tools block already does this automatically; keep it).
7. **Unique SEO metadata** — unique title + meta description per tool, not templated filler.

Points 8-11 below apply AUTOMATICALLY to every registered tool via the shared page template
(`src/app/tools/[slug]/page.tsx`) — no per-tool work needed unless noted:

8. **H1 pattern + hero subtitle** — H1 is always `Free Online {Tool Name}`; subtitle comes from
   `content.heroSubtitle` if set (write one for high-traffic tools, see `word-counter.ts`), else
   auto-derived from the overview's first sentence via `src/lib/hero-subtitle.ts`.
9. **SEO intro hero, features checklist, "who uses this" audience, related searches** — rendered
   automatically from `src/components/tools/seo-intro-hero.tsx`, `tool-features-audience.tsx`,
   `related-searches.tsx`. Audience list comes from `src/lib/category-audience.ts` (add/adjust per
   category as needed, not per tool).
10. **Structured data** — Breadcrumb, SoftwareApplication, FAQPage, HowTo JSON-LD all emitted
    automatically per tool from existing content fields. Nothing to add per tool.
11. **Programmatic SEO alias landing pages** (`src/lib/tool-variants.ts`) — root-level URLs
    (e.g. `/essay-word-counter`) reusing the same registered tool/engine, targeting a different
    real search query. THIS IS PER-TOOL, MANUAL, AND NOT YET DONE FOR MOST TOOLS — target is
    every tool eventually gets 2-4 variants. Each variant needs a genuinely distinct hand-written
    `introParagraph`/H1/meta (never a templated swap — doorway pages hurt SEO, not help it).
    Wire the target tool into `tools-registry.tsx` first; variants render via the same catch-all
    as categories (`src/app/[category]/page.tsx`) and are self-canonical, added to
    `sitemap.ts`/`llms.txt` automatically by iterating `TOOL_VARIANTS`.

Implementation pattern: interactive component in `src/components/tools/<slug>.tsx`, content data
in `src/lib/tools-content/<slug>.ts` (overview paragraphs, howItWorks steps, examples, faqs),
registered in `src/lib/tools-registry.tsx`. `src/app/tools/[slug]/page.tsx` renders the real
tool + content when the slug is registered, and falls back to the "coming soon" placeholder
otherwise. Mark `[x]` here AND flip `done` by re-running `npm run generate:tools` only after all
7 requirements above are met (points 8-11 layer on top, automatically or as ongoing SEO work).

---

## Tier 1

### PDF Tools
- [x] PDF Editor
- [x] PDF to EPUB
- [x] PDF Page Size Converter (A4/Letter/Legal)

### Image Tools
- [x] Rotate Image
- [x] Flip Image
- [x] PNG to JPG
- [x] JPG to PNG
- [x] WebP to JPG
- [x] JPG to WebP
- [x] Blur Image
- [x] Image Color Picker
- [x] Image to Base64
- [x] Base64 to Image
- [x] BMP to JPG
- [x] Image Grayscale Converter
- [x] Image Rounded Corners
- [x] Image Border Adder
- [x] Image Pixelator
- [x] Social Media Image Resizer
- [x] Image Rotator by Angle

### Text Tools
- [x] Word Counter
- [x] Character Counter
- [x] Case Converter
- [x] Remove Duplicate Lines
- [x] Sort Lines
- [x] Text Reverser
- [x] Slug Generator
- [x] Lorem Ipsum Generator
- [x] Random Text Generator
- [x] Find & Replace
- [x] Text Cleaner
- [x] Remove Extra Spaces
- [x] URL Encoder
- [x] URL Decoder
- [x] Word Frequency Counter
- [x] ROT13 Encoder
- [x] Morse Code Translator
- [x] Binary to Text
- [x] Text to Binary
- [x] Palindrome Checker
- [x] Anagram Solver
- [x] Line Counter
- [x] Paragraph Counter
- [x] Whitespace Remover
- [x] Title Case Converter
- [x] Sentence Case Converter
- [x] Text to Hashtags Converter
- [x] Fake Text / Placeholder Generator
- [x] Text Wrapper
- [x] Column to Comma Converter
- [x] Duplicate Word Remover
- [x] Text to Slug Bulk Converter

### Developer Tools
- [x] JSON Formatter
- [x] JSON Validator
- [x] JSON Minifier
- [x] Base64 Encode
- [x] Base64 Decode
- [x] JWT Decoder
- [x] Regex Tester
- [x] UUID Generator
- [x] Hash Generator
- [x] Timestamp Converter
- [x] Epoch / Unix Time Converter
- [x] Color Code Converter (HEX/RGB/HSL)
- [x] URL Parser
- [x] HTTP Status Code Lookup
- [x] MIME Type Lookup
- [x] Curl Command Generator
- [x] Base32 Encode / Decode
- [x] ASCII Table Reference
- [x] Unicode Converter
- [x] Slugify Tool
- [x] Git Ignore Generator
- [x] Open Source License Generator
- [x] API Response Formatter
- [x] Number Base Converter (Bin/Oct/Dec/Hex)
- [x] Environment Variable (.env) to JSON Converter

### Audio Tools
- [x] Voice Recorder Online
- [x] Silence Remover (Audio)

### OCR Tools
- [x] Business Card OCR (to vCard)

### Archive Tools
- [x] RAR Extractor

### Calculators
- [x] Age Calculator
- [x] Percentage Calculator
- [x] Discount Calculator
- [x] BMI Calculator
- [x] Date Calculator
- [x] Time Calculator
- [x] Time Duration Calculator
- [x] Time Zone Converter
- [x] Countdown Timer Generator
- [x] Simple Interest Calculator
- [x] Compound Interest Calculator
- [x] Salary Calculator
- [x] Tip Calculator
- [x] Fuel Cost Calculator
- [x] Grade Calculator
- [x] GPA Calculator
- [x] Ovulation Calculator
- [x] Pregnancy Due Date Calculator
- [x] Retirement Calculator
- [x] Random Number Range Calculator
- [x] Statistics Calculator (Mean/Median/Mode)
- [x] Standard Deviation Calculator
- [x] Fraction Calculator
- [x] Ratio Calculator
- [x] Scientific Calculator

### Finance & Business Calculators
- [x] EMI Calculator
- [x] GST Calculator
- [x] SIP Calculator
- [x] Loan Calculator
- [x] Mortgage Calculator
- [x] Loan Amortization Calculator
- [x] Break-Even Calculator
- [x] Profit Margin Calculator
- [x] ROI Calculator
- [x] Tax Calculator
- [x] VAT Calculator
- [x] Payroll Calculator
- [x] Invoice Generator
- [x] Freelance Rate Calculator
- [x] Business Loan Calculator
- [x] Depreciation Calculator
- [x] Markup Calculator
- [x] Net Worth Calculator
- [x] Inflation Calculator
- [x] Savings Goal Calculator

### Health & Fitness Calculators
- [x] BMR Calculator
- [x] Body Fat Percentage Calculator
- [x] Calorie Calculator
- [x] Ideal Weight Calculator
- [x] Water Intake Calculator
- [x] Heart Rate Zone Calculator
- [x] Macro Calculator
- [x] Waist-to-Hip Ratio Calculator
- [x] One Rep Max Calculator
- [x] Steps to Calories Calculator
- [x] Pace & Running Speed Calculator

### Unit & Measurement Converters
- [x] Length Converter
- [x] Weight Converter
- [x] Temperature Converter
- [x] Speed Converter
- [x] Area Converter
- [x] Volume Converter
- [x] Data Storage Converter (MB/GB/TB)
- [x] Time Unit Converter
- [x] Pressure Converter
- [x] Energy Converter
- [x] Power Converter
- [x] Angle Converter
- [x] Fuel Consumption Converter
- [x] Cooking Measurement Converter
- [x] Shoe Size Converter
- [x] Clothing Size Converter
- [x] Roman Numeral Converter

### AI Tools
- [x] AI Keyword Extractor
- [x] AI Resume Builder
- [x] AI Business Name Generator
- [ ] AI Translator

### Social Media Tools
- [x] Instagram Story Size Guide
- [x] LinkedIn Post Formatter
- [x] Twitter/X Character Counter
- [x] Emoji Picker & Copy Tool
- [x] Social Media Image Size Guide

### SEO Tools
- [x] Meta Tag Generator
- [x] Robots.txt Generator
- [x] Keyword Density Checker
- [x] Open Graph Generator
- [x] SERP Snippet Preview Tool

### Security Tools
- [x] Password Generator
- [x] SHA256 Generator
- [x] MD5 Generator
- [x] Two-Factor Backup Code Generator
- [x] CSRF Token Generator
- [x] Passphrase Generator

### Spreadsheet & Data Tools
- [x] CSV Viewer
- [x] VLOOKUP Formula Generator

### Color Tools
- [x] Color Picker
- [x] HEX to RGB Converter
- [x] RGB to HEX Converter
- [x] HEX to HSL Converter
- [x] Gradient Generator
- [x] Color Contrast Checker
- [x] Color Name Finder
- [x] Random Color Generator
- [x] CSS Gradient Generator
- [x] Tailwind Color Shade Generator

### QR Code & Barcode Tools
- [x] QR Code Generator
- [x] WiFi QR Code Generator
- [x] vCard QR Code Generator
- [x] Barcode Generator
- [x] UPC/EAN Generator

### Random Generators
- [x] Random Number Generator
- [x] Random Name Generator
- [x] Random Word Generator
- [x] Random Sentence Generator
- [x] Coin Flip
- [x] Dice Roller
- [x] Random Date Generator
- [x] Random Team Generator
- [x] Yes/No Decision Maker
- [x] Random Country Generator
- [x] Lottery Number Generator
- [x] Random Emoji Generator
- [x] Wheel of Names Spinner

### Website & Network Tools
- [x] User Agent Detector
- [x] Subnet Calculator

### Font & Typography Tools
- [x] Fancy Text Generator
- [x] Typography Scale Generator

### Writing & Citation Tools
- [x] Readability Score Checker

### Email Tools
- [x] Email Validator
- [x] Email Address Extractor

### Math Tools
- [x] Quadratic Equation Solver
- [x] Prime Number Checker
- [x] GCD & LCM Calculator
- [x] Factorial Calculator
- [x] Trigonometry Calculator
- [x] Percentage Change Calculator
- [x] Number Rounding Tool

### Crypto & Currency Tools
- [x] Bitcoin Address Validator
- [x] Crypto Wallet Address QR Generator

### Time & Productivity Tools
- [x] World Clock
- [x] Pomodoro Timer
- [x] Online Stopwatch
- [x] Countdown to Date Widget
- [x] Work Days Calculator

## Tier 2

### PDF Tools
- [x] JPG to PDF
- [x] PDF Rotate
- [x] PDF Extract Pages
- [x] PDF Delete Pages
- [x] PDF Reorder Pages
- [x] PDF Add Watermark
- [x] PDF Metadata Editor
- [x] PDF Page Numbering
- [x] PDF to Text
- [x] PNG to PDF
- [x] PDF Header & Footer Adder
- [x] PDF Reader Online

### Image Tools
- [x] Image Compressor
- [x] Image Resizer
- [x] Crop Image
- [x] AVIF to JPG
- [x] SVG to PNG
- [x] Image Watermark
- [x] Image Metadata Viewer
- [x] Image DPI Converter
- [x] Universal Image Converter
- [x] GIF to PNG
- [x] PNG to GIF
- [x] ICO Converter (Favicon Maker)
- [x] Image to PDF
- [x] Image Splitter (Grid Cutter)
- [x] Image Sharpener
- [x] Meme Generator
- [x] Photo Filters
- [x] Favicon Generator
- [x] Image EXIF Remover
- [x] Batch Image Resizer

### Text Tools
- [ ] Text Diff Checker
- [ ] Text to Speech
- [ ] Speech to Text
- [ ] Text Encryptor / Decryptor

### Developer Tools
- [ ] JSON to CSV
- [ ] CSV to JSON
- [ ] XML Formatter
- [ ] XML to JSON
- [ ] YAML Formatter
- [ ] YAML to JSON
- [ ] JSON to YAML
- [ ] JWT Generator
- [ ] HTML Minifier
- [ ] CSS Minifier
- [ ] SQL Formatter
- [ ] SQL Minifier
- [ ] Cron Expression Generator
- [ ] HTML Formatter / Beautifier
- [ ] HTML to Markdown
- [ ] Markdown to HTML
- [ ] Markdown Previewer
- [ ] Code Diff Checker
- [ ] JSON Diff Checker
- [ ] JSON Path Tester
- [ ] GraphQL Query Formatter
- [ ] User Agent Parser

### Video Tools
- [x] Screen Recorder
- [x] Video Thumbnail Generator

### Audio Tools
- [x] WAV Converter
- [x] Audio Cutter
- [x] Audio Volume Booster
- [x] Audio Fade In/Out Editor
- [x] Ringtone Maker
- [x] Podcast Trimmer

### Archive Tools
- [x] ZIP Extractor
- [x] ZIP Creator
- [x] GZIP Extractor

### Social Media Tools
- [ ] YouTube Thumbnail Downloader
- [ ] Hashtag Generator
- [ ] Instagram Caption Generator

### Security Tools
- [x] Password Strength Checker
- [x] HMAC Generator
- [x] File Hash Checker
- [x] AES Encryption Tool
- [x] AES Decryption Tool
- [x] File Encryptor / Decryptor

### Document & Office Tools
- [ ] Excel to CSV
- [ ] TXT to DOCX
- [ ] Resume Builder
- [ ] Cover Letter Generator
- [ ] Invoice Template Generator
- [ ] Certificate Generator
- [ ] Letterhead Generator

### Spreadsheet & Data Tools
- [ ] CSV Merger
- [ ] CSV Splitter
- [ ] Excel to JSON
- [ ] JSON to Excel
- [ ] Duplicate Row Remover
- [ ] Chart Generator from CSV
- [ ] Excel Formula Generator

### Color Tools
- [ ] Color Palette Generator
- [ ] Color Blindness Simulator
- [ ] Image Color Palette Extractor

### QR Code & Barcode Tools
- [ ] QR Code Scanner
- [ ] Barcode Scanner
- [ ] QR Code with Logo Generator
- [ ] Bulk QR Code Generator

### Website & Network Tools
- [x] IP Address Lookup
- [x] My IP Address Finder
- [x] MAC Address Lookup Tool

### Font & Typography Tools
- [ ] Font Pairing Generator
- [ ] Google Fonts Previewer

### Writing & Citation Tools
- [ ] Citation Generator (APA/MLA/Chicago)
- [ ] Bibliography Generator

### Email Tools
- [ ] Mail Header Analyzer
- [ ] Email Signature Generator
- [ ] Email Subject Line Tester

### Legal & Business Document Tools
- [ ] Privacy Policy Generator
- [ ] Terms & Conditions Generator
- [ ] NDA (Non-Disclosure Agreement) Generator
- [ ] Disclaimer Generator
- [ ] Refund Policy Generator
- [ ] Cookie Policy Generator
- [ ] Employment Contract Generator
- [ ] Rental/Lease Agreement Generator
- [ ] Freelance Contract Generator
- [ ] Affidavit Template Generator

### Math Tools
- [x] Matrix Calculator

### Signature Tools
- [ ] Digital Signature Maker
- [ ] Handwritten Signature Generator
- [ ] Signature to Transparent PNG Converter
- [ ] Initials Logo Generator

### Time & Productivity Tools
- [ ] Meeting Time Planner (Time Zone Overlap)
- [ ] Habit Tracker Sheet Generator

### Education Tools
- [ ] Flashcard Maker
- [ ] Quiz Generator
- [ ] Multiple Choice Test Generator
- [ ] Graph Paper Generator
- [ ] Timetable / Schedule Generator

### Presentation Tools
- [ ] Slide Text Extractor

## Tier 3

### PDF Tools
- [x] PDF Merge
- [x] PDF Split
- [x] PDF Compress
- [x] PDF to JPG
- [x] PDF Unlock
- [x] PDF to PNG
- [x] HTML to PDF
- [x] PDF Crop
- [x] PDF Flatten
- [x] PDF Bookmark Editor
- [x] PDF Splitter by File Size
- [x] Scan to PDF
- [x] PDF Grayscale Converter
- [x] PDF Page Extractor to Images

### Image Tools
- [x] TIFF to JPG
- [x] Image Collage Maker
- [x] Image Compare (Diff Tool)
- [x] Passport Photo Maker
- [x] Image Noise Reducer

### Developer Tools
- [ ] JS Minifier
- [ ] Code Beautifier (universal)

### Video Tools
- [x] Video Trimmer
- [x] Mute Video
- [x] Video Rotator
- [x] Video Frame Extractor
- [x] Loop Video Maker

### Audio Tools
- [x] Audio Joiner
- [x] Change Audio Speed
- [x] Audio Metadata Editor
- [x] MP3 to WAV
- [x] Audio Merger
- [ ] Text to Speech Audio Exporter
- [x] Audio Normalizer

### OCR Tools
- [x] Image to Text
- [x] Screenshot OCR
- [x] Multi-language OCR

### Archive Tools
- [x] TAR Extractor
- [x] ZIP Password Remover
- [x] ZIP Password Protector
- [x] Universal File Compressor
- [x] TAR.GZ Creator
- [x] Split Archive by Size

### Social Media Tools
- [ ] YouTube Title Generator
- [ ] YouTube Description Generator

### SEO Tools
- [ ] Sitemap Generator
- [ ] Schema Markup Generator
- [ ] XML Sitemap Validator
- [ ] Readability Checker

### Security Tools
- [x] PGP Key Pair Generator
- [x] SSL Certificate Decoder

### Document & Office Tools
- [ ] CSV to Excel
- [ ] DOCX to TXT
- [ ] Business Card Designer

### Spreadsheet & Data Tools
- [ ] Data Cleaner

### Website & Network Tools
- [x] DNS Lookup
- [x] MX Record Lookup

### GIF & Meme Tools
- [ ] GIF Maker from Images
- [ ] GIF Resizer
- [ ] GIF Splitter (Frame Extractor)
- [ ] Meme Caption Generator

### Writing & Citation Tools
- [ ] Essay Outline Generator
- [ ] Thesis Statement Generator

### Math Tools
- [x] Equation Solver
- [x] Graphing Calculator
- [x] Algebra Calculator

### Language & Translation Tools
- [ ] Language Detector
- [ ] Dictionary Lookup
- [ ] Thesaurus / Synonym Finder
- [ ] Text Pronunciation Guide
- [ ] Word Definition Lookup

### Crypto & Currency Tools
- [x] Cryptocurrency Price Converter
- [x] Mining Profitability Calculator
- [x] Live Currency Exchange Rate Checker

### Education Tools
- [ ] Handwriting Practice Sheet Generator

### Presentation Tools
- [ ] Presentation Template Generator

## Tier 4

### PDF Tools
- [ ] PDF Protect
- [x] PDF Signer (eSign PDF)
- [x] PDF Form Filler
- [x] PDF Compare
- [x] PDF OCR
- [x] PDF Redact
- [x] PDF Annotator

### Image Tools
- [x] PNG to SVG
- [x] HEIC to JPG
- [x] HEIC to PNG
- [ ] JPG to HEIC

### Video Tools
- [x] MP4 to WebM
- [x] WebM to MP4
- [x] Video Compressor
- [x] Extract Audio from Video
- [x] Video to GIF
- [x] GIF to MP4
- [x] Change Video Speed
- [x] Merge Videos
- [x] MP4 to MP3
- [x] Video to Audio Converter
- [x] Video Cropper
- [x] Video Resizer
- [x] Video Watermark
- [x] AVI to MP4
- [x] MOV to MP4
- [x] MKV to MP4
- [x] FLV to MP4
- [x] Video Aspect Ratio Converter

### Audio Tools
- [x] MP3 Converter
- [x] Audio Compressor
- [x] WAV to MP3
- [x] OGG Converter
- [x] FLAC Converter
- [x] AAC Converter
- [x] Audio Pitch Changer
- [x] Universal Audio Format Converter

### OCR Tools
- [x] PDF to Text OCR
- [x] OCR to Word
- [x] OCR to PDF (Searchable PDF)
- [x] Batch OCR Processor

### Archive Tools
- [x] 7Z Extractor
- [x] Archive Format Converter
- [x] ISO Extractor

### SEO Tools
- [ ] Canonical Tag Checker
- [ ] Alt Text Checker
- [ ] Header Tag (H1-H6) Analyzer
- [ ] Redirect Checker

### Document & Office Tools
- [ ] Document Merger

### Spreadsheet & Data Tools
- [ ] Pivot Table Generator

### GIF & Meme Tools
- [ ] GIF Maker from Video
- [ ] GIF Compressor
- [ ] GIF to Video Converter
- [ ] GIF Speed Changer
- [ ] Reverse GIF Maker

### Font & Typography Tools
- [ ] Font Format Converter (TTF/WOFF/OTF)

## Tier 5

### PDF Tools
- [x] Word to PDF
- [x] Excel to PDF
- [x] PowerPoint to PDF
- [x] PDF to HTML
- [x] PDF Repair
- [x] PDF to CSV
- [x] PDF to Markdown

### Developer Tools
- [ ] Webhook Tester

### Video Tools
- [x] Add Subtitles to Video
- [x] Reverse Video
- [x] Video Compressor to Target Size
- [x] Video Joiner by Timeline

### Finance & Business Calculators
- [ ] Currency Converter

### Social Media Tools
- [ ] YouTube Tags Extractor
- [ ] YouTube Channel ID Finder
- [ ] Pinterest Image Downloader
- [ ] Bio Link Page Generator

### SEO Tools
- [ ] Page Speed Checker
- [ ] Broken Link Checker
- [ ] Google Cache Checker
- [ ] SSL Checker
- [ ] Mobile-Friendly Test
- [ ] Domain Age Checker

### Security Tools
- [x] IP Blacklist Checker
- [x] Data Breach Email Checker
- [x] Self-Destructing Secure Note Generator

### Document & Office Tools
- [ ] ODT Converter
- [ ] EPUB Converter

### Website & Network Tools
- [x] Ping Test
- [x] WHOIS Lookup
- [x] Website Speed Test
- [x] HTTP Header Checker
- [x] SSL Certificate Checker
- [x] Website Screenshot Tool
- [x] Website Uptime Checker

### Email Tools
- [ ] Bulk Email List Verifier

### Language & Translation Tools
- [ ] Language Translator

### Presentation Tools
- [ ] PPT to Images
- [ ] Slide Background Remover

## Tier 6

### PDF Tools
- [x] PDF to Word
- [x] PDF to Excel
- [x] PDF to PowerPoint

### Image Tools
- [x] Remove Background
- [ ] AI Image Upscaler
- [x] Transparent Background Maker

### OCR Tools
- [x] Handwriting OCR
- [x] Table OCR (Image to Excel)
- [x] Receipt OCR
- [x] ID Card OCR
- [x] License Plate OCR

### AI Tools
- [ ] AI Background Remover
- [ ] AI Image Caption Generator
- [ ] AI OCR Enhancer
- [ ] AI Text Summarizer
- [ ] AI Grammar Fixer
- [ ] AI Paraphraser
- [ ] AI Text Generator
- [ ] AI Cover Letter Generator
- [ ] AI Blog Idea Generator
- [ ] AI Email Writer
- [ ] AI Chatbot Reply Generator
- [ ] AI Story Generator
- [ ] AI Code Explainer
- [ ] AI SQL Query Generator
- [ ] AI Product Description Generator
- [ ] AI Headline Generator
- [ ] AI Title Generator
- [ ] AI Slogan Generator
- [ ] AI Image Generator
- [ ] AI Voice Generator
- [ ] AI PDF Summarizer
- [ ] AI Resume Reviewer
- [ ] AI Content Detector

### Social Media Tools
- [ ] YouTube Video Downloader
- [ ] YouTube Shorts Downloader
- [ ] Instagram Reels Downloader
- [ ] TikTok Video Downloader
- [ ] Facebook Video Downloader
- [ ] Twitter/X Video Downloader

### SEO Tools
- [ ] Backlink Checker
- [ ] Keyword Position Tracker
- [ ] Domain Authority Checker

### Font & Typography Tools
- [ ] Font Identifier (Image to Font)

### Writing & Citation Tools
- [ ] Plagiarism Checker
- [ ] Grammar Checker

### Presentation Tools
- [ ] PPT to Video Converter
