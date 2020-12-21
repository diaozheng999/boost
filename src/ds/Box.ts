import { Comparison, Equality } from "../traits";

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
