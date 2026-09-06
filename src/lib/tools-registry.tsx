import type { ComponentType } from "react";
import type { ToolContent } from "@/lib/tools-content/types";

import { WordCounter } from "@/components/tools/word-counter";
import { CharacterCounter } from "@/components/tools/character-counter";
import { CaseConverter } from "@/components/tools/case-converter";
import { RemoveDuplicateLines } from "@/components/tools/remove-duplicate-lines";
import { SortLines } from "@/components/tools/sort-lines";
import { TextReverser } from "@/components/tools/text-reverser";
import { SlugGenerator } from "@/components/tools/slug-generator";
import { LoremIpsumGenerator } from "@/components/tools/lorem-ipsum-generator";
import { RandomTextGenerator } from "@/components/tools/random-text-generator";
import { FindAndReplace } from "@/components/tools/find-and-replace";
import { TextCleaner } from "@/components/tools/text-cleaner";
import { RemoveExtraSpaces } from "@/components/tools/remove-extra-spaces";
import { UrlEncoderDecoder } from "@/components/tools/url-encoder-decoder";
import { WordFrequencyCounter } from "@/components/tools/word-frequency-counter";
import { Rot13Encoder } from "@/components/tools/rot13-encoder";
import { MorseCodeTranslator } from "@/components/tools/morse-code-translator";
import { BinaryTextConverter } from "@/components/tools/binary-text-converter";
import { PalindromeChecker } from "@/components/tools/palindrome-checker";
import { AnagramSolver } from "@/components/tools/anagram-solver";
import { LineCounter } from "@/components/tools/line-counter";
import { ParagraphCounter } from "@/components/tools/paragraph-counter";
import { WhitespaceRemover } from "@/components/tools/whitespace-remover";
import { TitleCaseConverter } from "@/components/tools/title-case-converter";
import { SentenceCaseConverter } from "@/components/tools/sentence-case-converter";
import { TextToHashtags } from "@/components/tools/text-to-hashtags";
import { FakeTextGenerator } from "@/components/tools/fake-text-generator";
import { TextWrapper } from "@/components/tools/text-wrapper";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { JsonValidator } from "@/components/tools/json-validator";
import { JsonMinifier } from "@/components/tools/json-minifier";
import { Base64EncoderDecoder } from "@/components/tools/base64-encoder-decoder";
import { JwtDecoder } from "@/components/tools/jwt-decoder";
import { RegexTester } from "@/components/tools/regex-tester";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { HashGenerator } from "@/components/tools/hash-generator";
import { TimestampConverter } from "@/components/tools/timestamp-converter";
import { EpochConverter } from "@/components/tools/epoch-converter";
import { ColorCodeConverter } from "@/components/tools/color-code-converter";
import { UrlParser } from "@/components/tools/url-parser";
import { HttpStatusLookup } from "@/components/tools/http-status-lookup";
import { MimeTypeLookup } from "@/components/tools/mime-type-lookup";
import { CurlCommandGenerator } from "@/components/tools/curl-command-generator";
import { Base32EncodeDecode } from "@/components/tools/base32-encode-decode";
import { AsciiTable } from "@/components/tools/ascii-table";
import { UnicodeConverter } from "@/components/tools/unicode-converter";
import { SlugifyTool } from "@/components/tools/slugify-tool";
import { GitignoreGenerator } from "@/components/tools/gitignore-generator";
import { LicenseGenerator } from "@/components/tools/license-generator";
import { ApiResponseFormatter } from "@/components/tools/api-response-formatter";
import { NumberBaseConverter } from "@/components/tools/number-base-converter";
import { EnvToJson } from "@/components/tools/env-to-json";
import { ColumnToComma } from "@/components/tools/column-to-comma";
import { DuplicateWordRemover } from "@/components/tools/duplicate-word-remover";
import { TextToSlugBulk } from "@/components/tools/text-to-slug-bulk";
import { RotateImage } from "@/components/tools/rotate-image";
import { FlipImage } from "@/components/tools/flip-image";
import { PngToJpg } from "@/components/tools/png-to-jpg";
import { JpgToPng } from "@/components/tools/jpg-to-png";
import { WebpToJpg } from "@/components/tools/webp-to-jpg";
import { JpgToWebp } from "@/components/tools/jpg-to-webp";
import { BlurImage } from "@/components/tools/blur-image";
import { ImageColorPicker } from "@/components/tools/image-color-picker";
import { ImageBase64Converter } from "@/components/tools/image-base64-converter";
import { BmpToJpg } from "@/components/tools/bmp-to-jpg";
import { GrayscaleImage } from "@/components/tools/grayscale-image";
import { RoundedCornersImage } from "@/components/tools/rounded-corners-image";
import { BorderImage } from "@/components/tools/border-image";
import { PixelateImage } from "@/components/tools/pixelate-image";
import { SocialMediaResizer } from "@/components/tools/social-media-resizer";
import { RotateImageByAngle } from "@/components/tools/rotate-image-by-angle";
import { AgeCalculator } from "@/components/tools/age-calculator";
import { PercentageCalculator } from "@/components/tools/percentage-calculator";
import { DiscountCalculator } from "@/components/tools/discount-calculator";
import { BmiCalculator } from "@/components/tools/bmi-calculator";
import { DateCalculator } from "@/components/tools/date-calculator";
import { TimeCalculator } from "@/components/tools/time-calculator";
import { TimeDurationCalculator } from "@/components/tools/time-duration-calculator";
import { TimeZoneConverter } from "@/components/tools/time-zone-converter";
import { CountdownTimerGenerator } from "@/components/tools/countdown-timer-generator";
import { TipCalculator } from "@/components/tools/tip-calculator";
import { SimpleInterestCalculator } from "@/components/tools/simple-interest-calculator";
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { FuelCostCalculator } from "@/components/tools/fuel-cost-calculator";
import { GradeCalculator } from "@/components/tools/grade-calculator";
import { OvulationCalculator } from "@/components/tools/ovulation-calculator";
import { PregnancyDueDateCalculator } from "@/components/tools/pregnancy-due-date-calculator";
import { RetirementCalculator } from "@/components/tools/retirement-calculator";
import { RandomNumberRangeCalculator } from "@/components/tools/random-number-range-calculator";
import { StatisticsCalculator } from "@/components/tools/statistics-calculator";
import { StandardDeviationCalculator } from "@/components/tools/standard-deviation-calculator";
import { FractionCalculator } from "@/components/tools/fraction-calculator";
import { RatioCalculator } from "@/components/tools/ratio-calculator";
import { ScientificCalculator } from "@/components/tools/scientific-calculator";
import { GpaCalculator } from "@/components/tools/gpa-calculator";
import { EmiCalculator } from "@/components/tools/emi-calculator";
import { GstCalculator } from "@/components/tools/gst-calculator";
import { SipCalculator } from "@/components/tools/sip-calculator";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";
import { LoanAmortizationCalculator } from "@/components/tools/loan-amortization-calculator";
import { BreakEvenCalculator } from "@/components/tools/break-even-calculator";
import { ProfitMarginCalculator } from "@/components/tools/profit-margin-calculator";
import { RoiCalculator } from "@/components/tools/roi-calculator";
import { TaxCalculator } from "@/components/tools/tax-calculator";
import { VatCalculator } from "@/components/tools/vat-calculator";
import { PayrollCalculator } from "@/components/tools/payroll-calculator";
import { InvoiceGenerator } from "@/components/tools/invoice-generator";
import { FreelanceRateCalculator } from "@/components/tools/freelance-rate-calculator";
import { BusinessLoanCalculator } from "@/components/tools/business-loan-calculator";
import { DepreciationCalculator } from "@/components/tools/depreciation-calculator";
import { MarkupCalculator } from "@/components/tools/markup-calculator";
import { NetWorthCalculator } from "@/components/tools/net-worth-calculator";
import { InflationCalculator } from "@/components/tools/inflation-calculator";
import { SavingsGoalCalculator } from "@/components/tools/savings-goal-calculator";
import { BmrCalculator } from "@/components/tools/bmr-calculator";
import { BodyFatCalculator } from "@/components/tools/body-fat-calculator";
import { CalorieCalculator } from "@/components/tools/calorie-calculator";
import { IdealWeightCalculator } from "@/components/tools/ideal-weight-calculator";
import { WaterIntakeCalculator } from "@/components/tools/water-intake-calculator";
import { HeartRateZoneCalculator } from "@/components/tools/heart-rate-zone-calculator";
import { MacroCalculator } from "@/components/tools/macro-calculator";
import { WaistToHipRatioCalculator } from "@/components/tools/waist-to-hip-ratio-calculator";
import { OneRepMaxCalculator } from "@/components/tools/one-rep-max-calculator";
import { StepsToCaloriesCalculator } from "@/components/tools/steps-to-calories-calculator";
import { PaceCalculator } from "@/components/tools/pace-calculator";
import { LengthConverter } from "@/components/tools/length-converter";
import { WeightConverter } from "@/components/tools/weight-converter";
import { TemperatureConverter } from "@/components/tools/temperature-converter";
import { SpeedConverter } from "@/components/tools/speed-converter";
import { AreaConverter } from "@/components/tools/area-converter";
import { VolumeConverter } from "@/components/tools/volume-converter";
import { DataStorageConverter } from "@/components/tools/data-storage-converter";
import { TimeUnitConverter } from "@/components/tools/time-unit-converter";
import { PressureConverter } from "@/components/tools/pressure-converter";
import { EnergyConverter } from "@/components/tools/energy-converter";
import { PowerConverter } from "@/components/tools/power-converter";
import { AngleConverter } from "@/components/tools/angle-converter";
import { FuelConsumptionConverter } from "@/components/tools/fuel-consumption-converter";
import { CookingMeasurementConverter } from "@/components/tools/cooking-measurement-converter";
import { ShoeSizeConverter } from "@/components/tools/shoe-size-converter";
import { ClothingSizeConverter } from "@/components/tools/clothing-size-converter";
import { RomanNumeralConverter } from "@/components/tools/roman-numeral-converter";
import { QrCodeGenerator } from "@/components/tools/qr-code-generator";
import { WifiQrCodeGenerator } from "@/components/tools/wifi-qr-code-generator";
import { VcardQrCodeGenerator } from "@/components/tools/vcard-qr-code-generator";
import { BarcodeGenerator } from "@/components/tools/barcode-generator";
import { UpcEanGenerator } from "@/components/tools/upc-ean-generator";
import { ColorPicker } from "@/components/tools/color-picker";
import { HexToRgb } from "@/components/tools/hex-to-rgb";
import { RgbToHex } from "@/components/tools/rgb-to-hex";
import { HexToHsl } from "@/components/tools/hex-to-hsl";
import { GradientGenerator } from "@/components/tools/gradient-generator";
import { ColorContrastChecker } from "@/components/tools/color-contrast-checker";
import { ColorNameFinder } from "@/components/tools/color-name-finder";
import { RandomColorGenerator } from "@/components/tools/random-color-generator";
import { CssGradientGenerator } from "@/components/tools/css-gradient-generator";
import { TailwindShadeGenerator } from "@/components/tools/tailwind-shade-generator";
import { RandomNumberGenerator } from "@/components/tools/random-number-generator";
import { RandomNameGenerator } from "@/components/tools/random-name-generator";
import { RandomWordGenerator } from "@/components/tools/random-word-generator";
import { RandomSentenceGenerator } from "@/components/tools/random-sentence-generator";
import { CoinFlip } from "@/components/tools/coin-flip";
import { DiceRoller } from "@/components/tools/dice-roller";
import { RandomDateGenerator } from "@/components/tools/random-date-generator";
import { RandomTeamGenerator } from "@/components/tools/random-team-generator";
import { YesNoDecisionMaker } from "@/components/tools/yes-no-decision-maker";
import { RandomCountryGenerator } from "@/components/tools/random-country-generator";
import { LotteryNumberGenerator } from "@/components/tools/lottery-number-generator";
import { RandomEmojiGenerator } from "@/components/tools/random-emoji-generator";
import { WheelOfNamesSpinner } from "@/components/tools/wheel-of-names-spinner";
import { PingTest } from "@/components/tools/ping-test";
import { DnsLookup } from "@/components/tools/dns-lookup";
import { MxRecordLookup } from "@/components/tools/mx-record-lookup";
import { WhoisLookup } from "@/components/tools/whois-lookup";
import { IpAddressLookup } from "@/components/tools/ip-address-lookup";
import { MyIpAddressFinder } from "@/components/tools/my-ip-address-finder";
import { WebsiteSpeedTest } from "@/components/tools/website-speed-test";
import { HttpHeaderChecker } from "@/components/tools/http-header-checker";
import { SslCertificateChecker } from "@/components/tools/ssl-certificate-checker";
import { WebsiteUptimeChecker } from "@/components/tools/website-uptime-checker";
import { UserAgentDetector } from "@/components/tools/user-agent-detector";
import { WebsiteScreenshotTool } from "@/components/tools/website-screenshot-tool";
import { SubnetCalculator } from "@/components/tools/subnet-calculator";
import { MacAddressLookupTool } from "@/components/tools/mac-address-lookup-tool";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { Sha256Generator } from "@/components/tools/sha256-generator";
import { Md5Generator } from "@/components/tools/md5-generator";
import { TwoFactorBackupCodeGenerator } from "@/components/tools/two-factor-backup-code-generator";
import { CsrfTokenGenerator } from "@/components/tools/csrf-token-generator";
import { PassphraseGenerator } from "@/components/tools/passphrase-generator";
import { PasswordStrengthChecker } from "@/components/tools/password-strength-checker";
import { HmacGenerator } from "@/components/tools/hmac-generator";
import { FileHashChecker } from "@/components/tools/file-hash-checker";
import { AesEncryptionTool } from "@/components/tools/aes-encryption-tool";
import { AesDecryptionTool } from "@/components/tools/aes-decryption-tool";
import { FileEncryptorDecryptor } from "@/components/tools/file-encryptor-decryptor";
import { PgpKeyPairGenerator } from "@/components/tools/pgp-key-pair-generator";
import { SslCertificateDecoder } from "@/components/tools/ssl-certificate-decoder";
import { IpBlacklistChecker } from "@/components/tools/ip-blacklist-checker";
import { DataBreachEmailChecker } from "@/components/tools/data-breach-email-checker";
import { SelfDestructingSecureNoteGenerator } from "@/components/tools/self-destructing-secure-note-generator";
import { EquationSolver } from "@/components/tools/equation-solver";
import { QuadraticEquationSolver } from "@/components/tools/quadratic-equation-solver";
import { MatrixCalculator } from "@/components/tools/matrix-calculator";
import { GraphingCalculator } from "@/components/tools/graphing-calculator";
import { PrimeNumberChecker } from "@/components/tools/prime-number-checker";
import { GcdAndLcmCalculator } from "@/components/tools/gcd-and-lcm-calculator";
import { FactorialCalculator } from "@/components/tools/factorial-calculator";
import { AlgebraCalculator } from "@/components/tools/algebra-calculator";
import { TrigonometryCalculator } from "@/components/tools/trigonometry-calculator";
import { PercentageChangeCalculator } from "@/components/tools/percentage-change-calculator";
import { NumberRoundingTool } from "@/components/tools/number-rounding-tool";
import { BitcoinAddressValidator } from "@/components/tools/bitcoin-address-validator";
import { CryptoWalletAddressQrGenerator } from "@/components/tools/crypto-wallet-address-qr-generator";
import { CryptocurrencyPriceConverter } from "@/components/tools/cryptocurrency-price-converter";
import { MiningProfitabilityCalculator } from "@/components/tools/mining-profitability-calculator";
import { LiveCurrencyExchangeRateChecker } from "@/components/tools/live-currency-exchange-rate-checker";
import { ImageCompressor } from "@/components/tools/image-compressor";
import { ImageResizer } from "@/components/tools/image-resizer";
import { CropImage } from "@/components/tools/crop-image";
import { AvifToJpg } from "@/components/tools/avif-to-jpg";
import { SvgToPng } from "@/components/tools/svg-to-png";
import { ImageWatermark } from "@/components/tools/image-watermark";
import { ImageMetadataViewer } from "@/components/tools/image-metadata-viewer";
import { ImageDpiConverter } from "@/components/tools/image-dpi-converter";
import { UniversalImageConverter } from "@/components/tools/universal-image-converter";
import { TiffToJpg } from "@/components/tools/tiff-to-jpg";
import { GifToPng } from "@/components/tools/gif-to-png";
import { PngToGif } from "@/components/tools/png-to-gif";
import { IcoConverter } from "@/components/tools/ico-converter";
import { ImageToPdf } from "@/components/tools/image-to-pdf";
import { ImageSplitter } from "@/components/tools/image-splitter";
import { ImageCollageMaker } from "@/components/tools/image-collage-maker";
import { ImageSharpener } from "@/components/tools/image-sharpener";
import { MemeGenerator } from "@/components/tools/meme-generator";
import { PhotoFilters } from "@/components/tools/photo-filters";
import { ImageCompare } from "@/components/tools/image-compare";
import { PassportPhotoMaker } from "@/components/tools/passport-photo-maker";
import { FaviconGenerator } from "@/components/tools/favicon-generator";
import { ImageExifRemover } from "@/components/tools/image-exif-remover";
import { ImageNoiseReducer } from "@/components/tools/image-noise-reducer";
import { BatchImageResizer } from "@/components/tools/batch-image-resizer";
import { TransparentBackgroundMaker } from "@/components/tools/transparent-background-maker";
import { PdfMerge } from "@/components/tools/pdf-merge";
import { PdfSplit } from "@/components/tools/pdf-split";
import { PdfRotate } from "@/components/tools/pdf-rotate";
import { PdfExtractPages } from "@/components/tools/pdf-extract-pages";
import { PdfDeletePages } from "@/components/tools/pdf-delete-pages";
import { PdfReorderPages } from "@/components/tools/pdf-reorder-pages";
import { PdfAddWatermark } from "@/components/tools/pdf-add-watermark";
import { PdfMetadataEditor } from "@/components/tools/pdf-metadata-editor";
import { PdfPageNumbering } from "@/components/tools/pdf-page-numbering";
import { PdfHeaderAndFooterAdder } from "@/components/tools/pdf-header-and-footer-adder";
import { PdfCrop } from "@/components/tools/pdf-crop";
import { PdfPageSizeConverter } from "@/components/tools/pdf-page-size-converter";
import { JpgToPdf } from "@/components/tools/jpg-to-pdf";
import { PngToPdf } from "@/components/tools/png-to-pdf";
import { ScanToPdf } from "@/components/tools/scan-to-pdf";
import { PdfToText } from "@/components/tools/pdf-to-text";
import { PdfToJpg } from "@/components/tools/pdf-to-jpg";
import { PdfToPng } from "@/components/tools/pdf-to-png";
import { PdfReaderOnline } from "@/components/tools/pdf-reader-online";
import { PdfSplitterByFileSize } from "@/components/tools/pdf-splitter-by-file-size";
import { PdfCompress } from "@/components/tools/pdf-compress";
import { PdfUnlock } from "@/components/tools/pdf-unlock";
import { PdfFlatten } from "@/components/tools/pdf-flatten";
import { PdfFormFiller } from "@/components/tools/pdf-form-filler";
import { PdfCompare } from "@/components/tools/pdf-compare";
import { PdfSigner } from "@/components/tools/pdf-signer";
import { PdfBookmarkEditor } from "@/components/tools/pdf-bookmark-editor";
import { PdfRedact } from "@/components/tools/pdf-redact";
import { PdfRepair } from "@/components/tools/pdf-repair";
import { PdfAnnotator } from "@/components/tools/pdf-annotator";
import { PdfToCsv } from "@/components/tools/pdf-to-csv";
import { PdfToMarkdown } from "@/components/tools/pdf-to-markdown";
import { PdfToHtml } from "@/components/tools/pdf-to-html";
import { PdfToEpub } from "@/components/tools/pdf-to-epub";
import { PdfToWord } from "@/components/tools/pdf-to-word";
import { WordToPdf } from "@/components/tools/word-to-pdf";
import { PdfToExcel } from "@/components/tools/pdf-to-excel";
import { ExcelToPdf } from "@/components/tools/excel-to-pdf";
import { PdfToPowerpoint } from "@/components/tools/pdf-to-powerpoint";
import { PowerpointToPdf } from "@/components/tools/powerpoint-to-pdf";
import { HtmlToPdf } from "@/components/tools/html-to-pdf";
import { PdfOcr } from "@/components/tools/pdf-ocr";
import { PdfGrayscaleConverter } from "@/components/tools/pdf-grayscale-converter";
import { PdfPageExtractorToImages } from "@/components/tools/pdf-page-extractor-to-images";
import { RemoveBackground } from "@/components/tools/remove-background";
import { HeicToJpg } from "@/components/tools/heic-to-jpg";
import { HeicToPng } from "@/components/tools/heic-to-png";
import { PngToSvg } from "@/components/tools/png-to-svg";
import { Mp4ToWebm } from "@/components/tools/mp4-to-webm";
import { WebmToMp4 } from "@/components/tools/webm-to-mp4";
import { VideoCompressor } from "@/components/tools/video-compressor";
import { VideoTrimmer } from "@/components/tools/video-trimmer";
import { ExtractAudioFromVideo } from "@/components/tools/extract-audio-from-video";
import { VideoToGif } from "@/components/tools/video-to-gif";
import { GifToMp4 } from "@/components/tools/gif-to-mp4";
import { ChangeVideoSpeed } from "@/components/tools/change-video-speed";
import { MuteVideo } from "@/components/tools/mute-video";
import { MergeVideos } from "@/components/tools/merge-videos";
import { Mp4ToMp3 } from "@/components/tools/mp4-to-mp3";
import { VideoToAudioConverter } from "@/components/tools/video-to-audio-converter";
import { VideoRotator } from "@/components/tools/video-rotator";
import { VideoCropper } from "@/components/tools/video-cropper";
import { VideoResizer } from "@/components/tools/video-resizer";
import { AddSubtitlesToVideo } from "@/components/tools/add-subtitles-to-video";
import { VideoWatermark } from "@/components/tools/video-watermark";
import { ReverseVideo } from "@/components/tools/reverse-video";
import { ScreenRecorder } from "@/components/tools/screen-recorder";
import { VideoThumbnailGenerator } from "@/components/tools/video-thumbnail-generator";
import { VideoFrameExtractor } from "@/components/tools/video-frame-extractor";
import { LoopVideoMaker } from "@/components/tools/loop-video-maker";
import { VideoCompressorToTargetSize } from "@/components/tools/video-compressor-to-target-size";
import { AviToMp4 } from "@/components/tools/avi-to-mp4";
import { MovToMp4 } from "@/components/tools/mov-to-mp4";
import { MkvToMp4 } from "@/components/tools/mkv-to-mp4";
import { FlvToMp4 } from "@/components/tools/flv-to-mp4";
import { VideoJoinerByTimeline } from "@/components/tools/video-joiner-by-timeline";
import { VideoAspectRatioConverter } from "@/components/tools/video-aspect-ratio-converter";
import { Mp3Converter } from "@/components/tools/mp3-converter";
import { WavConverter } from "@/components/tools/wav-converter";
import { AudioCompressor } from "@/components/tools/audio-compressor";
import { AudioCutter } from "@/components/tools/audio-cutter";
import { AudioJoiner } from "@/components/tools/audio-joiner";
import { ChangeAudioSpeed } from "@/components/tools/change-audio-speed";
import { AudioVolumeBooster } from "@/components/tools/audio-volume-booster";
import { AudioMetadataEditor } from "@/components/tools/audio-metadata-editor";
import { Mp3ToWav } from "@/components/tools/mp3-to-wav";
import { WavToMp3 } from "@/components/tools/wav-to-mp3";
import { OggConverter } from "@/components/tools/ogg-converter";
import { FlacConverter } from "@/components/tools/flac-converter";
import { AacConverter } from "@/components/tools/aac-converter";
import { AudioMerger } from "@/components/tools/audio-merger";
import { AudioPitchChanger } from "@/components/tools/audio-pitch-changer";
import { AudioNormalizer } from "@/components/tools/audio-normalizer";
import { AudioFadeInOutEditor } from "@/components/tools/audio-fade-in-out-editor";
import { RingtoneMaker } from "@/components/tools/ringtone-maker";
import { VoiceRecorderOnline } from "@/components/tools/voice-recorder-online";
import { UniversalAudioFormatConverter } from "@/components/tools/universal-audio-format-converter";
import { PodcastTrimmer } from "@/components/tools/podcast-trimmer";
import { SilenceRemover } from "@/components/tools/silence-remover";
import { ImageToText } from "@/components/tools/image-to-text";
import { PdfToTextOcr } from "@/components/tools/pdf-to-text-ocr";
import { HandwritingOcr } from "@/components/tools/handwriting-ocr";
import { ScreenshotOcr } from "@/components/tools/screenshot-ocr";
import { MultiLanguageOcr } from "@/components/tools/multi-language-ocr";
import { TableOcr } from "@/components/tools/table-ocr";
import { ReceiptOcr } from "@/components/tools/receipt-ocr";
import { IdCardOcr } from "@/components/tools/id-card-ocr";
import { LicensePlateOcr } from "@/components/tools/license-plate-ocr";
import { BusinessCardOcr } from "@/components/tools/business-card-ocr";
import { OcrToWord } from "@/components/tools/ocr-to-word";
import { OcrToPdf } from "@/components/tools/ocr-to-pdf";
import { BatchOcrProcessor } from "@/components/tools/batch-ocr-processor";
import { ZipExtractor } from "@/components/tools/zip-extractor";
import { ZipCreator } from "@/components/tools/zip-creator";
import { TarExtractor } from "@/components/tools/tar-extractor";
import { GzipExtractor } from "@/components/tools/gzip-extractor";
import { SevenZExtractor } from "@/components/tools/7z-extractor";
import { RarExtractor } from "@/components/tools/rar-extractor";
import { ZipPasswordRemover } from "@/components/tools/zip-password-remover";
import { ZipPasswordProtector } from "@/components/tools/zip-password-protector";
import { UniversalFileCompressor } from "@/components/tools/universal-file-compressor";
import { ArchiveFormatConverter } from "@/components/tools/archive-format-converter";
import { IsoExtractor } from "@/components/tools/iso-extractor";
import { TarGzCreator } from "@/components/tools/tar-gz-creator";
import { SplitArchiveBySize } from "@/components/tools/split-archive-by-size";

