import { assertPublicHostname, UnsafeTargetError } from "@/lib/server/ssrf-guard";
import { tcpPing } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_PORTS = new Set([80, 443, 22, 21, 25]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawHost = (searchParams.get("host") ?? "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  const port = Number(searchParams.get("port") ?? "443");

  if (!rawHost) {
    return Response.json({ error: "Enter a hostname, e.g. example.com." }, { status: 400 });
  }
  if (!ALLOWED_PORTS.has(port)) {
    return Response.json({ error: "Unsupported port." }, { status: 400 });
  }

  try {
    const { hostname } = await assertPublicHostname(rawHost);
    const result = await tcpPing(hostname, port);
    return Response.json(result);
  } catch (err) {
    const status = err instanceof UnsafeTargetError ? 400 : 502;
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not reach this host." },
      { status }
    );
  }
}
