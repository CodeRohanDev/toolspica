"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

type Category = "any" | "female" | "male";

const FEMALE_FIRST = [
  "Emma", "Olivia", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia",
  "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Sofia", "Ella", "Grace",
  "Chloe", "Victoria", "Aria", "Scarlett", "Zoey", "Lily", "Hannah", "Layla",
  "Nora", "Zoe", "Stella", "Aurora", "Natalie", "Leah", "Savannah", "Audrey",
  "Maya", "Claire", "Lucy", "Anna", "Caroline", "Ruby", "Alice", "Sadie",
];

const MALE_FIRST = [
  "Liam", "Noah", "Oliver", "William", "Elijah", "James", "Benjamin", "Lucas",
  "Henry", "Alexander", "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan",
  "Jackson", "Levi", "Sebastian", "Mateo", "Jack", "Owen", "Theodore", "Aiden",
  "Samuel", "Joseph", "John", "David", "Wyatt", "Matthew", "Luke", "Asher",
  "Carter", "Julian", "Grayson", "Leo", "Jayden", "Gabriel", "Isaac", "Lincoln",
];

const SURNAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill",
  "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell",
  "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomNameGenerator() {
  const [category, setCategory] = React.useState<Category>("any");
  const [count, setCount] = React.useState("5");
  const [names, setNames] = React.useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
    const result: string[] = [];
    for (let i = 0; i < n; i++) {
      const pool =
        category === "female"
          ? FEMALE_FIRST
          : category === "male"
            ? MALE_FIRST
            : Math.random() < 0.5
              ? FEMALE_FIRST
              : MALE_FIRST;
      result.push(`${pick(pool)} ${pick(SURNAMES)}`);
    }
    setNames(result);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          {(["any", "female", "male"] as Category[]).map((c) => (
            <Button
              key={c}
              type="button"
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
            >
              {c[0].toUpperCase() + c.slice(1)}
            </Button>
          ))}
        </div>
        <div>
          <Label htmlFor="name-count" className="text-sm text-muted-foreground">
            How many (1-50)
          </Label>
          <Input
            id="name-count"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1.5 w-24"
          />
        </div>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
      </div>

      {names.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Generated names</p>
            <CopyButton value={names.join("\n")} />
          </div>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {names.map((name, i) => (
              <li key={i} className="rounded-lg bg-brand-soft px-3 py-1.5 text-sm font-medium">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Names are combined at random from curated lists of common first names and surnames — any
        resemblance to a real person is coincidental.
      </p>
    </div>
  );
}
