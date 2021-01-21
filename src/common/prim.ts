/* eslint-disable @typescript-eslint/naming-convention */
import type { json } from "./json";
import type { option } from "./option";
export type serialiser<T> = (value: T) => json;
export type deserialiser<T> = (exp: json) => option<T>;

export const tup = {
  _1: <T1, TR extends unknown[]>(...r: TR) => (a: T1): [T1, ...TR] => [a, ...r],
  _1_: <T1, T2>(b: T2) => (a: T1): [T1, T2] => [a, b],
  _2: <T1, T2, TR extends unknown[]>(a: T1, ...r: TR) => (
    b: T2,
  ): [T1, T2, ...TR] => [a, b, ...r],
  _2_: <T1, T2>(a: T1) => (b: T2): [T1, T2] => [a, b],
};

export function key<T, K extends keyof T>(key: K) {
  return (value: T): T[K] => value[key];
}
