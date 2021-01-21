import { Equality } from "../traits";
import { __opt_curry2r1, __opt_curry3r1, __opt_curry3r2 } from "./f";
import { json } from "./json";
import { bindU, mapU as mapOptU, option } from "./option";
import { deserialiser, serialiser, tup } from "./prim";

const nil_ = Symbol("boost/nil");

export type list<T> = typeof nil_ | [head: T, tail: list<T>];
export type t<T> = list<T>;

interface SerialisedList {
  h: json;
  t: json;
}

export function cons<T, U extends T>(u: U, list: list<T>): list<U> {
  return [u, list as list<U>];
}

export const cons_ = __opt_curry2r1(cons);

export const nil: list<unknown> = nil_;

export function append<T>(left: list<T>, right: list<T>): list<T> {
  if (left === nil_) {
    return right;
  }
  return [left[0], append(left[1], right)];
}

export function rev<T>(list: list<T>): list<T> {
  let nlist = nil;
  for (let l = list; l !== nil_; l = l[1]) {
    nlist = [l[0], nlist];
  }
  return nlist as list<T>;
}

export function revAppend<T>(left: list<T>, right: list<T>): list<T> {
  let nlist = right;
  for (let l = left; l !== nil_; l = l[1]) {
    nlist = [l[0], nlist];
  }
  return nlist;
}

export function mapU<T, U>(list: list<T>, mapper: (value: T) => U): list<U> {
  if (list === nil_) {
    return nil_;
  }
  return [mapper(list[0]), mapU(list[1], mapper)];
}

export const map = __opt_curry2r1(mapU);

export function revMapU<T, U>(list: list<T>, mapper: (value: T) => U): list<U> {
  let mapped = nil;
  for (let l = list; l !== nil_; l = l[1]) {
    mapped = [mapper(l[0]), mapped];
  }
  return mapped as list<U>;
}

export const revMap = __opt_curry2r1(revMapU);

export function ofArray<T>(values: T[]): list<T> {
  let mapped = nil;
  for (let i = values.length - 1; i >= 0; --i) {
    mapped = [values[i], mapped];
  }
  return mapped as list<T>;
}

export function reduceU<T, U>(
  list: list<T>,
  reducer: (value: T, acc: U) => U,
  init: U,
): U {
  let acc = init;
  for (let l = list; l !== nil_; l = l[1]) {
    acc = reducer(l[0], acc);
  }
  return acc;
}

export const reduce = __opt_curry3r2(reduceU);

export function eqU<T>(l: list<T>, r: list<T>, eqf?: Equality<T>): boolean {
  let a = l;
  let b = r;

  if (eqf) {
    while (a !== nil_) {
      if (b === nil_) {
        return false;
      }
      if (!eqf(a[0], b[0])) {
        return false;
      }
      a = a[1];
      b = b[1];
    }
  } else {
    while (a !== nil_) {
      if (b === nil_) {
        return false;
      }
      if (a[0] === b[0]) {
        return false;
      }
      a = a[1];
      b = b[1];
    }
  }

  return b === nil_;
}
export const eq = __opt_curry3r1(eqU);

export function serialiseU<T>(list: list<T>, serialiser: serialiser<T>): json {
  const exp: json[] = [];
  for (let i = list; i !== nil_; i = i[1]) {
    exp.push(serialiser(i[0]));
  }
  return exp;
}
export const serialise = __opt_curry2r1(serialiseU);

function isSerialisedList(list: unknown): list is SerialisedList {
  return typeof list === "object" && !!list && "h" in list && "t" in list;
}

function deserialiseRecursively<T>(
  exp: SerialisedList,
  deserialiser: deserialiser<T>,
): option<list<T>> {
  const { h, t } = exp;
  return bindU(deserialiser(h), (head) =>
    mapOptU(deserialiseU(t, deserialiser), tup._2_(head)),
  );
}

function deserialiseArray<T>(
  exp: json[],
  deserialiser: deserialiser<T>,
): option<list<T>> {
  let ret = nil;

  if (!exp.length) {
    return nil_ as list<T>;
  }

  const len = exp.length;

  for (let i = len - 1; i >= 0; --i) {
    const parsed = deserialiser(exp[i]);
    if (!parsed) {
      return;
    }
    ret = [parsed, ret];
  }

  return ret as list<T>;
}

export function deserialiseU<T>(
  exp: json,
  deserialiser: deserialiser<T>,
): option<list<T>> {
  if (isSerialisedList(exp)) {
    return deserialiseRecursively(exp, deserialiser);
  } else if (exp instanceof Array) {
    return deserialiseArray(exp, deserialiser);
  }
  return;
}

export const deserialise = __opt_curry2r1(deserialiseU);

export function eachU<T>(list: list<T>, e: (value: T) => void): void {
  for (let l = list; l !== nil_; l = l[1]) {
    e(l[0]);
  }
}

export const each = __opt_curry2r1(eachU);

export function iter<T>(list: list<T>): IterableIterator<T> {
  let current = list;
  return {
    next() {
      if (current === nil_) {
        return { done: true, value: current };
      }
      const value = current[0];
      current = current[1];
      return { value };
    },
    [Symbol.iterator]: () => iter(list),
  };
}
