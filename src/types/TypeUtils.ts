// Copyright (c) 2020 Diao Zheng

declare const witness: unique symbol;

export type Awaited<T> = T extends undefined
  ? T
  : T extends PromiseLike<infer R>
  ? R
  : T;

export type Opaque<T, TWitness> = T & { [witness]: TWitness };

export type Tuple<T, R extends T[]> = [T, ...R];
