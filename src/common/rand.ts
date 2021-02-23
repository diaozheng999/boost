// @barrel export all

import { Predicate } from "../traits";
import { Opaque } from "../types";
import { pipe } from "./f";

declare const RandomNumberGenerator: unique symbol;

export type UGen = Opaque<() => number, typeof RandomNumberGenerator>;
export type Gen<T> = (ugen?: UGen) => T;

export const math: UGen = Math.random as UGen;

const TWO_PI = 2 * Math.PI;

export function normal(mean = 0, stddev = 1): Gen<number> {
  return function boxMullerGen(ugen: UGen = math) {
    const n1 = ugen();
    const n2 = ugen();
    const z = Math.sqrt(-2 * Math.log(n1)) * Math.cos(TWO_PI * n2);
    return stddev * (z + mean);
  };
}

export function random(min = 0, max = 1): Gen<number> {
  const diff = max - min;
  return function boundedUniform(ugen: UGen = math) {
    const n = ugen();
    return min + n * diff;
  };
}

export function until<T>(predicate: Predicate<T>, gen: Gen<T>): Gen<T> {
  return function boundedUntil(ugen: UGen = math) {
    while (true) {
      const p = gen(ugen);
      if (predicate(p)) {
        return p;
      }
    }
  };
}

export function except<T>(predicate: Predicate<T>, gen: Gen<T>): Gen<T> {
  return until((p: T) => !predicate(p), gen);
}

export function t<T, U>(gen: Gen<T>, next: (value: T) => U): Gen<U> {
  return pipe(gen, next);
}

export function randint(max: number): Gen<number> {
  return until(
    (n) => n < max,
    (ugen = math) => Math.floor(ugen() * max),
  );
}

export function intrange(min: number, max: number): Gen<number> {
  return t(randint(max - min), (n) => n + min);
}

export function intrangeincl(min: number, max: number): Gen<number> {
  return intrange(min, max + 1);
}

export function charrange(min: number, max: number): Gen<string> {
  return t(intrangeincl(min, max), String.fromCharCode);
}

export function choice(value: string): Gen<string>;
export function choice<T>(value: T[]): Gen<T>;
export function choice<T>(value: T[] | string): Gen<T> {
  return t(randint(value.length), (i) => value[i]) as Gen<T>;
}

export function bernoulli(p: number): Gen<number> {
  return (gen: UGen = math) => {
    for (let i = 0; ; ++i) {
      if (gen() < p) {
        return i;
      }
    }
  };
}

export function genchoice<T>(value: Gen<T>[]): Gen<T> {
  const igen = randint(value.length);
  return (gen: UGen = math) => {
    const i = igen(gen);
    return value[i]();
  };
}

export function genall<T, U>(
  value: Gen<T>[],
  next: (collected: T[]) => U,
): Gen<U> {
  return (ugen: UGen = math) => next(value.map((gen) => gen(ugen)));
}

export function coin(): Gen<number> {
  return (ugen: UGen = math) => (ugen() > 0.5 ? 1 : 0);
}

export function pick<T>(gen: [gen: Gen<T>, p: number][]): Gen<T> {
  const likelihood = gen.map(([, p]) => p).reduce((a, b) => a + b, 0);
  let q = 0;
  const end = gen.length - 1;
  for (const row of gen) {
    const p = row[1] / likelihood;
    q += p;
    row[1] = q;
  }
  return (ugen: UGen = math) => {
    const p = ugen();
    for (const [g, q] of gen) {
      if (q >= p) {
        return g();
      }
    }
    // should not return here
    return gen[end][0]();
  };
}

export function always<T>(value: T): Gen<T> {
  return () => value;
}
