import { $ } from "../common";
import { sexp } from "../sexp";
import { match } from "../sexp/match";
import { ofJSStrict, option } from "./option";

export type json =
  | string
  | number
  | null
  | boolean
  | { [keys: string]: json }
  | json[];

export type t = json;

export function serialise(n: json): sexp {
  return ["#j", JSON.stringify(n)];
}

export function deserialise(exp: sexp): option<json> {
  return ofJSStrict(
    match(exp).with<json>(["#j", $], (pat) => JSON.parse(pat))(),
  );
}
