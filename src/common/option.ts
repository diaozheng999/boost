import { Equality } from "../traits";
import { __opt_curry3r1 } from "./f";
export type option<T> = T | undefined;

export type t<T> = option<T>;

export function truthy<T>(value?: T | null): option<T> {
  return value || undefined;
}

export function ofJS<T>(value?: T | null): option<T> {
  return value ?? undefined;
}

export function mapU<T, U>(value: option<T>, next: (value: T) => U): option<U> {
  if (value === undefined) {
    return;
  }
  return next(value);
}

export function map<T, U>(next: (value: T) => U) {
  return (value: option<T>): option<U> => mapU(value, next);
}

export function bindU<T, U>(
  value: option<T>,
  next: (value: T) => option<U>,
): option<U> {
  if (value === undefined) {
    return;
  }
  return next(value);
}

export function bind<T, U>(next: (value: T) => option<U>) {
  return (value: option<T>): option<U> => bindU(value, next);
}

export function isSome<T>(value: option<T>): value is T {
  return value !== undefined;
}

export function isNone(value: option<unknown>): value is undefined {
  return value === undefined;
}

export function some<T>(value: T): option<T> {
  return value;
}

export function none<T>(): option<T> {
  return;
}

export function eqU<T>(
  left: option<T>,
  right: option<T>,
  eqf: Equality<T>,
): boolean {
  if (left !== undefined && right !== undefined) {
    return eqf(left, right);
  }
  return left === right;
}

export const eq = __opt_curry3r1(eqU);

export function callIf<T, U>(
  f: (value: T) => U,
  ifUndefined: U,
): (value: option<T>) => U {
  return (v) => (v === undefined ? ifUndefined : f(v));
}

export function callIf_<T, U>(
  f: (value: T) => U,
  ifUndefined: () => U,
): (value: option<T>) => U {
  return (v) => (v === undefined ? ifUndefined() : f(v));
}
