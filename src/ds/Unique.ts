import type { v1, v3, v4, v5 } from "uuid";
import { Opaque } from "../types";

/* eslint-disable no-magic-numbers */
declare const UniqueWitness: unique symbol;
type UniqueWitness = typeof UniqueWitness;

export type UniqueValue = Opaque<string, UniqueWitness>;

let counter = 0;

function pseudoEncrypt(n: number) {
  let l1 = (n >> 16) & 65535;
  let r1 = n & 65535;
  let l2: number;
  let r2: number;
  for (let i = 0; i < 3; ++i) {
    l2 = r1;
    r2 = l1 ^ ((((1366 * r1 + 150889) % 714025) / 714025) * 32767);
    l1 = l2;
    r1 = r2;
  }

  return (r1 << 16) + l1;
}

export class Unique {
  label: string;

  constructor(label = "uniq") {
    this.label = label;
  }

  get value(): UniqueValue {
    return this.string as UniqueValue;
  }

  get string(): string {
    return `${this.label}_${this.nextValue().toString(16).padStart(8, "0")}`;
  }

  get number(): number {
    return this.nextValue();
  }

  private nextValue(): number {
    return pseudoEncrypt(++counter);
  }
}

type v1 = typeof v1;
type v3 = typeof v3;
type v4 = typeof v4;
type v5 = typeof v5;

export function uuid(v1: v1): (...args: Parameters<v1>) => UniqueValue;
export function uuid(v3: v3): (...args: Parameters<v3>) => UniqueValue;
export function uuid(v3: v4): (...args: Parameters<v4>) => UniqueValue;
export function uuid(v3: v5): (...args: Parameters<v5>) => UniqueValue;
export function uuid<TArgs extends unknown[]>(
  gen: (...args: TArgs) => string,
): (...args: TArgs) => UniqueValue {
  return (...args) => gen(...args) as UniqueValue;
}
