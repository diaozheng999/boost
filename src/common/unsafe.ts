import { InferRealFromOpaque } from "../types";

export function cast<T>(value: InferRealFromOpaque<T>): T {
  return value;
}
