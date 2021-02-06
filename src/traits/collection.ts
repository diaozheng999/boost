import type { list } from "../common";
import type { LinkedList } from "../ds";

export type NativeTypedArray<T> = T extends string
  ? string | TemplateStringsArray
  : T extends number
  ?
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint32Array
      | Int8Array
      | Int16Array
      | Int32Array
      | Float32Array
      | Float64Array
  : T extends bigint
  ? BigInt64Array | BigUint64Array
  : T extends Node
  ? NodeListOf<T>
  : never;

export type Collection<T> =
  | T[]
  | list<T>
  | LinkedList<T>
  | Iterable<T>
  | NativeTypedArray<T>;
