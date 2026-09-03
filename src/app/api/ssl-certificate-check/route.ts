import { assertPublicHostname, UnsafeTargetError } from "@/lib/server/ssrf-guard";
import { checkSslCertificate } from "@/lib/server/network-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawHost = (searchParams.get("host") ?? "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");

  if (!rawHost) {
    return Response.json({ error: "Enter a domain name, e.g. example.com." }, { status: 400 });
  }

  try {
    const { hostname } = await assertPublicHostname(rawHost);
    const info = await checkSslCertificate(hostname);
    return Response.json({ host: hostname, ...info });
  } catch (err) {
    const status = err instanceof UnsafeTargetError ? 400 : 502;
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not check this site's SSL certificate." },
      { status }
    );
  }
}
