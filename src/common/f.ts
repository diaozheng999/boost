export function identity<T>(f: T): T {
  return f;
}

export function ignore<T>(_f: T): void {
  return;
}

export function noop(): void {
  return;
}

function cimpl<TL extends unknown[], TR extends unknown[], TReturn, TThis>(
  f: (this: TThis, ...args: [...TL, ...TR]) => TReturn,
  thisParameter: TThis,
  applied: TL,
): (...args: TR) => TReturn;
function cimpl<TReturn, TThis>(
  f: (this: TThis, ...args: unknown[]) => TReturn,
  thisParameter: TThis,
  applied: unknown[],
): (...args: unknown[]) => TReturn {
  return f.bind(thisParameter, ...applied);
}

export function curry<TL extends unknown[], TR extends unknown[], TReturn>(
  f: (...args: [...TL, ...TR]) => TReturn,
  ...applied: TL
): (...args: TR) => TReturn {
  return cimpl(f, undefined, applied);
}

export function mkCurry<T1, TR extends unknown[], TReturn>(
  f: (v1: T1, ...rest: TR) => TReturn,
): (v1: T1) => (...rest: TR) => TReturn {
  return (a) => f.bind(undefined, a);
}

export function curryThis<
  TL extends unknown[],
  TR extends unknown[],
  TReturn,
  TThis
>(
  f: (this: TThis, ...args: [...TL, ...TR]) => TReturn,
  thisParameter: TThis,
  ...applied: TL
): (...args: TR) => TReturn {
  return cimpl(f, thisParameter, applied);
}

function crimpl<TL extends unknown[], TR extends unknown[], TReturn, TThis>(
  f: (this: TThis, ...args: [...TL, ...TR]) => TReturn,
  thisParameter: TThis,
  applied: TR,
): (...args: TL) => TReturn {
  return (...args) => f.apply(thisParameter, [...args, ...applied]);
}

export function curryRight<TL extends unknown[], TR extends unknown[], TReturn>(
  f: (...args: [...TL, ...TR]) => TReturn,
  ...applied: TR
): (...args: TL) => TReturn {
  return crimpl(f, undefined, applied);
}

export function curryThisRight<
  TL extends unknown[],
  TR extends unknown[],
  TReturn,
  TThis
>(
  f: (this: TThis, ...args: [...TL, ...TR]) => TReturn,
  thisParameter: TThis,
  ...applied: TR
): (...args: TL) => TReturn {
  return crimpl(f, thisParameter, applied);
}

/**
 * Optimised version of `mkCurryRight` for 2 parameters.
 * @param f function to be curried.
 */
export function __opt_curry2r1<A, B, TReturn>(
  f: (a: A, b: B) => TReturn,
): (b: B) => (a: A) => TReturn {
  return (b) => (a) => f(a, b);
}

export function __opt_curry3r1<A, B, C, TReturn>(
  f: (a: A, b: B, c?: C) => TReturn,
): (c?: C) => (a: A, b: B) => TReturn;
export function __opt_curry3r1<A, B, C, TReturn>(
  f: (a: A, b: B, c: C) => TReturn,
): (c: C) => (a: A, b: B) => TReturn;
export function __opt_curry3r1<A, B, C, TReturn>(
  f: (a: A, b: B, c: C) => TReturn,
): (c: C) => (a: A, b: B) => TReturn {
  return (c) => (a, b) => f(a, b, c);
}

export function __opt_curry3r2<A, B, C, TReturn>(
  f: (a: A, b: B, c: C) => TReturn,
): (b: B, c: C) => (a: A) => TReturn {
  return (b, c) => (a) => f(a, b, c);
}

export function mkCurryRight<TL extends unknown[], TLast, TReturn>(
  f: (...args: [...TL, TLast]) => TReturn,
): (last: TLast) => (...args: TL) => TReturn {
  return (last) => (...args) => f(...args, last);
}

export function ctor<TArgs extends unknown[], TReturn>(
  ctor: new (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  return (...args) => new ctor(...args);
}

type f<T, U> = (arg: T) => U;

type FList<T> = T extends [infer A, infer B]
  ? [f<A, B>]
  : T extends [infer Ca, infer Cb, ...infer Cr]
  ? [f<Ca, Cb>, ...FList<[Cb, ...Cr]>]
  : never;

type LastElementOf<T> = T extends [infer V]
  ? V
  : T extends [unknown, ...infer Tail]
  ? LastElementOf<Tail>
  : never;

type FirstElementOf<T> = T extends [infer V, ...unknown[]] ? V : never;

export function pipe<A, B>(a: f<A, B>): f<A, B>;
export function pipe<A, B, C>(a: f<A, B>, b: f<B, C>): f<A, C>;

export function pipe<A, B, C, D>(a: f<A, B>, b: f<B, C>, c: f<C, D>): f<A, D>;
export function pipe<A, B, C, D, E>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
): f<A, E>;
export function pipe<A, B, C, D, E, F>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
): f<A, F>;
export function pipe<A, B, C, D, E, F, G>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
  f: f<F, G>,
): f<A, G>;
export function pipe<A, B, C, D, E, F, G, H>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
  f: f<F, G>,
  g: f<G, H>,
): f<A, H>;
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
  f: f<F, G>,
  g: f<G, H>,
  h: f<H, I>,
): f<A, I>;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
  f: f<F, G>,
  g: f<G, H>,
  h: f<H, I>,
  i: f<H, J>,
): f<A, J>;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: f<A, B>,
  b: f<B, C>,
  c: f<C, D>,
  d: f<D, E>,
  e: f<E, F>,
  f: f<F, G>,
  g: f<G, H>,
  h: f<H, I>,
  i: f<H, J>,
  j: f<J, K>,
): f<A, K>;
export function pipe<T>(...f: FList<T>): f<FirstElementOf<T>, LastElementOf<T>>;
export function pipe(...args: Array<f<unknown, unknown>>): f<unknown, unknown> {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return curryThis(args.reduce, args, (acc, f) => f(acc));
}

export function compose<T extends unknown[], U, V>(
  f2: (...args: T) => U,
  f1: f<U, V>,
): (...args: T) => V;
export function compose<T extends unknown[], U, V>(
  f2: (...args: T) => U,
  f1: f<U, V>,
): (...args: T) => V {
  return (...args) => f1(f2(...args));
}

export function tupfThis<TThis, T extends unknown[], U>(
  f: (this: TThis, ...args: T) => U,
  thisp: TThis,
): f<T, U> {
  return (args) => f.apply(thisp, args);
}

export function tupf<T extends unknown[], U>(f: (...args: T) => U): f<T, U> {
  return tupfThis(f, undefined);
}
