"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Plus, X } from "lucide-react";

interface LineItem {
  description: string;
  qty: number;
  price: number;
}

const WIDTH = 850;
const HEIGHT = 1100;

export function InvoiceTemplateGenerator() {
  const [businessName, setBusinessName] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [invoiceNumber, setInvoiceNumber] = React.useState("INV-001");
  const [date, setDate] = React.useState("");
  const [items, setItems] = React.useState<LineItem[]>([{ description: "", qty: 1, price: 0 }]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  function updateItem(index: number, field: keyof LineItem, value: string) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: field === "description" ? value : Number(value) || 0 } : item
      )
    );
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", qty: 1, price: 0 }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#111827";

    ctx.font = "bold 36px Arial";
    ctx.fillText("INVOICE", 50, 70);

    ctx.font = "16px Arial";
    ctx.fillText(businessName || "Your Business Name", 50, 110);
    ctx.fillStyle = "#6b7280";
    ctx.fillText(`Invoice #: ${invoiceNumber}`, WIDTH - 250, 70);
    ctx.fillText(`Date: ${date || "—"}`, WIDTH - 250, 95);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Bill to:", 50, 160);
    ctx.font = "14px Arial";
    ctx.fillText(clientName || "Client Name", 50, 180);

    let y = 240;
    ctx.strokeStyle = "#d1d5db";
    ctx.beginPath();
    ctx.moveTo(50, y - 20);
    ctx.lineTo(WIDTH - 50, y - 20);
    ctx.stroke();

    ctx.font = "bold 13px Arial";
    ctx.fillText("Description", 50, y);
    ctx.fillText("Qty", WIDTH - 280, y);
    ctx.fillText("Price", WIDTH - 190, y);
    ctx.fillText("Total", WIDTH - 100, y);
    y += 15;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(WIDTH - 50, y);
    ctx.stroke();
    y += 30;

    ctx.font = "13px Arial";
    for (const item of items) {
      ctx.fillText(item.description || "—", 50, y);
      ctx.fillText(String(item.qty), WIDTH - 280, y);
      ctx.fillText(`$${item.price.toFixed(2)}`, WIDTH - 190, y);
      ctx.fillText(`$${(item.qty * item.price).toFixed(2)}`, WIDTH - 100, y);
      y += 28;
    }

    y += 10;
    ctx.beginPath();
    ctx.moveTo(WIDTH - 300, y);
    ctx.lineTo(WIDTH - 50, y);
    ctx.stroke();
    y += 30;
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Total: $${total.toFixed(2)}`, WIDTH - 300, y);
  }, [businessName, clientName, invoiceNumber, date, items, total]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${invoiceNumber || "invoice"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="text-sm text-muted-foreground">Your business name</Label>
          <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Client name</Label>
          <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Invoice number</Label>
          <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="January 1, 2026" className="mt-1.5" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" className="flex-1" />
            <Input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", e.target.value)} className="w-16" min={0} />
            <Input type="number" value={item.price} onChange={(e) => updateItem(i, "price", e.target.value)} className="w-24" min={0} step={0.01} />
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(i)} aria-label="Remove item">
                <X className="size-4 text-muted-foreground hover:text-destructive" />
              </button>
            )}
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addItem}>
        <Plus className="size-4" /> Add line item
      </Button>

      <div className="mt-5 flex flex-col items-center gap-3 border-t pt-4">
        <canvas ref={canvasRef} className="max-h-[500px] w-full max-w-[400px] rounded-lg border" style={{ aspectRatio: "850 / 1100" }} />
        <Button type="button" onClick={download}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
