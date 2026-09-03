"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import { RefreshCw } from "lucide-react";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  org?: string;
  timezone?: string;
}

export function MyIpAddressFinder() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<IpInfo | null>(null);

  const fetchIp = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ip-lookup");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not detect your IP address.");
      setInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not detect your IP address.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchIp();
  }, [fetchIp]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      {loading && <p className="text-sm text-muted-foreground">Detecting your IP address...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {info && !loading && (
        <>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-brand-soft p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Your public IP address
              </p>
              <p className="mt-1 font-mono text-2xl font-bold">{info.ip}</p>
            </div>
            <div className="flex gap-2">
              <CopyButton value={info.ip} />
              <Button type="button" variant="outline" size="icon" onClick={fetchIp} aria-label="Refresh">
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "City", value: info.city ?? "—" },
              { label: "Region", value: info.region ?? "—" },
              { label: "Country", value: info.country ? `${info.country} (${info.countryCode})` : "—" },
              { label: "ISP", value: info.isp ?? "—" },
              { label: "Organization", value: info.org ?? "—" },
              { label: "Timezone", value: info.timezone ?? "—" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border bg-card p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold break-words">{item.value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
