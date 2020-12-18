import { Opaque, Tuple } from "./TypeUtils";

export type MappedTuple<T, TIn, TOut> = T extends []
  ? []
  : T extends Tuple<TIn, infer R>
  ? [TOut, ...MappedTuple<R, TIn, TOut>]
  : T extends TIn[]
  ? TOut[]
  : never;

export type BivariantFunction<T extends unknown[], U> = {
  bivariant: (...args: T) => U;
}["bivariant"];

export type InferRealFromOpaque<T> = T extends Opaque<infer U, unknown>
  ? U
  : never;
