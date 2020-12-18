import { sexp } from "../sexp";
import { Opaque } from "../types";
import { none, option, some } from "./option";

declare const UnitWitness: unique symbol;

export type unit = Opaque<void, typeof UnitWitness>;

export const unit: unit = undefined as unit;

export function serialise(_: unit): sexp {
  return [];
}

export function deserialise(exp: sexp): option<unit> {
  if (typeof exp === "object" && !exp.length) {
    return some(unit);
  }
  return none();
}
