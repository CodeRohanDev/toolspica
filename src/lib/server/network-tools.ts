import dns from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";
import https from "node:https";
import http from "node:http";

export interface DnsRecords {
  a?: string[];
  aaaa?: string[];
  mx?: { exchange: string; priority: number }[];
  txt?: string[][];
  ns?: string[];
  cname?: string[];
  soa?: {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
  };
}

const RECORD_RESOLVERS: Record<
  keyof DnsRecords,
  (domain: string) => Promise<unknown>
> = {
  a: (d) => dns.resolve4(d),
  aaaa: (d) => dns.resolve6(d),
  mx: (d) => dns.resolveMx(d),
  txt: (d) => dns.resolveTxt(d),
  ns: (d) => dns.resolveNs(d),
  cname: (d) => dns.resolveCname(d),
  soa: (d) => dns.resolveSoa(d),
};

export async function lookupDnsRecords(
  domain: string,
  types: (keyof DnsRecords)[]
): Promise<DnsRecords> {
  const result: DnsRecords = {};
  await Promise.all(
    types.map(async (type) => {
      try {
        const value = await RECORD_RESOLVERS[type](domain);
        (result as Record<string, unknown>)[type] = value;
      } catch {
        // Record type not present for this domain — omit it.
      }
    })
  );
  return result;
}

function whoisQuery(server: string, query: string, timeoutMs = 8000): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: server, port: 43 });
    let data = "";
    socket.setTimeout(timeoutMs, () => {
      socket.destroy();
      reject(new Error("WHOIS server timed out."));
    });
    socket.on("connect", () => socket.write(query + "\r\n"));
    socket.on("data", (chunk) => (data += chunk.toString("utf8")));
    socket.on("close", () => resolve(data));
    socket.on("error", (err) => reject(err));
  });
}

const SANITIZE_DOMAIN = /^[a-zA-Z0-9.-]+$/;

export async function whoisLookup(domain: string): Promise<{ server: string; raw: string }> {
  if (!SANITIZE_DOMAIN.test(domain)) {
    throw new Error("Enter a plain domain name (letters, numbers, dots, and hyphens only).");
  }
  const ianaResponse = await whoisQuery("whois.iana.org", domain);
  const referMatch = ianaResponse.match(/refer:\s*(\S+)/i);
  if (!referMatch) {
    return { server: "whois.iana.org", raw: ianaResponse };
  }
  const registryServer = referMatch[1];
  try {
    const raw = await whoisQuery(registryServer, domain);
    return { server: registryServer, raw: raw || ianaResponse };
  } catch {
    return { server: "whois.iana.org", raw: ianaResponse };
  }
}

export interface CertificateInfo {
  subject: Record<string, string>;
  issuer: Record<string, string>;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  serialNumber: string;
  fingerprint256: string;
  subjectAltNames: string[];
  protocol: string | null;
}

export function checkSslCertificate(hostname: string, port = 443, timeoutMs = 8000): Promise<CertificateInfo> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host: hostname, port, servername: hostname, timeout: timeoutMs },
      () => {
        const cert = socket.getPeerCertificate();
        if (!cert || Object.keys(cert).length === 0) {
          socket.end();
          reject(new Error("No certificate returned by this server."));
          return;
        }
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.round((validTo.getTime() - Date.now()) / 86_400_000);
        resolve({
          subject: cert.subject as unknown as Record<string, string>,
          issuer: cert.issuer as unknown as Record<string, string>,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          daysRemaining,
          serialNumber: cert.serialNumber,
          fingerprint256: cert.fingerprint256,
          subjectAltNames: (cert.subjectaltname ?? "")
            .split(",")
            .map((s) => s.trim().replace(/^DNS:/, ""))
            .filter(Boolean),
          protocol: socket.getProtocol(),
        });
        socket.end();
      }
    );
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("Connection timed out."));
    });
    socket.on("error", reject);
  });
}

export interface HttpHeaderResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  finalUrl: string;
  redirected: boolean;
}

export async function checkHttpHeaders(targetUrl: URL): Promise<HttpHeaderResult> {
  const response = await fetch(targetUrl, {
    method: "GET",
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; ToolspicaBot/1.0; +https://toolspica.cloud)" },
    signal: AbortSignal.timeout(10_000),
  });
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return {
    status: response.status,
    statusText: response.statusText,
    headers,
    finalUrl: response.url,
    redirected: response.redirected,
  };
}

export interface SpeedTestResult {
  dnsTimeMs: number;
  connectTimeMs: number;
  tlsTimeMs: number | null;
  ttfbMs: number;
  totalTimeMs: number;
  bytesReceived: number;
  status: number;
}

