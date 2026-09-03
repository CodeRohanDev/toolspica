import { whoisLookup } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = (searchParams.get("domain") ?? "").trim().toLowerCase();

  if (!domain || !domain.includes(".")) {
    return Response.json({ error: "Enter a valid domain name, e.g. example.com." }, { status: 400 });
  }

  try {
    const result = await whoisLookup(domain);
    if (!result.raw.trim()) {
      return Response.json({ error: "No WHOIS data was returned for this domain." }, { status: 404 });
    }
    return Response.json({ domain, server: result.server, raw: result.raw });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "WHOIS lookup failed for this domain." },
      { status: 502 }
    );
  }
}
