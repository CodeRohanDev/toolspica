"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";

const COUNTRIES: { name: string; capital: string; continent: string }[] = [
  { name: "Japan", capital: "Tokyo", continent: "Asia" },
  { name: "France", capital: "Paris", continent: "Europe" },
  { name: "Brazil", capital: "Brasília", continent: "South America" },
  { name: "Canada", capital: "Ottawa", continent: "North America" },
  { name: "Australia", capital: "Canberra", continent: "Oceania" },
  { name: "Egypt", capital: "Cairo", continent: "Africa" },
  { name: "India", capital: "New Delhi", continent: "Asia" },
  { name: "Germany", capital: "Berlin", continent: "Europe" },
  { name: "Mexico", capital: "Mexico City", continent: "North America" },
  { name: "Kenya", capital: "Nairobi", continent: "Africa" },
  { name: "Italy", capital: "Rome", continent: "Europe" },
  { name: "Argentina", capital: "Buenos Aires", continent: "South America" },
  { name: "South Korea", capital: "Seoul", continent: "Asia" },
  { name: "Spain", capital: "Madrid", continent: "Europe" },
  { name: "Nigeria", capital: "Abuja", continent: "Africa" },
  { name: "Sweden", capital: "Stockholm", continent: "Europe" },
  { name: "Thailand", capital: "Bangkok", continent: "Asia" },
  { name: "Peru", capital: "Lima", continent: "South America" },
  { name: "Norway", capital: "Oslo", continent: "Europe" },
  { name: "Morocco", capital: "Rabat", continent: "Africa" },
  { name: "New Zealand", capital: "Wellington", continent: "Oceania" },
  { name: "Portugal", capital: "Lisbon", continent: "Europe" },
  { name: "Vietnam", capital: "Hanoi", continent: "Asia" },
  { name: "Chile", capital: "Santiago", continent: "South America" },
  { name: "Greece", capital: "Athens", continent: "Europe" },
  { name: "Indonesia", capital: "Jakarta", continent: "Asia" },
  { name: "Netherlands", capital: "Amsterdam", continent: "Europe" },
  { name: "Colombia", capital: "Bogotá", continent: "South America" },
  { name: "Turkey", capital: "Ankara", continent: "Asia" },
  { name: "South Africa", capital: "Pretoria", continent: "Africa" },
  { name: "Poland", capital: "Warsaw", continent: "Europe" },
  { name: "Philippines", capital: "Manila", continent: "Asia" },
  { name: "Ireland", capital: "Dublin", continent: "Europe" },
  { name: "Ghana", capital: "Accra", continent: "Africa" },
  { name: "Finland", capital: "Helsinki", continent: "Europe" },
  { name: "Malaysia", capital: "Kuala Lumpur", continent: "Asia" },
  { name: "Austria", capital: "Vienna", continent: "Europe" },
  { name: "Ecuador", capital: "Quito", continent: "South America" },
  { name: "Switzerland", capital: "Bern", continent: "Europe" },
  { name: "Tanzania", capital: "Dodoma", continent: "Africa" },
  { name: "Denmark", capital: "Copenhagen", continent: "Europe" },
  { name: "Nepal", capital: "Kathmandu", continent: "Asia" },
  { name: "Uruguay", capital: "Montevideo", continent: "South America" },
  { name: "Iceland", capital: "Reykjavík", continent: "Europe" },
  { name: "Jordan", capital: "Amman", continent: "Asia" },
  { name: "Belgium", capital: "Brussels", continent: "Europe" },
  { name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", continent: "Asia" },
  { name: "Czech Republic", capital: "Prague", continent: "Europe" },
  { name: "Bolivia", capital: "Sucre", continent: "South America" },
  { name: "Croatia", capital: "Zagreb", continent: "Europe" },
];

export function RandomCountryGenerator() {
  const [country, setCountry] = React.useState<(typeof COUNTRIES)[number] | null>(null);

  function generate() {
    setCountry(COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]);
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6 text-center">
      {country ? (
        <div className="rounded-lg bg-brand-soft p-6">
          <p className="text-3xl font-bold">{country.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Capital: <span className="font-medium text-foreground">{country.capital}</span> ·{" "}
            {country.continent}
          </p>
          <div className="mt-3 flex justify-center">
            <CopyButton value={country.name} />
          </div>
        </div>
      ) : (
        <p className="py-8 text-muted-foreground">Click below to pick a random country.</p>
      )}

      <Button type="button" onClick={generate} size="lg" className="mt-5">
        {country ? "Pick another" : "Pick a random country"}
      </Button>

      <p className="mt-4 text-xs text-muted-foreground">
        Draws from a curated list of {COUNTRIES.length} countries across all continents, each
        with its capital city.
      </p>
    </div>
  );
}
