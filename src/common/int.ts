/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-magic-numbers */
import { Opaque } from "../types";
import { option } from "./option";

declare const WordSize: unique symbol;
declare const Unsigned: unique symbol;

export type int31 = Opaque<number, { [WordSize]: 31; [Unsigned]: false }>;
export type int32 = Opaque<number, { [WordSize]: 32; [Unsigned]: false }>;
export type uint31 = Opaque<number, { [WordSize]: 31; [Unsigned]: true }>;

export const INT_MAX = 1073741823 as int31;
export const INT_MIN = -1073741824 as int31;

export function unsafelyCastToInt(n: number): int31 {
  return n as int31;
}

export function unsafelyCastToInt32(n: number): int32 {
  return n as int32;
}

export function int32(n: number): int32 {
  return (n | 0) as int32;
}

export function int(n: number): int31 {
  const i = n & 2147483647;
  if (n > INT_MAX) {
    return -(i + INT_MIN) as int31;
  }
  return i as int31;
}

export function mul(a: int31, b: int31): int31 {
  return int((a & 0xffff) * b + ((((a >>> 16) * b) & 0x7fff) << 16));
}

export function signed(n: uint31): int31 {
  if (n > INT_MAX) {
    return -(n + INT_MIN) as int31;
  }
  return (n as number) as int31;
}

export function intOfNumber(n: number): option<int31> {
  if (n >= INT_MIN && n <= INT_MAX) {
    const i = unsafelyCastToInt(n | 0);
    if (i === n) {
      return i;
    }
  }
  return;
}

export function finite(n: number): option<number> {
  return isFinite(n) ? n : undefined;
}

export function wrapNaN(n: option<number>): option<number> {
  if (n !== undefined) {
    return isNaN(n) ? undefined : n;
  }
  return n;
}
