import {
  Branded,
  DeserialisationOutcome,
  deserialiser,
  Equality,
  Predicate,
  serialiser,
} from "../traits";
import { brand, isBranded } from "./brand";
import { __opt_curry2r1 } from "./f";
import { json } from "./json";
import { option } from "./option";

const nil_ = Symbol("boost/nil");
const cons__ = Symbol("boost/cons");

interface Cons<T> {
  h: T;
  t: list<T>;
}

export type list<T> = typeof nil_ | Branded<Cons<T>, typeof cons__>;
export type t<T> = list<T>;

export function cons<T, U extends T>(h: T, t: list<U>): list<T> {
  return brand({ h, t }, cons__);
}

export const cons_ = __opt_curry2r1(cons);

export const nil: list<never> = nil_;

export function append<T>(left: list<T>, right: list<T>): list<T> {
  if (left === nil_) {
    return right;
  }
  return cons(left.h, append(left.t, right));
}

export function rev<T>(list: list<T>): list<T> {
  let nlist: list<T> = nil;
  for (let l = list; l !== nil_; l = l.t) {
    nlist = cons(l.h, nlist);
  }
  return nlist;
}

export function revAppend<T>(left: list<T>, right: list<T>): list<T> {
  let nlist: list<T> = right;
  for (let l = left; l !== nil_; l = l.t) {
    nlist = cons(l.h, nlist);
  }
  return nlist;
}

export function mapU<T, U extends T, V>(
  list: list<U>,
  mapper: (value: T) => V,
): list<V> {
  if (list === nil_) {
    return nil_;
  }
  return cons(mapper(list.h), mapU(list.t, mapper));
}

export type Mapper = <T, U>(
  f: (value: T) => U,
) => <V extends T>(l: list<V>) => list<U>;

export const map: Mapper = (f) => (l) => mapU(l, f);

export function revMapU<T, U extends T, V>(
  list: list<U>,
  mapper: (value: T) => V,
): list<V> {
  let mapped: list<V> = nil;
  for (let l = list; l !== nil_; l = l.t) {
    mapped = cons(mapper(l.h), mapped);
  }
  return mapped;
}

export const revMap: Mapper = (f) => (l) => revMapU(l, f);

export function ofArray<T>(values: T[]): list<T> {
  let mapped: list<T> = nil;
  for (let i = values.length - 1; i >= 0; --i) {
    mapped = cons(values[i], mapped);
  }
  return mapped;
}

export function ofArrayRev<T>(values: T[]): list<T> {
  let mapped: list<T> = nil;
  const len = values.length;
  for (let i = 0; i < len; ++i) {
    mapped = cons(values[i], mapped);
  }
  return mapped;
}

export function reduceU<T, U extends T, V>(
  list: list<U>,
  reducer: (value: T, acc: V) => V,
  init: V,
): V {
  let acc = init;
  for (let l = list; l !== nil_; l = l.t) {
    acc = reducer(l.h, acc);
  }
  return acc;
}

export type Reducer = <T, U>(
  f: (value: T, acc: U) => U,
  init: U,
) => <V extends T>(l: list<V>) => U;

export const reduce: Reducer = (f, init) => (l) => reduceU(l, f, init);

export function eqU<T, U extends T>(
  l: list<U>,
  r: list<U>,
  eqf: Equality<T>,
): boolean {
  let a = l;
  let b = r;

  while (a !== nil_) {
    if (b === nil_) {
      return false;
    }
    if (!eqf(a.h, b.h)) {
      return false;
    }
    a = a.t;
    b = b.t;
  }

  return b === nil_;
}

export type PolyEquality = <T>(
  eqf: Equality<T>,
) => <U extends T>(l: list<U>, r: list<U>) => boolean;

export const eq: PolyEquality = (eqf) => (l, r) => eqU(l, r, eqf);

export function serialiseU<T>(list: list<T>, serialiser: serialiser<T>): json {
  const exp: json[] = [];
  for (let i = list; i !== nil_; i = i.t) {
    exp.push(serialiser(i.h));
  }
  return exp;
}
export const serialise = __opt_curry2r1(serialiseU);

export function deserialiseU<T>(
  exp: json,
  deserialiser: deserialiser<T>,
): DeserialisationOutcome<list<T>> {
  if (exp instanceof Array) {
    let list: list<T> = nil;
    for (let i = exp.length - 1; i >= 0; --i) {
      const outcome = deserialiser(exp[i]);
      if (!outcome.success) {
        outcome.errors.push(new Error(`deserialisation failed at index ${i}`));
        return outcome;
      }
      list = cons(outcome.value, list);
    }
    return { success: true, value: list };
  }
  return { success: false, errors: [new Error("exp is not array")] };
}

export const deserialise = __opt_curry2r1(deserialiseU);

export function eachU<T, U extends T>(
  list: list<U>,
  e: (value: T) => void,
): void {
  for (let l = list; l !== nil_; l = l.t) {
    e(l.h);
  }
}

export type Iter = <T>(
  f: (value: T) => void,
) => <U extends T>(l: list<U>) => void;
export const each: Iter = (f) => (l) => eachU(l, f);

export function iter<T>(list: list<T>): IterableIterator<T> {
  let current = list;
  return {
    next() {
      if (current === nil_) {
        return { done: true, value: current };
      }
      const value = current.h;
      current = current.t;
      return { value };
    },
    [Symbol.iterator]: () => iter(list),
  };
}

export function toArray<T>(list: list<T>): T[] {
  const arr: T[] = [];
  for (let l = list; l !== nil_; l = l.t) {
    arr.push(l.h);
  }
  return arr;
}

export function isList<T>(list: unknown): list is list<T> {
  return list === nil_ || isBranded<list<T>, typeof cons__>(list, cons__);
}

export function head<T>(l: list<T>): option<T> {
  if (l === nil_) {
    return;
  }
  return l.h;
}

export function headExn<T>(l: list<T>): T {
  if (l === nil_) {
    throw new Error(`Empty List`);
  }
  return l.h;
}

export function tail<T>(l: list<T>): option<list<T>> {
  if (l === nil_) {
    return;
  }
  return l.t;
}

export function tailExn<T>(l: list<T>): list<T> {
  if (l === nil_) {
    throw new Error(`Empty List`);
  }
  return l.t;
}

export function filterU<T>(l: list<T>, predicate: Predicate<T>): list<T> {
  if (l === nil_) {
    return nil_;
  }
  const { h, t } = l;
  if (predicate(h)) {
    return cons(h, filterU(t, predicate));
  }
  return filterU(t, predicate);
}

export const filter = __opt_curry2r1(filterU);

export function l<T>(...args: T[]): list<T> {
  return ofArray(args);
}
