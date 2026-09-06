import type { BlogPost } from "@/lib/blog/types";
import { pdfMergePost } from "./pdf-merge";
import { pdfSplitPost } from "./pdf-split";
import { pdfCompressPost } from "./pdf-compress";
import { pdfToJpgPost } from "./pdf-to-jpg";
import { jpgToPdfPost } from "./jpg-to-pdf";
import { pdfRotatePost } from "./pdf-rotate";
import { pdfExtractPagesPost } from "./pdf-extract-pages";
import { pdfDeletePagesPost } from "./pdf-delete-pages";
import { post as pdfReorderPagesPost } from "./pdf-reorder-pages";
import { post as pdfAddWatermarkPost } from "./pdf-add-watermark";
import { post as pdfUnlockPost } from "./pdf-unlock";
import { post as pdfMetadataEditorPost } from "./pdf-metadata-editor";
import { post as pdfPageNumberingPost } from "./pdf-page-numbering";
import { post as pdfToTextPost } from "./pdf-to-text";
import { post as pdfToWordPost } from "./pdf-to-word";
import { post as wordToPdfPost } from "./word-to-pdf";
import { post as pdfToExcelPost } from "./pdf-to-excel";
import { post as excelToPdfPost } from "./excel-to-pdf";
import { post as pdfToPowerpointPost } from "./pdf-to-powerpoint";
import { post as powerpointToPdfPost } from "./powerpoint-to-pdf";
import { post as pdfToPngPost } from "./pdf-to-png";
import { post as pngToPdfPost } from "./png-to-pdf";
import { post as pdfToHtmlPost } from "./pdf-to-html";
import { post as htmlToPdfPost } from "./html-to-pdf";
import { post as pdfEditorPost } from "./pdf-editor";
import { post as pdfSignerPost } from "./pdf-signer";
import { post as pdfFormFillerPost } from "./pdf-form-filler";
import { post as pdfComparePost } from "./pdf-compare";
import { post as pdfRepairPost } from "./pdf-repair";
import { post as pdfOcrPost } from "./pdf-ocr";
import { post as pdfToEpubPost } from "./pdf-to-epub";
import { post as pdfPageSizeConverterPost } from "./pdf-page-size-converter";
import { post as pdfCropPost } from "./pdf-crop";
import { post as pdfRedactPost } from "./pdf-redact";
import { post as pdfFlattenPost } from "./pdf-flatten";
import { post as pdfBookmarkEditorPost } from "./pdf-bookmark-editor";
import { post as pdfHeaderAndFooterAdderPost } from "./pdf-header-and-footer-adder";
import { post as pdfToCsvPost } from "./pdf-to-csv";
import { post as pdfSplitterByFileSizePost } from "./pdf-splitter-by-file-size";
import { post as scanToPdfPost } from "./scan-to-pdf";
import { post as pdfReaderOnlinePost } from "./pdf-reader-online";
import { post as pdfAnnotatorPost } from "./pdf-annotator";
import { post as pdfToMarkdownPost } from "./pdf-to-markdown";
import { post as pdfGrayscaleConverterPost } from "./pdf-grayscale-converter";
import { post as pdfPageExtractorToImagesPost } from "./pdf-page-extractor-to-images";
import { post as imageCompressorPost } from "./image-compressor";
import { post as imageResizerPost } from "./image-resizer";
import { post as cropImagePost } from "./crop-image";
import { post as rotateImagePost } from "./rotate-image";
import { post as flipImagePost } from "./flip-image";
import { post as pngToJpgPost } from "./png-to-jpg";
import { post as jpgToPngPost } from "./jpg-to-png";
import { post as webpToJpgPost } from "./webp-to-jpg";
import { post as jpgToWebpPost } from "./jpg-to-webp";
import { post as avifToJpgPost } from "./avif-to-jpg";
import { post as svgToPngPost } from "./svg-to-png";
import { post as pngToSvgPost } from "./png-to-svg";
import { post as removeBackgroundPost } from "./remove-background";
import { post as blurImagePost } from "./blur-image";
import { post as imageWatermarkPost } from "./image-watermark";
import { post as imageColorPickerPost } from "./image-color-picker";
import { post as imageMetadataViewerPost } from "./image-metadata-viewer";
import { post as imageToBase64Post } from "./image-to-base64";
import { post as base64ToImagePost } from "./base64-to-image";
import { post as imageDpiConverterPost } from "./image-dpi-converter";
import { post as universalImageConverterPost } from "./universal-image-converter";
import { post as heicToJpgPost } from "./heic-to-jpg";
import { post as heicToPngPost } from "./heic-to-png";
import { post as bmpToJpgPost } from "./bmp-to-jpg";
import { post as tiffToJpgPost } from "./tiff-to-jpg";
import { post as gifToPngPost } from "./gif-to-png";
import { post as pngToGifPost } from "./png-to-gif";
import { post as icoConverterPost } from "./ico-converter";
import { post as imageToPdfPost } from "./image-to-pdf";
import { post as imageSplitterPost } from "./image-splitter";
import { post as imageCollageMakerPost } from "./image-collage-maker";
import { post as imageSharpenerPost } from "./image-sharpener";
import { post as imageGrayscaleConverterPost } from "./image-grayscale-converter";
import { post as imageRoundedCornersPost } from "./image-rounded-corners";
import { post as imageBorderAdderPost } from "./image-border-adder";
import { post as memeGeneratorPost } from "./meme-generator";
import { post as photoFiltersPost } from "./photo-filters";
import { post as imageComparePost } from "./image-compare";
import { post as passportPhotoMakerPost } from "./passport-photo-maker";
import { post as imagePixelatorPost } from "./image-pixelator";
import { post as faviconGeneratorPost } from "./favicon-generator";
import { post as socialMediaImageResizerPost } from "./social-media-image-resizer";
import { post as imageExifRemoverPost } from "./image-exif-remover";
import { post as imageNoiseReducerPost } from "./image-noise-reducer";
import { post as batchImageResizerPost } from "./batch-image-resizer";
import { post as imageRotatorByAnglePost } from "./image-rotator-by-angle";
import { post as transparentBackgroundMakerPost } from "./transparent-background-maker";
import { post as svgViewerPost } from "./svg-viewer";
import { post as icoViewerPost } from "./ico-viewer";

