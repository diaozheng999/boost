import type { uint31 } from "../common";

export const hash = Symbol.for("hash");

export interface Hashable {
  [hash](): uint31;
}
