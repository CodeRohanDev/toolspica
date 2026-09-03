"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OUI_VENDORS: Record<string, string> = {
  "00000C": "Cisco Systems, Inc.",
  "001B63": "Apple, Inc.",
  "3C0754": "Apple, Inc.",
  A45E60: "Apple, Inc.",
  F01898: "Apple, Inc.",
  "000393": "Apple, Inc.",
  B827EB: "Raspberry Pi Foundation",
  DCA632: "Raspberry Pi Trading Ltd",
  E45F01: "Raspberry Pi Trading Ltd",
  "005056": "VMware, Inc.",
  "000C29": "VMware, Inc.",
  "080027": "PCS Systemtechnik GmbH (Oracle VirtualBox)",
  "00155D": "Microsoft Corporation (Hyper-V)",
  "00163E": "Xensource, Inc.",
  "001C42": "Parallels, Inc.",
  D0817A: "Dell Inc.",
  B8CA3A: "Dell Inc.",
  "001422": "Dell Inc.",
  "3C5AB4": "Google, Inc.",
  F4F5D8: "Google, Inc.",
  "001A11": "Google, Inc.",
};

interface MacLookupResult {
  normalized: string;
  oui: string;
  vendor: string | null;
}

function lookupMac(input: string): MacLookupResult | null {
  const hex = input.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
  if (hex.length < 6) return null;
  const oui = hex.slice(0, 6);
  const normalized = hex
    .padEnd(12, "0")
    .slice(0, 12)
    .match(/.{1,2}/g)!
    .join(":");
  return { normalized, oui, vendor: OUI_VENDORS[oui] ?? null };
}

export function MacAddressLookupTool() {
  const [mac, setMac] = React.useState("B8:27:EB:12:34:56");
  const result = React.useMemo(() => lookupMac(mac), [mac]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <Label htmlFor="mac-input" className="text-sm text-muted-foreground">
        MAC address
      </Label>
      <Input
        id="mac-input"
        value={mac}
        onChange={(e) => setMac(e.target.value)}
        placeholder="00:1B:63:AA:BB:CC"
        className="mt-1.5 font-mono"
      />

      {result && (
        <div className="mt-5 space-y-3">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Normalized address
            </p>
            <p className="mt-1 font-mono text-sm font-semibold">{result.normalized}</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              OUI (vendor prefix)
            </p>
            <p className="mt-1 font-mono text-sm font-semibold">{result.oui}</p>
          </div>
          <div className="rounded-lg border bg-brand-soft p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Vendor
            </p>
            <p className="mt-1 text-sm font-semibold">
              {result.vendor ?? "Not in our curated vendor list"}
            </p>
            {!result.vendor && (
              <p className="mt-1 text-xs text-muted-foreground">
                Try the official{" "}
                <a
                  href="https://standards-oui.ieee.org/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="underline"
                >
                  IEEE OUI registry
                </a>{" "}
                for exhaustive vendor coverage.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
