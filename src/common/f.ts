export function identity<T>(f: T): T {
  return f;
}

export function ignore<T>(_f: T): void {
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

export function compose<T, U, V>(f2: f<U, V>, f1: f<T, U>): f<T, V> {
  return pipe(f1, f2);
}

export function tupThis<TThis, T extends unknown[], U>(
  f: (this: TThis, ...args: T) => U,
  thisp: TThis,
): f<T, U> {
  return (args) => f.apply(thisp, args);
}

export function tup<T extends unknown[], U>(f: (...args: T) => U): f<T, U> {
  return tupThis(f, undefined);
}
