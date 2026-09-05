"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Person {
  id: number;
  name: string;
  amount: number;
}

let nextId = 3;

export function BillSplitCalculator() {
  const [billTotal, setBillTotal] = React.useState(100);
  const [tipPercent, setTipPercent] = React.useState(15);
  const [splitEvenly, setSplitEvenly] = React.useState(true);
  const [people, setPeople] = React.useState<Person[]>([
    { id: 1, name: "Person 1", amount: 50 },
    { id: 2, name: "Person 2", amount: 50 },
  ]);

  const tipAmount = billTotal * (tipPercent / 100);
  const grandTotal = billTotal + tipAmount;

  const addPerson = () => setPeople((prev) => [...prev, { id: nextId++, name: `Person ${prev.length + 1}`, amount: 0 }]);
  const removePerson = (id: number) => setPeople((prev) => (prev.length > 1 ? prev.filter((p) => p.id !== id) : prev));
  const updatePerson = (id: number, field: "name" | "amount", value: string | number) => {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const shares = splitEvenly
    ? people.map((p) => ({ ...p, share: grandTotal / people.length }))
    : (() => {
        const sumAmounts = people.reduce((s, p) => s + p.amount, 0) || 1;
        return people.map((p) => ({ ...p, share: (p.amount / sumAmounts) * grandTotal }));
      })();

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Bill total ($)</Label>
          <Input type="number" value={billTotal} onChange={(e) => setBillTotal(Number(e.target.value))} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Tip (%)</Label>
          <Input type="number" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="mt-1" />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setSplitEvenly(true)}
          className={`rounded-md border px-3 py-1.5 text-sm ${splitEvenly ? "bg-primary text-primary-foreground" : ""}`}
        >
          Split evenly
        </button>
        <button
          onClick={() => setSplitEvenly(false)}
          className={`rounded-md border px-3 py-1.5 text-sm ${!splitEvenly ? "bg-primary text-primary-foreground" : ""}`}
        >
          Split by what each person ordered
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {shares.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <Input value={p.name} onChange={(e) => updatePerson(p.id, "name", e.target.value)} className="flex-1" />
            {!splitEvenly && (
              <Input
                type="number"
                value={p.amount}
                onChange={(e) => updatePerson(p.id, "amount", Number(e.target.value))}
                className="w-24"
                placeholder="Their subtotal"
              />
            )}
            <span className="w-24 text-right text-sm font-medium">${p.share.toFixed(2)}</span>
            {people.length > 1 && (
              <button onClick={() => removePerson(p.id)} className="text-xs text-muted-foreground hover:text-foreground">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-3" onClick={addPerson}>
        + Add person
      </Button>

      <div className="mt-4 flex justify-between border-t pt-3 text-sm">
        <span className="text-muted-foreground">Tip amount</span>
        <span>${tipAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm font-medium">
        <span>Grand total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
