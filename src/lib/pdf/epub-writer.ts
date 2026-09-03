import { createZip, type ZipEntry } from "@/lib/zip-writer";

export interface EpubChapter {
  title: string;
  html: string;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Builds a minimal, valid EPUB3 file (mimetype + container.xml + OPF package + NCX + XHTML chapters). */
export function buildEpub(title: string, author: string, chapters: EpubChapter[]): Uint8Array {
  const encoder = new TextEncoder();
  const uid = `urn:uuid:tf-${Date.now()}`;
  const modified = new Date().toISOString().replace(/\.\d+Z$/, "Z");

  const manifestItems = chapters
    .map((_, i) => `    <item id="chap${i + 1}" href="chap${i + 1}.xhtml" media-type="application/xhtml+xml"/>`)
    .join("\n");
  const spineItems = chapters.map((_, i) => `    <itemref idref="chap${i + 1}"/>`).join("\n");

  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">${escapeXml(uid)}</dc:identifier>
    <dc:title>${escapeXml(title)}</dc:title>
    <dc:language>en</dc:language>
    <dc:creator>${escapeXml(author)}</dc:creator>
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
${manifestItems}
  </manifest>
  <spine toc="ncx">
${spineItems}
  </spine>
</package>`;

  const navPoints = chapters
    .map(
      (c, i) => `    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${escapeXml(c.title)}</text></navLabel>
      <content src="chap${i + 1}.xhtml"/>
    </navPoint>`
    )
    .join("\n");

  const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${escapeXml(uid)}"/>
  </head>
  <docTitle><text>${escapeXml(title)}</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`;

  const navLis = chapters
    .map((c, i) => `      <li><a href="chap${i + 1}.xhtml">${escapeXml(c.title)}</a></li>`)
    .join("\n");
  const navXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>${escapeXml(title)}</title></head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>${escapeXml(title)}</h1>
    <ol>
${navLis}
    </ol>
  </nav>
</body>
</html>`;

  const container = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;

  const entries: ZipEntry[] = [
    { name: "mimetype", data: encoder.encode("application/epub+zip") },
    { name: "META-INF/container.xml", data: encoder.encode(container) },
    { name: "OEBPS/content.opf", data: encoder.encode(opf) },
    { name: "OEBPS/toc.ncx", data: encoder.encode(ncx) },
    { name: "OEBPS/nav.xhtml", data: encoder.encode(navXhtml) },
    ...chapters.map((c, i) => ({
      name: `OEBPS/chap${i + 1}.xhtml`,
      data: encoder.encode(
        `<?xml version="1.0" encoding="UTF-8"?>\n<html xmlns="http://www.w3.org/1999/xhtml"><head><title>${escapeXml(
          c.title
        )}</title></head><body>\n${c.html}\n</body></html>`
      ),
    })),
  ];

  return createZip(entries);
}
