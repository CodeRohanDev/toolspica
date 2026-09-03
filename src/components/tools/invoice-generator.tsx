"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Plus, Printer } from "lucide-react";

interface LineItem {
  id: number;
  description: string;
  qty: string;
  rate: string;
}

let nextId = 2;

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function InvoiceGenerator() {
  const [fromInfo, setFromInfo] = React.useState("");
  const [toInfo, setToInfo] = React.useState("");
  const [invoiceNumber, setInvoiceNumber] = React.useState("INV-001");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [taxRate, setTaxRate] = React.useState("0");
  const [items, setItems] = React.useState<LineItem[]>([
    { id: 1, description: "", qty: "1", rate: "" },
  ]);

  function addItem() {
    setItems((prev) => [...prev, { id: nextId++, description: "", qty: "1", rate: "" }]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateItem(id: number, field: keyof LineItem, value: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  const lineTotals = items.map((item) => ({
    ...item,
    total: (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0),
  }));
  const subtotal = round2(lineTotals.reduce((sum, i) => sum + i.total, 0));
  const taxAmount = round2(subtotal * ((parseFloat(taxRate) || 0) / 100));
  const total = round2(subtotal + taxAmount);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="inv-from" className="text-sm text-muted-foreground">
            From (your business)
          </Label>
          <Textarea
            id="inv-from"
            value={fromInfo}
            onChange={(e) => setFromInfo(e.target.value)}
            rows={3}
            className="mt-1.5 text-sm"
            placeholder="Your Name / Business&#10;Address&#10;Email"
          />
        </div>
        <div>
          <Label htmlFor="inv-to" className="text-sm text-muted-foreground">
            Bill to
          </Label>
          <Textarea
            id="inv-to"
            value={toInfo}
            onChange={(e) => setToInfo(e.target.value)}
            rows={3}
            className="mt-1.5 text-sm"
            placeholder="Client Name&#10;Address&#10;Email"
          />
        </div>
        <div>
          <Label htmlFor="inv-number" className="text-sm text-muted-foreground">
            Invoice number
          </Label>
          <Input
            id="inv-number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="inv-date" className="text-sm text-muted-foreground">
            Invoice date
          </Label>
          <Input
            id="inv-date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Line items</p>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2">
            <Input
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="Description"
            />
            <Input
              type="number"
              inputMode="decimal"
              min={0}
              value={item.qty}
              onChange={(e) => updateItem(item.id, "qty", e.target.value)}
              placeholder="Qty"
              className="w-16"
            />
            <Input
              type="number"
              inputMode="decimal"
              min={0}
              value={item.rate}
              onChange={(e) => updateItem(item.id, "rate", e.target.value)}
              placeholder="Rate"
              className="w-24"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              disabled={items.length <= 1}
              aria-label="Remove line item"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="size-3.5" /> Add line item
        </Button>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Label htmlFor="inv-tax" className="text-sm text-muted-foreground">
          Tax rate (%)
        </Label>
        <Input
          id="inv-tax"
          type="number"
          inputMode="decimal"
          min={0}
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="w-20"
        />
      </div>

      <div className="mt-4 rounded-lg bg-brand-soft p-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="tabular-nums">{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span className="tabular-nums">{taxAmount}</span>
        </div>
        <div className="mt-1 flex justify-between border-t pt-1 text-lg font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{total}</span>
        </div>
      </div>

      <Button type="button" onClick={() => window.print()} className="mt-4">
        <Printer className="size-3.5" /> Print / save as PDF
      </Button>
    </div>
  );
}
