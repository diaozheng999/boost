import { Opaque } from "../types";
import { staticallyTypedAlways } from "./eq";
import { json } from "./json";
import { none, option, some } from "./option";

declare const UnitWitness: unique symbol;
type UnitWitness = typeof UnitWitness;

export type unit = Opaque<void, UnitWitness>;

export const unit: unit = undefined as unit;

export function serialise(_: unit): json {
  return null;
}

export function deserialise(exp: json): option<unit> {
  if (exp === null) {
    return some(unit);
  }
  return none();
}

export const eqUnit = staticallyTypedAlways<unit>();
