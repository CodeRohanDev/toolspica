"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCanvas } from "@/components/tools/qr-canvas";
import { generateQrCode } from "@/lib/qrcode";

export function VcardQrCodeGenerator() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState("");

  const vcard =
    name.trim().length > 0
      ? [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${name}`,
          org ? `ORG:${org}` : "",
          phone ? `TEL:${phone}` : "",
          email ? `EMAIL:${email}` : "",
          "END:VCARD",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  const result = React.useMemo(() => {
    if (!vcard) return null;
    try {
      return generateQrCode(vcard);
    } catch {
      return null;
    }
  }, [vcard]);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="vcard-name" className="text-sm text-muted-foreground">
            Full name
          </Label>
          <Input
            id="vcard-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="vcard-org" className="text-sm text-muted-foreground">
            Organization (optional)
          </Label>
          <Input
            id="vcard-org"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="Acme Inc."
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="vcard-phone" className="text-sm text-muted-foreground">
            Phone (optional)
          </Label>
          <Input
            id="vcard-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="vcard-email" className="text-sm text-muted-foreground">
            Email (optional)
          </Label>
          <Input
            id="vcard-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="mt-1.5"
          />
        </div>
      </div>

      {vcard && !result && (
        <p className="mt-3 text-sm text-destructive">
          Contact details combined are too long to encode — try shortening the organization name.
        </p>
      )}

      {result && (
        <div className="mt-5 flex justify-center">
          <QrCanvas matrix={result.matrix} size={result.size} filename="vcard-qrcode" />
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Scanning this code on a phone offers to save the contact directly — no manual typing.
        Everything is generated entirely in your browser; nothing is sent anywhere.
      </p>
    </div>
  );
}