export function measureWebsiteSpeed(targetUrl: URL, timeoutMs = 12_000): Promise<SpeedTestResult> {
  const isHttps = targetUrl.protocol === "https:";
  const client = isHttps ? https : http;

  return new Promise((resolve, reject) => {
    const t0 = performance.now();
    dns
      .lookup(targetUrl.hostname)
      .then((addr) => {
        const dnsTimeMs = performance.now() - t0;
        const tAfterDns = performance.now();
        let connectTimeMs = 0;
        let tlsTimeMs: number | null = null;

        const req = client.request(
          {
            hostname: targetUrl.hostname,
            path: targetUrl.pathname + targetUrl.search || "/",
            method: "GET",
            headers: { "user-agent": "Mozilla/5.0 (compatible; ToolspicaBot/1.0)" },
            timeout: timeoutMs,
          },
          (res) => {
            const ttfbMs = performance.now() - t0;
            let bytesReceived = 0;
            res.on("data", (chunk) => (bytesReceived += chunk.length));
            res.on("end", () => {
              resolve({
                dnsTimeMs,
                connectTimeMs,
                tlsTimeMs,
                ttfbMs,
                totalTimeMs: performance.now() - t0,
                bytesReceived,
                status: res.statusCode ?? 0,
              });
            });
          }
        );
        req.on("socket", (socket) => {
          socket.once("connect", () => {
            connectTimeMs = performance.now() - tAfterDns;
          });
          socket.once("secureConnect", () => {
            tlsTimeMs = performance.now() - tAfterDns - connectTimeMs;
          });
        });
        req.on("timeout", () => {
          req.destroy();
          reject(new Error("Request timed out."));
        });
        req.on("error", reject);
        req.end();
        void addr;
      })
      .catch(reject);
  });
}

export interface PingResult {
  host: string;
  port: number;
  attempts: { success: boolean; timeMs: number | null }[];
  minMs: number | null;
  avgMs: number | null;
  maxMs: number | null;
  lossPercent: number;
}

export async function tcpPing(hostname: string, port: number, count = 4): Promise<PingResult> {
  const attempts: { success: boolean; timeMs: number | null }[] = [];
  for (let i = 0; i < count; i++) {
    const result = await new Promise<{ success: boolean; timeMs: number | null }>((resolve) => {
      const start = performance.now();
      const socket = net.createConnection({ host: hostname, port, timeout: 5000 });
      socket.once("connect", () => {
        resolve({ success: true, timeMs: performance.now() - start });
        socket.destroy();
      });
      socket.once("timeout", () => {
        socket.destroy();
        resolve({ success: false, timeMs: null });
      });
      socket.once("error", () => {
        resolve({ success: false, timeMs: null });
      });
    });
    attempts.push(result);
  }
  const successful = attempts.filter((a) => a.success && a.timeMs !== null).map((a) => a.timeMs as number);
  return {
    host: hostname,
    port,
    attempts,
    minMs: successful.length ? Math.min(...successful) : null,
    avgMs: successful.length ? successful.reduce((a, b) => a + b, 0) / successful.length : null,
    maxMs: successful.length ? Math.max(...successful) : null,
    lossPercent: Math.round(((count - successful.length) / count) * 100),
  };
}

export interface UptimeResult {
  up: boolean;
  status: number | null;
  responseTimeMs: number | null;
  error: string | null;
  checkedAt: string;
}

export async function checkWebsiteUptime(targetUrl: URL): Promise<UptimeResult> {
  const start = performance.now();
  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; ToolspicaBot/1.0)" },
      signal: AbortSignal.timeout(10_000),
    });
    return {
      up: response.status < 500,
      status: response.status,
      responseTimeMs: performance.now() - start,
      error: null,
      checkedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      up: false,
      status: null,
      responseTimeMs: null,
      error: err instanceof Error ? err.message : "Could not reach this site.",
      checkedAt: new Date().toISOString(),
    };
  }
}

export interface IpGeoInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  org?: string;
  timezone?: string;
  lat?: number;
  lon?: number;
}

export async function ipGeoLookup(ip: string): Promise<IpGeoInfo> {
  const response = await fetch(
    `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,region,regionName,city,timezone,isp,org,lat,lon,query`,
    { signal: AbortSignal.timeout(6000) }
  );
  const data = (await response.json()) as {
    status: string;
    message?: string;
    country?: string;
    countryCode?: string;
    regionName?: string;
    city?: string;
    timezone?: string;
    isp?: string;
    org?: string;
    lat?: number;
    lon?: number;
    query: string;
  };
  if (data.status !== "success") {
    return { ip };
  }
  return {
    ip: data.query,
    city: data.city,
    region: data.regionName,
    country: data.country,
    countryCode: data.countryCode,
    isp: data.isp,
    org: data.org,
    timezone: data.timezone,
    lat: data.lat,
    lon: data.lon,
  };
}

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_RE = /^[0-9a-fA-F:]+$/;

export function isValidIp(ip: string): boolean {
  if (IPV4_RE.test(ip)) {
    return ip.split(".").every((part) => Number(part) >= 0 && Number(part) <= 255);
  }
  return ip.includes(":") && IPV6_RE.test(ip);
}
