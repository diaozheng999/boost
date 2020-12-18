import type { Option } from "../fp";
import type { Sexp } from "../sexp";

export interface Serialisable {
  toSexp(): Sexp;
}

export interface Deserialisable {
  ofSexp<T>(): Option<T>;
}
