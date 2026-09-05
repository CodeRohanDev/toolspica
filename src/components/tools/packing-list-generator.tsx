"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/tools/copy-button";

type TripType = "Beach" | "City/business" | "Hiking/outdoors" | "Winter/ski" | "International";

const BASE_ITEMS = ["Passport/ID", "Phone charger", "Travel adapter", "Toothbrush & toothpaste", "Medications", "Wallet & cards"];

const TRIP_ITEMS: Record<TripType, string[]> = {
  Beach: ["Swimsuit", "Sunscreen", "Sunglasses", "Flip-flops", "Beach towel", "Hat"],
  "City/business": ["Laptop & charger", "Business attire", "Comfortable walking shoes", "Notebook/pen"],
  "Hiking/outdoors": ["Hiking boots", "Rain jacket", "Backpack", "Water bottle", "First aid kit", "Headlamp"],
  "Winter/ski": ["Thermal layers", "Winter coat", "Gloves", "Wool socks", "Snow boots", "Lip balm"],
  International: ["Passport copies", "Travel insurance docs", "Currency/cash", "SIM card or eSIM", "Universal adapter"],
};

export function PackingListGenerator() {
  const [tripType, setTripType] = React.useState<TripType>("Beach");
  const [days, setDays] = React.useState(5);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const clothingCount = Math.max(days, 1);
  const items = [
    ...BASE_ITEMS,
    `Underwear (x${clothingCount})`,
    `Socks (x${clothingCount})`,
    `T-shirts/tops (x${Math.ceil(clothingCount * 0.8)})`,
    ...TRIP_ITEMS[tripType],
  ];

  const listText = items.map((i) => `[ ] ${i}`).join("\n");

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Trip type</Label>
          <select value={tripType} onChange={(e) => setTripType(e.target.value as TripType)} className="mt-1 w-full rounded-md border bg-transparent px-2 py-1.5 text-sm">
            {Object.keys(TRIP_ITEMS).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Trip length (days)</Label>
          <Input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Your packing list</p>
          <CopyButton value={listText} />
        </div>
        <ul className="mt-2 space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={(e) => setChecked({ ...checked, [item]: e.target.checked })}
              />
              <span className={checked[item] ? "line-through text-muted-foreground" : ""}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Textarea readOnly value={listText} rows={4} className="mt-3 hidden" />
    </div>
  );
}
