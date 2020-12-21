export const deferred = Symbol("boost/deferred");

export interface Deferrable<T extends unknown[], U> {
  (...args: T): Promise<U>;
  [deferred]: true;
}

export function defer<T extends unknown[], U>(
  fn: (...args: T) => Promise<U>,
): (...args: T) => Promise<U> {
  if (deferred in fn) {
    return fn;
  }
  const deferredFn = (...args: T) =>
    Promise.resolve().then(() => {
      try {
        const value = fn(...args);
        return value;
      } catch (e) {
        return Promise.reject(e);
      }
    });
  (deferredFn as Deferrable<T, U>)[deferred] = true;
  return deferredFn;
}