export const BLOG_POSTS_HI: Record<string, BlogPost> = {
  "pdf-merge": pdfMergePost,
  "pdf-split": pdfSplitPost,
  "pdf-compress": pdfCompressPost,
  "pdf-to-jpg": pdfToJpgPost,
  "jpg-to-pdf": jpgToPdfPost,
  "pdf-rotate": pdfRotatePost,
  "pdf-extract-pages": pdfExtractPagesPost,
  "pdf-delete-pages": pdfDeletePagesPost,
  "pdf-reorder-pages": pdfReorderPagesPost,
  "pdf-add-watermark": pdfAddWatermarkPost,
  "pdf-unlock": pdfUnlockPost,
  "pdf-metadata-editor": pdfMetadataEditorPost,
  "pdf-page-numbering": pdfPageNumberingPost,
  "pdf-to-text": pdfToTextPost,
  "pdf-to-word": pdfToWordPost,
  "word-to-pdf": wordToPdfPost,
  "pdf-to-excel": pdfToExcelPost,
  "excel-to-pdf": excelToPdfPost,
  "pdf-to-powerpoint": pdfToPowerpointPost,
  "powerpoint-to-pdf": powerpointToPdfPost,
  "pdf-to-png": pdfToPngPost,
  "png-to-pdf": pngToPdfPost,
  "pdf-to-html": pdfToHtmlPost,
  "html-to-pdf": htmlToPdfPost,
  "pdf-editor": pdfEditorPost,
  "pdf-signer": pdfSignerPost,
  "pdf-form-filler": pdfFormFillerPost,
  "pdf-compare": pdfComparePost,
  "pdf-repair": pdfRepairPost,
  "pdf-ocr": pdfOcrPost,
  "pdf-to-epub": pdfToEpubPost,
  "pdf-page-size-converter": pdfPageSizeConverterPost,
  "pdf-crop": pdfCropPost,
  "pdf-redact": pdfRedactPost,
  "pdf-flatten": pdfFlattenPost,
  "pdf-bookmark-editor": pdfBookmarkEditorPost,
  "pdf-header-and-footer-adder": pdfHeaderAndFooterAdderPost,
  "pdf-to-csv": pdfToCsvPost,
  "pdf-splitter-by-file-size": pdfSplitterByFileSizePost,
  "scan-to-pdf": scanToPdfPost,
  "pdf-reader-online": pdfReaderOnlinePost,
  "pdf-annotator": pdfAnnotatorPost,
  "pdf-to-markdown": pdfToMarkdownPost,
  "pdf-grayscale-converter": pdfGrayscaleConverterPost,
  "pdf-page-extractor-to-images": pdfPageExtractorToImagesPost,
  "image-compressor": imageCompressorPost,
  "image-resizer": imageResizerPost,
  "crop-image": cropImagePost,
  "rotate-image": rotateImagePost,
  "flip-image": flipImagePost,
  "png-to-jpg": pngToJpgPost,
  "jpg-to-png": jpgToPngPost,
  "webp-to-jpg": webpToJpgPost,
  "jpg-to-webp": jpgToWebpPost,
  "avif-to-jpg": avifToJpgPost,
  "svg-to-png": svgToPngPost,
  "png-to-svg": pngToSvgPost,
  "remove-background": removeBackgroundPost,
  "blur-image": blurImagePost,
  "image-watermark": imageWatermarkPost,
  "image-color-picker": imageColorPickerPost,
  "image-metadata-viewer": imageMetadataViewerPost,
  "image-to-base64": imageToBase64Post,
  "base64-to-image": base64ToImagePost,
  "image-dpi-converter": imageDpiConverterPost,
  "universal-image-converter": universalImageConverterPost,
  "heic-to-jpg": heicToJpgPost,
  "heic-to-png": heicToPngPost,
  "bmp-to-jpg": bmpToJpgPost,
  "tiff-to-jpg": tiffToJpgPost,
  "gif-to-png": gifToPngPost,
  "png-to-gif": pngToGifPost,
  "ico-converter": icoConverterPost,
  "image-to-pdf": imageToPdfPost,
  "image-splitter": imageSplitterPost,
  "image-collage-maker": imageCollageMakerPost,
  "image-sharpener": imageSharpenerPost,
  "image-grayscale-converter": imageGrayscaleConverterPost,
  "image-rounded-corners": imageRoundedCornersPost,
  "image-border-adder": imageBorderAdderPost,
  "meme-generator": memeGeneratorPost,
  "photo-filters": photoFiltersPost,
  "image-compare": imageComparePost,
  "passport-photo-maker": passportPhotoMakerPost,
  "image-pixelator": imagePixelatorPost,
  "favicon-generator": faviconGeneratorPost,
  "social-media-image-resizer": socialMediaImageResizerPost,
  "image-exif-remover": imageExifRemoverPost,
  "image-noise-reducer": imageNoiseReducerPost,
  "batch-image-resizer": batchImageResizerPost,
  "image-rotator-by-angle": imageRotatorByAnglePost,
  "transparent-background-maker": transparentBackgroundMakerPost,
  "svg-viewer": svgViewerPost,
  "ico-viewer": icoViewerPost,
};
