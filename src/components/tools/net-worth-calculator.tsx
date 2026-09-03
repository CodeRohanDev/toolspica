"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface Item {
  id: number;
  label: string;
  value: string;
}

let nextId = 5;

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function ItemList({
  title,
  items,
  onAdd,
  onRemove,
  onUpdate,
}: {
  title: string;
  items: Item[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, field: keyof Item, value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_auto_auto] items-end gap-2">
            <Input
              value={item.label}
              onChange={(e) => onUpdate(item.id, "label", e.target.value)}
              placeholder="Description"
            />
            <Input
              type="number"
              inputMode="decimal"
              value={item.value}
              onChange={(e) => onUpdate(item.id, "value", e.target.value)}
              placeholder="0"
              className="w-28"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              disabled={items.length <= 1}
              aria-label="Remove item"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onAdd} className="mt-2">
        <Plus className="size-3.5" /> Add {title.toLowerCase().slice(0, -1)}
      </Button>
    </div>
  );
}

export function NetWorthCalculator() {
  const [assets, setAssets] = React.useState<Item[]>([
    { id: 1, label: "Cash & savings", value: "" },
    { id: 2, label: "Investments", value: "" },
  ]);
  const [liabilities, setLiabilities] = React.useState<Item[]>([
    { id: 3, label: "Credit card debt", value: "" },
    { id: 4, label: "Loans", value: "" },
  ]);

  function addAsset() {
    setAssets((prev) => [...prev, { id: nextId++, label: "", value: "" }]);
  }
  function addLiability() {
    setLiabilities((prev) => [...prev, { id: nextId++, label: "", value: "" }]);
  }

  const totalAssets = round2(assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0));
  const totalLiabilities = round2(
    liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0)
  );
  const netWorth = round2(totalAssets - totalLiabilities);

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <ItemList
          title="Assets"
          items={assets}
          onAdd={addAsset}
          onRemove={(id) => setAssets((prev) => prev.filter((a) => a.id !== id))}
          onUpdate={(id, field, value) =>
            setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
          }
        />
        <ItemList
          title="Liabilities"
          items={liabilities}
          onAdd={addLiability}
          onRemove={(id) => setLiabilities((prev) => prev.filter((l) => l.id !== id))}
          onUpdate={(id, field, value) =>
            setLiabilities((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
          }
        />
      </div>

      <div className="mt-6 rounded-lg bg-brand-soft p-4 text-center">
        <p className="text-3xl font-semibold tabular-nums">{netWorth}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          net worth (${totalAssets} assets − ${totalLiabilities} liabilities)
        </p>
      </div>
    </div>
  );
}
