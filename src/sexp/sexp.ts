import { isUndefined } from "../common";
import { sexp } from "./type";

enum TokenType {
  Token,
  String,
  Open,
  Close,
}

type Token =
  | [TokenType.Token, string]
  | [TokenType.String, string]
  | [TokenType.Open]
  | [TokenType.Close];

type LexerDefaultState = "string" | "token";

interface LexerContext {
  buffer: Token[];
  state: "space" | LexerDefaultState | `escape-${LexerDefaultState}`;
  token: string[];
}

function lex(s: string, i: number, ctx: LexerContext): Token[] {
  if (s.length === i) {
    return ctx.buffer;
  }

  switch (ctx.state) {
    case "escape-string":
      ctx.token.push(s[i]);
      ctx.state = "string";
      return lex(s, i + 1, ctx);
    case "escape-token":
      ctx.token.push(s[i]);
      ctx.state = "token";
      return lex(s, i + 1, ctx);

    case "token":
      switch (s[i]) {
        case "(":
          if (ctx.token.length) {
            ctx.buffer.push([TokenType.Token, ctx.token.join("")]);
            ctx.token = [];
          }
          ctx.buffer.push([TokenType.Open]);
          return lex(s, i + 1, ctx);
        case ")":
          if (ctx.token.length) {
            ctx.buffer.push([TokenType.Token, ctx.token.join("")]);
            ctx.token = [];
          }
          ctx.buffer.push([TokenType.Close]);
          return lex(s, i + 1, ctx);
        case "\\":
          ctx.state = "escape-token";
          return lex(s, i + 1, ctx);
        case '"':
          if (ctx.token.length) {
            ctx.buffer.push([TokenType.Token, ctx.token.join("")]);
            ctx.token = [];
          }
          ctx.state = "string";
          return lex(s, i + 1, ctx);
      }
      if (/^\s$/.exec(s[i])) {
        if (ctx.token.length) {
          ctx.buffer.push([TokenType.Token, ctx.token.join("")]);
          ctx.token = [];
        }
        ctx.state = "space";
        return lex(s, i + 1, ctx);
      }
      ctx.token.push(s[i]);
      return lex(s, i + 1, ctx);

    case "string":
      switch (s[i]) {
        case '"':
          ctx.buffer.push([TokenType.String, `"${ctx.token.join("")}"`]);
          ctx.token = [];
          ctx.state = "token";
          return lex(s, i + 1, ctx);
        default:
          ctx.token.push(s[i]);
          return lex(s, i + 1, ctx);
      }
    case "space":
      if (/^\s$/.exec(s[i])) {
        return lex(s, i + 1, ctx);
      }
      ctx.state = "token";
      return lex(s, i, ctx);
  }
}

export function parse(s: string): sexp | null {
  const tok = lex(s, 0, { token: [], buffer: [], state: "token" });

  const len = tok.length;
  let sexp: sexp[] = [];
  const stack: sexp[][] = [];

  for (let i = 0; i < len; ++i) {
    const c = tok[i];
    switch (c[0]) {
      case TokenType.Open:
        stack.push(sexp);
        sexp = [];
        break;

      case TokenType.Close:
        const nsexp = stack.pop();
        if (isUndefined(nsexp)) {
          throw new Error("Parse error.");
        }
        nsexp.push(sexp);
        sexp = nsexp;
        break;

      case TokenType.String:
        sexp.push(JSON.parse(c[1]));
        break;

      case TokenType.Token:
        const n = parseFloat(c[1]);
        if (isNaN(n)) {
          sexp.push(c[1]);
        } else {
          sexp.push(n);
        }
    }
  }

  if (stack.length || sexp.length !== 1) {
    throw new Error("Parse Error.");
  }

  return sexp[0];
}

export function dumps(s: sexp): string {
  switch (typeof s) {
    case "number":
      return `${s}`;
    case "string":
      if (/[(\s]/.exec(s)) {
        return JSON.stringify(s);
      }
      return s;
    default:
      return `(${s.map(dumps).join(" ")})`;
  }
}
