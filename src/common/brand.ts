import { brand as brandSymbol, Branded } from "../traits";

export function brand<T, TBrand>(
  element: T,
  brand: TBrand,
): Branded<T, TBrand> {
  const b: Branded<T, TBrand> = element as Branded<T, TBrand>;
  b[brandSymbol] = brand;
  return b;
}

export function isBranded<T, TBrand>(
  e: unknown,
  brand: TBrand,
): e is Branded<T, TBrand> {
  const p = e as Branded<T, TBrand>;
  return brandSymbol in p && p[brandSymbol] === brand;
}
