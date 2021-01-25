import { brand as brandSymbol, Branded } from "../traits";

/**
 * Add a brand to element T
 * @param element the element. Usually non-primitive.
 * @param brand the brand. Usually symbol or string. Equatable with `===`.
 */
export function brand<T, TBrand>(
  element: T,
  brand: TBrand,
): Branded<T, TBrand> {
  const b: Branded<T, TBrand> = element as Branded<T, TBrand>;
  b[brandSymbol] = brand;
  return b;
}

/**
 * Type checks if element `e` is branded `brand`. Uses `in` check, with `===`
 * equality.
 *
 * @param e element to check. Usually non-primitive.
 * @param brand brand to check. Usually symbol or string. Equatable with `===`.
 */
export function isBranded<T, TBrand>(
  e: unknown,
  brand: TBrand,
): e is Branded<T, TBrand> {
  const p = e as Branded<T, TBrand>;
  return brandSymbol in p && p[brandSymbol] === brand;
}