import { PdfEditor } from "@/components/tools/pdf-editor";
import { AiKeywordExtractor } from "@/components/tools/ai-keyword-extractor";
import { AiResumeBuilder } from "@/components/tools/ai-resume-builder";
import { AiBusinessNameGenerator } from "@/components/tools/ai-business-name-generator";
import { InstagramStorySizeGuide } from "@/components/tools/instagram-story-size-guide";
import { LinkedinPostFormatter } from "@/components/tools/linkedin-post-formatter";
import { TwitterXCharacterCounter } from "@/components/tools/twitter-x-character-counter";
import { EmojiPickerAndCopyTool } from "@/components/tools/emoji-picker-and-copy-tool";
import { SocialMediaImageSizeGuide } from "@/components/tools/social-media-image-size-guide";
import { MetaTagGenerator } from "@/components/tools/meta-tag-generator";
import { RobotsTxtGenerator } from "@/components/tools/robots-txt-generator";
import { KeywordDensityChecker } from "@/components/tools/keyword-density-checker";
import { OpenGraphGenerator } from "@/components/tools/open-graph-generator";
import { SerpSnippetPreviewTool } from "@/components/tools/serp-snippet-preview-tool";
import { CsvViewer } from "@/components/tools/csv-viewer";
import { VlookupFormulaGenerator } from "@/components/tools/vlookup-formula-generator";
import { FancyTextGenerator } from "@/components/tools/fancy-text-generator";
import { TypographyScaleGenerator } from "@/components/tools/typography-scale-generator";
import { ReadabilityScoreChecker } from "@/components/tools/readability-score-checker";
import { EmailValidator } from "@/components/tools/email-validator";
import { EmailAddressExtractor } from "@/components/tools/email-address-extractor";
import { WorldClock } from "@/components/tools/world-clock";
import { PomodoroTimer } from "@/components/tools/pomodoro-timer";
import { OnlineStopwatch } from "@/components/tools/online-stopwatch";
import { CountdownToDateWidget } from "@/components/tools/countdown-to-date-widget";
import { WorkDaysCalculator } from "@/components/tools/work-days-calculator";
import { JsonCsvConverter } from "@/components/tools/json-csv-converter";
import { XmlFormatter } from "@/components/tools/xml-formatter";
import { XmlToJson } from "@/components/tools/xml-to-json";
import { JwtGenerator } from "@/components/tools/jwt-generator";
import { HtmlMinifier } from "@/components/tools/html-minifier";
import { CssMinifier } from "@/components/tools/css-minifier";
import { SqlFormatter } from "@/components/tools/sql-formatter";
import { SqlMinifier } from "@/components/tools/sql-minifier";
import { CronExpressionGenerator } from "@/components/tools/cron-expression-generator";
import { HtmlFormatterBeautifier } from "@/components/tools/html-formatter-beautifier";
import { HtmlMarkdownConverter } from "@/components/tools/html-markdown-converter";
import { MarkdownPreviewer } from "@/components/tools/markdown-previewer";
import { CodeDiffChecker } from "@/components/tools/code-diff-checker";
import { CodeBeautifier } from "@/components/tools/code-beautifier";
import { JsonDiffChecker } from "@/components/tools/json-diff-checker";
import { JsonPathTester } from "@/components/tools/json-path-tester";
import { UserAgentParser } from "@/components/tools/user-agent-parser";
import { JsMinifier } from "@/components/tools/js-minifier";
import { YamlFormatter } from "@/components/tools/yaml-formatter";
import { JsonYamlConverter } from "@/components/tools/json-yaml-converter";
import { GraphqlQueryFormatter } from "@/components/tools/graphql-query-formatter";
import { wordCounterContent } from "@/lib/tools-content/word-counter";
import { characterCounterContent } from "@/lib/tools-content/character-counter";
import { caseConverterContent } from "@/lib/tools-content/case-converter";
import { removeDuplicateLinesContent } from "@/lib/tools-content/remove-duplicate-lines";
import { sortLinesContent } from "@/lib/tools-content/sort-lines";
import { textReverserContent } from "@/lib/tools-content/text-reverser";
import { slugGeneratorContent } from "@/lib/tools-content/slug-generator";
import { loremIpsumGeneratorContent } from "@/lib/tools-content/lorem-ipsum-generator";
import { randomTextGeneratorContent } from "@/lib/tools-content/random-text-generator";
import { findAndReplaceContent } from "@/lib/tools-content/find-and-replace";
import { textCleanerContent } from "@/lib/tools-content/text-cleaner";
import { removeExtraSpacesContent } from "@/lib/tools-content/remove-extra-spaces";
import { urlEncoderContent } from "@/lib/tools-content/url-encoder";
import { urlDecoderContent } from "@/lib/tools-content/url-decoder";
import { wordFrequencyCounterContent } from "@/lib/tools-content/word-frequency-counter";
import { rot13EncoderContent } from "@/lib/tools-content/rot13-encoder";
import { morseCodeTranslatorContent } from "@/lib/tools-content/morse-code-translator";
import { binaryToTextContent } from "@/lib/tools-content/binary-to-text";
import { textToBinaryContent } from "@/lib/tools-content/text-to-binary";
import { palindromeCheckerContent } from "@/lib/tools-content/palindrome-checker";
import { anagramSolverContent } from "@/lib/tools-content/anagram-solver";
import { lineCounterContent } from "@/lib/tools-content/line-counter";
import { paragraphCounterContent } from "@/lib/tools-content/paragraph-counter";
import { whitespaceRemoverContent } from "@/lib/tools-content/whitespace-remover";
import { titleCaseConverterContent } from "@/lib/tools-content/title-case-converter";
import { sentenceCaseConverterContent } from "@/lib/tools-content/sentence-case-converter";
import { textToHashtagsContent } from "@/lib/tools-content/text-to-hashtags";
import { fakeTextGeneratorContent } from "@/lib/tools-content/fake-text-generator";
import { textWrapperContent } from "@/lib/tools-content/text-wrapper";
import { jsonFormatterContent } from "@/lib/tools-content/json-formatter";
import { jsonValidatorContent } from "@/lib/tools-content/json-validator";
import { jsonMinifierContent } from "@/lib/tools-content/json-minifier";
import { base64EncodeContent } from "@/lib/tools-content/base64-encode";
import { base64DecodeContent } from "@/lib/tools-content/base64-decode";
import { jwtDecoderContent } from "@/lib/tools-content/jwt-decoder";
import { regexTesterContent } from "@/lib/tools-content/regex-tester";
import { uuidGeneratorContent } from "@/lib/tools-content/uuid-generator";
import { hashGeneratorContent } from "@/lib/tools-content/hash-generator";
import { timestampConverterContent } from "@/lib/tools-content/timestamp-converter";
import { epochConverterContent } from "@/lib/tools-content/epoch-converter";
import { colorCodeConverterContent } from "@/lib/tools-content/color-code-converter";
import { urlParserContent } from "@/lib/tools-content/url-parser";
import { httpStatusLookupContent } from "@/lib/tools-content/http-status-lookup";
import { mimeTypeLookupContent } from "@/lib/tools-content/mime-type-lookup";
import { curlCommandGeneratorContent } from "@/lib/tools-content/curl-command-generator";
import { base32EncodeDecodeContent } from "@/lib/tools-content/base32-encode-decode";
import { asciiTableContent } from "@/lib/tools-content/ascii-table";
import { unicodeConverterContent } from "@/lib/tools-content/unicode-converter";
import { slugifyToolContent } from "@/lib/tools-content/slugify-tool";
import { gitignoreGeneratorContent } from "@/lib/tools-content/gitignore-generator";
import { licenseGeneratorContent } from "@/lib/tools-content/license-generator";
import { apiResponseFormatterContent } from "@/lib/tools-content/api-response-formatter";
import { numberBaseConverterContent } from "@/lib/tools-content/number-base-converter";
import { envToJsonContent } from "@/lib/tools-content/env-to-json";
import { columnToCommaContent } from "@/lib/tools-content/column-to-comma";
import { duplicateWordRemoverContent } from "@/lib/tools-content/duplicate-word-remover";
import { textToSlugBulkContent } from "@/lib/tools-content/text-to-slug-bulk";
import { rotateImageContent } from "@/lib/tools-content/rotate-image";
import { flipImageContent } from "@/lib/tools-content/flip-image";
import { pngToJpgContent } from "@/lib/tools-content/png-to-jpg";
import { jpgToPngContent } from "@/lib/tools-content/jpg-to-png";
import { webpToJpgContent } from "@/lib/tools-content/webp-to-jpg";
import { jpgToWebpContent } from "@/lib/tools-content/jpg-to-webp";
import { blurImageContent } from "@/lib/tools-content/blur-image";
import { imageColorPickerContent } from "@/lib/tools-content/image-color-picker";
import { imageToBase64Content } from "@/lib/tools-content/image-to-base64";
import { base64ToImageContent } from "@/lib/tools-content/base64-to-image";
import { bmpToJpgContent } from "@/lib/tools-content/bmp-to-jpg";
import { grayscaleImageContent } from "@/lib/tools-content/grayscale-image";
import { roundedCornersImageContent } from "@/lib/tools-content/rounded-corners-image";
import { borderImageContent } from "@/lib/tools-content/border-image";
import { pixelateImageContent } from "@/lib/tools-content/pixelate-image";
import { socialMediaResizerContent } from "@/lib/tools-content/social-media-resizer";
import { rotateImageByAngleContent } from "@/lib/tools-content/rotate-image-by-angle";
import { ageCalculatorContent } from "@/lib/tools-content/age-calculator";
import { percentageCalculatorContent } from "@/lib/tools-content/percentage-calculator";
import { discountCalculatorContent } from "@/lib/tools-content/discount-calculator";
import { bmiCalculatorContent } from "@/lib/tools-content/bmi-calculator";
import { dateCalculatorContent } from "@/lib/tools-content/date-calculator";
import { timeCalculatorContent } from "@/lib/tools-content/time-calculator";
import { timeDurationCalculatorContent } from "@/lib/tools-content/time-duration-calculator";
import { timeZoneConverterContent } from "@/lib/tools-content/time-zone-converter";
import { countdownTimerGeneratorContent } from "@/lib/tools-content/countdown-timer-generator";
import { tipCalculatorContent } from "@/lib/tools-content/tip-calculator";
import { simpleInterestCalculatorContent } from "@/lib/tools-content/simple-interest-calculator";
import { compoundInterestCalculatorContent } from "@/lib/tools-content/compound-interest-calculator";
import { salaryCalculatorContent } from "@/lib/tools-content/salary-calculator";
import { fuelCostCalculatorContent } from "@/lib/tools-content/fuel-cost-calculator";
import { gradeCalculatorContent } from "@/lib/tools-content/grade-calculator";
import { ovulationCalculatorContent } from "@/lib/tools-content/ovulation-calculator";
import { pregnancyDueDateCalculatorContent } from "@/lib/tools-content/pregnancy-due-date-calculator";
import { retirementCalculatorContent } from "@/lib/tools-content/retirement-calculator";
import { randomNumberRangeCalculatorContent } from "@/lib/tools-content/random-number-range-calculator";
import { statisticsCalculatorContent } from "@/lib/tools-content/statistics-calculator";
import { standardDeviationCalculatorContent } from "@/lib/tools-content/standard-deviation-calculator";
import { fractionCalculatorContent } from "@/lib/tools-content/fraction-calculator";
import { ratioCalculatorContent } from "@/lib/tools-content/ratio-calculator";
import { scientificCalculatorContent } from "@/lib/tools-content/scientific-calculator";
import { gpaCalculatorContent } from "@/lib/tools-content/gpa-calculator";
import { emiCalculatorContent } from "@/lib/tools-content/emi-calculator";
import { gstCalculatorContent } from "@/lib/tools-content/gst-calculator";
import { sipCalculatorContent } from "@/lib/tools-content/sip-calculator";
import { loanCalculatorContent } from "@/lib/tools-content/loan-calculator";
import { mortgageCalculatorContent } from "@/lib/tools-content/mortgage-calculator";
import { loanAmortizationCalculatorContent } from "@/lib/tools-content/loan-amortization-calculator";
import { breakEvenCalculatorContent } from "@/lib/tools-content/break-even-calculator";
import { profitMarginCalculatorContent } from "@/lib/tools-content/profit-margin-calculator";
import { roiCalculatorContent } from "@/lib/tools-content/roi-calculator";
import { taxCalculatorContent } from "@/lib/tools-content/tax-calculator";
import { vatCalculatorContent } from "@/lib/tools-content/vat-calculator";
import { payrollCalculatorContent } from "@/lib/tools-content/payroll-calculator";
import { invoiceGeneratorContent } from "@/lib/tools-content/invoice-generator";
import { freelanceRateCalculatorContent } from "@/lib/tools-content/freelance-rate-calculator";
import { businessLoanCalculatorContent } from "@/lib/tools-content/business-loan-calculator";
import { depreciationCalculatorContent } from "@/lib/tools-content/depreciation-calculator";
import { markupCalculatorContent } from "@/lib/tools-content/markup-calculator";
import { netWorthCalculatorContent } from "@/lib/tools-content/net-worth-calculator";
import { inflationCalculatorContent } from "@/lib/tools-content/inflation-calculator";
import { savingsGoalCalculatorContent } from "@/lib/tools-content/savings-goal-calculator";
import { bmrCalculatorContent } from "@/lib/tools-content/bmr-calculator";
import { bodyFatCalculatorContent } from "@/lib/tools-content/body-fat-calculator";
import { calorieCalculatorContent } from "@/lib/tools-content/calorie-calculator";
import { idealWeightCalculatorContent } from "@/lib/tools-content/ideal-weight-calculator";
import { waterIntakeCalculatorContent } from "@/lib/tools-content/water-intake-calculator";
import { heartRateZoneCalculatorContent } from "@/lib/tools-content/heart-rate-zone-calculator";
import { macroCalculatorContent } from "@/lib/tools-content/macro-calculator";
import { waistToHipRatioCalculatorContent } from "@/lib/tools-content/waist-to-hip-ratio-calculator";
import { oneRepMaxCalculatorContent } from "@/lib/tools-content/one-rep-max-calculator";
import { stepsToCaloriesCalculatorContent } from "@/lib/tools-content/steps-to-calories-calculator";
import { paceCalculatorContent } from "@/lib/tools-content/pace-calculator";
import { lengthConverterContent } from "@/lib/tools-content/length-converter";
import { weightConverterContent } from "@/lib/tools-content/weight-converter";
import { temperatureConverterContent } from "@/lib/tools-content/temperature-converter";
import { speedConverterContent } from "@/lib/tools-content/speed-converter";
import { areaConverterContent } from "@/lib/tools-content/area-converter";
import { volumeConverterContent } from "@/lib/tools-content/volume-converter";
import { dataStorageConverterContent } from "@/lib/tools-content/data-storage-converter";
import { timeUnitConverterContent } from "@/lib/tools-content/time-unit-converter";
import { pressureConverterContent } from "@/lib/tools-content/pressure-converter";
import { energyConverterContent } from "@/lib/tools-content/energy-converter";
import { powerConverterContent } from "@/lib/tools-content/power-converter";
import { angleConverterContent } from "@/lib/tools-content/angle-converter";
import { fuelConsumptionConverterContent } from "@/lib/tools-content/fuel-consumption-converter";
import { cookingMeasurementConverterContent } from "@/lib/tools-content/cooking-measurement-converter";
import { shoeSizeConverterContent } from "@/lib/tools-content/shoe-size-converter";
import { clothingSizeConverterContent } from "@/lib/tools-content/clothing-size-converter";
import { romanNumeralConverterContent } from "@/lib/tools-content/roman-numeral-converter";
import { qrCodeGeneratorContent } from "@/lib/tools-content/qr-code-generator";
import { wifiQrCodeGeneratorContent } from "@/lib/tools-content/wifi-qr-code-generator";
import { vcardQrCodeGeneratorContent } from "@/lib/tools-content/vcard-qr-code-generator";
import { barcodeGeneratorContent } from "@/lib/tools-content/barcode-generator";
import { upcEanGeneratorContent } from "@/lib/tools-content/upc-ean-generator";
import { colorPickerContent } from "@/lib/tools-content/color-picker";
import { hexToRgbContent } from "@/lib/tools-content/hex-to-rgb";
import { rgbToHexContent } from "@/lib/tools-content/rgb-to-hex";
import { hexToHslContent } from "@/lib/tools-content/hex-to-hsl";
import { gradientGeneratorContent } from "@/lib/tools-content/gradient-generator";
import { colorContrastCheckerContent } from "@/lib/tools-content/color-contrast-checker";
import { colorNameFinderContent } from "@/lib/tools-content/color-name-finder";
import { randomColorGeneratorContent } from "@/lib/tools-content/random-color-generator";
import { cssGradientGeneratorContent } from "@/lib/tools-content/css-gradient-generator";
import { tailwindShadeGeneratorContent } from "@/lib/tools-content/tailwind-shade-generator";
import { randomNumberGeneratorContent } from "@/lib/tools-content/random-number-generator";
import { randomNameGeneratorContent } from "@/lib/tools-content/random-name-generator";
import { randomWordGeneratorContent } from "@/lib/tools-content/random-word-generator";
import { randomSentenceGeneratorContent } from "@/lib/tools-content/random-sentence-generator";
import { coinFlipContent } from "@/lib/tools-content/coin-flip";
import { diceRollerContent } from "@/lib/tools-content/dice-roller";
import { randomDateGeneratorContent } from "@/lib/tools-content/random-date-generator";
import { randomTeamGeneratorContent } from "@/lib/tools-content/random-team-generator";
import { yesNoDecisionMakerContent } from "@/lib/tools-content/yes-no-decision-maker";
import { randomCountryGeneratorContent } from "@/lib/tools-content/random-country-generator";
import { lotteryNumberGeneratorContent } from "@/lib/tools-content/lottery-number-generator";
import { randomEmojiGeneratorContent } from "@/lib/tools-content/random-emoji-generator";
import { wheelOfNamesSpinnerContent } from "@/lib/tools-content/wheel-of-names-spinner";
import { pingTestContent } from "@/lib/tools-content/ping-test";
import { dnsLookupContent } from "@/lib/tools-content/dns-lookup";
import { mxRecordLookupContent } from "@/lib/tools-content/mx-record-lookup";
import { whoisLookupContent } from "@/lib/tools-content/whois-lookup";
import { ipAddressLookupContent } from "@/lib/tools-content/ip-address-lookup";
import { myIpAddressFinderContent } from "@/lib/tools-content/my-ip-address-finder";
import { websiteSpeedTestContent } from "@/lib/tools-content/website-speed-test";
import { httpHeaderCheckerContent } from "@/lib/tools-content/http-header-checker";
import { sslCertificateCheckerContent } from "@/lib/tools-content/ssl-certificate-checker";
import { websiteUptimeCheckerContent } from "@/lib/tools-content/website-uptime-checker";
import { userAgentDetectorContent } from "@/lib/tools-content/user-agent-detector";
import { websiteScreenshotToolContent } from "@/lib/tools-content/website-screenshot-tool";
import { subnetCalculatorContent } from "@/lib/tools-content/subnet-calculator";
import { macAddressLookupToolContent } from "@/lib/tools-content/mac-address-lookup-tool";
import { passwordGeneratorContent } from "@/lib/tools-content/password-generator";
import { sha256GeneratorContent } from "@/lib/tools-content/sha256-generator";
import { md5GeneratorContent } from "@/lib/tools-content/md5-generator";
import { twoFactorBackupCodeGeneratorContent } from "@/lib/tools-content/two-factor-backup-code-generator";
import { csrfTokenGeneratorContent } from "@/lib/tools-content/csrf-token-generator";
import { passphraseGeneratorContent } from "@/lib/tools-content/passphrase-generator";
import { passwordStrengthCheckerContent } from "@/lib/tools-content/password-strength-checker";
import { hmacGeneratorContent } from "@/lib/tools-content/hmac-generator";
import { fileHashCheckerContent } from "@/lib/tools-content/file-hash-checker";
import { aesEncryptionToolContent } from "@/lib/tools-content/aes-encryption-tool";
import { aesDecryptionToolContent } from "@/lib/tools-content/aes-decryption-tool";
import { fileEncryptorDecryptorContent } from "@/lib/tools-content/file-encryptor-decryptor";
import { pgpKeyPairGeneratorContent } from "@/lib/tools-content/pgp-key-pair-generator";
import { sslCertificateDecoderContent } from "@/lib/tools-content/ssl-certificate-decoder";
import { ipBlacklistCheckerContent } from "@/lib/tools-content/ip-blacklist-checker";
import { dataBreachEmailCheckerContent } from "@/lib/tools-content/data-breach-email-checker";
import { selfDestructingSecureNoteGeneratorContent } from "@/lib/tools-content/self-destructing-secure-note-generator";
import { equationSolverContent } from "@/lib/tools-content/equation-solver";
import { quadraticEquationSolverContent } from "@/lib/tools-content/quadratic-equation-solver";
import { matrixCalculatorContent } from "@/lib/tools-content/matrix-calculator";
import { graphingCalculatorContent } from "@/lib/tools-content/graphing-calculator";
import { primeNumberCheckerContent } from "@/lib/tools-content/prime-number-checker";
import { gcdAndLcmCalculatorContent } from "@/lib/tools-content/gcd-and-lcm-calculator";
import { factorialCalculatorContent } from "@/lib/tools-content/factorial-calculator";
import { algebraCalculatorContent } from "@/lib/tools-content/algebra-calculator";
import { trigonometryCalculatorContent } from "@/lib/tools-content/trigonometry-calculator";
import { percentageChangeCalculatorContent } from "@/lib/tools-content/percentage-change-calculator";
import { numberRoundingToolContent } from "@/lib/tools-content/number-rounding-tool";
import { bitcoinAddressValidatorContent } from "@/lib/tools-content/bitcoin-address-validator";
import { cryptoWalletAddressQrGeneratorContent } from "@/lib/tools-content/crypto-wallet-address-qr-generator";
import { cryptocurrencyPriceConverterContent } from "@/lib/tools-content/cryptocurrency-price-converter";
import { miningProfitabilityCalculatorContent } from "@/lib/tools-content/mining-profitability-calculator";
import { liveCurrencyExchangeRateCheckerContent } from "@/lib/tools-content/live-currency-exchange-rate-checker";
import { imageCompressorContent } from "@/lib/tools-content/image-compressor";
import { imageResizerContent } from "@/lib/tools-content/image-resizer";
import { cropImageContent } from "@/lib/tools-content/crop-image";
import { avifToJpgContent } from "@/lib/tools-content/avif-to-jpg";
import { svgToPngContent } from "@/lib/tools-content/svg-to-png";
import { imageWatermarkContent } from "@/lib/tools-content/image-watermark";
import { imageMetadataViewerContent } from "@/lib/tools-content/image-metadata-viewer";
import { imageDpiConverterContent } from "@/lib/tools-content/image-dpi-converter";
import { universalImageConverterContent } from "@/lib/tools-content/universal-image-converter";
import { tiffToJpgContent } from "@/lib/tools-content/tiff-to-jpg";
import { gifToPngContent } from "@/lib/tools-content/gif-to-png";
import { pngToGifContent } from "@/lib/tools-content/png-to-gif";
import { icoConverterContent } from "@/lib/tools-content/ico-converter";
import { imageToPdfContent } from "@/lib/tools-content/image-to-pdf";
import { imageSplitterContent } from "@/lib/tools-content/image-splitter";
import { imageCollageMakerContent } from "@/lib/tools-content/image-collage-maker";
import { imageSharpenerContent } from "@/lib/tools-content/image-sharpener";
import { memeGeneratorContent } from "@/lib/tools-content/meme-generator";
import { photoFiltersContent } from "@/lib/tools-content/photo-filters";
import { imageCompareContent } from "@/lib/tools-content/image-compare";
import { passportPhotoMakerContent } from "@/lib/tools-content/passport-photo-maker";
import { faviconGeneratorContent } from "@/lib/tools-content/favicon-generator";
import { imageExifRemoverContent } from "@/lib/tools-content/image-exif-remover";
import { imageNoiseReducerContent } from "@/lib/tools-content/image-noise-reducer";
import { batchImageResizerContent } from "@/lib/tools-content/batch-image-resizer";
import { transparentBackgroundMakerContent } from "@/lib/tools-content/transparent-background-maker";
import { pdfMergeContent } from "@/lib/tools-content/pdf-merge";
import { pdfSplitContent } from "@/lib/tools-content/pdf-split";
import { pdfRotateContent } from "@/lib/tools-content/pdf-rotate";
import { pdfExtractPagesContent } from "@/lib/tools-content/pdf-extract-pages";
import { pdfDeletePagesContent } from "@/lib/tools-content/pdf-delete-pages";
import { pdfReorderPagesContent } from "@/lib/tools-content/pdf-reorder-pages";
import { pdfAddWatermarkContent } from "@/lib/tools-content/pdf-add-watermark";
import { pdfMetadataEditorContent } from "@/lib/tools-content/pdf-metadata-editor";
import { pdfPageNumberingContent } from "@/lib/tools-content/pdf-page-numbering";
import { pdfHeaderAndFooterAdderContent } from "@/lib/tools-content/pdf-header-and-footer-adder";
import { pdfCropContent } from "@/lib/tools-content/pdf-crop";
import { pdfPageSizeConverterContent } from "@/lib/tools-content/pdf-page-size-converter";
import { jpgToPdfContent } from "@/lib/tools-content/jpg-to-pdf";
import { pngToPdfContent } from "@/lib/tools-content/png-to-pdf";
import { scanToPdfContent } from "@/lib/tools-content/scan-to-pdf";
import { pdfToTextContent } from "@/lib/tools-content/pdf-to-text";
import { pdfToJpgContent } from "@/lib/tools-content/pdf-to-jpg";
import { pdfToPngContent } from "@/lib/tools-content/pdf-to-png";
import { pdfReaderOnlineContent } from "@/lib/tools-content/pdf-reader-online";
import { pdfSplitterByFileSizeContent } from "@/lib/tools-content/pdf-splitter-by-file-size";
import { pdfCompressContent } from "@/lib/tools-content/pdf-compress";
import { pdfUnlockContent } from "@/lib/tools-content/pdf-unlock";
import { pdfFlattenContent } from "@/lib/tools-content/pdf-flatten";
import { pdfFormFillerContent } from "@/lib/tools-content/pdf-form-filler";
import { pdfCompareContent } from "@/lib/tools-content/pdf-compare";
import { pdfSignerContent } from "@/lib/tools-content/pdf-signer";
import { pdfBookmarkEditorContent } from "@/lib/tools-content/pdf-bookmark-editor";
import { pdfRedactContent } from "@/lib/tools-content/pdf-redact";
import { pdfRepairContent } from "@/lib/tools-content/pdf-repair";
import { pdfAnnotatorContent } from "@/lib/tools-content/pdf-annotator";
import { pdfToCsvContent } from "@/lib/tools-content/pdf-to-csv";
import { pdfToMarkdownContent } from "@/lib/tools-content/pdf-to-markdown";
import { pdfToHtmlContent } from "@/lib/tools-content/pdf-to-html";
import { pdfToEpubContent } from "@/lib/tools-content/pdf-to-epub";
import { pdfToWordContent } from "@/lib/tools-content/pdf-to-word";
import { wordToPdfContent } from "@/lib/tools-content/word-to-pdf";
import { pdfToExcelContent } from "@/lib/tools-content/pdf-to-excel";
import { excelToPdfContent } from "@/lib/tools-content/excel-to-pdf";
import { pdfToPowerpointContent } from "@/lib/tools-content/pdf-to-powerpoint";
import { powerpointToPdfContent } from "@/lib/tools-content/powerpoint-to-pdf";
import { htmlToPdfContent } from "@/lib/tools-content/html-to-pdf";
import { pdfOcrContent } from "@/lib/tools-content/pdf-ocr";
import { pdfGrayscaleConverterContent } from "@/lib/tools-content/pdf-grayscale-converter";
import { pdfPageExtractorToImagesContent } from "@/lib/tools-content/pdf-page-extractor-to-images";
import { removeBackgroundContent } from "@/lib/tools-content/remove-background";
import { heicToJpgContent } from "@/lib/tools-content/heic-to-jpg";
import { heicToPngContent } from "@/lib/tools-content/heic-to-png";
import { pngToSvgContent } from "@/lib/tools-content/png-to-svg";
import { mp4ToWebmContent } from "@/lib/tools-content/mp4-to-webm";
import { webmToMp4Content } from "@/lib/tools-content/webm-to-mp4";
import { videoCompressorContent } from "@/lib/tools-content/video-compressor";
import { videoTrimmerContent } from "@/lib/tools-content/video-trimmer";
import { extractAudioFromVideoContent } from "@/lib/tools-content/extract-audio-from-video";
import { videoToGifContent } from "@/lib/tools-content/video-to-gif";
import { gifToMp4Content } from "@/lib/tools-content/gif-to-mp4";
import { changeVideoSpeedContent } from "@/lib/tools-content/change-video-speed";
import { muteVideoContent } from "@/lib/tools-content/mute-video";
import { mergeVideosContent } from "@/lib/tools-content/merge-videos";
import { mp4ToMp3Content } from "@/lib/tools-content/mp4-to-mp3";
import { videoToAudioConverterContent } from "@/lib/tools-content/video-to-audio-converter";
import { videoRotatorContent } from "@/lib/tools-content/video-rotator";
import { videoCropperContent } from "@/lib/tools-content/video-cropper";
import { videoResizerContent } from "@/lib/tools-content/video-resizer";
import { addSubtitlesToVideoContent } from "@/lib/tools-content/add-subtitles-to-video";
import { videoWatermarkContent } from "@/lib/tools-content/video-watermark";
import { reverseVideoContent } from "@/lib/tools-content/reverse-video";
import { screenRecorderContent } from "@/lib/tools-content/screen-recorder";
import { videoThumbnailGeneratorContent } from "@/lib/tools-content/video-thumbnail-generator";
import { videoFrameExtractorContent } from "@/lib/tools-content/video-frame-extractor";
import { loopVideoMakerContent } from "@/lib/tools-content/loop-video-maker";
import { videoCompressorToTargetSizeContent } from "@/lib/tools-content/video-compressor-to-target-size";
import { aviToMp4Content } from "@/lib/tools-content/avi-to-mp4";
import { movToMp4Content } from "@/lib/tools-content/mov-to-mp4";
import { mkvToMp4Content } from "@/lib/tools-content/mkv-to-mp4";
import { flvToMp4Content } from "@/lib/tools-content/flv-to-mp4";
import { videoJoinerByTimelineContent } from "@/lib/tools-content/video-joiner-by-timeline";
import { videoAspectRatioConverterContent } from "@/lib/tools-content/video-aspect-ratio-converter";
import { mp3ConverterContent } from "@/lib/tools-content/mp3-converter";
import { wavConverterContent } from "@/lib/tools-content/wav-converter";
import { audioCompressorContent } from "@/lib/tools-content/audio-compressor";
import { audioCutterContent } from "@/lib/tools-content/audio-cutter";
import { audioJoinerContent } from "@/lib/tools-content/audio-joiner";
import { changeAudioSpeedContent } from "@/lib/tools-content/change-audio-speed";
import { audioVolumeBoosterContent } from "@/lib/tools-content/audio-volume-booster";
import { audioMetadataEditorContent } from "@/lib/tools-content/audio-metadata-editor";
import { mp3ToWavContent } from "@/lib/tools-content/mp3-to-wav";
import { wavToMp3Content } from "@/lib/tools-content/wav-to-mp3";
import { oggConverterContent } from "@/lib/tools-content/ogg-converter";
import { flacConverterContent } from "@/lib/tools-content/flac-converter";
import { aacConverterContent } from "@/lib/tools-content/aac-converter";
import { audioMergerContent } from "@/lib/tools-content/audio-merger";
import { audioPitchChangerContent } from "@/lib/tools-content/audio-pitch-changer";
import { audioNormalizerContent } from "@/lib/tools-content/audio-normalizer";
import { audioFadeInOutEditorContent } from "@/lib/tools-content/audio-fade-in-out-editor";
import { ringtoneMakerContent } from "@/lib/tools-content/ringtone-maker";
import { voiceRecorderOnlineContent } from "@/lib/tools-content/voice-recorder-online";
import { universalAudioFormatConverterContent } from "@/lib/tools-content/universal-audio-format-converter";
import { podcastTrimmerContent } from "@/lib/tools-content/podcast-trimmer";
import { silenceRemoverContent } from "@/lib/tools-content/silence-remover";
import { imageToTextContent } from "@/lib/tools-content/image-to-text";
import { pdfToTextOcrContent } from "@/lib/tools-content/pdf-to-text-ocr";
import { handwritingOcrContent } from "@/lib/tools-content/handwriting-ocr";
import { screenshotOcrContent } from "@/lib/tools-content/screenshot-ocr";
import { multiLanguageOcrContent } from "@/lib/tools-content/multi-language-ocr";
import { tableOcrContent } from "@/lib/tools-content/table-ocr";
import { receiptOcrContent } from "@/lib/tools-content/receipt-ocr";
import { idCardOcrContent } from "@/lib/tools-content/id-card-ocr";
import { licensePlateOcrContent } from "@/lib/tools-content/license-plate-ocr";
import { businessCardOcrContent } from "@/lib/tools-content/business-card-ocr";
import { ocrToWordContent } from "@/lib/tools-content/ocr-to-word";
import { ocrToPdfContent } from "@/lib/tools-content/ocr-to-pdf";
import { batchOcrProcessorContent } from "@/lib/tools-content/batch-ocr-processor";
import { zipExtractorContent } from "@/lib/tools-content/zip-extractor";
import { zipCreatorContent } from "@/lib/tools-content/zip-creator";
import { tarExtractorContent } from "@/lib/tools-content/tar-extractor";
import { gzipExtractorContent } from "@/lib/tools-content/gzip-extractor";
import { sevenZExtractorContent } from "@/lib/tools-content/7z-extractor";
import { rarExtractorContent } from "@/lib/tools-content/rar-extractor";
import { zipPasswordRemoverContent } from "@/lib/tools-content/zip-password-remover";
import { zipPasswordProtectorContent } from "@/lib/tools-content/zip-password-protector";
import { universalFileCompressorContent } from "@/lib/tools-content/universal-file-compressor";
import { archiveFormatConverterContent } from "@/lib/tools-content/archive-format-converter";
import { isoExtractorContent } from "@/lib/tools-content/iso-extractor";
import { tarGzCreatorContent } from "@/lib/tools-content/tar-gz-creator";
import { splitArchiveBySizeContent } from "@/lib/tools-content/split-archive-by-size";
import { pdfEditorContent } from "@/lib/tools-content/pdf-editor";
import { aiKeywordExtractorContent } from "@/lib/tools-content/ai-keyword-extractor";
import { aiResumeBuilderContent } from "@/lib/tools-content/ai-resume-builder";
import { aiBusinessNameGeneratorContent } from "@/lib/tools-content/ai-business-name-generator";
import { instagramStorySizeGuideContent } from "@/lib/tools-content/instagram-story-size-guide";
import { linkedinPostFormatterContent } from "@/lib/tools-content/linkedin-post-formatter";
import { twitterXCharacterCounterContent } from "@/lib/tools-content/twitter-x-character-counter";
import { emojiPickerAndCopyToolContent } from "@/lib/tools-content/emoji-picker-and-copy-tool";
import { socialMediaImageSizeGuideContent } from "@/lib/tools-content/social-media-image-size-guide";
import { metaTagGeneratorContent } from "@/lib/tools-content/meta-tag-generator";
import { robotsTxtGeneratorContent } from "@/lib/tools-content/robots-txt-generator";
import { keywordDensityCheckerContent } from "@/lib/tools-content/keyword-density-checker";
import { openGraphGeneratorContent } from "@/lib/tools-content/open-graph-generator";
import { serpSnippetPreviewToolContent } from "@/lib/tools-content/serp-snippet-preview-tool";
import { csvViewerContent } from "@/lib/tools-content/csv-viewer";
import { vlookupFormulaGeneratorContent } from "@/lib/tools-content/vlookup-formula-generator";
import { fancyTextGeneratorContent } from "@/lib/tools-content/fancy-text-generator";
import { typographyScaleGeneratorContent } from "@/lib/tools-content/typography-scale-generator";
import { readabilityScoreCheckerContent } from "@/lib/tools-content/readability-score-checker";
import { emailValidatorContent } from "@/lib/tools-content/email-validator";
import { emailAddressExtractorContent } from "@/lib/tools-content/email-address-extractor";
import { worldClockContent } from "@/lib/tools-content/world-clock";
import { pomodoroTimerContent } from "@/lib/tools-content/pomodoro-timer";
import { onlineStopwatchContent } from "@/lib/tools-content/online-stopwatch";
import { countdownToDateWidgetContent } from "@/lib/tools-content/countdown-to-date-widget";
import { workDaysCalculatorContent } from "@/lib/tools-content/work-days-calculator";
import { jsonToCsvContent } from "@/lib/tools-content/json-to-csv";
import { csvToJsonContent } from "@/lib/tools-content/csv-to-json";
import { xmlFormatterContent } from "@/lib/tools-content/xml-formatter";
import { xmlToJsonContent } from "@/lib/tools-content/xml-to-json";
import { jwtGeneratorContent } from "@/lib/tools-content/jwt-generator";
import { htmlMinifierContent } from "@/lib/tools-content/html-minifier";
import { cssMinifierContent } from "@/lib/tools-content/css-minifier";
import { sqlFormatterContent } from "@/lib/tools-content/sql-formatter";
import { sqlMinifierContent } from "@/lib/tools-content/sql-minifier";
import { cronExpressionGeneratorContent } from "@/lib/tools-content/cron-expression-generator";
import { htmlFormatterBeautifierContent } from "@/lib/tools-content/html-formatter-beautifier";
import { htmlToMarkdownContent } from "@/lib/tools-content/html-to-markdown";
import { markdownToHtmlContent } from "@/lib/tools-content/markdown-to-html";
import { markdownPreviewerContent } from "@/lib/tools-content/markdown-previewer";
import { codeDiffCheckerContent } from "@/lib/tools-content/code-diff-checker";
import { codeBeautifierContent } from "@/lib/tools-content/code-beautifier";
import { jsonDiffCheckerContent } from "@/lib/tools-content/json-diff-checker";
import { jsonPathTesterContent } from "@/lib/tools-content/json-path-tester";
import { userAgentParserContent } from "@/lib/tools-content/user-agent-parser";
import { jsMinifierContent } from "@/lib/tools-content/js-minifier";
import { yamlFormatterContent } from "@/lib/tools-content/yaml-formatter";
import { yamlToJsonContent } from "@/lib/tools-content/yaml-to-json";
import { jsonToYamlContent } from "@/lib/tools-content/json-to-yaml";
import { graphqlQueryFormatterContent } from "@/lib/tools-content/graphql-query-formatter";
import { HashtagGenerator } from "@/components/tools/hashtag-generator";
import { hashtagGeneratorContent } from "@/lib/tools-content/hashtag-generator";
import { InstagramCaptionGenerator } from "@/components/tools/instagram-caption-generator";
import { instagramCaptionGeneratorContent } from "@/lib/tools-content/instagram-caption-generator";
import { TextDiffChecker } from "@/components/tools/text-diff-checker";
import { textDiffCheckerContent } from "@/lib/tools-content/text-diff-checker";
import { YoutubeThumbnailDownloader } from "@/components/tools/youtube-thumbnail-downloader";
import { youtubeThumbnailDownloaderContent } from "@/lib/tools-content/youtube-thumbnail-downloader";
import { PrivacyPolicyGenerator } from "@/components/tools/privacy-policy-generator";
import { privacyPolicyGeneratorContent } from "@/lib/tools-content/privacy-policy-generator";
import { TermsAndConditionsGenerator } from "@/components/tools/terms-and-conditions-generator";
import { termsAndConditionsGeneratorContent } from "@/lib/tools-content/terms-and-conditions-generator";
import { NdaGenerator } from "@/components/tools/nda-generator";
import { ndaGeneratorContent } from "@/lib/tools-content/nda-generator";
import { DisclaimerGenerator } from "@/components/tools/disclaimer-generator";
import { disclaimerGeneratorContent } from "@/lib/tools-content/disclaimer-generator";
import { RefundPolicyGenerator } from "@/components/tools/refund-policy-generator";
import { refundPolicyGeneratorContent } from "@/lib/tools-content/refund-policy-generator";
import { CookiePolicyGenerator } from "@/components/tools/cookie-policy-generator";
import { cookiePolicyGeneratorContent } from "@/lib/tools-content/cookie-policy-generator";
import { TextToSpeech } from "@/components/tools/text-to-speech";
import { textToSpeechContent } from "@/lib/tools-content/text-to-speech";
import { SpeechToText } from "@/components/tools/speech-to-text";
import { speechToTextContent } from "@/lib/tools-content/speech-to-text";
import { TextEncryptorDecryptor } from "@/components/tools/text-encryptor-decryptor";
import { textEncryptorDecryptorContent } from "@/lib/tools-content/text-encryptor-decryptor";
import { CitationGenerator } from "@/components/tools/citation-generator";
import { citationGeneratorContent } from "@/lib/tools-content/citation-generator";
import { BibliographyGenerator } from "@/components/tools/bibliography-generator";
import { bibliographyGeneratorContent } from "@/lib/tools-content/bibliography-generator";
import { SitemapGenerator } from "@/components/tools/sitemap-generator";
import { sitemapGeneratorContent } from "@/lib/tools-content/sitemap-generator";
import { SchemaMarkupGenerator } from "@/components/tools/schema-markup-generator";
import { schemaMarkupGeneratorContent } from "@/lib/tools-content/schema-markup-generator";
import { ReadabilityChecker } from "@/components/tools/readability-checker";
import { readabilityCheckerContent } from "@/lib/tools-content/readability-checker";
import { ColorPaletteGenerator } from "@/components/tools/color-palette-generator";
import { colorPaletteGeneratorContent } from "@/lib/tools-content/color-palette-generator";
import { DigitalSignatureMaker } from "@/components/tools/digital-signature-maker";
import { digitalSignatureMakerContent } from "@/lib/tools-content/digital-signature-maker";
import { QrCodeWithLogoGenerator } from "@/components/tools/qr-code-with-logo-generator";
import { qrCodeWithLogoGeneratorContent } from "@/lib/tools-content/qr-code-with-logo-generator";
import { BulkQrCodeGenerator } from "@/components/tools/bulk-qr-code-generator";
import { bulkQrCodeGeneratorContent } from "@/lib/tools-content/bulk-qr-code-generator";
import { EmploymentContractGenerator } from "@/components/tools/employment-contract-generator";
import { employmentContractGeneratorContent } from "@/lib/tools-content/employment-contract-generator";
import { RentalAgreementGenerator } from "@/components/tools/rental-agreement-generator";
import { rentalLeaseAgreementGeneratorContent } from "@/lib/tools-content/rental-lease-agreement-generator";
import { FreelanceContractGenerator } from "@/components/tools/freelance-contract-generator";
import { freelanceContractGeneratorContent } from "@/lib/tools-content/freelance-contract-generator";
import { AffidavitGenerator } from "@/components/tools/affidavit-generator";
import { affidavitTemplateGeneratorContent } from "@/lib/tools-content/affidavit-template-generator";
import { ExcelFormulaGenerator } from "@/components/tools/excel-formula-generator";
import { excelFormulaGeneratorContent } from "@/lib/tools-content/excel-formula-generator";
import { EssayOutlineGenerator } from "@/components/tools/essay-outline-generator";
import { essayOutlineGeneratorContent } from "@/lib/tools-content/essay-outline-generator";
import { ThesisStatementGenerator } from "@/components/tools/thesis-statement-generator";
import { thesisStatementGeneratorContent } from "@/lib/tools-content/thesis-statement-generator";
import { YoutubeTitleGenerator } from "@/components/tools/youtube-title-generator";
import { youtubeTitleGeneratorContent } from "@/lib/tools-content/youtube-title-generator";
import { YoutubeDescriptionGenerator } from "@/components/tools/youtube-description-generator";
import { youtubeDescriptionGeneratorContent } from "@/lib/tools-content/youtube-description-generator";
import { EmailSignatureGenerator } from "@/components/tools/email-signature-generator";
import { emailSignatureGeneratorContent } from "@/lib/tools-content/email-signature-generator";
import { EmailSubjectLineTester } from "@/components/tools/email-subject-line-tester";
import { emailSubjectLineTesterContent } from "@/lib/tools-content/email-subject-line-tester";
import { MailHeaderAnalyzer } from "@/components/tools/mail-header-analyzer";
import { mailHeaderAnalyzerContent } from "@/lib/tools-content/mail-header-analyzer";
import { MeetingTimePlanner } from "@/components/tools/meeting-time-planner";
import { meetingTimePlannerContent } from "@/lib/tools-content/meeting-time-planner";
import { LanguageDetector } from "@/components/tools/language-detector";
import { languageDetectorContent } from "@/lib/tools-content/language-detector";
import { XmlSitemapValidator } from "@/components/tools/xml-sitemap-validator";
import { xmlSitemapValidatorContent } from "@/lib/tools-content/xml-sitemap-validator";
import { HandwrittenSignatureGenerator } from "@/components/tools/handwritten-signature-generator";
import { handwrittenSignatureGeneratorContent } from "@/lib/tools-content/handwritten-signature-generator";
import { SignatureToTransparentPngConverter } from "@/components/tools/signature-to-transparent-png-converter";
import { signatureToTransparentPngConverterContent } from "@/lib/tools-content/signature-to-transparent-png-converter";
import { InitialsLogoGenerator } from "@/components/tools/initials-logo-generator";
import { initialsLogoGeneratorContent } from "@/lib/tools-content/initials-logo-generator";
import { ColorBlindnessSimulator } from "@/components/tools/color-blindness-simulator";
import { colorBlindnessSimulatorContent } from "@/lib/tools-content/color-blindness-simulator";
import { ImageColorPaletteExtractor } from "@/components/tools/image-color-palette-extractor";
import { imageColorPaletteExtractorContent } from "@/lib/tools-content/image-color-palette-extractor";
import { GraphPaperGenerator } from "@/components/tools/graph-paper-generator";
import { graphPaperGeneratorContent } from "@/lib/tools-content/graph-paper-generator";
import { MemeCaptionGenerator } from "@/components/tools/meme-caption-generator";
import { memeCaptionGeneratorContent } from "@/lib/tools-content/meme-caption-generator";
import { BusinessCardDesigner } from "@/components/tools/business-card-designer";
import { businessCardDesignerContent } from "@/lib/tools-content/business-card-designer";
import { FlashcardMaker } from "@/components/tools/flashcard-maker";
import { flashcardMakerContent } from "@/lib/tools-content/flashcard-maker";
import { QuizGenerator } from "@/components/tools/quiz-generator";
import { quizGeneratorContent } from "@/lib/tools-content/quiz-generator";
import { MultipleChoiceTestGenerator } from "@/components/tools/multiple-choice-test-generator";
import { multipleChoiceTestGeneratorContent } from "@/lib/tools-content/multiple-choice-test-generator";
import { TimetableScheduleGenerator } from "@/components/tools/timetable-schedule-generator";
import { timetableScheduleGeneratorContent } from "@/lib/tools-content/timetable-schedule-generator";
import { HabitTrackerSheetGenerator } from "@/components/tools/habit-tracker-sheet-generator";
import { habitTrackerSheetGeneratorContent } from "@/lib/tools-content/habit-tracker-sheet-generator";
import { HandwritingPracticeSheetGenerator } from "@/components/tools/handwriting-practice-sheet-generator";
import { handwritingPracticeSheetGeneratorContent } from "@/lib/tools-content/handwriting-practice-sheet-generator";
import { ExcelToCsv } from "@/components/tools/excel-to-csv";
import { excelToCsvContent } from "@/lib/tools-content/excel-to-csv";
import { CsvToExcel } from "@/components/tools/csv-to-excel";
import { csvToExcelContent } from "@/lib/tools-content/csv-to-excel";
import { ExcelToJson } from "@/components/tools/excel-to-json";
import { excelToJsonContent } from "@/lib/tools-content/excel-to-json";
import { JsonToExcel } from "@/components/tools/json-to-excel";
import { jsonToExcelContent } from "@/lib/tools-content/json-to-excel";
import { TxtToDocx } from "@/components/tools/txt-to-docx";
import { txtToDocxContent } from "@/lib/tools-content/txt-to-docx";
import { DocxToTxt } from "@/components/tools/docx-to-txt";
import { docxToTxtContent } from "@/lib/tools-content/docx-to-txt";
import { CsvMerger } from "@/components/tools/csv-merger";
import { csvMergerContent } from "@/lib/tools-content/csv-merger";
import { CsvSplitter } from "@/components/tools/csv-splitter";
import { csvSplitterContent } from "@/lib/tools-content/csv-splitter";
import { DuplicateRowRemover } from "@/components/tools/duplicate-row-remover";
import { duplicateRowRemoverContent } from "@/lib/tools-content/duplicate-row-remover";
import { ChartGeneratorFromCsv } from "@/components/tools/chart-generator-from-csv";
import { chartGeneratorFromCsvContent } from "@/lib/tools-content/chart-generator-from-csv";
import { DataCleaner } from "@/components/tools/data-cleaner";
import { dataCleanerContent } from "@/lib/tools-content/data-cleaner";
import { ResumeBuilder } from "@/components/tools/resume-builder";
import { resumeBuilderContent } from "@/lib/tools-content/resume-builder";
import { CoverLetterGenerator } from "@/components/tools/cover-letter-generator";
import { coverLetterGeneratorContent } from "@/lib/tools-content/cover-letter-generator";
import { InvoiceTemplateGenerator } from "@/components/tools/invoice-template-generator";
import { invoiceTemplateGeneratorContent } from "@/lib/tools-content/invoice-template-generator";
import { CertificateGenerator } from "@/components/tools/certificate-generator";
import { certificateGeneratorContent } from "@/lib/tools-content/certificate-generator";
import { LetterheadGenerator } from "@/components/tools/letterhead-generator";
import { letterheadGeneratorContent } from "@/lib/tools-content/letterhead-generator";
import { GifMakerFromImages } from "@/components/tools/gif-maker-from-images";
import { gifMakerFromImagesContent } from "@/lib/tools-content/gif-maker-from-images";
import { GifResizer } from "@/components/tools/gif-resizer";
import { gifResizerContent } from "@/lib/tools-content/gif-resizer";
import { GifSplitter } from "@/components/tools/gif-splitter";
import { gifSplitterContent } from "@/lib/tools-content/gif-splitter";
import { GifMakerFromVideo } from "@/components/tools/gif-maker-from-video";
import { gifMakerFromVideoContent } from "@/lib/tools-content/gif-maker-from-video";
import { GifCompressor } from "@/components/tools/gif-compressor";
import { gifCompressorContent } from "@/lib/tools-content/gif-compressor";
import { GifToVideoConverter } from "@/components/tools/gif-to-video-converter";
import { gifToVideoConverterContent } from "@/lib/tools-content/gif-to-video-converter";
import { GifSpeedChanger } from "@/components/tools/gif-speed-changer";
import { gifSpeedChangerContent } from "@/lib/tools-content/gif-speed-changer";
import { ReverseGifMaker } from "@/components/tools/reverse-gif-maker";
import { reverseGifMakerContent } from "@/lib/tools-content/reverse-gif-maker";
import { FontPairingGenerator } from "@/components/tools/font-pairing-generator";
import { fontPairingGeneratorContent } from "@/lib/tools-content/font-pairing-generator";
import { GoogleFontsPreviewer } from "@/components/tools/google-fonts-previewer";
import { googleFontsPreviewerContent } from "@/lib/tools-content/google-fonts-previewer";
import { SlideTextExtractor } from "@/components/tools/slide-text-extractor";
import { slideTextExtractorContent } from "@/lib/tools-content/slide-text-extractor";
import { PresentationTemplateGenerator } from "@/components/tools/presentation-template-generator";
import { presentationTemplateGeneratorContent } from "@/lib/tools-content/presentation-template-generator";
import { DocumentMerger } from "@/components/tools/document-merger";
import { documentMergerContent } from "@/lib/tools-content/document-merger";
import { PivotTableGenerator } from "@/components/tools/pivot-table-generator";
import { pivotTableGeneratorContent } from "@/lib/tools-content/pivot-table-generator";
import { JsonTreeViewer } from "@/components/tools/json-tree-viewer";
import { jsonTreeViewerContent } from "@/lib/tools-content/json-tree-viewer";
import { XmlTreeViewer } from "@/components/tools/xml-tree-viewer";
import { xmlTreeViewerContent } from "@/lib/tools-content/xml-tree-viewer";
import { LogFileViewer } from "@/components/tools/log-file-viewer";
import { logFileViewerContent } from "@/lib/tools-content/log-file-viewer";
import { HexViewer } from "@/components/tools/hex-viewer";
import { hexViewerContent } from "@/lib/tools-content/hex-viewer";
import { EnvFileViewer } from "@/components/tools/env-file-viewer";
import { envFileViewerContent } from "@/lib/tools-content/env-file-viewer";
import { GitPatchDiffFileViewer } from "@/components/tools/git-patch-diff-file-viewer";
import { gitPatchDiffFileViewerContent } from "@/lib/tools-content/git-patch-diff-file-viewer";
import { CookieFileViewer } from "@/components/tools/cookie-file-viewer";
import { cookieFileViewerContent } from "@/lib/tools-content/cookie-file-viewer";
import { SvgViewer } from "@/components/tools/svg-viewer";
import { svgViewerContent } from "@/lib/tools-content/svg-viewer";
import { RobotsTxtViewer } from "@/components/tools/robots-txt-viewer";
import { robotsTxtViewerContent } from "@/lib/tools-content/robots-txt-viewer";
import { SitemapViewer } from "@/components/tools/sitemap-viewer";
import { sitemapViewerContent } from "@/lib/tools-content/sitemap-viewer";
import { VcardViewer } from "@/components/tools/vcard-viewer";
import { vcardViewerContent } from "@/lib/tools-content/vcard-viewer";
import { YamlTreeViewer } from "@/components/tools/yaml-tree-viewer";
import { yamlTreeViewerContent } from "@/lib/tools-content/yaml-tree-viewer";
import { HarFileViewer } from "@/components/tools/har-file-viewer";
import { harFileViewerContent } from "@/lib/tools-content/har-file-viewer";
import { ExcelViewer } from "@/components/tools/excel-viewer";
import { excelViewerContent } from "@/lib/tools-content/excel-viewer";
import { IcoViewer } from "@/components/tools/ico-viewer";
import { icoViewerContent } from "@/lib/tools-content/ico-viewer";
import { AudioWaveformViewer } from "@/components/tools/audio-waveform-viewer";
import { audioWaveformViewerContent } from "@/lib/tools-content/audio-waveform-viewer";
import { VideoMetadataViewer } from "@/components/tools/video-metadata-viewer";
import { videoMetadataViewerContent } from "@/lib/tools-content/video-metadata-viewer";
import { FontFilePreviewer } from "@/components/tools/font-file-previewer";
import { fontFilePreviewerContent } from "@/lib/tools-content/font-file-previewer";
import { QrCodeDecoder } from "@/components/tools/qr-code-decoder";
import { qrCodeDecoderContent } from "@/lib/tools-content/qr-code-decoder";
import { EmlFileViewer } from "@/components/tools/eml-file-viewer";
import { emlFileViewerContent } from "@/lib/tools-content/eml-file-viewer";
import { IcsCalendarFileViewer } from "@/components/tools/ics-calendar-file-viewer";
import { icsCalendarFileViewerContent } from "@/lib/tools-content/ics-calendar-file-viewer";
import { EpubViewer } from "@/components/tools/epub-viewer";
import { epubViewerContent } from "@/lib/tools-content/epub-viewer";
import { ArchiveContentViewer } from "@/components/tools/archive-content-viewer";
import { archiveContentViewerContent } from "@/lib/tools-content/archive-content-viewer";
import { AudioSpectrogramViewer } from "@/components/tools/audio-spectrogram-viewer";
import { audioSpectrogramViewerContent } from "@/lib/tools-content/audio-spectrogram-viewer";
import { PgpKeyViewer } from "@/components/tools/pgp-key-viewer";
import { pgpKeyViewerContent } from "@/lib/tools-content/pgp-key-viewer";
import { CertificateChainViewer } from "@/components/tools/certificate-chain-viewer";
import { certificateChainViewerContent } from "@/lib/tools-content/certificate-chain-viewer";
import { BarcodeDecoder } from "@/components/tools/barcode-decoder";
import { barcodeDecoderContent } from "@/lib/tools-content/barcode-decoder";
import { WordDocumentViewer } from "@/components/tools/word-document-viewer";
import { wordDocumentViewerContent } from "@/lib/tools-content/word-document-viewer";
import { OdtViewer } from "@/components/tools/odt-viewer";
import { odtViewerContent } from "@/lib/tools-content/odt-viewer";
import { ParquetViewer } from "@/components/tools/parquet-viewer";
import { parquetViewerContent } from "@/lib/tools-content/parquet-viewer";
import { PowerpointViewer } from "@/components/tools/powerpoint-viewer";
import { powerpointViewerContent } from "@/lib/tools-content/powerpoint-viewer";
import { DictionaryLookup } from "@/components/tools/dictionary-lookup";
import { dictionaryLookupContent } from "@/lib/tools-content/dictionary-lookup";
import { WordDefinitionLookup } from "@/components/tools/word-definition-lookup";
import { wordDefinitionLookupContent } from "@/lib/tools-content/word-definition-lookup";
import { TextPronunciationGuide } from "@/components/tools/text-pronunciation-guide";
import { textPronunciationGuideContent } from "@/lib/tools-content/text-pronunciation-guide";
import { ThesaurusSynonymFinder } from "@/components/tools/thesaurus-synonym-finder";
import { thesaurusSynonymFinderContent } from "@/lib/tools-content/thesaurus-synonym-finder";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { currencyConverterContent } from "@/lib/tools-content/currency-converter";
import { PaintCalculator } from "@/components/tools/paint-calculator";
import { paintCalculatorContent } from "@/lib/tools-content/paint-calculator";
import { TileAndFlooringCalculator } from "@/components/tools/tile-and-flooring-calculator";
import { tileAndFlooringCalculatorContent } from "@/lib/tools-content/tile-and-flooring-calculator";
import { ConcreteAndGravelCalculator } from "@/components/tools/concrete-and-gravel-calculator";
import { concreteAndGravelCalculatorContent } from "@/lib/tools-content/concrete-and-gravel-calculator";
import { WallpaperCalculator } from "@/components/tools/wallpaper-calculator";
import { wallpaperCalculatorContent } from "@/lib/tools-content/wallpaper-calculator";
import { RecipeScaler } from "@/components/tools/recipe-scaler";
import { recipeScalerContent } from "@/lib/tools-content/recipe-scaler";
import { IngredientWeightConverter } from "@/components/tools/ingredient-weight-converter";
import { ingredientWeightConverterContent } from "@/lib/tools-content/ingredient-weight-converter";
import { OvenTemperatureConverter } from "@/components/tools/oven-temperature-converter";
import { ovenTemperatureConverterContent } from "@/lib/tools-content/oven-temperature-converter";
import { BakingRatioCalculator } from "@/components/tools/baking-ratio-calculator";
import { bakingRatioCalculatorContent } from "@/lib/tools-content/baking-ratio-calculator";
import { CarLoanCalculator } from "@/components/tools/car-loan-calculator";
import { carLoanCalculatorContent } from "@/lib/tools-content/car-loan-calculator";
import { FuelEconomyCalculator } from "@/components/tools/fuel-economy-calculator";
import { fuelEconomyCalculatorContent } from "@/lib/tools-content/fuel-economy-calculator";
import { CarDepreciationEstimator } from "@/components/tools/car-depreciation-estimator";
import { carDepreciationEstimatorContent } from "@/lib/tools-content/car-depreciation-estimator";
import { TripBudgetCalculator } from "@/components/tools/trip-budget-calculator";
import { tripBudgetCalculatorContent } from "@/lib/tools-content/trip-budget-calculator";
import { PackingListGenerator } from "@/components/tools/packing-list-generator";
import { packingListGeneratorContent } from "@/lib/tools-content/packing-list-generator";
import { FlightTimeAndLayoverCalculator } from "@/components/tools/flight-time-and-layover-calculator";
import { flightTimeAndLayoverCalculatorContent } from "@/lib/tools-content/flight-time-and-layover-calculator";
import { JetLagAdjustmentCalculator } from "@/components/tools/jet-lag-adjustment-calculator";
import { jetLagAdjustmentCalculatorContent } from "@/lib/tools-content/jet-lag-adjustment-calculator";
import { BillSplitCalculator } from "@/components/tools/bill-split-calculator";
import { billSplitCalculatorContent } from "@/lib/tools-content/bill-split-calculator";
import { RentVsBuyCalculator } from "@/components/tools/rent-vs-buy-calculator";
import { rentVsBuyCalculatorContent } from "@/lib/tools-content/rent-vs-buy-calculator";
import { SleepCycleCalculator } from "@/components/tools/sleep-cycle-calculator";
import { sleepCycleCalculatorContent } from "@/lib/tools-content/sleep-cycle-calculator";
import { BettingOddsConverter } from "@/components/tools/betting-odds-converter";
import { bettingOddsConverterContent } from "@/lib/tools-content/betting-odds-converter";
import { ZodiacSignFinder } from "@/components/tools/zodiac-sign-finder";
import { zodiacSignFinderContent } from "@/lib/tools-content/zodiac-sign-finder";
import { MoonPhaseCalculator } from "@/components/tools/moon-phase-calculator";
import { moonPhaseCalculatorContent } from "@/lib/tools-content/moon-phase-calculator";
import { BpmTapTempoTool } from "@/components/tools/bpm-tap-tempo-tool";
import { bpmTapTempoToolContent } from "@/lib/tools-content/bpm-tap-tempo-tool";
import { OnlineMetronome } from "@/components/tools/online-metronome";
import { onlineMetronomeContent } from "@/lib/tools-content/online-metronome";
import { MusicIntervalAndScaleCalculator } from "@/components/tools/music-interval-and-scale-calculator";
import { musicIntervalAndScaleCalculatorContent } from "@/lib/tools-content/music-interval-and-scale-calculator";

