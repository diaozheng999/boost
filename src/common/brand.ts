export const brand = Symbol("boost/brand");
export interface Branded<T> {
  [brand]: T;
}
