export type JoinedMonad<T, TWitness> = T extends Monadic<infer M, TWitness>
  ? Monadic<M, TWitness>
  : Monadic<T, TWitness>;

/**
 * A Monadic type.
 * @template T the free parameter
 * @template TWitness the witness type. This should never be exported from the
 * monad in order to guarantee methods such as `as` and `bind` to execute.
 */
export interface Monadic<T, TWitness> {
  map: <U>(f: (value: T) => U) => Monadic<U, TWitness>;
  bind: <U, M extends Monadic<U, TWitness>>(f: (value: T) => M) => M;
  join: () => JoinedMonad<T, TWitness>;
  as: <M extends Monadic<T, TWitness>>() => M;
}
