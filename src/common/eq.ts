import { Equality } from "../traits";

export function is<T>(): Equality<T> {
  return (l: T, r: T) => Object.is(l, r);
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
