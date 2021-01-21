export type ComparisonOutcome = 0 | 1 | -1;

export const compareTo = Symbol.for("compareTo");

export interface Comparable<T> {
  [compareTo](right: T): ComparisonOutcome;
}

export type Comparison<T> = (left: T, right: T) => ComparisonOutcome;

export type CompareTo<T> = (right: T) => ComparisonOutcome;
