"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type AngleMode = "deg" | "rad";

interface Token {
  type: "num" | "ident" | "op" | "lparen" | "rparen";
  value: string;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let num = ch;
      i++;
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "num", value: num });
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      let ident = ch;
      i++;
      while (i < input.length && /[a-zA-Z]/.test(input[i])) {
        ident += input[i];
        i++;
      }
      tokens.push({ type: "ident", value: ident });
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "lparen", value: ch });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen", value: ch });
      i++;
      continue;
    }
    if ("+-*/^".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }
    throw new Error(`Unexpected character: ${ch}`);
  }
  return tokens;
}

const FUNCTIONS = ["sin", "cos", "tan", "log", "ln", "sqrt"];
const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

function parseExpression(tokens: Token[], angleMode: AngleMode): number {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function next() {
    return tokens[pos++];
  }

  function parseExpr(): number {
    let value = parseTerm();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = next().value;
      const rhs = parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  function parseTerm(): number {
    let value = parsePower();
    while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
      const op = next().value;
      const rhs = parsePower();
      value = op === "*" ? value * rhs : value / rhs;
    }
    return value;
  }

  function parsePower(): number {
    const base = parseUnary();
    if (peek() && peek().type === "op" && peek().value === "^") {
      next();
      const exponent = parsePower();
      return Math.pow(base, exponent);
    }
    return base;
  }

  function parseUnary(): number {
    if (peek() && peek().type === "op" && peek().value === "-") {
      next();
      return -parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary(): number {
    const token = peek();
    if (!token) throw new Error("Unexpected end of expression");

    if (token.type === "num") {
      next();
      return parseFloat(token.value);
    }

    if (token.type === "lparen") {
      next();
      const value = parseExpr();
      if (!peek() || peek().type !== "rparen") throw new Error("Missing closing parenthesis");
      next();
      return value;
    }

    if (token.type === "ident") {
      next();
      const name = token.value.toLowerCase();
      if (name in CONSTANTS) return CONSTANTS[name];
      if (FUNCTIONS.includes(name)) {
        if (!peek() || peek().type !== "lparen") throw new Error(`Expected ( after ${name}`);
        next();
        const arg = parseExpr();
        if (!peek() || peek().type !== "rparen") throw new Error("Missing closing parenthesis");
        next();
        const inRadians = name === "sin" || name === "cos" || name === "tan"
          ? angleMode === "deg" ? (arg * Math.PI) / 180 : arg
          : arg;
        switch (name) {
          case "sin": return Math.sin(inRadians);
          case "cos": return Math.cos(inRadians);
          case "tan": return Math.tan(inRadians);
          case "log": return Math.log10(arg);
          case "ln": return Math.log(arg);
          case "sqrt": return Math.sqrt(arg);
        }
      }
      throw new Error(`Unknown identifier: ${name}`);
    }

    throw new Error("Unexpected token");
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error("Unexpected trailing input");
  return result;
}

function evaluate(expression: string, angleMode: AngleMode): number {
  const tokens = tokenize(expression);
  if (tokens.length === 0) throw new Error("Empty expression");
  return parseExpression(tokens, angleMode);
}

const BUTTON_ROWS: string[][] = [
  ["sin(", "cos(", "tan(", "("],
  ["log(", "ln(", "sqrt(", ")"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "-"],
  ["0", ".", "^", "+"],
];

export function ScientificCalculator() {
  const [expression, setExpression] = React.useState("");
  const [display, setDisplay] = React.useState("0");
  const [angleMode, setAngleMode] = React.useState<AngleMode>("deg");
  const [error, setError] = React.useState("");

  function append(value: string) {
    setError("");
    setExpression((prev) => prev + value);
  }

  function clear() {
    setExpression("");
    setDisplay("0");
    setError("");
  }

  function backspace() {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
  }

  function calculate() {
    if (!expression) return;
    try {
      const normalized = expression.replace(/×/g, "*").replace(/÷/g, "/");
      const result = evaluate(normalized, angleMode);
      const rounded = Math.round(result * 1e10) / 1e10;
      setDisplay(String(rounded));
      setExpression(String(rounded));
      setError("");
    } catch {
      setError("Invalid expression");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Button
            type="button"
            size="xs"
            variant={angleMode === "deg" ? "default" : "outline"}
            onClick={() => setAngleMode("deg")}
          >
            DEG
          </Button>
          <Button
            type="button"
            size="xs"
            variant={angleMode === "rad" ? "default" : "outline"}
            onClick={() => setAngleMode("rad")}
          >
            RAD
          </Button>
        </div>
        <Button type="button" size="xs" variant="ghost" onClick={backspace}>
          ⌫
        </Button>
      </div>

      <div className="mt-2 min-h-[3rem] rounded-lg bg-brand-soft p-3 text-right">
        <p className="truncate font-mono text-sm text-muted-foreground">{expression || " "}</p>
        <p className="truncate text-2xl font-semibold tabular-nums">
          {error || display}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {BUTTON_ROWS.flat().map((btn) => (
          <Button
            key={btn}
            type="button"
            variant="outline"
            onClick={() => append(btn)}
          >
            {btn}
          </Button>
        ))}
        <Button type="button" variant="outline" onClick={() => append("pi")} className="col-span-1">
          π
        </Button>
        <Button type="button" variant="outline" onClick={() => append("e")} className="col-span-1">
          e
        </Button>
        <Button type="button" variant="destructive" onClick={clear} className="col-span-1">
          C
        </Button>
        <Button type="button" onClick={calculate} className="col-span-1">
          =
        </Button>
      </div>
    </div>
  );
}
