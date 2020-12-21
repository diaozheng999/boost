import { ComparisonOutcome } from "../traits";

export function clampU(value: number, lo = 0, hi = 1): number {
  return Math.min(Math.max(lo, value), hi);
}

export function clamp(lo = 0, hi = 1) {
  return (value: number): number => clampU(value, lo, hi);
}

export function clamp01<T extends number>(value: T): T {
  if (value > 1) {
    return 1 as T;
  }
  if (value < 0) {
    return 0 as T;
  }
  return value;
}

export function clampForComparison(value: number): ComparisonOutcome {
  if (value < 0) {
    return -1;
  }
  if (value > 0) {
    return 1;
  }
  return 0;
}
