import {
  Branded,
  DeserialisationOutcome,
  deserialiser,
  Equality,
  Predicate,
  serialiser,
} from "../traits";
import { brand, isBranded } from "./brand";
import { __opt_curry2r1, __opt_curry3r1, __opt_curry3r2 } from "./f";
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

export function cons<T, U extends T>(h: U, t: list<T>): list<U> {
  return brand({ h, t } as Cons<U>, cons__);
}

export const cons_ = __opt_curry2r1(cons);

export const nil: list<unknown> = nil_;

export function append<T>(left: list<T>, right: list<T>): list<T> {
  if (left === nil_) {
    return right;
  }
  return cons(left.h, append(left.t, right));
}

export function rev<T>(list: list<T>): list<T> {
  let nlist = nil;
  for (let l = list; l !== nil_; l = l.t) {
    nlist = cons(l.h, nlist);
  }
  return nlist as list<T>;
}

export function revAppend<T>(left: list<T>, right: list<T>): list<T> {
  let nlist = right;
  for (let l = left; l !== nil_; l = l.t) {
    nlist = cons(l.h, nlist);
  }
  return nlist;
}

export function mapU<T, U>(list: list<T>, mapper: (value: T) => U): list<U> {
  if (list === nil_) {
    return nil_;
  }
  return cons(mapper(list.h), mapU(list.t, mapper));
}

export const map = __opt_curry2r1(mapU);

export function revMapU<T, U>(list: list<T>, mapper: (value: T) => U): list<U> {
  let mapped = nil;
  for (let l = list; l !== nil_; l = l.t) {
    mapped = cons(mapper(l.h), mapped);
  }
  return mapped as list<U>;
}

export const revMap = __opt_curry2r1(revMapU);

export function ofArray<T>(values: T[]): list<T> {
  let mapped = nil;
  for (let i = values.length - 1; i >= 0; --i) {
    mapped = cons(values[i], mapped);
  }
  return mapped as list<T>;
}

export function ofArrayRev<T>(values: T[]): list<T> {
  let mapped = nil;
  const len = values.length;
  for (let i = 0; i < len; ++i) {
    mapped = cons(values[i], mapped);
  }
  return mapped as list<T>;
}

export function reduceU<T, U>(
  list: list<T>,
  reducer: (value: T, acc: U) => U,
  init: U,
): U {
  let acc = init;
  for (let l = list; l !== nil_; l = l.t) {
    acc = reducer(l.h, acc);
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
      if (!eqf(a.h, b.h)) {
        return false;
      }
      a = a.t;
      b = b.t;
    }
  } else {
    while (a !== nil_) {
      if (b === nil_) {
        return false;
      }
      if (a.h === b.h) {
        return false;
      }
      a = a.t;
      b = b.t;
    }
  }

  return b === nil_;
}
export const eq = __opt_curry3r1(eqU);

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
    let list = nil;
    for (let i = exp.length - 1; i >= 0; --i) {
      const outcome = deserialiser(exp[i]);
      if (!outcome.success) {
        outcome.errors.push(new Error(`deserialisation failed at index ${i}`));
        return outcome;
      }
      list = cons(outcome.value, list);
    }
    return { success: true, value: list as list<T> };
  }
  return { success: false, errors: [new Error("exp is not array")] };
}

export const deserialise = __opt_curry2r1(deserialiseU);

export function eachU<T>(list: list<T>, e: (value: T) => void): void {
  for (let l = list; l !== nil_; l = l.t) {
    e(l.h);
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