export interface RegisteredTool {
  Component: ComponentType;
  content: ToolContent;
}

export const TOOLS_REGISTRY: Record<string, RegisteredTool> = {
  "word-counter": { Component: WordCounter, content: wordCounterContent },
  "character-counter": {
    Component: CharacterCounter,
    content: characterCounterContent,
  },
  "case-converter": { Component: CaseConverter, content: caseConverterContent },
  "remove-duplicate-lines": {
    Component: RemoveDuplicateLines,
    content: removeDuplicateLinesContent,
  },
  "sort-lines": { Component: SortLines, content: sortLinesContent },
  "text-reverser": { Component: TextReverser, content: textReverserContent },
  "slug-generator": { Component: SlugGenerator, content: slugGeneratorContent },
  "lorem-ipsum-generator": {
    Component: LoremIpsumGenerator,
    content: loremIpsumGeneratorContent,
  },
  "random-text-generator": {
    Component: RandomTextGenerator,
    content: randomTextGeneratorContent,
  },
  "find-and-replace": {
    Component: FindAndReplace,
    content: findAndReplaceContent,
  },
  "text-cleaner": { Component: TextCleaner, content: textCleanerContent },
  "remove-extra-spaces": {
    Component: RemoveExtraSpaces,
    content: removeExtraSpacesContent,
  },
  "url-encoder": { Component: UrlEncoderDecoder, content: urlEncoderContent },
  "url-decoder": { Component: UrlEncoderDecoder, content: urlDecoderContent },
  "word-frequency-counter": {
    Component: WordFrequencyCounter,
    content: wordFrequencyCounterContent,
  },
  "rot13-encoder": { Component: Rot13Encoder, content: rot13EncoderContent },
  "morse-code-translator": {
    Component: MorseCodeTranslator,
    content: morseCodeTranslatorContent,
  },
  "binary-to-text": { Component: BinaryTextConverter, content: binaryToTextContent },
  "text-to-binary": { Component: BinaryTextConverter, content: textToBinaryContent },
  "palindrome-checker": {
    Component: PalindromeChecker,
    content: palindromeCheckerContent,
  },
  "anagram-solver": { Component: AnagramSolver, content: anagramSolverContent },
  "line-counter": { Component: LineCounter, content: lineCounterContent },
  "paragraph-counter": {
    Component: ParagraphCounter,
    content: paragraphCounterContent,
  },
  "whitespace-remover": {
    Component: WhitespaceRemover,
    content: whitespaceRemoverContent,
  },
  "title-case-converter": {
    Component: TitleCaseConverter,
    content: titleCaseConverterContent,
  },
  "sentence-case-converter": {
    Component: SentenceCaseConverter,
    content: sentenceCaseConverterContent,
  },
  "text-to-hashtags-converter": {
    Component: TextToHashtags,
    content: textToHashtagsContent,
  },
  "fake-text-placeholder-generator": {
    Component: FakeTextGenerator,
    content: fakeTextGeneratorContent,
  },
  "text-wrapper": { Component: TextWrapper, content: textWrapperContent },
  "json-formatter": { Component: JsonFormatter, content: jsonFormatterContent },
  "json-validator": { Component: JsonValidator, content: jsonValidatorContent },
  "json-minifier": { Component: JsonMinifier, content: jsonMinifierContent },
  "base64-encode": { Component: Base64EncoderDecoder, content: base64EncodeContent },
  "base64-decode": { Component: Base64EncoderDecoder, content: base64DecodeContent },
  "jwt-decoder": { Component: JwtDecoder, content: jwtDecoderContent },
  "regex-tester": { Component: RegexTester, content: regexTesterContent },
  "uuid-generator": { Component: UuidGenerator, content: uuidGeneratorContent },
  "hash-generator": { Component: HashGenerator, content: hashGeneratorContent },
  "timestamp-converter": {
    Component: TimestampConverter,
    content: timestampConverterContent,
  },
  "epoch-unix-time-converter": {
    Component: EpochConverter,
    content: epochConverterContent,
  },
  "color-code-converter": {
    Component: ColorCodeConverter,
    content: colorCodeConverterContent,
  },
  "url-parser": { Component: UrlParser, content: urlParserContent },
  "http-status-code-lookup": {
    Component: HttpStatusLookup,
    content: httpStatusLookupContent,
  },
  "mime-type-lookup": { Component: MimeTypeLookup, content: mimeTypeLookupContent },
  "curl-command-generator": {
    Component: CurlCommandGenerator,
    content: curlCommandGeneratorContent,
  },
  "base32-encode-decode": {
    Component: Base32EncodeDecode,
    content: base32EncodeDecodeContent,
  },
  "ascii-table-reference": { Component: AsciiTable, content: asciiTableContent },
  "unicode-converter": {
    Component: UnicodeConverter,
    content: unicodeConverterContent,
  },
  "slugify-tool": { Component: SlugifyTool, content: slugifyToolContent },
  "git-ignore-generator": {
    Component: GitignoreGenerator,
    content: gitignoreGeneratorContent,
  },
  "open-source-license-generator": {
    Component: LicenseGenerator,
    content: licenseGeneratorContent,
  },
  "api-response-formatter": {
    Component: ApiResponseFormatter,
    content: apiResponseFormatterContent,
  },
  "number-base-converter": {
    Component: NumberBaseConverter,
    content: numberBaseConverterContent,
  },
  "environment-variable-to-json-converter": {
    Component: EnvToJson,
    content: envToJsonContent,
  },
  "column-to-comma-converter": {
    Component: ColumnToComma,
    content: columnToCommaContent,
  },
  "duplicate-word-remover": {
    Component: DuplicateWordRemover,
    content: duplicateWordRemoverContent,
  },
  "text-to-slug-bulk-converter": {
    Component: TextToSlugBulk,
    content: textToSlugBulkContent,
  },
  "rotate-image": { Component: RotateImage, content: rotateImageContent },
  "flip-image": { Component: FlipImage, content: flipImageContent },
  "png-to-jpg": { Component: PngToJpg, content: pngToJpgContent },
  "jpg-to-png": { Component: JpgToPng, content: jpgToPngContent },
  "webp-to-jpg": { Component: WebpToJpg, content: webpToJpgContent },
  "jpg-to-webp": { Component: JpgToWebp, content: jpgToWebpContent },
  "blur-image": { Component: BlurImage, content: blurImageContent },
  "image-color-picker": {
    Component: ImageColorPicker,
    content: imageColorPickerContent,
  },
  "image-to-base64": { Component: ImageBase64Converter, content: imageToBase64Content },
  "base64-to-image": { Component: ImageBase64Converter, content: base64ToImageContent },
  "bmp-to-jpg": { Component: BmpToJpg, content: bmpToJpgContent },
  "image-grayscale-converter": {
    Component: GrayscaleImage,
    content: grayscaleImageContent,
  },
  "image-rounded-corners": {
    Component: RoundedCornersImage,
    content: roundedCornersImageContent,
  },
  "image-border-adder": { Component: BorderImage, content: borderImageContent },
  "image-pixelator": { Component: PixelateImage, content: pixelateImageContent },
  "social-media-image-resizer": {
    Component: SocialMediaResizer,
    content: socialMediaResizerContent,
  },
  "image-rotator-by-angle": {
    Component: RotateImageByAngle,
    content: rotateImageByAngleContent,
  },
  "age-calculator": { Component: AgeCalculator, content: ageCalculatorContent },
  "percentage-calculator": {
    Component: PercentageCalculator,
    content: percentageCalculatorContent,
  },
  "discount-calculator": {
    Component: DiscountCalculator,
    content: discountCalculatorContent,
  },
  "bmi-calculator": { Component: BmiCalculator, content: bmiCalculatorContent },
  "date-calculator": { Component: DateCalculator, content: dateCalculatorContent },
  "time-calculator": { Component: TimeCalculator, content: timeCalculatorContent },
  "time-duration-calculator": {
    Component: TimeDurationCalculator,
    content: timeDurationCalculatorContent,
  },
  "time-zone-converter": {
    Component: TimeZoneConverter,
    content: timeZoneConverterContent,
  },
  "countdown-timer-generator": {
    Component: CountdownTimerGenerator,
    content: countdownTimerGeneratorContent,
  },
  "tip-calculator": { Component: TipCalculator, content: tipCalculatorContent },
  "simple-interest-calculator": {
    Component: SimpleInterestCalculator,
    content: simpleInterestCalculatorContent,
  },
  "compound-interest-calculator": {
    Component: CompoundInterestCalculator,
    content: compoundInterestCalculatorContent,
  },
  "salary-calculator": { Component: SalaryCalculator, content: salaryCalculatorContent },
  "fuel-cost-calculator": {
    Component: FuelCostCalculator,
    content: fuelCostCalculatorContent,
  },
  "grade-calculator": { Component: GradeCalculator, content: gradeCalculatorContent },
  "ovulation-calculator": {
    Component: OvulationCalculator,
    content: ovulationCalculatorContent,
  },
  "pregnancy-due-date-calculator": {
    Component: PregnancyDueDateCalculator,
    content: pregnancyDueDateCalculatorContent,
  },
  "retirement-calculator": {
    Component: RetirementCalculator,
    content: retirementCalculatorContent,
  },
  "random-number-range-calculator": {
    Component: RandomNumberRangeCalculator,
    content: randomNumberRangeCalculatorContent,
  },
  "statistics-calculator": {
    Component: StatisticsCalculator,
    content: statisticsCalculatorContent,
  },
  "standard-deviation-calculator": {
    Component: StandardDeviationCalculator,
    content: standardDeviationCalculatorContent,
  },
  "fraction-calculator": {
    Component: FractionCalculator,
    content: fractionCalculatorContent,
  },
  "ratio-calculator": { Component: RatioCalculator, content: ratioCalculatorContent },
  "scientific-calculator": {
    Component: ScientificCalculator,
    content: scientificCalculatorContent,
  },
  "gpa-calculator": { Component: GpaCalculator, content: gpaCalculatorContent },
  "emi-calculator": { Component: EmiCalculator, content: emiCalculatorContent },
  "gst-calculator": { Component: GstCalculator, content: gstCalculatorContent },
  "sip-calculator": { Component: SipCalculator, content: sipCalculatorContent },
  "loan-calculator": { Component: LoanCalculator, content: loanCalculatorContent },
  "mortgage-calculator": {
    Component: MortgageCalculator,
    content: mortgageCalculatorContent,
  },
  "loan-amortization-calculator": {
    Component: LoanAmortizationCalculator,
    content: loanAmortizationCalculatorContent,
  },
  "break-even-calculator": {
    Component: BreakEvenCalculator,
    content: breakEvenCalculatorContent,
  },
  "profit-margin-calculator": {
    Component: ProfitMarginCalculator,
    content: profitMarginCalculatorContent,
  },
  "roi-calculator": { Component: RoiCalculator, content: roiCalculatorContent },
  "tax-calculator": { Component: TaxCalculator, content: taxCalculatorContent },
  "vat-calculator": { Component: VatCalculator, content: vatCalculatorContent },
  "payroll-calculator": { Component: PayrollCalculator, content: payrollCalculatorContent },
  "invoice-generator": { Component: InvoiceGenerator, content: invoiceGeneratorContent },
  "freelance-rate-calculator": {
    Component: FreelanceRateCalculator,
    content: freelanceRateCalculatorContent,
  },
  "business-loan-calculator": {
    Component: BusinessLoanCalculator,
    content: businessLoanCalculatorContent,
  },
  "depreciation-calculator": {
    Component: DepreciationCalculator,
    content: depreciationCalculatorContent,
  },
  "markup-calculator": { Component: MarkupCalculator, content: markupCalculatorContent },
  "net-worth-calculator": {
    Component: NetWorthCalculator,
    content: netWorthCalculatorContent,
  },
  "inflation-calculator": {
    Component: InflationCalculator,
    content: inflationCalculatorContent,
  },
  "savings-goal-calculator": {
    Component: SavingsGoalCalculator,
    content: savingsGoalCalculatorContent,
  },
  "bmr-calculator": { Component: BmrCalculator, content: bmrCalculatorContent },
  "body-fat-percentage-calculator": {
    Component: BodyFatCalculator,
    content: bodyFatCalculatorContent,
  },
  "calorie-calculator": { Component: CalorieCalculator, content: calorieCalculatorContent },
  "ideal-weight-calculator": {
    Component: IdealWeightCalculator,
    content: idealWeightCalculatorContent,
  },
  "water-intake-calculator": {
    Component: WaterIntakeCalculator,
    content: waterIntakeCalculatorContent,
  },
  "heart-rate-zone-calculator": {
    Component: HeartRateZoneCalculator,
    content: heartRateZoneCalculatorContent,
  },
  "macro-calculator": { Component: MacroCalculator, content: macroCalculatorContent },
  "waist-to-hip-ratio-calculator": {
    Component: WaistToHipRatioCalculator,
    content: waistToHipRatioCalculatorContent,
  },
  "one-rep-max-calculator": {
    Component: OneRepMaxCalculator,
    content: oneRepMaxCalculatorContent,
  },
  "steps-to-calories-calculator": {
    Component: StepsToCaloriesCalculator,
    content: stepsToCaloriesCalculatorContent,
  },
  "pace-and-running-speed-calculator": {
    Component: PaceCalculator,
    content: paceCalculatorContent,
  },
  "length-converter": { Component: LengthConverter, content: lengthConverterContent },
  "weight-converter": { Component: WeightConverter, content: weightConverterContent },
  "temperature-converter": {
    Component: TemperatureConverter,
    content: temperatureConverterContent,
  },
  "speed-converter": { Component: SpeedConverter, content: speedConverterContent },
  "area-converter": { Component: AreaConverter, content: areaConverterContent },
  "volume-converter": { Component: VolumeConverter, content: volumeConverterContent },
  "data-storage-converter": {
    Component: DataStorageConverter,
    content: dataStorageConverterContent,
  },
  "time-unit-converter": {
    Component: TimeUnitConverter,
    content: timeUnitConverterContent,
  },
  "pressure-converter": { Component: PressureConverter, content: pressureConverterContent },
  "energy-converter": { Component: EnergyConverter, content: energyConverterContent },
  "power-converter": { Component: PowerConverter, content: powerConverterContent },
  "angle-converter": { Component: AngleConverter, content: angleConverterContent },
  "fuel-consumption-converter": {
    Component: FuelConsumptionConverter,
    content: fuelConsumptionConverterContent,
  },
  "cooking-measurement-converter": {
    Component: CookingMeasurementConverter,
    content: cookingMeasurementConverterContent,
  },
  "shoe-size-converter": { Component: ShoeSizeConverter, content: shoeSizeConverterContent },
  "clothing-size-converter": {
    Component: ClothingSizeConverter,
    content: clothingSizeConverterContent,
  },
  "roman-numeral-converter": {
    Component: RomanNumeralConverter,
    content: romanNumeralConverterContent,
  },
  "qr-code-generator": { Component: QrCodeGenerator, content: qrCodeGeneratorContent },
  "wifi-qr-code-generator": {
    Component: WifiQrCodeGenerator,
    content: wifiQrCodeGeneratorContent,
  },
  "vcard-qr-code-generator": {
    Component: VcardQrCodeGenerator,
    content: vcardQrCodeGeneratorContent,
  },
  "barcode-generator": { Component: BarcodeGenerator, content: barcodeGeneratorContent },
  "upc-ean-generator": { Component: UpcEanGenerator, content: upcEanGeneratorContent },
  "color-picker": { Component: ColorPicker, content: colorPickerContent },
  "hex-to-rgb-converter": { Component: HexToRgb, content: hexToRgbContent },
  "rgb-to-hex-converter": { Component: RgbToHex, content: rgbToHexContent },
  "hex-to-hsl-converter": { Component: HexToHsl, content: hexToHslContent },
  "gradient-generator": { Component: GradientGenerator, content: gradientGeneratorContent },
  "color-contrast-checker": {
    Component: ColorContrastChecker,
    content: colorContrastCheckerContent,
  },
  "color-name-finder": { Component: ColorNameFinder, content: colorNameFinderContent },
  "random-color-generator": {
    Component: RandomColorGenerator,
    content: randomColorGeneratorContent,
  },
  "css-gradient-generator": {
    Component: CssGradientGenerator,
    content: cssGradientGeneratorContent,
  },
  "tailwind-color-shade-generator": {
    Component: TailwindShadeGenerator,
    content: tailwindShadeGeneratorContent,
  },
  "random-number-generator": {
    Component: RandomNumberGenerator,
    content: randomNumberGeneratorContent,
  },
  "random-name-generator": { Component: RandomNameGenerator, content: randomNameGeneratorContent },
  "random-word-generator": { Component: RandomWordGenerator, content: randomWordGeneratorContent },
  "random-sentence-generator": {
    Component: RandomSentenceGenerator,
    content: randomSentenceGeneratorContent,
  },
  "coin-flip": { Component: CoinFlip, content: coinFlipContent },
  "dice-roller": { Component: DiceRoller, content: diceRollerContent },
  "random-date-generator": {
    Component: RandomDateGenerator,
    content: randomDateGeneratorContent,
  },
  "random-team-generator": {
    Component: RandomTeamGenerator,
    content: randomTeamGeneratorContent,
  },
  "yes-no-decision-maker": {
    Component: YesNoDecisionMaker,
    content: yesNoDecisionMakerContent,
  },
  "random-country-generator": {
    Component: RandomCountryGenerator,
    content: randomCountryGeneratorContent,
  },
  "lottery-number-generator": {
    Component: LotteryNumberGenerator,
    content: lotteryNumberGeneratorContent,
  },
  "random-emoji-generator": {
    Component: RandomEmojiGenerator,
    content: randomEmojiGeneratorContent,
  },
  "wheel-of-names-spinner": {
    Component: WheelOfNamesSpinner,
    content: wheelOfNamesSpinnerContent,
  },
  "ping-test": { Component: PingTest, content: pingTestContent },
  "dns-lookup": { Component: DnsLookup, content: dnsLookupContent },
  "mx-record-lookup": { Component: MxRecordLookup, content: mxRecordLookupContent },
  "whois-lookup": { Component: WhoisLookup, content: whoisLookupContent },
  "ip-address-lookup": { Component: IpAddressLookup, content: ipAddressLookupContent },
  "my-ip-address-finder": {
    Component: MyIpAddressFinder,
    content: myIpAddressFinderContent,
  },
  "website-speed-test": { Component: WebsiteSpeedTest, content: websiteSpeedTestContent },
  "http-header-checker": { Component: HttpHeaderChecker, content: httpHeaderCheckerContent },
  "ssl-certificate-checker": {
    Component: SslCertificateChecker,
    content: sslCertificateCheckerContent,
  },
  "website-uptime-checker": {
    Component: WebsiteUptimeChecker,
    content: websiteUptimeCheckerContent,
  },
  "user-agent-detector": { Component: UserAgentDetector, content: userAgentDetectorContent },
  "website-screenshot-tool": {
    Component: WebsiteScreenshotTool,
    content: websiteScreenshotToolContent,
  },
  "subnet-calculator": { Component: SubnetCalculator, content: subnetCalculatorContent },
  "mac-address-lookup-tool": {
    Component: MacAddressLookupTool,
    content: macAddressLookupToolContent,
  },
  "password-generator": { Component: PasswordGenerator, content: passwordGeneratorContent },
  "sha256-generator": { Component: Sha256Generator, content: sha256GeneratorContent },
  "md5-generator": { Component: Md5Generator, content: md5GeneratorContent },
  "two-factor-backup-code-generator": {
    Component: TwoFactorBackupCodeGenerator,
    content: twoFactorBackupCodeGeneratorContent,
  },
  "csrf-token-generator": { Component: CsrfTokenGenerator, content: csrfTokenGeneratorContent },
  "passphrase-generator": { Component: PassphraseGenerator, content: passphraseGeneratorContent },
  "password-strength-checker": {
    Component: PasswordStrengthChecker,
    content: passwordStrengthCheckerContent,
  },
  "hmac-generator": { Component: HmacGenerator, content: hmacGeneratorContent },
  "file-hash-checker": { Component: FileHashChecker, content: fileHashCheckerContent },
  "aes-encryption-tool": { Component: AesEncryptionTool, content: aesEncryptionToolContent },
  "aes-decryption-tool": { Component: AesDecryptionTool, content: aesDecryptionToolContent },
  "file-encryptor-decryptor": {
    Component: FileEncryptorDecryptor,
    content: fileEncryptorDecryptorContent,
  },
  "pgp-key-pair-generator": {
    Component: PgpKeyPairGenerator,
    content: pgpKeyPairGeneratorContent,
  },
  "ssl-certificate-decoder": {
    Component: SslCertificateDecoder,
    content: sslCertificateDecoderContent,
  },
  "ip-blacklist-checker": { Component: IpBlacklistChecker, content: ipBlacklistCheckerContent },
  "data-breach-email-checker": {
    Component: DataBreachEmailChecker,
    content: dataBreachEmailCheckerContent,
  },
  "self-destructing-secure-note-generator": {
    Component: SelfDestructingSecureNoteGenerator,
    content: selfDestructingSecureNoteGeneratorContent,
  },
  "equation-solver": { Component: EquationSolver, content: equationSolverContent },
  "quadratic-equation-solver": {
    Component: QuadraticEquationSolver,
    content: quadraticEquationSolverContent,
  },
  "matrix-calculator": { Component: MatrixCalculator, content: matrixCalculatorContent },
  "graphing-calculator": { Component: GraphingCalculator, content: graphingCalculatorContent },
  "prime-number-checker": { Component: PrimeNumberChecker, content: primeNumberCheckerContent },
  "gcd-and-lcm-calculator": {
    Component: GcdAndLcmCalculator,
    content: gcdAndLcmCalculatorContent,
  },
  "factorial-calculator": { Component: FactorialCalculator, content: factorialCalculatorContent },
  "algebra-calculator": { Component: AlgebraCalculator, content: algebraCalculatorContent },
  "trigonometry-calculator": {
    Component: TrigonometryCalculator,
    content: trigonometryCalculatorContent,
  },
  "percentage-change-calculator": {
    Component: PercentageChangeCalculator,
    content: percentageChangeCalculatorContent,
  },
  "number-rounding-tool": { Component: NumberRoundingTool, content: numberRoundingToolContent },
  "bitcoin-address-validator": {
    Component: BitcoinAddressValidator,
    content: bitcoinAddressValidatorContent,
  },
  "crypto-wallet-address-qr-generator": {
    Component: CryptoWalletAddressQrGenerator,
    content: cryptoWalletAddressQrGeneratorContent,
  },
  "cryptocurrency-price-converter": {
    Component: CryptocurrencyPriceConverter,
    content: cryptocurrencyPriceConverterContent,
  },
  "mining-profitability-calculator": {
    Component: MiningProfitabilityCalculator,
    content: miningProfitabilityCalculatorContent,
  },
  "live-currency-exchange-rate-checker": {
    Component: LiveCurrencyExchangeRateChecker,
    content: liveCurrencyExchangeRateCheckerContent,
  },
  "image-compressor": { Component: ImageCompressor, content: imageCompressorContent },
  "image-resizer": { Component: ImageResizer, content: imageResizerContent },
  "crop-image": { Component: CropImage, content: cropImageContent },
  "avif-to-jpg": { Component: AvifToJpg, content: avifToJpgContent },
  "svg-to-png": { Component: SvgToPng, content: svgToPngContent },
  "image-watermark": { Component: ImageWatermark, content: imageWatermarkContent },
  "image-metadata-viewer": {
    Component: ImageMetadataViewer,
    content: imageMetadataViewerContent,
  },
  "image-dpi-converter": { Component: ImageDpiConverter, content: imageDpiConverterContent },
  "universal-image-converter": {
    Component: UniversalImageConverter,
    content: universalImageConverterContent,
  },
  "tiff-to-jpg": { Component: TiffToJpg, content: tiffToJpgContent },
  "gif-to-png": { Component: GifToPng, content: gifToPngContent },
  "png-to-gif": { Component: PngToGif, content: pngToGifContent },
  "ico-converter": { Component: IcoConverter, content: icoConverterContent },
  "image-to-pdf": { Component: ImageToPdf, content: imageToPdfContent },
  "image-splitter": { Component: ImageSplitter, content: imageSplitterContent },
  "image-collage-maker": { Component: ImageCollageMaker, content: imageCollageMakerContent },
  "image-sharpener": { Component: ImageSharpener, content: imageSharpenerContent },
  "meme-generator": { Component: MemeGenerator, content: memeGeneratorContent },
  "photo-filters": { Component: PhotoFilters, content: photoFiltersContent },
  "image-compare": { Component: ImageCompare, content: imageCompareContent },
  "passport-photo-maker": { Component: PassportPhotoMaker, content: passportPhotoMakerContent },
  "favicon-generator": { Component: FaviconGenerator, content: faviconGeneratorContent },
  "image-exif-remover": { Component: ImageExifRemover, content: imageExifRemoverContent },
  "image-noise-reducer": { Component: ImageNoiseReducer, content: imageNoiseReducerContent },
  "batch-image-resizer": { Component: BatchImageResizer, content: batchImageResizerContent },
  "transparent-background-maker": {
    Component: TransparentBackgroundMaker,
    content: transparentBackgroundMakerContent,
  },
  "pdf-merge": { Component: PdfMerge, content: pdfMergeContent },
  "pdf-split": { Component: PdfSplit, content: pdfSplitContent },
  "pdf-rotate": { Component: PdfRotate, content: pdfRotateContent },
  "pdf-extract-pages": { Component: PdfExtractPages, content: pdfExtractPagesContent },
  "pdf-delete-pages": { Component: PdfDeletePages, content: pdfDeletePagesContent },
  "pdf-reorder-pages": { Component: PdfReorderPages, content: pdfReorderPagesContent },
  "pdf-add-watermark": { Component: PdfAddWatermark, content: pdfAddWatermarkContent },
  "pdf-metadata-editor": { Component: PdfMetadataEditor, content: pdfMetadataEditorContent },
  "pdf-page-numbering": { Component: PdfPageNumbering, content: pdfPageNumberingContent },
  "pdf-header-and-footer-adder": {
    Component: PdfHeaderAndFooterAdder,
    content: pdfHeaderAndFooterAdderContent,
  },
  "pdf-crop": { Component: PdfCrop, content: pdfCropContent },
  "pdf-page-size-converter": { Component: PdfPageSizeConverter, content: pdfPageSizeConverterContent },
  "jpg-to-pdf": { Component: JpgToPdf, content: jpgToPdfContent },
  "png-to-pdf": { Component: PngToPdf, content: pngToPdfContent },
  "scan-to-pdf": { Component: ScanToPdf, content: scanToPdfContent },
  "pdf-to-text": { Component: PdfToText, content: pdfToTextContent },
  "pdf-to-jpg": { Component: PdfToJpg, content: pdfToJpgContent },
  "pdf-to-png": { Component: PdfToPng, content: pdfToPngContent },
  "pdf-reader-online": { Component: PdfReaderOnline, content: pdfReaderOnlineContent },
  "pdf-splitter-by-file-size": {
    Component: PdfSplitterByFileSize,
    content: pdfSplitterByFileSizeContent,
  },
  "pdf-compress": { Component: PdfCompress, content: pdfCompressContent },
  "pdf-unlock": { Component: PdfUnlock, content: pdfUnlockContent },
  "pdf-flatten": { Component: PdfFlatten, content: pdfFlattenContent },
  "pdf-form-filler": { Component: PdfFormFiller, content: pdfFormFillerContent },
  "pdf-compare": { Component: PdfCompare, content: pdfCompareContent },
  "pdf-signer": { Component: PdfSigner, content: pdfSignerContent },
  "pdf-bookmark-editor": { Component: PdfBookmarkEditor, content: pdfBookmarkEditorContent },
  "pdf-redact": { Component: PdfRedact, content: pdfRedactContent },
  "pdf-repair": { Component: PdfRepair, content: pdfRepairContent },
  "pdf-annotator": { Component: PdfAnnotator, content: pdfAnnotatorContent },
  "pdf-to-csv": { Component: PdfToCsv, content: pdfToCsvContent },
  "pdf-to-markdown": { Component: PdfToMarkdown, content: pdfToMarkdownContent },
  "pdf-to-html": { Component: PdfToHtml, content: pdfToHtmlContent },
  "pdf-to-epub": { Component: PdfToEpub, content: pdfToEpubContent },
  "pdf-to-word": { Component: PdfToWord, content: pdfToWordContent },
  "word-to-pdf": { Component: WordToPdf, content: wordToPdfContent },
  "pdf-to-excel": { Component: PdfToExcel, content: pdfToExcelContent },
  "excel-to-pdf": { Component: ExcelToPdf, content: excelToPdfContent },
  "pdf-to-powerpoint": { Component: PdfToPowerpoint, content: pdfToPowerpointContent },
  "powerpoint-to-pdf": { Component: PowerpointToPdf, content: powerpointToPdfContent },
  "html-to-pdf": { Component: HtmlToPdf, content: htmlToPdfContent },
  "pdf-ocr": { Component: PdfOcr, content: pdfOcrContent },
  "pdf-grayscale-converter": { Component: PdfGrayscaleConverter, content: pdfGrayscaleConverterContent },
  "pdf-page-extractor-to-images": {
    Component: PdfPageExtractorToImages,
    content: pdfPageExtractorToImagesContent,
  },
  "remove-background": { Component: RemoveBackground, content: removeBackgroundContent },
  "heic-to-jpg": { Component: HeicToJpg, content: heicToJpgContent },
  "heic-to-png": { Component: HeicToPng, content: heicToPngContent },
  "png-to-svg": { Component: PngToSvg, content: pngToSvgContent },
  "mp4-to-webm": { Component: Mp4ToWebm, content: mp4ToWebmContent },
  "webm-to-mp4": { Component: WebmToMp4, content: webmToMp4Content },
  "video-compressor": { Component: VideoCompressor, content: videoCompressorContent },
  "video-trimmer": { Component: VideoTrimmer, content: videoTrimmerContent },
  "extract-audio-from-video": { Component: ExtractAudioFromVideo, content: extractAudioFromVideoContent },
  "video-to-gif": { Component: VideoToGif, content: videoToGifContent },
  "gif-to-mp4": { Component: GifToMp4, content: gifToMp4Content },
  "change-video-speed": { Component: ChangeVideoSpeed, content: changeVideoSpeedContent },
  "mute-video": { Component: MuteVideo, content: muteVideoContent },
  "merge-videos": { Component: MergeVideos, content: mergeVideosContent },
  "mp4-to-mp3": { Component: Mp4ToMp3, content: mp4ToMp3Content },
  "video-to-audio-converter": { Component: VideoToAudioConverter, content: videoToAudioConverterContent },
  "video-rotator": { Component: VideoRotator, content: videoRotatorContent },
  "video-cropper": { Component: VideoCropper, content: videoCropperContent },
  "video-resizer": { Component: VideoResizer, content: videoResizerContent },
  "add-subtitles-to-video": { Component: AddSubtitlesToVideo, content: addSubtitlesToVideoContent },
  "video-watermark": { Component: VideoWatermark, content: videoWatermarkContent },
  "reverse-video": { Component: ReverseVideo, content: reverseVideoContent },
  "screen-recorder": { Component: ScreenRecorder, content: screenRecorderContent },
  "video-thumbnail-generator": { Component: VideoThumbnailGenerator, content: videoThumbnailGeneratorContent },
  "video-frame-extractor": { Component: VideoFrameExtractor, content: videoFrameExtractorContent },
  "loop-video-maker": { Component: LoopVideoMaker, content: loopVideoMakerContent },
  "video-compressor-to-target-size": {
    Component: VideoCompressorToTargetSize,
    content: videoCompressorToTargetSizeContent,
  },
  "avi-to-mp4": { Component: AviToMp4, content: aviToMp4Content },
  "mov-to-mp4": { Component: MovToMp4, content: movToMp4Content },
  "mkv-to-mp4": { Component: MkvToMp4, content: mkvToMp4Content },
  "flv-to-mp4": { Component: FlvToMp4, content: flvToMp4Content },
  "video-joiner-by-timeline": { Component: VideoJoinerByTimeline, content: videoJoinerByTimelineContent },
  "video-aspect-ratio-converter": {
    Component: VideoAspectRatioConverter,
    content: videoAspectRatioConverterContent,
  },
  "mp3-converter": { Component: Mp3Converter, content: mp3ConverterContent },
  "wav-converter": { Component: WavConverter, content: wavConverterContent },
  "audio-compressor": { Component: AudioCompressor, content: audioCompressorContent },
  "audio-cutter": { Component: AudioCutter, content: audioCutterContent },
  "audio-joiner": { Component: AudioJoiner, content: audioJoinerContent },
  "change-audio-speed": { Component: ChangeAudioSpeed, content: changeAudioSpeedContent },
  "audio-volume-booster": { Component: AudioVolumeBooster, content: audioVolumeBoosterContent },
  "audio-metadata-editor": { Component: AudioMetadataEditor, content: audioMetadataEditorContent },
  "mp3-to-wav": { Component: Mp3ToWav, content: mp3ToWavContent },
  "wav-to-mp3": { Component: WavToMp3, content: wavToMp3Content },
  "ogg-converter": { Component: OggConverter, content: oggConverterContent },
  "flac-converter": { Component: FlacConverter, content: flacConverterContent },
  "aac-converter": { Component: AacConverter, content: aacConverterContent },
  "audio-merger": { Component: AudioMerger, content: audioMergerContent },
  "audio-pitch-changer": { Component: AudioPitchChanger, content: audioPitchChangerContent },
  "audio-normalizer": { Component: AudioNormalizer, content: audioNormalizerContent },
  "audio-fade-in-out-editor": { Component: AudioFadeInOutEditor, content: audioFadeInOutEditorContent },
  "ringtone-maker": { Component: RingtoneMaker, content: ringtoneMakerContent },
  "voice-recorder-online": { Component: VoiceRecorderOnline, content: voiceRecorderOnlineContent },
  "universal-audio-format-converter": {
    Component: UniversalAudioFormatConverter,
    content: universalAudioFormatConverterContent,
  },
  "podcast-trimmer": { Component: PodcastTrimmer, content: podcastTrimmerContent },
  "silence-remover": { Component: SilenceRemover, content: silenceRemoverContent },
  "image-to-text": { Component: ImageToText, content: imageToTextContent },
  "pdf-to-text-ocr": { Component: PdfToTextOcr, content: pdfToTextOcrContent },
  "handwriting-ocr": { Component: HandwritingOcr, content: handwritingOcrContent },
  "screenshot-ocr": { Component: ScreenshotOcr, content: screenshotOcrContent },
  "multi-language-ocr": { Component: MultiLanguageOcr, content: multiLanguageOcrContent },
  "table-ocr": { Component: TableOcr, content: tableOcrContent },
  "receipt-ocr": { Component: ReceiptOcr, content: receiptOcrContent },
  "id-card-ocr": { Component: IdCardOcr, content: idCardOcrContent },
  "license-plate-ocr": { Component: LicensePlateOcr, content: licensePlateOcrContent },
  "business-card-ocr": { Component: BusinessCardOcr, content: businessCardOcrContent },
  "ocr-to-word": { Component: OcrToWord, content: ocrToWordContent },
  "ocr-to-pdf": { Component: OcrToPdf, content: ocrToPdfContent },
  "batch-ocr-processor": { Component: BatchOcrProcessor, content: batchOcrProcessorContent },
  "zip-extractor": { Component: ZipExtractor, content: zipExtractorContent },
  "zip-creator": { Component: ZipCreator, content: zipCreatorContent },
  "tar-extractor": { Component: TarExtractor, content: tarExtractorContent },
  "gzip-extractor": { Component: GzipExtractor, content: gzipExtractorContent },
  "7z-extractor": { Component: SevenZExtractor, content: sevenZExtractorContent },
  "rar-extractor": { Component: RarExtractor, content: rarExtractorContent },
  "zip-password-remover": { Component: ZipPasswordRemover, content: zipPasswordRemoverContent },
  "zip-password-protector": { Component: ZipPasswordProtector, content: zipPasswordProtectorContent },
  "universal-file-compressor": { Component: UniversalFileCompressor, content: universalFileCompressorContent },
  "archive-format-converter": { Component: ArchiveFormatConverter, content: archiveFormatConverterContent },
  "iso-extractor": { Component: IsoExtractor, content: isoExtractorContent },
  "tar-gz-creator": { Component: TarGzCreator, content: tarGzCreatorContent },
  "split-archive-by-size": { Component: SplitArchiveBySize, content: splitArchiveBySizeContent },
  "pdf-editor": { Component: PdfEditor, content: pdfEditorContent },
  "ai-keyword-extractor": { Component: AiKeywordExtractor, content: aiKeywordExtractorContent },
  "ai-resume-builder": { Component: AiResumeBuilder, content: aiResumeBuilderContent },
  "ai-business-name-generator": { Component: AiBusinessNameGenerator, content: aiBusinessNameGeneratorContent },
  "instagram-story-size-guide": { Component: InstagramStorySizeGuide, content: instagramStorySizeGuideContent },
  "linkedin-post-formatter": { Component: LinkedinPostFormatter, content: linkedinPostFormatterContent },
  "twitter-x-character-counter": { Component: TwitterXCharacterCounter, content: twitterXCharacterCounterContent },
  "emoji-picker-and-copy-tool": { Component: EmojiPickerAndCopyTool, content: emojiPickerAndCopyToolContent },
  "social-media-image-size-guide": { Component: SocialMediaImageSizeGuide, content: socialMediaImageSizeGuideContent },
  "meta-tag-generator": { Component: MetaTagGenerator, content: metaTagGeneratorContent },
  "robots-txt-generator": { Component: RobotsTxtGenerator, content: robotsTxtGeneratorContent },
  "keyword-density-checker": { Component: KeywordDensityChecker, content: keywordDensityCheckerContent },
  "open-graph-generator": { Component: OpenGraphGenerator, content: openGraphGeneratorContent },
  "serp-snippet-preview-tool": { Component: SerpSnippetPreviewTool, content: serpSnippetPreviewToolContent },
  "csv-viewer": { Component: CsvViewer, content: csvViewerContent },
  "vlookup-formula-generator": { Component: VlookupFormulaGenerator, content: vlookupFormulaGeneratorContent },
  "fancy-text-generator": { Component: FancyTextGenerator, content: fancyTextGeneratorContent },
  "typography-scale-generator": { Component: TypographyScaleGenerator, content: typographyScaleGeneratorContent },
  "readability-score-checker": { Component: ReadabilityScoreChecker, content: readabilityScoreCheckerContent },
  "email-validator": { Component: EmailValidator, content: emailValidatorContent },
  "email-address-extractor": { Component: EmailAddressExtractor, content: emailAddressExtractorContent },
  "world-clock": { Component: WorldClock, content: worldClockContent },
  "pomodoro-timer": { Component: PomodoroTimer, content: pomodoroTimerContent },
  "online-stopwatch": { Component: OnlineStopwatch, content: onlineStopwatchContent },
  "countdown-to-date-widget": { Component: CountdownToDateWidget, content: countdownToDateWidgetContent },
  "work-days-calculator": { Component: WorkDaysCalculator, content: workDaysCalculatorContent },
  "json-to-csv": { Component: JsonCsvConverter, content: jsonToCsvContent },
  "csv-to-json": { Component: JsonCsvConverter, content: csvToJsonContent },
  "xml-formatter": { Component: XmlFormatter, content: xmlFormatterContent },
  "xml-to-json": { Component: XmlToJson, content: xmlToJsonContent },
  "jwt-generator": { Component: JwtGenerator, content: jwtGeneratorContent },
  "html-minifier": { Component: HtmlMinifier, content: htmlMinifierContent },
  "css-minifier": { Component: CssMinifier, content: cssMinifierContent },
  "sql-formatter": { Component: SqlFormatter, content: sqlFormatterContent },
  "sql-minifier": { Component: SqlMinifier, content: sqlMinifierContent },
  "cron-expression-generator": { Component: CronExpressionGenerator, content: cronExpressionGeneratorContent },
  "html-formatter-beautifier": { Component: HtmlFormatterBeautifier, content: htmlFormatterBeautifierContent },
  "html-to-markdown": { Component: HtmlMarkdownConverter, content: htmlToMarkdownContent },
  "markdown-to-html": { Component: HtmlMarkdownConverter, content: markdownToHtmlContent },
  "markdown-previewer": { Component: MarkdownPreviewer, content: markdownPreviewerContent },
  "code-diff-checker": { Component: CodeDiffChecker, content: codeDiffCheckerContent },
  "code-beautifier": { Component: CodeBeautifier, content: codeBeautifierContent },
  "json-diff-checker": { Component: JsonDiffChecker, content: jsonDiffCheckerContent },
  "json-path-tester": { Component: JsonPathTester, content: jsonPathTesterContent },
  "user-agent-parser": { Component: UserAgentParser, content: userAgentParserContent },
  "js-minifier": { Component: JsMinifier, content: jsMinifierContent },
  "yaml-formatter": { Component: YamlFormatter, content: yamlFormatterContent },
  "yaml-to-json": { Component: JsonYamlConverter, content: yamlToJsonContent },
  "json-to-yaml": { Component: JsonYamlConverter, content: jsonToYamlContent },
  "graphql-query-formatter": { Component: GraphqlQueryFormatter, content: graphqlQueryFormatterContent },
  "hashtag-generator": { Component: HashtagGenerator, content: hashtagGeneratorContent },
  "instagram-caption-generator": { Component: InstagramCaptionGenerator, content: instagramCaptionGeneratorContent },
  "text-diff-checker": { Component: TextDiffChecker, content: textDiffCheckerContent },
  "youtube-thumbnail-downloader": { Component: YoutubeThumbnailDownloader, content: youtubeThumbnailDownloaderContent },
  "privacy-policy-generator": { Component: PrivacyPolicyGenerator, content: privacyPolicyGeneratorContent },
  "terms-and-conditions-generator": { Component: TermsAndConditionsGenerator, content: termsAndConditionsGeneratorContent },
  "nda-generator": { Component: NdaGenerator, content: ndaGeneratorContent },
  "disclaimer-generator": { Component: DisclaimerGenerator, content: disclaimerGeneratorContent },
  "refund-policy-generator": { Component: RefundPolicyGenerator, content: refundPolicyGeneratorContent },
  "cookie-policy-generator": { Component: CookiePolicyGenerator, content: cookiePolicyGeneratorContent },
  "text-to-speech": { Component: TextToSpeech, content: textToSpeechContent },
  "speech-to-text": { Component: SpeechToText, content: speechToTextContent },
  "text-encryptor-decryptor": { Component: TextEncryptorDecryptor, content: textEncryptorDecryptorContent },
  "citation-generator": { Component: CitationGenerator, content: citationGeneratorContent },
  "bibliography-generator": { Component: BibliographyGenerator, content: bibliographyGeneratorContent },
  "sitemap-generator": { Component: SitemapGenerator, content: sitemapGeneratorContent },
  "schema-markup-generator": { Component: SchemaMarkupGenerator, content: schemaMarkupGeneratorContent },
  "readability-checker": { Component: ReadabilityChecker, content: readabilityCheckerContent },
  "color-palette-generator": { Component: ColorPaletteGenerator, content: colorPaletteGeneratorContent },
  "digital-signature-maker": { Component: DigitalSignatureMaker, content: digitalSignatureMakerContent },
  "qr-code-with-logo-generator": { Component: QrCodeWithLogoGenerator, content: qrCodeWithLogoGeneratorContent },
  "bulk-qr-code-generator": { Component: BulkQrCodeGenerator, content: bulkQrCodeGeneratorContent },
  "employment-contract-generator": { Component: EmploymentContractGenerator, content: employmentContractGeneratorContent },
  "rental-lease-agreement-generator": { Component: RentalAgreementGenerator, content: rentalLeaseAgreementGeneratorContent },
  "freelance-contract-generator": { Component: FreelanceContractGenerator, content: freelanceContractGeneratorContent },
  "affidavit-template-generator": { Component: AffidavitGenerator, content: affidavitTemplateGeneratorContent },
  "excel-formula-generator": { Component: ExcelFormulaGenerator, content: excelFormulaGeneratorContent },
  "essay-outline-generator": { Component: EssayOutlineGenerator, content: essayOutlineGeneratorContent },
  "thesis-statement-generator": { Component: ThesisStatementGenerator, content: thesisStatementGeneratorContent },
  "youtube-title-generator": { Component: YoutubeTitleGenerator, content: youtubeTitleGeneratorContent },
  "youtube-description-generator": { Component: YoutubeDescriptionGenerator, content: youtubeDescriptionGeneratorContent },
  "email-signature-generator": { Component: EmailSignatureGenerator, content: emailSignatureGeneratorContent },
  "email-subject-line-tester": { Component: EmailSubjectLineTester, content: emailSubjectLineTesterContent },
  "mail-header-analyzer": { Component: MailHeaderAnalyzer, content: mailHeaderAnalyzerContent },
  "meeting-time-planner": { Component: MeetingTimePlanner, content: meetingTimePlannerContent },
  "language-detector": { Component: LanguageDetector, content: languageDetectorContent },
  "xml-sitemap-validator": { Component: XmlSitemapValidator, content: xmlSitemapValidatorContent },
  "handwritten-signature-generator": { Component: HandwrittenSignatureGenerator, content: handwrittenSignatureGeneratorContent },
  "signature-to-transparent-png-converter": { Component: SignatureToTransparentPngConverter, content: signatureToTransparentPngConverterContent },
  "initials-logo-generator": { Component: InitialsLogoGenerator, content: initialsLogoGeneratorContent },
  "color-blindness-simulator": { Component: ColorBlindnessSimulator, content: colorBlindnessSimulatorContent },
  "image-color-palette-extractor": { Component: ImageColorPaletteExtractor, content: imageColorPaletteExtractorContent },
  "graph-paper-generator": { Component: GraphPaperGenerator, content: graphPaperGeneratorContent },
  "meme-caption-generator": { Component: MemeCaptionGenerator, content: memeCaptionGeneratorContent },
  "business-card-designer": { Component: BusinessCardDesigner, content: businessCardDesignerContent },
  "flashcard-maker": { Component: FlashcardMaker, content: flashcardMakerContent },
  "quiz-generator": { Component: QuizGenerator, content: quizGeneratorContent },
  "multiple-choice-test-generator": { Component: MultipleChoiceTestGenerator, content: multipleChoiceTestGeneratorContent },
  "timetable-schedule-generator": { Component: TimetableScheduleGenerator, content: timetableScheduleGeneratorContent },
  "habit-tracker-sheet-generator": { Component: HabitTrackerSheetGenerator, content: habitTrackerSheetGeneratorContent },
  "handwriting-practice-sheet-generator": { Component: HandwritingPracticeSheetGenerator, content: handwritingPracticeSheetGeneratorContent },
  "excel-to-csv": { Component: ExcelToCsv, content: excelToCsvContent },
  "csv-to-excel": { Component: CsvToExcel, content: csvToExcelContent },
  "excel-to-json": { Component: ExcelToJson, content: excelToJsonContent },
  "json-to-excel": { Component: JsonToExcel, content: jsonToExcelContent },
  "txt-to-docx": { Component: TxtToDocx, content: txtToDocxContent },
  "docx-to-txt": { Component: DocxToTxt, content: docxToTxtContent },
  "csv-merger": { Component: CsvMerger, content: csvMergerContent },
  "csv-splitter": { Component: CsvSplitter, content: csvSplitterContent },
  "duplicate-row-remover": { Component: DuplicateRowRemover, content: duplicateRowRemoverContent },
  "chart-generator-from-csv": { Component: ChartGeneratorFromCsv, content: chartGeneratorFromCsvContent },
  "data-cleaner": { Component: DataCleaner, content: dataCleanerContent },
  "resume-builder": { Component: ResumeBuilder, content: resumeBuilderContent },
  "cover-letter-generator": { Component: CoverLetterGenerator, content: coverLetterGeneratorContent },
  "invoice-template-generator": { Component: InvoiceTemplateGenerator, content: invoiceTemplateGeneratorContent },
  "certificate-generator": { Component: CertificateGenerator, content: certificateGeneratorContent },
  "letterhead-generator": { Component: LetterheadGenerator, content: letterheadGeneratorContent },
  "gif-maker-from-images": { Component: GifMakerFromImages, content: gifMakerFromImagesContent },
  "gif-resizer": { Component: GifResizer, content: gifResizerContent },
  "gif-splitter": { Component: GifSplitter, content: gifSplitterContent },
  "gif-maker-from-video": { Component: GifMakerFromVideo, content: gifMakerFromVideoContent },
  "gif-compressor": { Component: GifCompressor, content: gifCompressorContent },
  "gif-to-video-converter": { Component: GifToVideoConverter, content: gifToVideoConverterContent },
  "gif-speed-changer": { Component: GifSpeedChanger, content: gifSpeedChangerContent },
  "reverse-gif-maker": { Component: ReverseGifMaker, content: reverseGifMakerContent },
  "font-pairing-generator": { Component: FontPairingGenerator, content: fontPairingGeneratorContent },
  "google-fonts-previewer": { Component: GoogleFontsPreviewer, content: googleFontsPreviewerContent },
  "slide-text-extractor": { Component: SlideTextExtractor, content: slideTextExtractorContent },
  "presentation-template-generator": { Component: PresentationTemplateGenerator, content: presentationTemplateGeneratorContent },
  "document-merger": { Component: DocumentMerger, content: documentMergerContent },
  "pivot-table-generator": { Component: PivotTableGenerator, content: pivotTableGeneratorContent },
  "json-tree-viewer": { Component: JsonTreeViewer, content: jsonTreeViewerContent },
  "xml-tree-viewer": { Component: XmlTreeViewer, content: xmlTreeViewerContent },
  "log-file-viewer": { Component: LogFileViewer, content: logFileViewerContent },
  "hex-viewer": { Component: HexViewer, content: hexViewerContent },
  "env-file-viewer": { Component: EnvFileViewer, content: envFileViewerContent },
  "git-patch-diff-file-viewer": { Component: GitPatchDiffFileViewer, content: gitPatchDiffFileViewerContent },
  "cookie-file-viewer": { Component: CookieFileViewer, content: cookieFileViewerContent },
  "svg-viewer": { Component: SvgViewer, content: svgViewerContent },
  "robots-txt-viewer": { Component: RobotsTxtViewer, content: robotsTxtViewerContent },
  "sitemap-viewer": { Component: SitemapViewer, content: sitemapViewerContent },
  "vcard-viewer": { Component: VcardViewer, content: vcardViewerContent },
  "yaml-tree-viewer": { Component: YamlTreeViewer, content: yamlTreeViewerContent },
  "har-file-viewer": { Component: HarFileViewer, content: harFileViewerContent },
  "excel-viewer": { Component: ExcelViewer, content: excelViewerContent },
  "ico-viewer": { Component: IcoViewer, content: icoViewerContent },
  "audio-waveform-viewer": { Component: AudioWaveformViewer, content: audioWaveformViewerContent },
  "video-metadata-viewer": { Component: VideoMetadataViewer, content: videoMetadataViewerContent },
  "font-file-previewer": { Component: FontFilePreviewer, content: fontFilePreviewerContent },
  "qr-code-decoder": { Component: QrCodeDecoder, content: qrCodeDecoderContent },
  "eml-file-viewer": { Component: EmlFileViewer, content: emlFileViewerContent },
  "ics-calendar-file-viewer": { Component: IcsCalendarFileViewer, content: icsCalendarFileViewerContent },
  "epub-viewer": { Component: EpubViewer, content: epubViewerContent },
  "archive-content-viewer": { Component: ArchiveContentViewer, content: archiveContentViewerContent },
  "audio-spectrogram-viewer": { Component: AudioSpectrogramViewer, content: audioSpectrogramViewerContent },
  "pgp-key-viewer": { Component: PgpKeyViewer, content: pgpKeyViewerContent },
  "certificate-chain-viewer": { Component: CertificateChainViewer, content: certificateChainViewerContent },
  "barcode-decoder": { Component: BarcodeDecoder, content: barcodeDecoderContent },
  "word-document-viewer": { Component: WordDocumentViewer, content: wordDocumentViewerContent },
  "odt-viewer": { Component: OdtViewer, content: odtViewerContent },
  "parquet-viewer": { Component: ParquetViewer, content: parquetViewerContent },
  "powerpoint-viewer": { Component: PowerpointViewer, content: powerpointViewerContent },
  "dictionary-lookup": { Component: DictionaryLookup, content: dictionaryLookupContent },
  "word-definition-lookup": { Component: WordDefinitionLookup, content: wordDefinitionLookupContent },
  "text-pronunciation-guide": { Component: TextPronunciationGuide, content: textPronunciationGuideContent },
  "thesaurus-synonym-finder": { Component: ThesaurusSynonymFinder, content: thesaurusSynonymFinderContent },
  "currency-converter": { Component: CurrencyConverter, content: currencyConverterContent },
  "paint-calculator": { Component: PaintCalculator, content: paintCalculatorContent },
  "tile-and-flooring-calculator": { Component: TileAndFlooringCalculator, content: tileAndFlooringCalculatorContent },
  "concrete-and-gravel-calculator": { Component: ConcreteAndGravelCalculator, content: concreteAndGravelCalculatorContent },
  "wallpaper-calculator": { Component: WallpaperCalculator, content: wallpaperCalculatorContent },
  "recipe-scaler": { Component: RecipeScaler, content: recipeScalerContent },
  "ingredient-weight-converter": { Component: IngredientWeightConverter, content: ingredientWeightConverterContent },
  "oven-temperature-converter": { Component: OvenTemperatureConverter, content: ovenTemperatureConverterContent },
  "baking-ratio-calculator": { Component: BakingRatioCalculator, content: bakingRatioCalculatorContent },
  "car-loan-calculator": { Component: CarLoanCalculator, content: carLoanCalculatorContent },
  "fuel-economy-calculator": { Component: FuelEconomyCalculator, content: fuelEconomyCalculatorContent },
  "car-depreciation-estimator": { Component: CarDepreciationEstimator, content: carDepreciationEstimatorContent },
  "trip-budget-calculator": { Component: TripBudgetCalculator, content: tripBudgetCalculatorContent },
  "packing-list-generator": { Component: PackingListGenerator, content: packingListGeneratorContent },
  "flight-time-and-layover-calculator": { Component: FlightTimeAndLayoverCalculator, content: flightTimeAndLayoverCalculatorContent },
  "jet-lag-adjustment-calculator": { Component: JetLagAdjustmentCalculator, content: jetLagAdjustmentCalculatorContent },
  "bill-split-calculator": { Component: BillSplitCalculator, content: billSplitCalculatorContent },
  "rent-vs-buy-calculator": { Component: RentVsBuyCalculator, content: rentVsBuyCalculatorContent },
  "sleep-cycle-calculator": { Component: SleepCycleCalculator, content: sleepCycleCalculatorContent },
  "betting-odds-converter": { Component: BettingOddsConverter, content: bettingOddsConverterContent },
  "zodiac-sign-finder": { Component: ZodiacSignFinder, content: zodiacSignFinderContent },
  "moon-phase-calculator": { Component: MoonPhaseCalculator, content: moonPhaseCalculatorContent },
  "bpm-tap-tempo-tool": { Component: BpmTapTempoTool, content: bpmTapTempoToolContent },
  "online-metronome": { Component: OnlineMetronome, content: onlineMetronomeContent },
  "music-interval-and-scale-calculator": { Component: MusicIntervalAndScaleCalculator, content: musicIntervalAndScaleCalculatorContent },
};

export function getRegisteredTool(slug: string): RegisteredTool | undefined {
  return TOOLS_REGISTRY[slug];
}
