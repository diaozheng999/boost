import { Equality } from "../traits";
import {
  DeserialisationOutcome,
  deserialiser,
  serialiser,
} from "../traits/serialisable";
import { uncurry2r1, __opt_curry2r1, __opt_curry3r1 } from "./f";
import { json } from "./json";
import { option } from "./option";

export type nullable<T> = T | null;

export type t<T> = nullable<T>;

export function truthy<T>(value?: T | null): nullable<T> {
  return value || null;
}

export function ofJS<T>(value?: T | null): nullable<T> {
  return value ?? null;
}

export function ofOption<T>(value: option<T>): nullable<T> {
  if (value === null) {
    throw new Error(`Cannot convert a option<null> to nullable.`);
  }
  return value ?? null;
}

export function toOption<T>(value: nullable<T>): option<T> {
  if (value === undefined) {
    throw new Error(`Cannot convert a nullable<undefined> to option.`);
  }
  return value ?? undefined;
}

export function mapU<T, U>(
  value: nullable<T>,
  next: (value: T) => U,
): nullable<U> {
  if (value === null) {
    return null;
  }
  return next(value);
}

export const map = __opt_curry2r1(mapU);

export function bindU<T, U>(
  value: nullable<T>,
  next: (value: T) => nullable<U>,
): nullable<U> {
  return mapU(value, next);
}

export const bind = __opt_curry2r1(bindU);

export function notNull<T>(value: nullable<T>): value is T {
  return value !== null;
}

export function isNull(value: nullable<unknown>): value is null {
  return value === null;
}

export function eqU<T>(
  left: nullable<T>,
  right: nullable<T>,
  eqf: Equality<T>,
): boolean {
  if (left !== null && right !== null) {
    return eqf(left, right);
  }
  return left === right;
}

export const eq = __opt_curry3r1(eqU);

export function serialise<T>(
  elementSerialiser: serialiser<T>,
): serialiser<nullable<T>> {
  return map(elementSerialiser);
}

export const serialiseU = uncurry2r1(serialise);

export function deserialiseU<T>(
  json: json,
  elementDeserialiser: deserialiser<T>,
): DeserialisationOutcome<nullable<T>> {
  if (json === null) {
    return { success: true, value: null };
  }
  return elementDeserialiser(json);
}

export const deserialise = __opt_curry2r1(deserialiseU);

export function callIf<T, U>(
  f: (value: T) => U,
  ifNull: U,
): (value: nullable<T>) => U {
  return (v) => (v === null ? ifNull : f(v));
}

export function callIf_<T, U>(
  f: (value: T) => U,
  ifNull: () => U,
): (value: nullable<T>) => U {
  return (v) => (v === null ? ifNull() : f(v));
}
