import { $, makeMatcher, _ } from "../common";
import { sexp, SexpPattern } from "./type";

function matchSexp(sexp: sexp, pattern: SexpPattern): sexp[] | undefined {
  switch (pattern) {
    case _:
      return [];
    case $:
      return [sexp];
  }

  switch (typeof pattern) {
    case "string":
    case "number":
      return sexp === pattern ? [] : undefined;

    default:
      if (typeof sexp !== "object" || sexp.length !== pattern.length) {
        return undefined;
      }

      const response = sexp.map((subexp, i) => matchSexp(subexp, pattern[i]));

      const matches: sexp[] = [];

      for (const res of response) {
        if (res !== undefined) {
          matches.push(...res);
        } else {
          return undefined;
        }
      }

      return matches;
  }
}

export const match = makeMatcher(matchSexp);
