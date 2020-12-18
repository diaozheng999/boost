import { sexp } from "../sexp";
import { none, option, some } from "./option";

export function serialise(n: number): sexp {
  if (isFinite(n)) {
    return n;
  } else if (isNaN(n)) {
    return "#nan";
  } else if (n > 0) {
    return "#inf";
  } else {
    return "#-inf";
  }
}

export function deserialise(exp: sexp): option<number> {
  switch (typeof exp) {
    case "number":
      return some(exp);
    case "string":
      switch (exp) {
        case "#nan":
          return some(NaN);
        case "#inf":
          return some(Infinity);
        case "#-inf":
          return some(-Infinity);
        default:
          return none();
      }
    default:
      return none();
  }
}
