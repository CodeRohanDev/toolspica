"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const part of parts) {
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) return null;
    n = (n * 256) + octet;
  }
  return n >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

interface SubnetResult {
  network: string;
  broadcast: string;
  mask: string;
  wildcard: string;
  total: number;
  usable: number;
  firstHost: string;
  lastHost: string;
  ipClass: string;
}

function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  const ipInt = ipToInt(ip);
  if (ipInt === null || cidr < 0 || cidr > 32) return null;

  const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const wildcard = ~mask >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = 2 ** (32 - cidr);
  const usable = cidr >= 31 ? 0 : total - 2;
  const firstHost = cidr >= 31 ? network : network + 1;
  const lastHost = cidr >= 31 ? broadcast : broadcast - 1;

  const firstOctet = (ipInt >>> 24) & 255;
  let ipClass = "N/A";
  if (firstOctet < 128) ipClass = "A";
  else if (firstOctet < 192) ipClass = "B";
  else if (firstOctet < 224) ipClass = "C";
  else if (firstOctet < 240) ipClass = "D (multicast)";
  else ipClass = "E (reserved)";

  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    mask: intToIp(mask),
    wildcard: intToIp(wildcard),
    total,
    usable,
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    ipClass,
  };
}

export function SubnetCalculator() {
  const [ip, setIp] = React.useState("192.168.1.100");
  const [cidr, setCidr] = React.useState("24");

  const cidrNum = parseInt(cidr, 10);
  const result = React.useMemo(
    () => (Number.isInteger(cidrNum) ? calculateSubnet(ip, cidrNum) : null),
    [ip, cidrNum]
  );

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <Label htmlFor="subnet-ip" className="text-sm text-muted-foreground">
            IP address
          </Label>
          <Input
            id="subnet-ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.100"
            className="mt-1.5 font-mono"
          />
        </div>
        <div className="w-28">
          <Label htmlFor="subnet-cidr" className="text-sm text-muted-foreground">
            CIDR prefix
          </Label>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="text-muted-foreground">/</span>
            <Input
              id="subnet-cidr"
              type="number"
              inputMode="numeric"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </div>

      {!result && (ip || cidr) && (
        <p className="mt-3 text-sm text-destructive">
          Enter a valid IPv4 address and a CIDR prefix between /0 and /32.
        </p>
      )}

      {result && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Network address", value: result.network },
            { label: "Broadcast address", value: result.broadcast },
            { label: "Subnet mask", value: result.mask },
            { label: "Wildcard mask", value: result.wildcard },
            { label: "First usable host", value: result.usable ? result.firstHost : "—" },
            { label: "Last usable host", value: result.usable ? result.lastHost : "—" },
            { label: "Usable hosts", value: result.usable.toLocaleString() },
            { label: "IP class (legacy)", value: result.ipClass },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
