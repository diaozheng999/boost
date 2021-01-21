import { Comparison, Equality } from "../traits";

export type Unboxed<T> = {
  [k in keyof T]: T[k] extends Box<infer U>
    ? Unboxed<U>
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T[k] extends {}
    ? Unboxed<T[k]>
    : T[k];
};

export class Box<T> {
  static compare = compareBox;
  static eq = eqBox;

  value: T;

  constructor(value: T) {
    this.value = value;
  }

  update(value: T): void {
    this.value = value;
  }

  mutate(effect?: (value: T) => void): Box<T> {
    effect?.(this.value);
    return new Box(this.value);
  }
}

export function compareBox<T>(compareT: Comparison<T>): Comparison<Box<T>> {
  return (a: Box<T>, b: Box<T>) => compareT(a.value, b.value);
}

export function eqBox<T>(eqT: Equality<T>): Equality<Box<T>> {
  return (a: Box<T>, b: Box<T>) => eqT(a.value, b.value);
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function unboxByEffect(object: any): void {
  if (typeof object !== "object" || !object) {
    return;
  }
  const keys = Object.keys(object);
  keys.forEach((key) => {
    const value = object[key];
    if (value instanceof Box) {
      const unboxed = value.value;
      object[key] = unboxed;
      unboxByEffect(unboxed);
    } else {
      unboxByEffect(value);
    }
  });
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export function unbox<T>(boxed: T): Unboxed<T> {
  unboxByEffect(boxed);
  return boxed as Unboxed<T>;
}
