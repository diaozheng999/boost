import { Equality } from "../traits";
import { __opt_curry2r1 } from "./f";

export function is<T>(): Equality<T> {
  return (l: T, r: T) => Object.is(l, r);
}

export function strictEqual<T>(): Equality<T> {
  return (l: T, r: T) => l === r;
}

export function staticallyTypedAlways<T>(): Equality<T> {
  return () => true;
}

/**
 * Timing-safe string comparison function.
 * @see https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
 * @param a The string to compare against. The function will always take time
 *          proportional to length of a. Use this as the enum to compare
 *          against.
 * @param b The string to compare with.
 */
export function str(a: string, b: string): boolean {
  let result = 0;
  const length = a.length;

  const s1 = a;
  const s2 = a.length === b.length ? b : a;

  for (let i = 0; i < length; ++i) {
    result |= s1.charCodeAt(i) ^ s2.charCodeAt(i);
  }

  return !(a.length - b.length) && !result;
}

export function bool(l: boolean, r: boolean): boolean {
  return l === r;
}

export function num<T extends number>(l: T, r: T): boolean {
  if (isNaN(l)) {
    return isNaN(r);
  }
  return l === r;
}

export function arrU<T extends unknown[]>(
  l: T,
  r: T,
  eqf?: Equality<T[number]>,
): boolean {
  if (l.length !== r.length) {
    return false;
  }
  const len = l.length;
  if (eqf) {
    for (let i = 0; i < len; ++i) {
      if (!eqf(l[i], r[i])) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < len; ++i) {
      if (l[i] !== r[i]) {
        return false;
      }
    }
  }
  return true;
}

export const arr = __opt_curry2r1(arrU);

export const undef = staticallyTypedAlways<undefined>();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const null_ = staticallyTypedAlways<null>();
