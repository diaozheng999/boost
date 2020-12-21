import { nil } from "../common/jsopt";
import { sexp } from "../sexp";
import { $, makeMatcher, Matcher, _ } from "./match";

export type option<T> = [T] | null;

export type t<T> = option<T>;

export const None = Symbol("boost/NonePattern");
export const Some = Symbol("boost/SomePattern");

export type OptionPattern<T> =
  | typeof None
  | [typeof Some, T | typeof _ | typeof $];

export function match<T extends TMatched, TPattern, TMatched>(
  matcher: Matcher<T, TPattern, TMatched, void>,
): (
  value: option<T>,
) => Matcher<option<T>, OptionPattern<TPattern>, option<TMatched>, void> {
  return makeMatcher((value: option<T>, pattern: OptionPattern<TPattern>):
    | option<TMatched>[]
    | undefined => {
    if (pattern === None) {
      if (value === null) {
        return [];
      }
    } else if (pattern[0] === Some) {
      if (value !== null) {
        switch (pattern[1]) {
          case _:
            return [];
          case $:
            return [value];
          default:
            return matcher.__matcher(value[0], pattern[1])?.map((m) => [m]);
        }
      }
    }
    return undefined;
  });
}

export function truthy<T>(value: nil<T>): option<T> {
  return value ? [value] : null;
}

export function ofJS<T>(value: nil<T>): option<T> {
  if (value === null || value === undefined) {
    return null;
  }
  return [value];
}

export function ofJSStrict<T>(value?: T): option<T> {
  if (value === undefined) {
    return null;
  }
  return [value];
}

export function toJS<T>(value: option<T>): nil<T> {
  return value?.[0];
}

export function mapU<T, U>(value: option<T>, next: (value: T) => U): option<U> {
  if (value === null) {
    return value;
  }
  return [next(value[0])];
}

export function map<T, U>(next: (value: T) => U) {
  return (value: option<T>): option<U> => mapU(value, next);
}

export function bindU<T, U>(
  value: option<T>,
  next: (value: T) => option<U>,
): option<U> {
  if (value === null) {
    return value;
  }
  return next(value[0]);
}

export function bind<T, U>(next: (value: T) => option<U>) {
  return (value: option<T>): option<U> => bindU(value, next);
}

export function isSome<T>(value: option<T>): value is [T] {
  return !!value;
}

export function isNone(value: option<unknown>): value is null {
  return !value;
}

export function serialise<T>(serialiser: (value: T) => sexp) {
  return (value: option<T>): sexp => {
    if (value === null) {
      return "#n";
    } else {
      return ["#s", serialiser(value[0])];
    }
  };
}

export function some<T>(value: T): option<T> {
  return [value];
}

export function none<T>(): option<T> {
  return null;
}

export function deserialise<T>(deserialiser: (exp: sexp) => option<T>) {
  return (exp: sexp): option<option<T>> => {
    if (typeof exp === "object") {
      switch (exp[0]) {
        case "#n":
          return [null];
        case "#s":
          return [deserialiser(exp[1])];
      }
    }
    return null;
  };
}
