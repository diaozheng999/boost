export type nullable<T> = T | null;

export type jsopt<T> = T | undefined;

export type nil<T> = T | null | undefined;

export type nullOrUndefined = null | undefined;

export function truthy<T>(value: T): nullable<T> {
  return value || null;
}

export function isNull<T>(value: nil<T>): value is null {
  return value === null;
}

export function notNull<T>(value: nullable<T>): value is T;
export function notNull<T>(value: nil<T>): value is jsopt<T>;
export function notNull<T>(value: nil<T>): boolean {
  return value !== null;
}

export function isUndefined<T>(value: nil<T>): value is undefined {
  return value === undefined;
}

export function isDefined<T>(value: jsopt<T>): value is T;
export function isDefined<T>(value: nil<T>): value is nullable<T>;
export function isDefined<T>(value: nil<T>): boolean {
  return value !== undefined;
}

export function defined<T>(value: nil<T>): value is T {
  return value !== null && value !== undefined;
}

export function finite(n: number): nil<number> {
  return isFinite(n) ? n : null;
}

export function wrapNaN(n: nil<number>): nil<number> {
  if (defined(n)) {
    return isNaN(n) ? null : n;
  }
  return n;
}

export function callIfDefined<T, U>(
  f: (value: T) => U,
  ifUndefined: U,
): (value: nil<T>) => U {
  return (v) => (defined(v) ? f(v) : ifUndefined);
}

export function callIfDefined_<T, U>(
  f: (value: T) => U,
  ifUndefined: () => U,
): (value: nil<T>) => U {
  return (v) => (defined(v) ? f(v) : ifUndefined());
}
