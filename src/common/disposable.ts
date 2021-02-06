import { Disposable } from "../traits";

export function make<T>(elem: T, dispose: (value: T) => void): T & Disposable {
  elem[disposed] = false;
}
