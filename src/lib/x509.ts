// Minimal ASN.1 DER parser + X.509 certificate field extractor (RFC 5280).
// Verified field-for-field against `openssl x509 -text` output on a real
// certificate. Handles the fields a certificate viewer actually needs —
// not a full X.509/PKIX validation library.

interface DerNode {
  tagClass: number;
  constructed: boolean;
  tagNumber: number;
  value: Uint8Array;
  children?: DerNode[];
}

function parseDer(bytes: Uint8Array): DerNode[] {
  const nodes: DerNode[] = [];
  let offset = 0;
  while (offset < bytes.length) {
    const tagByte = bytes[offset++];
    const tagClass = tagByte >> 6;
    const constructed = (tagByte & 0x20) !== 0;
    let tagNumber = tagByte & 0x1f;
    if (tagNumber === 0x1f) {
      tagNumber = 0;
      while (true) {
        const b = bytes[offset++];
        tagNumber = (tagNumber << 7) | (b & 0x7f);
        if ((b & 0x80) === 0) break;
      }
    }
    let length = bytes[offset++];
    if (length & 0x80) {
      const numBytes = length & 0x7f;
      length = 0;
      for (let i = 0; i < numBytes; i++) length = (length << 8) | bytes[offset++];
    }
    const valueStart = offset;
    const valueEnd = valueStart + length;
    const value = bytes.slice(valueStart, valueEnd);
    const node: DerNode = { tagClass, constructed, tagNumber, value };
    if (constructed) node.children = parseDer(value);
    nodes.push(node);
    offset = valueEnd;
  }
  return nodes;
}

function oidToString(bytes: Uint8Array): string {
  const parts: number[] = [];
  const first = bytes[0];
  parts.push(Math.floor(first / 40), first % 40);
  let value = 0;
  for (let i = 1; i < bytes.length; i++) {
    const b = bytes[i];
    value = (value << 7) | (b & 0x7f);
    if ((b & 0x80) === 0) {
      parts.push(value);
      value = 0;
    }
  }
  return parts.join(".");
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(":");
}

function parseTime(node: DerNode): Date {
  const str = new TextDecoder("ascii").decode(node.value);
  if (node.tagNumber === 23) {
    // UTCTime: YYMMDDHHMMSSZ
    const yy = parseInt(str.slice(0, 2), 10);
    const year = yy < 50 ? 2000 + yy : 1900 + yy;
    return new Date(
      Date.UTC(
        year,
        parseInt(str.slice(2, 4), 10) - 1,
        parseInt(str.slice(4, 6), 10),
        parseInt(str.slice(6, 8), 10),
        parseInt(str.slice(8, 10), 10),
        parseInt(str.slice(10, 12) || "0", 10)
      )
    );
  }
  // GeneralizedTime: YYYYMMDDHHMMSSZ
  return new Date(
    Date.UTC(
      parseInt(str.slice(0, 4), 10),
      parseInt(str.slice(4, 6), 10) - 1,
      parseInt(str.slice(6, 8), 10),
      parseInt(str.slice(8, 10), 10),
      parseInt(str.slice(10, 12), 10),
      parseInt(str.slice(12, 14) || "0", 10)
    )
  );
}

const OID_NAMES: Record<string, string> = {
  "2.5.4.3": "CN",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "2.5.4.6": "C",
  "2.5.4.8": "ST",
  "2.5.4.7": "L",
  "1.2.840.10045.4.3.2": "ecdsa-with-SHA256",
  "1.2.840.10045.4.3.3": "ecdsa-with-SHA384",
  "1.2.840.113549.1.1.5": "sha1WithRSAEncryption",
  "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
  "1.2.840.113549.1.1.12": "sha384WithRSAEncryption",
  "2.5.29.17": "subjectAltName",
};

function parseName(rdnSeqNode: DerNode): [string, string][] {
  const parts: [string, string][] = [];
  for (const rdnSet of rdnSeqNode.children ?? []) {
    for (const atv of rdnSet.children ?? []) {
      const [oidNode, valNode] = atv.children ?? [];
      if (!oidNode || !valNode) continue;
      const oid = oidToString(oidNode.value);
      const name = OID_NAMES[oid] ?? oid;
      const value = new TextDecoder("utf-8").decode(valNode.value);
      parts.push([name, value]);
    }
  }
  return parts;
}

export interface X509Certificate {
  version: number;
  serialNumber: string;
  signatureAlgorithm: string;
  issuer: [string, string][];
  subject: [string, string][];
  notBefore: Date;
  notAfter: Date;
  subjectAltNames: string[];
  daysRemaining: number;
}

export function parsePemCertificate(pem: string): X509Certificate {
  const base64 = pem
    .trim()
    .replace(/-----BEGIN CERTIFICATE-----/, "")
    .replace(/-----END CERTIFICATE-----/, "")
    .replace(/\s+/g, "");
  if (!base64) throw new Error("Paste a PEM-encoded certificate (starting with -----BEGIN CERTIFICATE-----).");

  let der: Uint8Array;
  try {
    const binary = atob(base64);
    der = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) der[i] = binary.charCodeAt(i);
  } catch {
    throw new Error("Couldn't decode this as Base64 — check the certificate was pasted correctly.");
  }

  let cert: DerNode[];
  try {
    cert = parseDer(der);
  } catch {
    throw new Error("Couldn't parse this as a DER-encoded certificate.");
  }

  const [tbs] = cert[0]?.children ?? [];
  if (!tbs) throw new Error("This doesn't look like a valid X.509 certificate.");

  let idx = 0;
  let version = 1;
  const first = tbs.children?.[0];
  if (first && first.tagClass === 2 && first.tagNumber === 0) {
    version = (first.children?.[0]?.value[0] ?? 0) + 1;
    idx = 1;
  }

  const serialNode = tbs.children![idx++];
  const serialNumber = bytesToHex(serialNode.value);
  const sigAlgNode = tbs.children![idx++];
  const sigOid = oidToString(sigAlgNode.children![0].value);
  const issuerNode = tbs.children![idx++];
  const issuer = parseName(issuerNode);
  const validityNode = tbs.children![idx++];
  const notBefore = parseTime(validityNode.children![0]);
  const notAfter = parseTime(validityNode.children![1]);
  const subjectNode = tbs.children![idx++];
  const subject = parseName(subjectNode);

  const subjectAltNames: string[] = [];
  for (const node of tbs.children ?? []) {
    if (node.tagClass === 2 && node.tagNumber === 3) {
      const extSeq = node.children?.[0];
      for (const ext of extSeq?.children ?? []) {
        const extOid = oidToString(ext.children![0].value);
        if (OID_NAMES[extOid] === "subjectAltName") {
          const valueNode = ext.children![ext.children!.length - 1];
          const sanNodes = parseDer(valueNode.value);
          for (const gn of sanNodes[0]?.children ?? []) {
            if (gn.tagNumber === 2) subjectAltNames.push(new TextDecoder("ascii").decode(gn.value));
          }
        }
      }
    }
  }

  return {
    version,
    serialNumber,
    signatureAlgorithm: OID_NAMES[sigOid] ?? sigOid,
    issuer,
    subject,
    notBefore,
    notAfter,
    subjectAltNames,
    daysRemaining: Math.round((notAfter.getTime() - Date.now()) / 86_400_000),
  };
}
