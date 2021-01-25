import { Equality, PolyEquality } from "../traits";
import { __opt_curry3r1 } from "./f";
import { hash as hashFn } from "./hash";

/**
 * Equality defined by `Object.is`
 */
export const is: PolyEquality = Object.is;

/**
 * Equality defined by `===`
 */
export function strictEqual<T>(l: T, r: T): boolean {
  return l === r;
}

function always() {
  return true;
}

/**
 * Equality that's statically checked to be always true. This is essentially
 * a no-op that leverages on TypeScript's typechecking. Good for constants and
 * single-item types such as `unit` or `null`.
 */
export function staticallyTypedAlways<T>(): Equality<T> {
  return always;
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

/**
 * Boolean Equality
 */
export function bool(l: boolean, r: boolean): boolean {
  return l === r;
}

/**
 * Number equality. Also tests subtypes of number such as int32 and int31.
 * Takes care of `NaN`, i.e.
 * 1. `eq.num(NaN, NaN) === true`
 * 1. `eq.num(0, -0) === true`
 */
export function num<T extends number>(l: T, r: T): boolean {
  if (isNaN(l)) {
    return isNaN(r);
  }
  return l === r;
}

/**
 * Uses built-in hash function to determine if two values are identical. Note
 * that since our hash function hashes to an integer, there can be chances of
 * collision.
 */
export function hash<T>(l: T, r: T): boolean {
  return hashFn(l) === hashFn(r);
}

/**
 * Array equality (uncurried).
 * @param l left element
 * @param r right element
 * @param eqf element equality function
 */
export function arrU<T>(l: T[], r: T[], eqf: Equality<T>): boolean {
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

/**
 * Array equality (curried).
 * @param c element equality function
 * @param a left element
 * @param b right element
 */
export const arr = __opt_curry3r1(arrU);

/**
 * Undefined equality. Statically compared, at runtime always returns true.
 */
export const undef = staticallyTypedAlways<undefined>();

/**
 * null equality. Statically compared, at runtime always returns true.
 */
export const null_ = staticallyTypedAlways<null>();
