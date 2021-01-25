export type Equality<T> = (left: T, right: T) => boolean;
export type PolyEquality = <T>(left: T, right: T) => boolean;
export type Predicate<T> = (value: T) => boolean;
