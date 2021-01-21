export const brand = Symbol.for("boost/brand");

export type Branded<T, TBrand> = T & {
  [brand]: TBrand;
};
