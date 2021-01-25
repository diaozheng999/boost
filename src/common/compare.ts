import {
  Comparable,
  compareTo,
  CompareTo,
  Comparison,
  ComparisonOutcome,
} from "../traits";
import { clampForComparison } from "./clamp";
import { compose, curry } from "./f";

/**
 * Numerical comparison (assuming non-`NaN`)
 * 1. returns `-1` (`LESS`) if `a < b`.
 * 1. returns `0` (`EQUAL`) if `a = b`.
 * 1. returns `1` (`GREATER`) if `a > b`.
 */
export function int<T extends number>(l: T, r: T): ComparisonOutcome {
  return clampForComparison(l - r);
}
/**
 * Numerical comparison. `NaN` is less than all elements. This means:
 * ```
 *   compare.num(NaN, -Infinity) => -1 // LESS
 *   compare.num(-Infinity, NaN) => 1 // GREATER
 *   compare.num(NaN, NaN) => 0 // EQUAL
 * ```
 *
 * For other comparisons, follow results for `int<number>`.
 */
export function num(l: number, r: number): ComparisonOutcome {
  if (isNaN(l) && isNaN(r)) {
    return 0;
  }
  if (isNaN(l)) {
    return -1;
  }
  if (isNaN(r)) {
    return 1;
  }
  return clampForComparison(l - r);
}

export function str(l: string, r: string): ComparisonOutcome {
  return l.localeCompare(r) as ComparisonOutcome;
}

export function bool(l: boolean, r: boolean): ComparisonOutcome {
  return int(+l, +r);
}

function negateOutcome(n: ComparisonOutcome): ComparisonOutcome {
  return -n as ComparisonOutcome;
}

export function negate<T>(c: Comparison<T>): Comparison<T> {
  return compose(c, negateOutcome);
}

export function arrU<T>(l: T[], r: T[], c: Comparison<T>): ComparisonOutcome {
  const a = l.length;
  const b = r.length;
  const len = a < b ? a : b;

  if (!a && !b) {
    return 1;
  }

  for (let i = 0; i < len; ++i) {
    const e = c(l[i], r[i]);
    if (e) {
      return e;
    }
  }
  return num(a, b);
}

function isComparable<T>(e: unknown): e is Comparable<T> {
  return typeof e === "object" && !!e && compareTo in e;
}

export function compare<T extends Comparable<T>>(e: T): CompareTo<T>;
export function compare<T>(f: Comparison<T>, e: T): CompareTo<T>;
export function compare<T>(
  f: Comparable<T> | Comparison<T>,
  e?: T,
): CompareTo<T> {
  if (isComparable<T>(f)) {
    return f[compareTo].bind(f) as CompareTo<T>;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return curry(f, e!);
  }
}

export const compareWith = compose(compare, negate);
