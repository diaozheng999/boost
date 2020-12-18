export type ComparisonOutcome = 0 | 1 | -1;

export interface Comparable<T> {
  compareTo(right: T): ComparisonOutcome;
}
