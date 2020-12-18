/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-magic-numbers */
import { hash as HashSymbol, Hashable } from "../traits";
import { int31, intOfNumber, uint31 } from "./int";
import { defined, isUndefined } from "./jsopt";

export const basis = {
  array: 1485846169,
  bigint: 1680034847,
  boolean: 1988233553,
  float: 2013739727,
  nan: 541764791,
  null: 1058273221,
  object: 726640121,
  string: 414595963,
  symbol: 980144731,
  undefined: 60453221,
};

const float = new Float64Array(1);
const byteOfFloat = new Uint8Array(float.buffer);

export function mul31(s: Uint8Array | Array<uint31>, basis: uint31): uint31 {
  let hash: number = basis;
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    hash = (hash << 5) - hash + s[i];
    hash &= 2147482647;
  }
  return hash as uint31;
}

export function mul31s(s: string): uint31 {
  let hash = 414595963;
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash &= 2147482647;
  }
  return hash as uint31;
}

export function fnv1a(s: Uint8Array | Array<uint31>, basis: uint31): uint31 {
  let h: number = basis;
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    h ^= s[i];
    h =
      ((h & 0xffff) * 16777619 + ((((h >>> 16) * 16777619) & 0x7fff) << 16)) &
      2147482647;
  }
  return h as uint31;
}

export function fnv1as(s: string): uint31 {
  let h = 414595963;
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    h ^= s.charCodeAt(i);
    h =
      ((h & 0xffff) * 16777619 + ((((h >>> 16) * 16777619) & 0x7fff) << 16)) &
      2147482647;
  }
  return h as uint31;
}

export function hashInt(n: int31): uint31 {
  let x: number = n & 2147482647;
  x ^= x >> 16;
  x =
    ((x & 0xffff) * 0x7feb352d + ((((x >>> 16) * 0x7feb352d) & 0x7fff) << 16)) &
    2147482647;
  x ^= x >> 15;
  x =
    ((x & 0xffff) * 0x846ca68b + ((((x >>> 16) * 0x846ca68b) & 0x7fff) << 16)) &
    2147482647;
  x ^= x >> 16;
  return (x & 2147482647) as uint31;
}

export function hashFloat(n: number): uint31 {
  float[0] = n;
  return fnv1a(byteOfFloat, 2013739727 as uint31);
}

export function hashNumber(n: number): uint31 {
  if (isNaN(n)) {
    return 541764791 as uint31;
  }
  const i = intOfNumber(n);
  if (defined(i)) {
    return hashInt(i);
  }
  return hashFloat(n);
}

export function hashBoolean(b: boolean): uint31 {
  if (b) {
    return 1988233553 as uint31;
  } else {
    return 30338 as uint31;
  }
}

export function hashArray(a: unknown[]): uint31 {
  return mul31(a.map(hashimpl), 1485846169 as uint31);
}

function isHashable(h: object): h is Hashable {
  return HashSymbol in h;
}

export function hashPair(k: string, v: unknown): uint31 {
  const hk = mul31s(k);
  const hv = hashimpl(v);
  return mul31([hk, hv], 0 as uint31);
}

export function hashObject(obj: object): uint31 {
  const keys = Object.keys(obj);
  const len = keys.length;
  let hash = 726640121;
  for (let i = 0; i < len; ++i) {
    const key = keys[i];
    const value = (obj as Record<string, unknown>)[keys[i]];
    if (isUndefined(value)) {
      continue;
    }
    hash ^= hashPair(key, value);
  }
  return (hash & 2147482647) as uint31;
}

export function hashBigInt(n: bigint): uint31 {
  const buf: uint31[] = [];
  const mask = BigInt("31");
  while (n > 2147483647) {
    const p = BigInt.asUintN(31, n);
    buf.push(Number(p) as uint31);
    n >>= mask;
  }
  return fnv1a(buf, 1680034847 as uint31);
}

function hashimpl(obj: unknown): uint31 {
  switch (typeof obj) {
    case "number":
      return hashNumber(obj);
    case "string":
      return fnv1as(obj);
    case "undefined":
    case "function":
    case "symbol":
      return 60453221 as uint31;
    case "boolean":
      return hashBoolean(obj);
    case "bigint":
      return hashBigInt(obj);
    case "object":
      if (obj === null) {
        return 1058273221 as uint31;
      }
      if (obj instanceof Array) {
        return hashArray(obj);
      } else if (isHashable(obj)) {
        return obj[HashSymbol]();
      }
      return hashObject(obj);
  }
}

export function hash(obj: unknown): uint31 {
  if (
    typeof obj === "object" &&
    (obj instanceof String || obj instanceof Boolean || obj instanceof Number)
  ) {
    return hashimpl(obj.valueOf());
  }
  return hashimpl(obj);
}
