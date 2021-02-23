import { ComparisonOutcome } from "../traits";

/**
 * Clamps a number between `lo` and `hi` (inclusive).
 *
 * `NaN` checks are not performed for all parameters.
 *
 * @param value the number to clamp
 * @param lo lower bound (should not be `NaN`)
 * @param hi upper bound (should not be `NaN`)
 */
export function clampU(value: number, lo = 0, hi = 1): number {
  return Math.min(Math.max(lo, value), hi);
}

export function clampV(lo = 0, hi = 1, value: number): number {
  return clampU(value, lo, hi);
}

/**
 * Clamps a number between `lo` and `hi` (inclusive).
 *
 * `NaN` checks are not performed for all parameters.
 *
 * @param lo lower bound (should not be `NaN`)
 * @param hi upper bound (should not be `NaN`)
 * @param value the number to clamp
 */
export function clamp(lo = 0, hi = 1) {
  return (value: number): number => clampU(value, lo, hi);
}

/**
 * Clamps a number between 0 and 1. Equivalent to `clamp(0, 1)`.
 *
 * `NaN` check is not performed on `value`.
 *
 *  @param value number to clamp
 */
export function clamp01<T extends number>(value: T): T {
  if (value > 1) {
    return 1 as T;
  }
  if (value < 0) {
    return 0 as T;
  }
  return value;
}

/**
 * Returns a comparison outcome based on a number `value`.
 * 1. If `value > 0`, then `1` is returned (i.e. `GREATER`)
 * 1. If `value < 0`, then `-1` is returned (i.e. `LESS`)
 * 1. If `value = 0` or `value = NaN`, then `0` is returned (i.e. `EQUAL`)
 * @param value number to clamp
 */
export function clampForComparison(value: number): ComparisonOutcome {
  if (value < 0) {
    return -1;
  }
  if (value > 0) {
    return 1;
  }
  return 0;
}
