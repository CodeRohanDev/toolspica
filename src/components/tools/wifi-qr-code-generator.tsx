"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QrCanvas } from "@/components/tools/qr-canvas";
import { generateQrCode } from "@/lib/qrcode";

type Security = "WPA" | "WEP" | "nopass";

function escapeWifiValue(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function WifiQrCodeGenerator() {
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [security, setSecurity] = React.useState<Security>("WPA");
  const [hidden, setHidden] = React.useState(false);

  const wifiString =
    ssid.trim().length > 0
      ? `WIFI:T:${security};S:${escapeWifiValue(ssid)};${
          security === "nopass" ? "" : `P:${escapeWifiValue(password)};`
        }${hidden ? "H:true;" : ""};`
      : "";

  const result = React.useMemo(() => {
    if (!wifiString) return null;
    try {
      return generateQrCode(wifiString);
    } catch {
      return null;
    }
  }, [wifiString]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="wifi-ssid" className="text-sm text-muted-foreground">
            Network name (SSID)
          </Label>
          <Input
            id="wifi-ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="MyHomeNetwork"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="wifi-password" className="text-sm text-muted-foreground">
            Password
          </Label>
          <Input
            id="wifi-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1.5"
            disabled={security === "nopass"}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-sm text-muted-foreground">Security type</Label>
        <div className="mt-1.5 flex gap-2">
          {(["WPA", "WEP", "nopass"] as Security[]).map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant={security === s ? "default" : "outline"}
              onClick={() => setSecurity(s)}
            >
              {s === "nopass" ? "None" : s}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          id="wifi-hidden"
          type="checkbox"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          className="size-4 rounded border-input"
        />
        <Label htmlFor="wifi-hidden" className="text-sm font-normal">
          Hidden network
        </Label>
      </div>

      {wifiString && !result && (
        <p className="mt-3 text-sm text-destructive">
          Network name and password combined are too long to encode.
        </p>
      )}

      {result && (
        <div className="mt-5 flex justify-center">
          <QrCanvas matrix={result.matrix} size={result.size} filename="wifi-qrcode" />
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Scanning this code on a phone connects it directly to the network — no typing required.
        Your credentials never leave your browser; the QR code is generated entirely locally.
      </p>
    </div>
  );
}
