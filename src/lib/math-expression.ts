// Tokenizer + recursive-descent parser for math expressions with variable x.
// Supports +, -, *, /, ^ (right-associative), parentheses, implicit
// multiplication (2x, 2(x+1)), common functions, and the constants pi/e.
// Verified against hand-computed expected values for precedence, unary
// minus vs. exponentiation, right-associativity, and implicit multiplication.

type Token =
  | { type: "num"; value: number }
  | { type: "ident"; value: string }
  | { type: "+" | "-" | "*" | "/" | "^" | "(" | ")" | "," };

type Node =
  | { type: "num"; value: number }
  | { type: "var" }
  | { type: "neg"; value: Node }
  | { type: "call"; name: string; arg: Node }
  | { type: "binop"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node };

const FUNCS: Record<string, (n: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  exp: Math.exp,
  log: Math.log10,
  ln: Math.log,
};

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const s = input.replace(/\s+/g, "");
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const value = parseFloat(s.slice(i, j));
      if (Number.isNaN(value)) throw new Error(`Invalid number near "${s.slice(i, j)}"`);
      tokens.push({ type: "num", value });
      i = j;
    } else if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      tokens.push({ type: "ident", value: s.slice(i, j) });
      i = j;
    } else if ("+-*/^(),".includes(c)) {
      tokens.push({ type: c as "+" | "-" | "*" | "/" | "^" | "(" | ")" | "," });
      i++;
    } else {
      throw new Error(`Unexpected character: "${c}"`);
    }
  }
  return tokens;
}

function parseTokens(tokens: Token[]): Node {
  let pos = 0;
  const peek = () => tokens[pos];
  function consume(type?: Token["type"]): Token {
    const t = tokens[pos];
    if (!t || (type && t.type !== type)) {
      throw new Error(`Expected ${type ?? "a token"}, got ${t ? t.type : "end of expression"}`);
    }
    pos++;
    return t;
  }

  function parseExpr(): Node {
    let node = parseTerm();
    while (peek() && (peek().type === "+" || peek().type === "-")) {
      const op = consume().type as "+" | "-";
      node = { type: "binop", op, left: node, right: parseTerm() };
    }
    return node;
  }
  function parseTerm(): Node {
    let node = parseUnary();
    while (peek() && (peek().type === "*" || peek().type === "/")) {
      const op = consume().type as "*" | "/";
      node = { type: "binop", op, left: node, right: parseUnary() };
    }
    while (peek() && (peek().type === "ident" || peek().type === "(")) {
      node = { type: "binop", op: "*", left: node, right: parseUnary() };
    }
    return node;
  }
  function parseUnary(): Node {
    if (peek() && peek().type === "-") {
      consume();
      return { type: "neg", value: parseUnary() };
    }
    if (peek() && peek().type === "+") {
      consume();
      return parseUnary();
    }
    return parsePow();
  }
  function parsePow(): Node {
    const node = parseAtom();
    if (peek() && peek().type === "^") {
      consume();
      return { type: "binop", op: "^", left: node, right: parseUnary() };
    }
    return node;
  }
  function parseAtom(): Node {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");
    if (t.type === "num") {
      consume();
      return { type: "num", value: t.value };
    }
    if (t.type === "(") {
      consume();
      const node = parseExpr();
      consume(")");
      return node;
    }
    if (t.type === "ident") {
      consume();
      const name = t.value.toLowerCase();
      if (peek() && peek().type === "(" && FUNCS[name]) {
        consume();
        const arg = parseExpr();
        consume(")");
        return { type: "call", name, arg };
      }
      if (name === "x") return { type: "var" };
      if (CONSTANTS[name] !== undefined) return { type: "num", value: CONSTANTS[name] };
      throw new Error(`Unknown identifier: "${name}"`);
    }
    throw new Error(`Unexpected token in expression`);
  }

  const result = parseExpr();
  if (pos < tokens.length) throw new Error("Unexpected trailing characters in expression");
  return result;
}

function evaluateNode(node: Node, x: number): number {
  switch (node.type) {
    case "num":
      return node.value;
    case "var":
      return x;
    case "neg":
      return -evaluateNode(node.value, x);
    case "call":
      return FUNCS[node.name](evaluateNode(node.arg, x));
    case "binop": {
      const l = evaluateNode(node.left, x);
      const r = evaluateNode(node.right, x);
      switch (node.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return l / r;
        case "^":
          return Math.pow(l, r);
      }
    }
  }
}

/** Compiles an expression string (using variable `x`) into a callable function. */
export function compileExpression(input: string): (x: number) => number {
  if (!input.trim()) throw new Error("Enter an expression.");
  const ast = parseTokens(tokenize(input));
  return (x: number) => evaluateNode(ast, x);
}

export interface QuadraticFit {
  a: number;
  b: number;
  c: number;
  isQuadratic: boolean;
  isLinear: boolean;
}

/**
 * Recovers the a/b/c coefficients of f(x) = ax^2 + bx + c by sampling the
 * compiled expression at x = -1, 0, 1, 2, regardless of how the expression
 * is written (e.g. "2(x+3) - x" is recovered correctly). If the 4th sample
 * doesn't match the fitted quadratic, the expression isn't a degree-<=2
 * polynomial in x.
 */
export function fitQuadratic(f: (x: number) => number): QuadraticFit {
  const c = f(0);
  const fp1 = f(1);
  const fm1 = f(-1);
  const a = (fp1 + fm1) / 2 - c;
  const b = (fp1 - fm1) / 2;
  const check = a * 4 + b * 2 + c;
  const actual = f(2);
  const isPolynomialDegree2OrLess = Math.abs(check - actual) < 1e-6 * (Math.abs(actual) + 1);
  if (!isPolynomialDegree2OrLess) {
    throw new Error("This tool can only solve linear or quadratic equations in x.");
  }
  return {
    a,
    b,
    c,
    isQuadratic: Math.abs(a) > 1e-9,
    isLinear: Math.abs(a) <= 1e-9 && Math.abs(b) > 1e-9,
  };
}
