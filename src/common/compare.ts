import { ComparisonOutcome } from "../traits";
import { clampForComparison } from "./clamp";

export function num<T extends number>(l: T, r: T): ComparisonOutcome {
  return clampForComparison(l - r);
}

export function str(l: string, r: string): ComparisonOutcome {
  return l.localeCompare(r) as ComparisonOutcome;
}

export function bool(l: boolean, r: boolean): ComparisonOutcome {
  return num(+l, +r);
}
