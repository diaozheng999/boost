import { json } from "../common/json";

/**
 * A function that serialises type T into JSON
 */
export type serialiser<T> = (value: T) => json;

export interface DeserialisationSuccessfulOutcome<T> {
  success: true;
  value: T;
}

export interface DeserialisationFailedOutcome {
  success: false;
  errors: Error[];
}

export type DeserialisationOutcome<T> =
  | DeserialisationSuccessfulOutcome<T>
  | DeserialisationFailedOutcome;

export type deserialiser<T> = (value: json) => DeserialisationOutcome<T>;

export interface Serialisable {
  toJSON(): json;
}

export interface PolySerialisable<T> {
  toJSON(serialiseElement: serialiser<T>): json;
}
