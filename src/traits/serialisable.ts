import { json } from "../common/json";

export type serialiser<T> = (value: T) => json;

export interface Serialisable {
  toJSON(): json;
}

export interface PolySerialisable<T> {
  toJSON(serialiseElement: serialiser<T>): json;
}
